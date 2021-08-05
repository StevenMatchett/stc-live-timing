import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStateValue } from './context/context';
import { ReactComponent as Cone } from './assets/traffic.svg'
import { ReactComponent as Trophy } from './assets/trophy.svg'

const useStyles = makeStyles({
    table: {
      minWidth: 500, 
    },
    height: "35px"
  });

function createData(name, number, time, clazz, rawTimes, car, fastestIndex) {
  return { name, number, time, clazz, rawTimes, car, fastestIndex};
}

function getTrophycount(entries){
    if (entries <= 3) return 1;
    if (entries <= 6) return 2;
    if (entries <= 9) return 3;

    entries = entries - 9;

    return Math.ceil(entries/4) + 3;
}

export function AutoXTable(props) {

    let { data, name, showTour } = props
    const [{maxRuns}, dispatch] = useStateValue();
    let rows = data.map(row => {
        return createData(row.name, row.number, row.time, row.clazz, row.rawTimes, row.car, row.fastestIndex)
    })



    let topPaxtime = null;

    if (rows && rows.length > 1 && name === 'PAX'){
        topPaxtime = rows[0].time;
    } else if (rows && name !== "RAW"){
        topPaxtime = rows[0].time;
    }
    console.log('rows',rows);
    rows = rows.filter(a=>{
        return a.name;
    })
    let trophiesCount = 0;

    if (name !== 'PAX' && name !== 'RAW'){
        trophiesCount = getTrophycount(rows.length);
    }
    const classes = useStyles();
    let position = 0;
    return (
        <React.Fragment>
            
            <TableContainer component={Paper}>
                <div>
                {name !== "RAW" && name !== "PAX" && <>Time to match top PAX: {props.timeNeeded.toFixed(3)}</>}
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead >
                            <TableRow style={{ background : "gray"}}>
                                <TableCell style={{ width: 25, color:"white" }} align="left">Position</TableCell>
                                <TableCell style={{ color : "white"}} >Name</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Number</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Best</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Diff</TableCell>
                                
                                { (new Array(maxRuns)).fill().map( (em, index) => {
                                    return <TableCell style={{ color : "white"}} align="left">{index+1}</TableCell>
                                })}
                                {topPaxtime && <TableCell style={{ color : "white"}} align="left">DOTY Points</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell align="left">{position <= trophiesCount  && <Trophy style={{height: "10px"}}/>} {position}</TableCell>
                                    <TableCell onClick={()=>dispatch({type: "SELECTED_DRIVER", data: row})} component="th" scope="row">
                                        <div style={{color:"blue", cursor: "pointer"}}>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.number + " " + row.clazz.toUpperCase()}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell>{row && row.fastestIndex && row.rawTimes && 
                                        index === 0 || !rows[index-1] ? "" : (rows[index-1].time - row.time).toFixed(3)
                                    }
                                     </TableCell>
                                   

                                   
                                    { (new Array(maxRuns)).fill().map( (em, index) => {
                                        let append = <Cone style={{height: "10px"}}/>
                                        let time = row.rawTimes.length > index ? row.rawTimes[index] : "";
                                        if (row.fastestIndex-1 === index){
                                            return <TableCell align="left" style={{backgroundColor:"lightgreen"}}>{time} {time.includes('+') ? append : ""}</TableCell>
                                        } else {
                                            return <TableCell align="left">{time} {time.includes('+') ? append : ""}</TableCell>
                                        }

                                    })}
                                    {topPaxtime && <TableCell>{(topPaxtime/row.time*1000).toFixed(3)}</TableCell>}
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
