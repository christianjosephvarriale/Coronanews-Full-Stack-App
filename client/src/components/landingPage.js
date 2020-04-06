import React, { Component } from 'react';
import jquery from 'jquery';
import '../lib/bootstrap/css/bootstrap.min.css';
import '../lib/animate/animate.min.css';
import '../lib/font-awesome/css/font-awesome.min.css';
import '../lib/ionicons/css/ionicons.min.css';
import '../lib/magnific-popup/magnific-popup.css';
import '../css/style.css';
import Button from './button';

import dataVisualization from '../img/dataVisualization.png';
import scraping from '../img/scraping.png';
import hardware from '../img/hardware.png';
import tech from '../img/tech.jpg'

import chip from '../img/chip.svg';
import mining from '../img/mining.svg';
import course from '../img/online-class.svg';
import led from '../img/led.svg';
import algorithm from '../img/algorithm.svg';
import database from '../img/algorithm.svg';
import integration from '../img/integration.svg';

import screens from '../img/google-pixel-2.png';

import scraper from '../img/realTimeScraper.png';

import { connect } from 'react-redux';
import { toggleLoader } from '../actions/appActions';
import { toggleSubscriptionState } from '../actions/pageActions';
import SideNav from './sideNav';
import person from '../img/personCoding.png'

// define jQuery as part of the window
window.jQuery = jquery;


require("../lib/jquery/jquery.min.js");
require("../lib/jquery/jquery-migrate.min.js");
require("../lib/bootstrap/js/bootstrap.bundle.min.js");
require("../lib/easing/easing.min.js");
require("../lib/wow/wow.min.js");
require("../lib/superfish/hoverIntent.js");
require("../lib/superfish/superfish.min.js");
require("../lib/magnific-popup/magnific-popup.min.js");
require("../js/main.js");

class LandingPage extends Component {
    constructor(props) {
      super(props);
      this.state = { };
    }

    componentDidMount() {

        this.props.toggleLoader('ON');
        setTimeout(() => {
            this.props.toggleLoader('OFF');

            // add animation script
            require("../js/animation.js")

            setTimeout(() => {

                var addScript = document.createElement('script');
                addScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js');
                document.body.appendChild(addScript);
    
            }, 100);

        }, 5000)
        
    }

