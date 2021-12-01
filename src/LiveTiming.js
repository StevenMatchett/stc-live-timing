import React, {useState, useEffect}  from 'react';
import {getTiming, getDOTY, getClassResults} from './service/service';
import {AutoXTable} from './table';
import './App.css';
import { Time } from './service/time';
import { DriverModal } from './Modal';
import { Dropdown } from './Dropdown';
import { DotyTable } from './dotyTable';
import { useStateValue } from './context/context'
import { dotyData } from './doty';
import { DriverTable } from './DriverTable';

const paxMap = {ss:0.830,fsp:0.824,as:0.821,bs:0.818,cs:0.810,ds:0.806,es:0.792,fs:0.805,gs:0.794,hs:0.786,hcs:0.793,ssr:0.842,"xs-a":0.843,"xs-b":0.854,ev:0.835,ssp:0.853,asp:0.848,bsp:0.852,csp:0.864,dsp:0.844,esp:0.840,fsf:0.824,sts:0.813,stx:0.817,str:0.828,stu:0.829,sth:0.812,ssc:0.808,smf:0.845,sm:0.861,ssm:0.883,xp:0.885,bp:0.867,cp:0.851,dp:0.865,ep:0.849,fp:0.874,hcr:0.814,am:1,bm:0.988,cm:0.895,dm:0.898,em:0.909,fm:0.908,fsae:0.989,km:0.931,ja:.855,jb:.82,jc:.718,camc:0.819,camt:0.816,cams:0.839,}
let reloadCountDown = 30;

const getRaw = (results) => {
    const fixNovice = (times) => {
        return times.map(time=>{
            let runTime = time.time
            let clazz = time.clazz.substring(1);
            if (runTime!== 999){

                runTime = (time.time / paxMap[clazz]).toFixed(3);
            }
            let noviceTimes = time.rawTimes.map(time=>{
                time = time.split("+")[0]
                return (time/paxMap[clazz]).toFixed(3)
            })
            return new Time(time.clazz,time.name,runTime,time.number,noviceTimes, time.car, time.fastestIndex);
        })
    }

    let raw = [];
    Object.keys(results).forEach(clazz => {
        if (clazz === 'n'){
            raw = raw.concat(fixNovice(results[clazz]));
        } else {
            raw = raw.concat(results[clazz]);
        }
        
    })
    raw.sort((a,b)=> {
        return a.time-b.time;
    })
    
    return raw
}

const getPax = (results) => {
    const applyPax = (times, clazz) => {
        return times.map(time=>{
            let paxClass = time.clazz.startsWith('n') ? time.clazz.substring(1) : time.clazz;
            return new Time(time.clazz,time.name,(time.time*paxMap[paxClass]).toFixed(3),time.number, time.rawTimes, time.car, time.fastestIndex);
        })
    }

    let raw = [];
    Object.keys(results).forEach(clazz => {
        raw = raw.concat(applyPax(results[clazz],clazz));
    })
    raw.sort((a,b)=> {
        return a.time-b.time;
    })
    
    return raw
}



