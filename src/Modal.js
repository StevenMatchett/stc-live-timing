import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {DriverTable} from './DriverTable';
import { useStateValue } from './context/context';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const DriverModal = () => {
    const [{selected}, dispatch] = useStateValue()
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    if (!selected){
        return <div/>;
    }
    
    return (
    <div>
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={ selected ? true : false }
        onClose={()=>dispatch({ type: 'DESELECT_DRIVER'})}>
            <div style={modalStyle} className={classes.paper}>
                <DriverTable />
            </div>
        </Modal>
    </div>
    );
    }