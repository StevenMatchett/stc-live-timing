import React, {useState, useEffect}  from 'react';
import {getTiming, getDOTY, getClassResults} from './service/service';
import {AutoXTable} from './table';
import './App.css';
import { Time } from './service/time';
import { DriverModal } from './Modal';
import { Dropdown } from './dropdown';
import { DotyTable } from './dotyTable';
import { ClassDotyTable } from './classDotyTable'
import { useStateValue } from './context/context'

const paxMap = {ss:0.823,fsp:0.825,as:0.821,bs:0.814,cs:.809,ds:.807,es:.793,fs:.806,gs:.794,hs:.782,hcs:.796,ssr:.843,"xs-a":.838,"xs-b":.856,ev:.826,ssp:.853,asp:.849,bsp:.852,csp:.865,dsp:.842,esp:.839,fsf:.825,sts:.811,stx:.816,str:.827,stu:.828,sth:.813,ssc:.812,smf:.841,sm:.854,ssm:.875,xp:.882,bp:.867,cp:.851,dp:.866,ep:.85,fp:.871,hcr:.815,am:1,bm:.962,cm:.893,dm:.895,em:.898,fm:.911,fsae:.963,km:.93,ja:.855,jb:.82,jc:.718,camc:.818,camt:.817,cams:.833,}
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
        if (clazz === 'n') console.log(times)
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
    const [dotyData, setDoty] = useState(null);
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

    const calculateDOTY = (dotyRes, pax) => {
        pax.forEach(driver=>{
            if (dotyRes[driver['name']]){
                let currentPointsForEvent = (pax[0].time/driver.time*1000).toFixed(2);
                dotyRes[driver['name']].clazz = driver.clazz
                dotyRes[driver['name']].currentEventScore = currentPointsForEvent
                dotyRes[driver['name']].currentTime = driver.time;
                if (dotyRes[driver['name']].lowTime < currentPointsForEvent){
                    if (dotyRes[driver['name']].totalTimes == 6){
                        dotyRes[driver['name']].points.pop();
                        dotyRes[driver['name']].points.push(currentPointsForEvent);
                    } else {
                        dotyRes[driver['name']].points.push(currentPointsForEvent);
                    }
                }
                
            }
        })
        const reducer = (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue);

        Object.keys(dotyRes).forEach(driver=>{
            let lowest = 1001;
            dotyRes[driver].points.forEach(po=>{
                if (parseFloat(po) < lowest){
                    lowest = parseFloat(po);
                }
            });
            dotyRes[driver].sum = dotyRes[driver].points.reduce(reducer);
            dotyRes[driver].lowest = lowest;
        });

        let arr = Object.keys(dotyRes).map(driver=>dotyRes[driver])
        arr = arr.sort((a,b)=>{
            return  b.sum - a.sum
        })
        setDoty(arr);
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
            // setClassDoty(classResults)
            // calculateDOTY(dotyResults, pax)
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
        

        // return setInterval(async ()=> await fetchData(),30000)

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
                    <span ><button onClick={()=>reLoadNow()}>Refresh Now</button>{nextRefresh}</span>
                    <br/>

                    
                    
                    {/* {dropdown !== 'PAX' && dropdown !== 'RAW'
                        ?
                            <div>
                                <a style={{float:"right", paddingRight:"1em", paddingTop:"1em"}} onClick={()=>{setShowClassDoty(true)}}href="#">Class DOTY</a>  
                                <br/>
                                <div>Time needed to match top PAX: {(topPax/paxMap[dropdown]).toFixed(3) }</div>
                            </div>
                        :
                            <div>
                                <a style={{float:"right", paddingRight:"1em", paddingTop:"1em"}} onClick={()=>{setShowDoty(true)}}href="#">Show Live DOTY</a>  
                                <br/>
                                <div>Number of runs: {runCount} </div>
                                <div>Cones hit: {conesHit}</div>
                            </div>
                    } */}
                    {dropdown && dropdown === 'N' && 
                        <AutoXTable class="col" data={getPax([data[dropdown]])} name={dropdown} topPax={topPax} />
                    }
                    {dropdown && dropdown !== 'N' && 
                        <AutoXTable class="col" data={data[dropdown]} name={dropdown} topPax={topPax} />
                    }
                </div>
            }

            {data && classes && dropdown && showDoty && dotyData &&
                <DotyTable data={dotyData} onClose={()=>{setShowDoty(false)}} topPax={topPax} paxMap={paxMap}></DotyTable>
            }
            { data && classes && dropdown && showClassDoty && classDoty &&
                <ClassDotyTable data={classDoty[dropdown]} onClose={()=>{setShowClassDoty(false)}} currentClassData={data[dropdown]}></ClassDotyTable>
            }


        </React.Fragment>
    )
}