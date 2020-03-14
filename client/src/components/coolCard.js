import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoCardContent from '@mui-treasury/components/cardContent/textInfo';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const textStyles = makeStyles(theme => {
    const family =
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif';
    return {
      overline: {
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: 12,
        marginBottom: '0.875em',
        display: 'inline-block',
      },
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '0.35em',
        fontFamily: family,
        padding: '0 !important'
      },
      body: {
        marginBottom: theme.spacing(2),
        fontSize: '1.8rem',
        letterSpacing: '0.00938em',
        fontFamily: family,
      },
      button: {
        backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
        boxShadow: '0px 4px 32px rgba(252, 56, 56, 0.4)',
        borderRadius: 100,
        paddingLeft: 24,
        paddingRight: 24,
        color: '#ffffff',
      },
    };
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: theme.spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      marginLeft: theme.spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: theme.spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

const BlogCard = (props) => {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...cardContentStyles
  } = textStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={props.image}
      />
      <CardContent>
        <TextInfoCardContent
          classes={cardContentStyles}
          overline={'28 MAR 2019'}
          heading={'What is Git ?'}
          body={
            'Git is a distributed version control system. Every dev has a working copy of the code and...'
          }
        />
        <Button className={buttonStyles}>Read more</Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;