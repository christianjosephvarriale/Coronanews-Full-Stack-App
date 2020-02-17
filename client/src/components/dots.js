import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import '../styles/dots.css';

const styles = () => ({
    container: {
        top: '50%',
        right: '1%',
        display: 'flex',
        transform: 'rotate(90deg)',
        alignItems: 'center',
        position:'fixed',
        zIndex: 1000
    },
    dotContainer: {
        display: 'block',
        position: 'relative',
        width: 20,
        height: 20
    },
    dot: {
        position:'absolute',
        left: 8,
        top: 8,
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        borderRadius: '50%',
        transition: '.2s ease-out',
    },
});

class Dots extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            currentDot: 0,
            posArray: [],
            secArray: []
        };
    }

    handleScroll = () => {

        let scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
        const { posArray } = this.state;
        currentDot;
        for (let i = 0; i < posArray.length; i++) { 
            /* parse the dot pos lst to determine grow state */
            
            if (i === posArray.length - 1) { 
                /* we've reached the end */
                currentDot = i;
            } 
            if ( (scroll >= posArray[i]) && scroll < posArray[i+1] ) {
                currentDot = i;
                break;
            }
        }

        this.setState({
            currentDot: currentDot
        })
    }

    componentDidMount() {

        // calculate the distance to the top for all dots
        const { sectionIds } = this.props;
        posArray = [];
        for (let i=0; i<sectionIds.length; i++){
            const el = document.getElementById(section)
            const distance = window.pageYOffset + el.getBoundingClientRect().top
            posArray.push(distance);
        }

        this.setState({
            posArray: posArray
        })

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const { classes } = this.props;
        
        posArray = [];
        const dotsHTML = sectionIds.map((section, index) => {
            <Tooltip title={section} placement="bottom">
                <a href={`#${section}`}>
                    <div id={`dot${index}`} className={`dot ${this.state.currentDot === index ? 'grow' : ''}`} />
                </a>
            </Tooltip>
        })

        return (
            <div className={classes.container}>
                {dotsHTML} 
            </div>
          )
      } 
}
export default withStyles(styles)(Dots);