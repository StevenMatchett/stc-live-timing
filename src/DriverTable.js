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
    maxWidth: 500,
    width: 500
  },

});




export function DriverTable(props) {
    const {clazz, name, rawTimes} = props;
    const classes = useStyles();
    let position = 0;

    return (
        <React.Fragment>    
            <TableContainer component={Paper}>
                <div style={{ overflow: 'auto'}}>
                    <h2 style={{ marginLeft: "15px" }}>{name} ({clazz.toUpperCase()})</h2>
                    <Table className={classes.table} aria-label="simple table" style={{tableLayout: 'fixed'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Run</TableCell>
                                <TableCell align="left">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rawTimes.map((row) => {
                                position++;
                                return (
                                <TableRow>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell align="left">{row}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
