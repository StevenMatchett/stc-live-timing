import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 500, 
    },
    height: "35px"
  });


export function ClassDotyTable(props) {
    let { data, onClose, currentClassData} = props
    let fastestTime = currentClassData[0].time;
    currentClassData.map(time => {
        if (data[time]){
            data[time.name].points.push( time.time / fastestTime * 1000 );
            data[time.name].points = data[time.name].points.sort((a,b)=> b-a).slice(0,6)
        }
    })

    let res = Object.keys(data).map(name => {
        data[name].sum = data[name].points.reduce((accumulator, currentValue) => accumulator + currentValue);
        console.log(name, data[name].sum)
        return data[name]
    }).sort((a,b)=>{
        return b.time - a.time;
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
                                <TableCell style={{ color : "white"}} align="left">Scored Events</TableCell>
                                <TableCell style={{ color : "white"}} align="left">Diff</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {res.map((row,index) => {
                                position++;
                                return (
                                <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell  component="th" scope="row">
                                        <div>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.sum.toFixed(2)}</TableCell>
                                    <TableCell align="left">{row.points[row.points.length-1]}</TableCell>
                                    <TableCell align="left">{row.points.length}</TableCell>
                                    {index === 0 && 
                                        <TableCell align="left">0</TableCell>
                                    }
                                    {index !== 0 && 
                                        <TableCell align="left">{ (res[index-1].sum - row.sum).toFixed(2) }</TableCell>
                                    }
                                    
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