export const LiveTiming = (props) =>{
    const [data, setData] = useState();
    const [classes, setClasses] = useState("");
    const [topPax, setTopPax] = useState("");
    const [doty, setDoty] = useState(null);
    const [showDoty, setShowDoty] = useState(false)
    const [showClassDoty, setShowClassDoty] = useState(false);
    const [classDoty, setClassDoty] = useState(null);
    const [nextRefresh, setNextRefresh] = useState(30);

    const getData = async (promise) => {
        return await promise;
    }

    const checkurl = () => {
        if (window.location.search && window.location.search.includes("?class=")){
            let val = window.location.search.replace("?class=","").trim();
            if (Object.keys(paxMap).includes(val)){
                dispatch({type:"UPDATE_DROPDOWN", data:val})
            } else if (val === "RAW"){
                dispatch({type:"UPDATE_DROPDOWN", data:val})
            }
        } else {
            dispatch({type:"UPDATE_DROPDOWN", data: "PAX"})
        }
    }

    function calculateDOTY( pax) {
        const topPax = pax[0].time;
        let dotyDataCopy = JSON.parse(JSON.stringify(dotyData))
        pax.forEach(driver=>{
            let currentPoints = topPax/driver.time*1000;
            if (dotyDataCopy[driver.name]){
                dotyDataCopy[driver.name].scores.push(currentPoints);
                dotyDataCopy[driver.name].scores.sort((a,b)=>b-a);
                dotyDataCopy[driver.name].current = currentPoints
            }
        })

        const addArray = (arr)=> {
            let sum = 0;
            arr.slice(0,6).forEach(r => sum+= r)
            return sum;
        }
        let results = Object.keys(dotyDataCopy).map(driverName=> {
            const sum = addArray(dotyDataCopy[driverName].scores);
            return {name: driverName, score: sum, low: dotyDataCopy[driverName].scores[5], current: dotyDataCopy[driverName].current};

        }).filter(a => a)

        
        var mapped = results.map(function (el, i) {
            return {
                index: i, 
                value: el.score
            };
        });
    
        // sorting the mapped array containing the reduced values
        mapped.sort(function (b, a) {
            return a.value - b.value || a.index - b.index;
        });
        
        // container for the resulting order
        var result = mapped.map(function (el) {
            return results[el.index];
        });
        setDoty(result)
    }

    const [{dropdown, conesHit, runCount, lastMod}, dispatch] = useStateValue();
    useEffect(() => {
        async function fetchData() {

            let results = await getData(getTiming("http://www.stcsolo.com/live/live.html?cache=" + new Date().getTime(), dispatch));
            // let dotyResults = await getData(getDOTY("https://api.allorigins.win/get?url=stcsolo.com/wp-content/uploads/2020/09/2020_event9_paxpoints_6scores.htm?cache=" + new Date().getTime(), dispatch));
            // let classResults = await getData(getClassResults("https://api.allorigins.win/get?url=stcsolo.com/wp-content/uploads/2020/10/2020membership__points.htm?cache=" + new Date().getTime(), dispatch));
            let raw = getRaw(results)
            let pax = getPax(results)
            results['RAW'] = raw;
            results['PAX'] = pax;
            setTopPax(results['PAX'][0].time)
            setData(results);
            let classList = Object.keys(results);
            classList = ["PAX", "RAW", ...classList.slice(0,classList.length-2)]
            setClasses(classList)
            checkurl();
            calculateDOTY(pax)
        }

        fetchData()
        const interval = setInterval(async() => {
            if (reloadCountDown <= 0){
                fetchData()
                reloadCountDown = 30;
                setNextRefresh(30);
            } else {
                
                setNextRefresh(reloadCountDown - 1 );
                reloadCountDown = reloadCountDown - 1;

            }
            
        }, 1000);
        return () => clearInterval(interval);
        


    },[]);

    const reLoadNow = () => {
        reloadCountDown = 0;
    }
    
    window.onpopstate = e => checkurl();
    
    return (
        <React.Fragment>
            {data && classes && dropdown && !showDoty && !showClassDoty &&
                <div>
                    <DriverModal />
                    <span><Dropdown clazzes={classes} /></span>
                    
                    <span><div style={{float:"right", paddingRight:".5em", paddingTop:"2em"}}>Updated: {lastMod}</div></span>
                    <span ><button onClick={()=>setShowDoty(true)}>Live DOTY</button></span>
                    <br/>


                    {dropdown && dropdown === 'N' && 
                        <AutoXTable class="col" data={getPax([data[dropdown]])} name={dropdown} topPax={topPax} />
                    }
                    {dropdown && dropdown !== 'N' && 
                        <AutoXTable class="col" data={data[dropdown]} name={dropdown} topPax={topPax} />
                    }
                </div>
            }
            {data && classes && dropdown && showDoty && 
                <div>
                    <DriverModal />
                    <span><Dropdown clazzes={classes} /></span>
                    
                    <span><div style={{float:"right", paddingRight:".5em", paddingTop:"2em"}}>Updated: {lastMod}</div></span>
                    <span ><button onClick={()=>setShowDoty(false)}>Hide DOTY</button></span>
                    <br/>

                    <DotyTable  doty={doty} />
                </div>
            }

         


        </React.Fragment>
    )
}
