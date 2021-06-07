import { Time } from './time'
const addLadiesAndNoviceToPax = () => {
    let paxMap = {ss:0.823,fsp:0.825,as:0.821,bs:0.814,cs:.809,ds:.807,es:.793,fs:.806,gs:.794,hs:.782,hcs:.796,ssr:.843,"xs-a":.838,"xs-b":.856,ev:.826,ssp:.853,asp:.849,bsp:.852,csp:.865,dsp:.842,esp:.839,fsf:.825,sts:.811,stx:.816,str:.827,stu:.828,sth:.813,ssc:.812,smf:.841,sm:.854,ssm:.875,xp:.882,bp:.867,cp:.851,dp:.866,ep:.85,fp:.871,hcr:.815,am:1,bm:.962,cm:.893,dm:.895,em:.898,fm:.911,fsae:.963,km:.93,ja:.855,jb:.82,jc:.718,camc:.818,camt:.817,cams:.833,}
    Object.keys(paxMap).forEach(clazz => {
        paxMap[`n${clazz}`] = paxMap[clazz];
        paxMap[`l${clazz}`] = paxMap[clazz];
        paxMap[`nl${clazz}`] = paxMap[clazz];
    })
    return paxMap
}

export const paxMap = addLadiesAndNoviceToPax();

export class TimeController {
    constructor(data){
        this.data = data;
        let classList = Object.keys(data);
        classList = ["PAX", "RAW", ...classList.slice(0,classList.length)]
        this.classList = classList;
        this.pax = this._calculatePax();
        this.raw = this._calculateRaw();
    }

    getClassList(){
        return this.classList;
    }

    getPax(){
        return this.pax;
    }

    getRaw(){
        return this.raw;
    }

    getClass(clazz){
        if (clazz === 'PAX') {
            return this.pax;
        } else if (clazz === 'RAW') {
            return this.raw;
        }

        return this.data[clazz];
    }

    _calculatePax(){
        this.pax = [];
        Object.keys(this.data).forEach(clazz => {
            this.data[clazz].forEach(driver => {
                this.pax.push(this._convertDriverToPax(driver));
            })
        });

        this.pax = this.pax.sort((a,b)=>{
            let aTime = this._getPaxTime(a);
            let bTime = this._getPaxTime(b);

            return aTime - bTime
        })
        return this.pax;
    }

    _convertDriverToPax(driver){
        const newTime = driver.time * paxMap[driver.clazz];
        return new Time(driver.clazz, driver.name, newTime.toFixed(3), driver.number, driver.rawTimes, driver.car, driver.fastestIndex)
    }

    _getPaxTime(driver){

        return driver.time
    }

    _getRawTime(driver){
        return driver.time
    }

    _calculateRaw(){
        this.raw = [];
        Object.keys(this.data).forEach(clazz => {
            this.data[clazz].forEach(driver => {
                this.raw.push(driver);
            })
        });

        this.raw = this.raw.sort((a,b)=>{
            let aTime = this._getRawTime(a);
            let bTime = this._getRawTime(b);

            return aTime - bTime
        })
        return this.raw
    }


}