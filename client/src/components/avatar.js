import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: '0 20px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={props.alt} src={props.src} className={classes.large}>{props.text}</Avatar>
    </div>
  );
}