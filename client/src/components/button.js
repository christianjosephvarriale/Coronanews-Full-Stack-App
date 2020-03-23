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
      <Button size="large" onClick={props.handleClick} variant="outlined" style={{border: '1px solid #871f78' ,color: '#871f78'}} className={classes.button}>
        {props.label}
      </Button>
    </div>
  );
}