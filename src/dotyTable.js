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

function createData(name, sum, lowest, currentEventScore,currentTime, clazz) {
  return { name, sum, lowest, currentEventScore,currentTime, clazz};
}

function getNeedsToMoveUp(driver, above, topPax, paxMap){
    if (!above){
        return "Lonely at the top Caleb"
    }
    let diff = above.sum - driver.sum;

    if (1000 < diff + driver.lowest  ){
        return "Can't move up"
    } else if (!driver.currentEventScore){
        return "Can't move up if not running"
    } else {
        if (driver.lowest !== driver.currentEventScore){
            diff += driver.lowest - driver.currentEventScore 
        }

        let pointsNeeded = ((parseFloat(driver.currentEventScore) + parseFloat(diff)))/1000 ;

        let pax = paxMap[driver.clazz];

        let time = pointsNeeded * topPax

        return (time/pax).toFixed(3)
    }
}

export function DotyTable(props) {
    let { data, onClose} = props


    let rows = data.map(row => {
        return createData(row.name, row.sum, row.lowest, row.currentEventScore,row.currentTime, row.clazz)
    })

    const classes = useStyles();
    let position = 0;

    return (
        <React.Fragment>    
            <a href="#" onClick={onClose} >Back</a>
            <TableContainer component={Paper}>
                <div>
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead>
                            <TableRow style={{ background : "gray"}}>
                                <TableCell style={{ width: 25, color:"white" }} align="left">Position</TableCell>
                                <TableCell style={{ color : "white"}} >Name</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Score</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Lowest scored Event</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Raw time need to move up</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell  component="th" scope="row">
                                        <div>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.sum.toFixed(2)}</TableCell>
                                    <TableCell align="left">{row.lowest}</TableCell>
                                    <TableCell align="left">{getNeedsToMoveUp(row, rows[index-1], props.topPax, props.paxMap)}</TableCell>
                                   
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
