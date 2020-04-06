import React, { Component } from 'react';
import Button from './button'
import Snackbar from './snackbar';
import Textfield from './textInput';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleLoader } from '../actions/appActions';
import logo from '../img/logo/virus.png';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom";
import metro from '../img/sources/metro.png'
import globe from '../img/sources/globe.png'
import montreal from '../img/sources/montreal.png'
import ctv from '../img/sources/ctvNews.png'
import huff from '../img/sources/huff.png'
import cp24 from '../img/sources/cp24.png'
import nat from '../img/sources/nat.png'
import cbc from '../img/sources/cbc.png'
import '../css/style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 901 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 901, min: 0 },
      items: 1,
    },
  };

let year = new Date().getFullYear();

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
}

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          openSuccess: false,
          openError: false,
          email: '',
          subject:'',
          name:'',
          message: '',
          emailError:false,
          subjectError: false,
          nameError: false,
          messageError: false
        };
    }

    handleSubmit = e => {
        console.log('called submit form')
        e.preventDefault();

        // check all the states to see if one is in error
        let errors = {};
        let raiseErrors = false;
        Object.keys(this.state).map(state => 
            { 
                console.log(state);
                console.log(this.state[state])
                if (['name','message','subject'].includes(state)) {
                    if (this.state[state] == '') {
                        // non-empty error
                        errors[state + 'Error'] = true;
                        raiseErrors = true;
                    } else {
                        errors[state + 'Error'] = false;
                    }
                 } else if (state == 'email') {
                    // validate email using regex
                    if (validateEmail(this.state[state])) {
                        errors['emailError'] = true;
                        raiseErrors = true;
                    } else {
                        errors['emailError'] = false;
                    }
                 }
            }  
        )

        if (raiseErrors) {
            // set the error state
            errors.openError = true;
            this.setState(errors);
        } else {
            // no errors are reported, sent off the contact email
            axios.post('/mail' , {
                name: this.state.name,
                message: this.state.message,
                email: this.state.email,
                subject: this.state.subject
            })
            .then(response => {
                console.log(response.data);
    
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                    subject:'',
                    openSuccess: true,
                    nameError: false,
                    emailError:false,
                    subjectError:false,
                    messageError:false
                })
            })
            .catch(error => console.log(error))
        }
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            openSuccess: false,
            openError: false
        })
      }

    render() {
        
        const { props } = this;
        const { loading } = props.state;
        const { mobile } = props;
        if (loading) {
            return ( null )
        } else {
        return (      
            <div>
                <Snackbar handleClose={this.handleClose} open={this.state.openSuccess} variant={'success'} message={"Thanks for getting in contact! We'll reach out soon"} />
                <Snackbar handleClose={this.handleClose} open={this.state.openError} variant={'error'} message={"You've got some errors on the page"} />

                <section id="clients">  
                    <div style={{padding: '0 30px'}}class="section-header">
                        <h3 style={{fontWeight:300,padding:0}}class="section-title">Some of Our Sources</h3>
                        <span class="section-divider"></span>
                        <p style={{padding:0}}class="section-description">
                            Our articles come from reliable media outlets <br/>
                        </p>
                    </div>
                    <div class="container">
                        <div class="row wow fadeInUp">
                            <Carousel 
                                swipeable={false}
                                draggable={false}
                                showDots={false}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={mobile !== "mobile" ? true : false}
                                autoPlaySpeed={5000}
                                keyBoardControl={false}
                                customTransition="all ease 1"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["desktop", "mobile"]}
                                deviceType={mobile ? 'mobile' : 'desktop'}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                <img src={metro} alt="" />
                                <img src={ctv} alt="" />
                                <img src={cp24} alt="" />
                                <img src={montreal} alt="" />
                                <img src={huff} alt="" />
                                <img src={globe} alt="" />
                                <img src={cbc} alt="" />
                                <img src={nat} alt="" />
                            </Carousel>
                        </div>
                    </div>
                </section>
                <section id="contact">
                    <div class="container">
                                <div class="row wow fadeInUp">
                                    <div class="col-lg-6 col-md-6">
                                        <div id="about-coronanews" class="contact-about">
                                            <div style={{ display:'flex' }}>
                                                <img style={{ height: '40px', marginRight: 20 }} src={logo} alt="Varritech logo" title="Varritech" />
                                                <h3>Corona News</h3>
                                            </div>
                                            <p style={{padding:20}}>A University of Waterloo student initiative. Our aim is to keep you informed during this crisis. We host high quality articles from around the world, keeping you up to date with topics surrounding latest in governmental relief, spread rates, and more.</p>
                                        </div>
                                        <div class="info">
                                            <div>
                                                <i class="ion-ios-location-outline"></i>
                                                <p>University of Waterloo<br/>200 University Avenue West Waterloo, Ontario, N2L 3G1</p>
                                            </div>
                                            <div>
                                                <i class="ion-ios-email-outline"></i>
                                                <p>support@coronanews.ca</p>
                                            </div>
                                        </div>
                                        <div class="social-links">
                                            <a href="https://twitter.com/coronanews_help" class="twitter"><i class="fa fa-twitter"></i></a>
                                            <a href="https://www.instagram.com/coronanews.ca" class="instagram"><i class="fa fa-instagram"></i></a>
                                        </div> 
                                    </div>
                                    {/* <div class="col-lg-3 col-md-3">
                                        <h5 style={{margin: 0,marginBottom: 20,fontWeight: 300,color: '#871f78',fontSize: 30,textTransform: 'uppercase'}}>Navigation</h5>
                                        <Router forceRefresh="true">
                                            <ul style={{margin: 0}}> 
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/all-countries/page/1" role="menuitem">All Countries</NavLink></li> 
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/canada/page/1" role="menuitem">Canada</NavLink></li>     
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/united-states/page/1" role="menuitem">US</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/germany/page/1" role="menuitem">Germany</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/italy/page/1" role="menuitem">Italy</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/austria/page/1" role="menuitem">Austria</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/france/page/1" role="menuitem">France</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/netherlands/page/1" role="menuitem">Netherlands</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/switzerland/page/1" role="menuitem">Switzerland</NavLink></li>
                                                <li style={{ cursor: 'pointer '}}role="menuitem"><NavLink to="/coronavirus/news/united-kingdom/page/1" role="menuitem">United Kingdom</NavLink></li>
                                            </ul>
                                        </Router>
                                    </div> */}
                                    <div class="col-lg-6 col-md-6">
                                    <div class="form">
                                        <form id="contact-coronanews" role="form" class="contactForm">
                                        <div class="form-row">
                                            <div class="col-lg-6">
                                                <Textfield helperText={(this.state.nameError) ? 'Please fill out your name' : ''} error={this.state.nameError} name={'name'} value={this.state.name} handleChange={this.handleChange} />
                                            </div>
                                            <div class="col-lg-6">
                                                <Textfield helperText={(this.state.emailError) ? 'Please fill out your email' : ''} error={this.state.emailError} name={'email'} value={this.state.email} handleChange={this.handleChange} />
                                             </div>
                                        </div>
                                        <div >
                                            <Textfield helperText={(this.state.subjectError) ? 'Please fill out the subject' : ''} error={this.state.subjectError} name={'subject'} value={this.state.subject} handleChange={this.handleChange} />
                                        </div>
                                        <div >
                                            <Textfield helperText={(this.state.messageError) ? 'Please have a non-empty message' : ''} multiline error={this.state.messageError} name={'message'} value={this.state.message} handleChange={this.handleChange} />
                                        </div>
                                            <div class="text-center"><Button handleClick={this.handleSubmit} label={'Contact Corona News'}/></div>
                                        </form>
                                    </div>
                                    </div>

                                </div>

                                </div>
                            </section>
                            <footer id="footer">
                                <div class="container">
                                    <div class="row">
                                    <div class="col-lg-6 text-lg-left text-center">
                                        <div style={{color:'#888'}}class="copyright">
                                        &copy; Copyright <strong>Corona News {year}</strong>. All Rights Reserved
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <nav class="footer-links text-lg-right text-center">
                                        <Router forceRefresh="true">
                                            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                                            <NavLink to="/terms-of-use">Terms of Use</NavLink>
                                            <a href="#about-coronanews">About</a>
                                            <a href="#contact-coronanews">Contact</a>
                                        </Router>
                                        </nav>
                                    </div>
                                    </div>
                                </div>
                            </footer>
            </div>
           
            )
        }
    }
}


const mapStateToProps = state => (
    { 
        state: state.AppReducer,
        mobile: state.AppReducer.mobile
    }
)

export default connect(mapStateToProps, { toggleLoader })(Footer);