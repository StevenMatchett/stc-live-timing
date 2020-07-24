import {Time} from './time';
const axios = require('axios');


export const getTiming = async (url) => {
    const res = await axios.get("http://tower.local:3000/"+url);
    let parser = new DOMParser();
    let doc = parser.parseFromString(res.data, "text/html");
    let data = {};
    let currentClass = "";
    doc.querySelectorAll("body > a > table:nth-child(3) > tbody > tr").forEach(tr=> {
        if (tr.querySelector("a")){
            currentClass = tr.querySelector("a").name;
            data[currentClass] = []
        } else {
            let classAndNumber = tr.querySelector("td:nth-child(2)").innerText.split(" ");
            let clazz = classAndNumber[0];
            let number = classAndNumber[1];
            let name = tr.querySelector("td:nth-child(3)").innerText;
            let time = tr.querySelector("td:nth-child(4) > font").innerText;
            data[currentClass].push(new Time(clazz,name,time, number));
        }
    });

    
    return data;
}