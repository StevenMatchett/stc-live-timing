import React, {useState, useEffect}  from 'react';
import {getTiming} from './service/service';
import {AutoXTable} from './Table';
import './App.css';
import { DriverModal } from './Modal';
import { Dropdown } from './Dropdown';
import { useStateValue } from './context/context'
import { paxMap } from './service/TimeController'


let reloadCountDown = 30;

export const LiveTiming = () =>{
    const [data, setData] = useState();
    const [classes, setClasses] = useState("");
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

    const [{dropdown, lastMod}, dispatch] = useStateValue();
    useEffect(() => {
        async function fetchData() {
            let timeController = await getData(getTiming("http://www.stcsolo.com/live/live.html?cache=" + new Date().getTime(), dispatch));
            setData(timeController);
            setClasses(timeController.getClassList())
            checkurl();
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

    if (!data){
        return <></>
    }
    
    return (
        <React.Fragment>
            {data && classes && dropdown && 
                <div>
                    <DriverModal />
                    <span><Dropdown clazzes={data.getClassList()} /></span>
                    
                    <span><div style={{float:"right", paddingRight:".5em", paddingTop:"2em"}}>Updated: {lastMod}</div></span>
                    <span ><button onClick={()=>reLoadNow()}>Refresh Now</button>{nextRefresh}</span>
                    <br/>

                    {dropdown && dropdown === 'N' && 
                        <AutoXTable class="col" data={data.getClass('N')} name={dropdown}  />
                    }
                    {dropdown && dropdown !== 'N' && 
                        <AutoXTable class="col" data={data.getClass(dropdown)} name={dropdown}/>
                    }
                </div>
            }

        </React.Fragment>
    )
}