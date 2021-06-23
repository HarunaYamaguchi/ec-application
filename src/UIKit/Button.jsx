import React from 'react';
import Button from '@material-ui/core/button';
import { makeStyles } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles({
  "button":{
     backgroundColor: 'pink',
     color: "#fff",
     fontsize: 16,
     height: 48,
     marginBottom: 16,
     width:256
  }
})


const RegisterButton = (props) => {
  const classes = useStyles();
    return (
      <Button className={classes.button} variant="contained" onClick={() => {props.onClick()}}>
        {props.label}
      </Button>
    )
}

export default RegisterButton;
