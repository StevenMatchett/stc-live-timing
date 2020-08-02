import React, {useState, useEffect}  from 'react';
import {getTiming} from './service/service';
import {AutoXTable} from './table';
import './App.css';
import { Time } from './service/time';
import { DriverModal } from './Modal';
import { Dropdown } from './dropdown';
import { useStateValue } from './context/context'

const paxMap = {ss:.822,as:.819,bs:.814,cs:.809,ds:.806,es:.794,fs:.803,gs:.792,hs:.78,hcs:.792,ssr:.843,"xs-a":.844,"xs-b":.864,ev:.824,ssp:.853,asp:.849,bsp:.852,csp:.865,dsp:.842,esp:.839,fsf:.823,sts:.812,stx:.816,str:.827,stu:.828,sth:.813,ssc:.801,smf:.841,sm:.854,ssm:.875,xp:.88,bp:.867,cp:.851,dp:.866,ep:.85,fp:.868,hcr:.815,am:1,bm:.962,cm:.893,dm:.895,em:.896,fm:.911,fsae:.963,km:.93,ja:.855,jb:.82,jc:.718,camc:.818,camt:.817,cams:.833,}

const getRaw = (results) => {
    const fixNovice = (times) => {
        return times.map(time=>{
            let runTime = time.time
            if (runTime!== 999){
                let clazz = time.clazz.substring(1);
                runTime = (time.time / paxMap[clazz]).toFixed(3);
            }
            
            return new Time(time.clazz,time.name,runTime,time.number,time.rawTimes, time.car, time.fastestIndex);
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
    const fixNovice = (times) => {
        return times.map(time=>{
            return new Time(time.clazz,time.name,time.time,time.number, time.rawTimes, time.car, time.fastestIndex);
        })
    }

    const applyPax = (times, clazz) => {
        return times.map(time=>{
            return new Time(time.clazz,time.name,(time.time*paxMap[clazz]).toFixed(3),time.number, time.rawTimes, time.car, time.fastestIndex);
        })
    }

    let raw = [];
    Object.keys(results).forEach(clazz => {
        if (clazz === 'n'){
            raw = raw.concat(fixNovice(results[clazz]));
        } else {
            raw = raw.concat(applyPax(results[clazz],clazz));
        }
        
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

    const [{dropdown, conesHit, runCount}, dispatch] = useStateValue();
    useEffect(() => {
        async function fetchData() {
            let results = await getData(getTiming("https://api.allorigins.win/get?url=stcsolo.com/live/results_live.htm?cache=" + new Date().getTime(), dispatch));
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
            
        }
        fetchData();
    },[]);
    
    window.onpopstate = e => checkurl();
    
    return (
        <React.Fragment>
            {data && classes && dropdown &&
                <div>
                    <DriverModal />
                    <Dropdown clazzes={classes} />
                    <a style={{float:"right", paddingRight:"1em", paddingTop:"1em"}} href="mailto:gosefroba22@gmail.com">Issue or Suggestion?</a>  

                    {dropdown !== 'PAX' && dropdown !== 'RAW'
                        ?
                            <div>
                                <br/>
                                <div>Time needed to match top PAX: {(topPax/paxMap[dropdown]).toFixed(3) }</div>
                            </div>
                        :
                            <div>
                                <br/>
                                <div>Number of runs: {runCount} </div>
                                <div>Cones hit: {conesHit}</div>
                            </div>
                    }
                    <AutoXTable class="col" data={data[dropdown]} name={dropdown} topPax={topPax} />
                </div>
            }
         


        </React.Fragment>
    )
}