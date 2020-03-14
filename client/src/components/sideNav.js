import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import '../css/sideNav.css';

const CustomTooltip = withStyles(theme => ({
    tooltip: {
      fontSize: 15,
      fontFamily: 'Montserrat'
    },
  }))(Tooltip);

const styles = () => ({
    container: {
        top: '50%',
        left: 30,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        position:'fixed',
        zIndex: 1000
    },
    dotContainer: {
        display: 'block',
        position: 'relative',
        width: 30,
        height: 30
    },
    dot: {
        position:'absolute',
        left: 12,
        top: 3,
        width: 6,
        height: 6,
        backgroundColor: 'black',
        borderRadius: '50%',
        transition: '.2s ease-out',
    },
});

class SideNav extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            type: 'Dot', /* Either Dot or Text */
            currentSec: 0,
            posArray: [],
        };
    }

    handleScroll = () => {

        let scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
        const { posArray } = this.state;
        let currentSec;
        for (let i = 0; i < posArray.length; i++) { 
            /* parse the dot pos lst to determine grow state */
            
            if ( scroll < posArray[0] ) {
                currentSec = 0;
                break;
            }

            if (i === posArray.length - 1) { 
                /* we've reached the end */
                currentSec = i;
                break;
            } 
            if ( (scroll >= posArray[i]) && scroll < posArray[i+1] ) {
                currentSec = i;
                break;
            }
        }
        this.setState({ currentSec });
    }

    componentDidMount() {

        // calculate the distance to the top for all dots
        let { sectionIds } = this.props;
        sectionIds = Object.values(sectionIds);
        const posArray = [];
        for (let i=0; i<sectionIds.length; i++){
            const el = document.getElementById(sectionIds[i])
            const distance = window.pageYOffset + el.getBoundingClientRect().top
            posArray.push(distance);
        }
        this.setState({ posArray })

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const { classes } = this.props;
        let sectionsHTML;

        if ( this.state.type === 'Dot' ) {
            sectionsHTML = Object.keys(this.props.sectionIds).map((key, i) => {
                return ( <CustomTooltip title={key} arrow placement="right">
                    <a href={`#${this.props.sectionIds[key]}`} className={classes.dotContainer}>
                        <div id={`dot${i}`} className={`${classes.dot} ${this.state.currentSec === i ? 'grow' : ''}`} />
                    </a>
                </CustomTooltip> );
            });
        }
        
        return (
            <div className={classes.container}>
                {sectionsHTML} 
            </div>
          )
      } 
}
export default withStyles(styles)(SideNav);