    render() {

        const sections = {
            "About Tekblg" : "about",
            "Products" : "products",
            "Blog Catagories": "more-features",
            "FAQ":"faq"
        }

        const { mobile } = this.props.state;
        let sideNav;
        if ( !mobile ) {
            sideNav = <SideNav sectionIds={sections} />
        }

        const { loading } = this.props.state;
        if (loading) {
            return ( null )
        } else {
            return (
                <div>

                {sideNav}
                <section id="intro">
                    <div class='banner' />

                    <div class="col-lg-6" />

                    <div style={{height: '100%', display: 'flex', alignItems: 'center'}} className="col-lg-6">
                        <div className={'box wow fadeInRight'}>
                            <div class="intro-text">
                                <h2>Modern Tech perfect for the modern developer</h2>
                                <p>Tekblg is a one stop shop for quality blog posts, and all things computer engineering</p>
                                {/* <Button handleClick={(e) => this.props.toggleSubscriptionState()} label={'Subscribe'}/>  */}
                                <a href="#about" class="btn-get-started scrollto">Get Started</a> 
                            </div>
                        </div>
                    </div>

                    {/* <div class="product-screens">

                        <div class="product-screen-1 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.6s">
                            <img src={dataVisualization} alt="Data Visualization"/>
                            <p>Tech Insights</p>
                        </div>

                        <div class="product-screen-2 wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.6s">
                            <img src={scraping} alt=""/>
                            <p>Code Snippets</p>
                        </div>

                        <div class="product-screen-3 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.6s">
                            <img src={hardware} alt=""/>
                            <p>Awesome Designs</p>
                        </div>

                    </div> */}

                    </section>

                    <main id="main">
                    <section id="about" class="section-bg">
                        <div class="container-fluid">
                        <div class="section-header">
                            <h3 class="section-title">About Us & Our Vision</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">
                                We believe tech can be simple but beautiful <br/>
                            </p>
                        </div>

                        <div class="row">
                                <div style={{padding:20}} class="col-lg-6 about-img wow fadeInLeft">
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}id="animation" />
                                </div>
                                <div style={{padding:20}} class="col-lg-6 content wow fadeInRight">
                                <div className="codeBox">
                                    <div className="codeHeader">
                                        <p style={{padding: '3px 5px',marginTop:3,textAlign: 'center',color: 'black', fontWeight:500}}>
                                            Terminal
                                            <span style={{float: 'right',fontSize: 54,color: '#fff',marginTop: -10,marginRight: 4}}>
                                            •
                                            </span>
                                        </p>
                                    </div>
                                    <pre className="prettyprint" style={{width:'100%',margin:0,borderRadius:0}}>
                                        <code>
                                        $ Your one stop-stop for all things Computer Engineering <br />
                                        $ Pickup an interesting new project, learn a new skill, or build something great <br/>
                                        &lt;script&gt; <br /> 
                                            for (let content&#59; content &#60; Tekblg&#46;Content&#59; ) &#123; <br />
                                                noAds(); // Allowing you to recieve quality content without distraction <br />
                                                detailedTechnicalPosts(); // outlining specific implementations that work right away <br />
                                                awesomeMerchandiseAndApps // to streamline portions of your project <br />
                                            &#125; <br />
                                        &lt;/script&gt; <br />
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>

                    <div className="line" />
                 
                    <section id="products" className="section-bg">
                        <div class="section-header">
                            <h3 class="section-title">Products & Services</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">
                                Check out the awesome things we've built <br/>
                            </p>
                        </div>
                    </section>

                    <div className="line" />
                
                    <section id="more-features" class="section-bg">
                        <div class="container">

                        <div class="section-header">
                            <h3 class="section-title">Tekblg's Catagories of Insights</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Our blog covers a wide range of Computer Engineering topics in detail</p>
                        </div>

                        <div class="row">

                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInRight">
                                <div class="icon"><img src={mining} /></div>
                                <div>
                                    <h4 class="title">Algorithms and Data structures</h4>
                                    <p class="description">What data structure should I use in this application? We explore common CS scenarios and give you useable knowledge adapted from the classroom</p>
                                </div>
                                </div>
                            </div>

                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><img src={course} /></div>
                                <div>
                                    <h4 class="title">General Tutorials and Insights</h4>
                                    <p class="description">Courses in engineering are seldom taught well. Learn the basics about coding and hardware design in an engaging way</p>
                                </div>
                               </div>
                            </div>
                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><img src={database} /></div>
                                <div>
                                    <h4 class="title">System Architecture</h4>
                                    <p class="description">What are the best practices for building out my database? How should I structure my application to make it maintainable and scabable? We've got you covered</p>
                                </div>
                               </div>
                            </div>
                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><img src={integration} /></div>
                                <div>
                                    <h4 class="title">Integration Engineering</h4>
                                    <p class="description">How should I connect to seperate systems? What about mapping incomptabile formats? Learn best practices here</p>
                                </div>
                               </div>
                            </div>
                        </div>
                        </div>
                    </section>
                    <div class="line" />
                    {/* <section id="clients">
                        <div class="container">

                        <div class="section-header">
                            <h3 style={{textAlign:'center',fontWeight: 400,marginBottom: 15,fontSize: 28}}>Here are some of our happy customers</h3>
                            <span class="section-divider"></span>
                        </div>
                        
                        <div class="row wow fadeInUp">

                            <div class="col-md-2">
                            <img src={client1} alt=""/>
                            </div>

                            <div class="col-md-2">
                            <img src={client2} alt=""/>
                            </div>

                            <div class="col-md-2">
                            <img src={client3} alt=""/>
                            </div>

                            <div class="col-md-2">
                            <img src={client4} alt=""/>
                            </div>

                            <div class="col-md-2">
                            <img src={client5} alt=""/>
                            </div>

                            <div class="col-md-2">
                            <img src={client6} alt=""/>
                            </div>

                        </div>
                        </div>
                    </section> */}
                    {/* <section id="pricing" class="section-bg">
                        <div class="container">

                        <div class="section-header">
                            <h3 class="section-title">Pricing</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                        </div>

                        <div class="row">

                            <div class="col-lg-4 col-md-6">
                            <div class="box wow fadeInLeft">
                                <h3>Free</h3>
                                <h4><sup>$</sup>0<span> month</span></h4>
                                <ul>
                                <li><i class="ion-android-checkmark-circle"></i> Quam adipiscing vitae proin</li>
                                <li><i class="ion-android-checkmark-circle"></i> Nec feugiat nisl pretium</li>
                                <li><i class="ion-android-checkmark-circle"></i> Nulla at volutpat diam uteera</li>
                                <li><i class="ion-android-checkmark-circle"></i> Pharetra massa massa ultricies</li>
                                <li><i class="ion-android-checkmark-circle"></i> Massa ultricies mi quis hendrerit</li>
                                </ul>
                                <a href="#" class="get-started-btn">Get Started</a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="box featured wow fadeInUp">
                                <h3>Business</h3>
                                <h4><sup>$</sup>29<span> month</span></h4>
                                <ul>
                                <li><i class="ion-android-checkmark-circle"></i> Quam adipiscing vitae proin</li>
                                <li><i class="ion-android-checkmark-circle"></i> Nec feugiat nisl pretium</li>
                                <li><i class="ion-android-checkmark-circle"></i> Nulla at volutpat diam uteera</li>
                                <li><i class="ion-android-checkmark-circle"></i> Pharetra massa massa ultricies</li>
                                <li><i class="ion-android-checkmark-circle"></i> Massa ultricies mi quis hendrerit</li>
                                </ul>
                                <a href="#" class="get-started-btn">Get Started</a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="box wow fadeInRight">
                                <h3>Developer</h3>
                                <h4><sup>$</sup>49<span> month</span></h4>
                                <ul>
                                <li><i class="ion-android-checkmark-circle"></i> Quam adipiscing vitae proin</li>
                                <li><i class="ion-android-checkmark-circle"></i> Nec feugiat nisl pretium</li>
                                <li><i class="ion-android-checkmark-circle"></i> Nulla at volutpat diam uteera</li>
                                <li><i class="ion-android-checkmark-circle"></i> Pharetra massa massa ultricies</li>
                                <li><i class="ion-android-checkmark-circle"></i> Massa ultricies mi quis hendrerit</li>
                                </ul>
                                <a href="#" class="get-started-btn">Get Started</a>
                            </div>
                            </div>

                        </div>
                        </div>
                    </section> */}
                    <section id="faq">
                        <div class="container">

                        <div class="section-header">
                            <h3 class="section-title">Frequently Asked Questions</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Got some burning questions you want answered? We're listening</p>
                        </div>

                        <ul id="faq-list" class="wow fadeInUp">
                            <li>
                            <a data-toggle="collapse" class="collapsed" href="#faq1">I've got some project ideas I want to see built, can you help? <i class="ion-android-remove"></i></a>
                            <div id="faq1" class="collapse" data-parent="#faq-list">
                                <p>
                                    We listen to our readers. Any feedback you leave us will be incorperated into the next posts.
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq2" class="collapsed">I love your content, is there anyway we can help you develop more content? <i class="ion-android-remove"></i></a>
                            <div id="faq2" class="collapse" data-parent="#faq-list">
                                <p>
                                    We are an entirely student initiative. Any donations provided are greatly appreciated and will help us to keep our content free.
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq3" class="collapsed">What makes your team qualified to teach engineering concepts? <i class="ion-android-remove"></i></a>
                            <div id="faq3" class="collapse" data-parent="#faq-list">
                                <p>
                                    Our team consists of computer engineering students with real world experince from around the world. Our content comes straight from the classroom to you.
                                </p>
                            </div>
                            </li>

                        </ul>

                        </div>
                    </section>
                    {/* <section id="team" class="section-bg">
                        <div class="container">
                        <div class="section-header">
                            <h3 class="section-title">Our Team</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}} class="row wow fadeInUp">
                            <div  class="col-lg-3 col-md-6">
                            <div class="member">
                                <div class="pic"><div style={{backgroundPositionX: 'center', height:'100%', backgroundImage: 'url('+photo+')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} alt=""/></div>
                                <h4>Christian J. Varriale</h4>
                                <span>Chief Executive Officer</span>
                                <div class="social">
                                <a href=""><i class="fa fa-twitter"></i></a>
                                <a href=""><i class="fa fa-facebook"></i></a>
                                <a href=""><i class="fa fa-google-plus"></i></a>
                                <a href=""><i class="fa fa-linkedin"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>

                        </div>
                    </section> */}
                    {/* <section id="gallery">
                        <div class="container-fluid">
                        <div class="section-header">
                            <h3 class="section-title">Gallery</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Results speak for themselves. Check out our sense of Elegance and Design</p>
                        </div>

                        <div class="row no-gutters">

                            <div class="col-lg-4 col-md-6">
                            <div class="gallery-item wow fadeInUp">
                                <a href={gallery1} class="gallery-popup">
                                <img src={gallery1} alt=""/>
                                </a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="gallery-item wow fadeInUp">
                                <a href={gallery2} class="gallery-popup">
                                <img src={gallery2} alt=""/>
                                </a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="gallery-item wow fadeInUp">
                                <a href={gallery3} class="gallery-popup">
                                <img src={gallery3} alt=""/>
                                </a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="gallery-item wow fadeInUp">
                                <a href={gallery4} class="gallery-popup">
                                <img src={gallery4} alt=""/>
                                </a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="gallery-item wow fadeInUp">
                                <a href={gallery5} class="gallery-popup">
                                <img src={gallery5} alt=""/>
                                </a>
                            </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                            <div class="gallery-item wow fadeInUp">
                                <a href={gallery6} class="gallery-popup">
                                <img src={gallery6} alt=""/>
                                </a>
                            </div>
                            </div>

                        </div>

                        </div>
                    </section> */}
              

                    </main>
                  

                    <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
            </div>
         
            )
        }
    }
}    

const mapStateToProps = state => (
    { state: state.AppReducer }
)

export default connect(mapStateToProps, { toggleLoader, toggleSubscriptionState })(LandingPage);