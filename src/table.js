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

function createData(name, number, time, clazz, rawTimes, car) {
  return { name, number, time, clazz, rawTimes, car};
}

export function AutoXTable(props) {
    const { data } = props
    const [, dispatch] = useStateValue();
    const rows = data.map(row => {
        return createData(row.name, row.number, row.time, row.clazz, row.rawTimes, row.car)
    })

    const classes = useStyles();
    let position = 0;

    return (
        <React.Fragment>    
            <TableContainer component={Paper}>
                <div>
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 25 }} align="left">Position</TableCell>
                                <TableCell align="left">Number</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Best</TableCell>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">2</TableCell>
                                <TableCell align="left">3</TableCell>
                                <TableCell align="left">4</TableCell>
                                <TableCell align="left">5</TableCell>
                                <TableCell align="left">6</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                position++;
                                return (
                                <TableRow key={row.name}>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell align="left">{row.number + " " + row.clazz.toUpperCase()}</TableCell>
                                    <TableCell onClick={()=>dispatch({type: "SELECTED_DRIVER", data: row})} component="th" scope="row">
                                        <div style={{color:"blue", cursor: "pointer"}}>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.time}</TableCell>

                                    <TableCell align="left">{row.rawTimes.length > 0 ? row.rawTimes[0] : ""}</TableCell>
                                    <TableCell align="left">{row.rawTimes.length > 1 ? row.rawTimes[1] : ""}</TableCell>
                                    <TableCell align="left">{row.rawTimes.length > 2 ? row.rawTimes[2] : ""}</TableCell>
                                    <TableCell align="left">{row.rawTimes.length > 3 ? row.rawTimes[3] : ""}</TableCell>
                                    <TableCell align="left">{row.rawTimes.length > 4 ? row.rawTimes[4] : ""}</TableCell>
                                    <TableCell align="left">{row.rawTimes.length > 5 ? row.rawTimes[5] : ""}</TableCell>

                                    
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
