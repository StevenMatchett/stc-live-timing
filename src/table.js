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

const useStyles = makeStyles({
    table: {
      minWidth: 500, 
    },
    height: "35px"
  });

function createData(name, number, time, clazz, rawTimes, car, fastestIndex) {
  return { name, number, time, clazz, rawTimes, car, fastestIndex};
}

export function AutoXTable(props) {

    let { data, name } = props
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
    const classes = useStyles();
    let position = 0;
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
                                {topPaxtime && <TableCell style={{ color : "white"}} align="left">DOTY Points</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell onClick={()=>dispatch({type: "SELECTED_DRIVER", data: row})} component="th" scope="row">
                                        <div style={{color:"blue", cursor: "pointer"}}>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.number + " " + row.clazz.toUpperCase()}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell>{row && row.fastestIndex && row.rawTimes && 
                                        index === 0 || !rows[index-1] ? 0 : (rows[index-1].time - row.time).toFixed(3)
                                    }
                                     </TableCell>
                                   

                                   
                                    { (new Array(maxRuns)).fill().map( (em, index) => {
                                        if (row.fastestIndex === index){
                                            return <TableCell align="left" style={{backgroundColor:"lightgreen"}}>{row.rawTimes.length > index ? row.rawTimes[index] : ""}</TableCell>
                                        } else {
                                            return <TableCell align="left">{row.rawTimes.length > index ? row.rawTimes[index] : ""}</TableCell>
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
