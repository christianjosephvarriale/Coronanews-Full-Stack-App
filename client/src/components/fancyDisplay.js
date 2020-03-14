import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import tools from '../img/tools.jpg';
import merchandise from '../img/merchandise.jpg';
import code from '../img/code.jpg';
import blog from '../img/blog.jpg';
import '../css/fancyDisplay.css';
import Button from './button';
import { connect } from 'react-redux';

const styles = () => ({
    container : {
        position: 'relative',
    },
    descriptionImgWrapper : {
        width: '100%',
        position: 'relative',
    },
    descriptionImgWrapperMobile : {
        display:'block'
    },
    descriptionImgWrapperDestop : {
        height:'calc(100vh - 36px)',
        display: 'flex',
    },
});

class FancyDisplay extends Component {
    constructor(props) {
        super(props); 
        this.state = { };

    }
    componentDidMount() { /* Yikes */
        this.forceUpdate()
    }
    handleClick = () => {
        console.log("clicked")
    }
    render() {
        const { classes } = this.props;
        const { mobile } = this.props.state;
        const { loading } = this.props.state;
        if ( loading ) {
            return ( null );
        } else {
            return (
                <div className={classes.container}>
                    <div className={[classes.descriptionImgWrapper, mobile ? classes.descriptionImgWrapperMobile : classes.descriptionImgWrapperDestop].join(' ')}>
                        <div className='imgContainer'>
                            <div style={{backgroundImage: 'url('+code+')'}} className='descriptionImg' />
                            <p className='imgTitle'> Code Snippets </p>
                            <div className='imgTextDiv'>  
                                <p className='imgText'>Components, Algorithms</p>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button label={'Learn More'}/>
                                </div>
                            </div>
                        </div>
                        <div className='imgContainer'>
                            <div style={{backgroundImage: 'url('+tools+')'}} className='descriptionImg' />
                            <p className='imgTitle'> Tech Tools </p>
                            <div className='imgTextDiv'>  
                                <p className='imgText'>Scaper, Image Processor, etc.</p>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button label={'Learn More'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={[classes.descriptionImgWrapper, mobile ? classes.descriptionImgWrapperMobile : classes.descriptionImgWrapperDestop].join(' ')}>
                        <div className='imgContainer'>  
                            <div style={{backgroundImage: 'url('+blog+')'}} className='descriptionImg' />
                            <p className='imgTitle'> Blog </p>
                            <div className='imgTextDiv'>  
                                <p className='imgText'>Insights. Tutorials. Fun</p>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button label={'Learn More'}/>
                                </div>
                            </div>
                        </div>
                        <div className='imgContainer'>
                            <div style={{backgroundImage: 'url('+merchandise+')'}} className='descriptionImg' />
                            <p className='imgTitle'> Merchandise </p>
                            <div className='imgTextDiv'>  
                                <p className='imgText'>Premium Content, Wear</p>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button label={'Learn More'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => (
    { state: state.AppReducer }
)
export default withStyles(styles)(connect(mapStateToProps, {})(FancyDisplay));