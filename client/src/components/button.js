import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 13,
    fontFamily: 'Montserrat'
  },
  input: {
    display: 'none',
  },
}));

export default function OutlinedButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button size="large" onClick={props.handleClick} variant="outlined" style={{border: '3px solid #4dac15' ,color: '#4dac15'}} className={classes.button}>
        {props.label}
      </Button>
    </div>
  );
}