import {Time} from './time';

const axios = require('axios');


export const getTiming = async (url, dispatch) => {
    let res = await axios.get(url);

    let parser = new DOMParser();
    let doc = parser.parseFromString(res.data.contents, "text/html");
    let data = {};
    let currentClass = "";
    let maxNumberOfRuns = 0;
    let conesHit = 0;
    let numberOfRun = 0;
    doc.querySelectorAll("body > a > table:nth-child(4) > tbody > tr").forEach(tr=> {
        if (tr.querySelector("th")){
            currentClass = tr.querySelector("a").name;
            data[currentClass] = []
        } else {
            let clazz = tr.querySelector("td:nth-child(2)").innerText;
            let number = tr.querySelector("td:nth-child(3)").innerText;
            let name = tr.querySelector("td:nth-child(4)").innerText;
            let car = tr.querySelector("td:nth-child(5)").innerText;
            let times = Array.prototype.slice.call(tr.querySelectorAll("td:nth-child(n+7)"));

            times = times.slice(0,times.length-2);

            let actualTimes = [];
            let rawTimes = [];
            let fastest = 999;
            let fastestIndex = -1;
            times.forEach((timeHtml,index) => {
                let time = timeHtml.innerText.split("+").map(s=>s.trim());
                rawTimes.push(timeHtml.innerText.trim());
                if (time.length === 1){
                    if (time[0] === ""){
                        return;
                    }
                    let raw = parseFloat(time,10);
                    actualTimes.push(raw);
                    numberOfRun++;
                    if (raw < fastest){
                        fastest = raw;
                        fastestIndex = index;
                    }
                } else if (time.length === 2) {
                    if (time[1] === "dnf" || time[1] === "dns" ){
                        actualTimes.push(999);
                        return;
                    }
                    let cones = parseFloat(time[1],10);
                    if (isNaN(cones)) cones = 0;
                    let raw = parseFloat(time,10) + cones * 2;
                    conesHit+= cones;
                    numberOfRun++;
                    actualTimes.push(raw);
                    if (raw < fastest){
                        fastest = raw;
                        fastestIndex = index;
                    }
                }
            });
            let bestTime = actualTimes.sort((a,b)=>a-b)[0];
            data[currentClass].push(new Time(clazz,name,bestTime, number, rawTimes, car, fastestIndex));
            if (rawTimes.length > maxNumberOfRuns){
                maxNumberOfRuns = rawTimes.length;
            }
        }
    });

    dispatch({type:"RUNS_AND_CONES", data:{conesHit:conesHit, runCount: numberOfRun, maxRuns: maxNumberOfRuns}})

    
    return data;
}