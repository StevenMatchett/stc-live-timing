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

const useStyles = makeStyles({
    table: {
      minWidth: 500, 
    },
    height: "35px"
  });

function createData(name, number, time, clazz, rawTimes, car, fastestIndex, day1, combinedTime, day1FastestIndex, day1Best){
  return { name, number, time, clazz, rawTimes, car, fastestIndex, day1, combinedTime, day1FastestIndex, day1Best};
}

export function TourTable(props) {

    let { data, name, showTour } = props
    data = data.filter(d => d.combinedTime).sort((a,b)=>a.combinedTime - b.combinedTime);
    
    const [{maxRuns}, dispatch] = useStateValue();
    
    let rows = data.map(row => {
        return createData(row.name, row.number, row.time, row.clazz, row.rawTimes, row.car, row.fastestIndex, row.day1, row.combinedTime, row.day1FastestIndex, row.day1Best)
    })


    let topPaxtime = null;
    if (data.length !== 0){
        if (rows && rows.length > 1 && name === 'PAX'){
            topPaxtime = rows[0].time;
        } else if (rows && name !== "RAW"){
            topPaxtime = rows[0].time;
        }
    }
    
    const classes = useStyles();
    let position = 0;
    if (data.length === 0 ) {return <div/>}
    return (
        <React.Fragment>    
            <TableContainer component={Paper}>
                <div>
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
                                <TableCell style={{ color : "white"}} align="left">Combined</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <>
                                    <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                        <TableCell align="left">{position}</TableCell>
                                        <TableCell onClick={()=>dispatch({type: "SELECTED_DRIVER", data: row})} component="th" scope="row">
                                            <div style={{color:"blue", cursor: "pointer"}}>{row.name}</div>
                                        </TableCell>
                                        <TableCell align="left">{row.number + " " + row.clazz.toUpperCase()}</TableCell>

                                        <TableCell align="left">{row.day1Best}</TableCell>
                                        <TableCell>{row && row.fastestIndex && row.rawTimes && 
                                            index === 0 || !rows[index-1] ? 0 : (rows[index-1].combinedTime - row.combinedTime).toFixed(3)
                                        }
                                        </TableCell>
                                        
                                    

                                    
                                        { (new Array(maxRuns)).fill().map( (em, index) => {
                                            // if (row.day1FastestIndex === index){
                                            //     return <TableCell align="left" style={{backgroundColor:"lightgreen"}}>{row.day1.length > index ? row.day1[index] : ""}</TableCell>
                                            // } else {
                                            //     return <TableCell align="left">{row.day1.length > index ? row.day1[index] : ""}</TableCell>
                                            // }


                                            let append = <Cone style={{height: "10px"}}/>
                                            let time = row.day1.length > index ? row.day1[index] : ""
                                            if (row.day1FastestIndex === index){
                                                return <TableCell align="left" style={{backgroundColor:"lightgreen"}}>{time} {time.includes('+') ? append : ""}</TableCell>
                                            } else {
                                                return <TableCell align="left">{time} {time.includes('+') ? append : ""}</TableCell>
                                            }

                                        })}
                                        <TableCell align="left">{row.combinedTime.toFixed(3)}</TableCell>

                                    </TableRow>


                                    <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                        <TableCell align="left"></TableCell>
                                        <TableCell onClick={()=>dispatch({type: "SELECTED_DRIVER", data: row})} component="th" scope="row">
                                            <div style={{color:"blue", cursor: "pointer"}}></div>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">{row.time}</TableCell>
                                        
                                        <TableCell>{row && row.fastestIndex && row.rawTimes && 
                                          ""
                                        }
                                        </TableCell>

                                    
                                        { (new Array(maxRuns)).fill().map( (em, index) => {
                                            let append = <Cone style={{height: "10px"}}/>
                                            let time = row.rawTimes.length > index ? row.rawTimes[index] : "";
                                            if (row.fastestIndex === index){
                                                return <TableCell align="left" style={{backgroundColor:"lightgreen"}}>{time} {time.includes('+') ? append : ""}</TableCell>
                                            } else {
                                                return <TableCell align="left">{time} {time.includes('+') ? append : ""}</TableCell>
                                            }

                                        })}
                                        <TableCell/>
                                    </TableRow>
                                </>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
