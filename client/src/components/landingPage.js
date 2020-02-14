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

import chip from '../img/chip.svg';
import mining from '../img/mining.svg';
import course from '../img/online-class.svg';
import led from '../img/led.svg';

import scraper from '../img/realTimeScraper.png';

import { connect } from 'react-redux';
import { toggleSubscriptionState } from '../actions/pageActions';

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
      this.state = { 
      };
      // bindings
      //
    }

    render() {
        return (
            <div>
                <section id="intro">
                    <div class='banner' />

                    <div class="intro-text">
                        <h2>Welcome to Tekblg</h2>
                        <p>We provide powerful insights and tech products</p>
                        <Button handleClick={(e) => this.props.toggleSubscriptionState()} label={'Subscribe'}/> 
                        {/* <a href="#about" class="btn-get-started scrollto">Get Started</a> */}
                    </div>

                    <div class="product-screens">

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
                            <p>Hardware Designs</p>
                        </div>

                    </div>

                    </section>

                    <main id="main">
                    <section id="about" class="section-bg">
                        <div class="container-fluid">
                        <div class="section-header">
                            <h3 class="section-title">About Us</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">
                                We are committed to quality content <br/>
                            </p>
                        </div>

                        <div class="row">
                            <div style={{padding:20}} class="col-lg-6 about-img wow fadeInLeft">
                            <img src={scraper} alt="" />
                            </div>

                            <div style={{padding:20}} class="col-lg-6 content wow fadeInRight">
                            <h2> Engineering. Insights. Knowledge </h2>
                            <h3> Pickup an interesting new project or build something great </h3>

                            <ul>
                                <li><i class="ion-android-checkmark-circle"></i> No ads. Allowing you to recieve quality content without distraction </li>
                                <li><i class="ion-android-checkmark-circle"></i> Detailed technical posts outlining specific implementations that work right away </li>
                                <li><i class="ion-android-checkmark-circle"></i> Awesome merchandise and applications to streamline portions of your project </li>
                            </ul>

                            </div>
                        </div>

                        </div>
                    </section>
                    <div class="line" />
                    {/* <section id="features">
                        <div class="container">

                        <div class="row">

                            <div class="col-lg-8 offset-lg-4">
                            <div class="section-header wow fadeIn" data-wow-duration="1s">
                                <h3 class="section-title">Product Features</h3>
                                <span class="section-divider"></span>
                            </div>
                            </div>

                            <div style={{display:'flex',alignItems:'center'}} class="col-lg-4 col-md-5 features-img">
                            <img src={computer} alt="" class="wow fadeInLeft"/>
                            </div>

                            <div class="col-lg-8 col-md-7 ">

                            <div class="row">

                                <div class="col-lg-6 col-md-6 box wow fadeInRight">
                                <div class="icon"><i class="ion-ios-speedometer-outline"></i></div>
                                <h4 class="title"><a href="">Business Intelligence</a></h4>
                                <p class="description">Gather any data about your business, competition, industry, products, people or location</p>
                                </div>
                                <div class="col-lg-6 col-md-6 box wow fadeInRight" data-wow-delay="0.1s">
                                <div class="icon"><i class="ion-ios-flask-outline"></i></div>
                                <h4 class="title"><a href="">Alternative Data</a></h4>
                                <p class="description">We collect and build custom alternative data models for Investors, Hedge Funds and Market Analysts</p>
                                </div>
                                <div class="col-lg-6 col-md-6 box wow fadeInRight" data-wow-delay="0.2s">
                                <div class="icon"><i class="ion-social-buffer-outline"></i></div>
                                <h4 class="title"><a href="">Robotic Process Automation</a></h4>
                                <p class="description">Automate and build complex workflows to integrate data from websites that don’t have an interface, combine the data</p>
                                </div>
                                <div class="col-lg-6 col-md-6 box wow fadeInRight" data-wow-delay="0.3s">
                                <div class="icon"><i class="ion-ios-analytics-outline"></i></div>
                                <h4 class="title"><a href="">Export data in CSV</a></h4>
                                <p class="description">Build scrapers, scrape sites and export data in CSV format directly from your browser. Use Cloud Web Scraper to access scraped data via API, webhooks or get it exported via Dropbox</p>
                                </div>
                            </div>

                            </div>

                        </div>

                        </div>

                    </section> */}
                    <section id="advanced-features">

                        {/* <div class="features-row section-bg">
                        <div class="container">
                            <div class="row">
                            <div class="col-12">
                                <img class="advanced-feature-img-right wow fadeInRight" src={advancedFeature1} alt=""/>
                                <div class="wow fadeInLeft">
                                <h2>Duis aute irure dolor in reprehenderit in voluptate velit esse</h2>
                                <h3>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                <p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div> */}

                        {/* <div class="features-row">
                        <div class="container">
                            <div class="row">
                            <div class="col-12">
                                <img style={{maxHeight:401}} class="advanced-feature-img-left" src={team} alt=""/>
                                <div class="wow fadeInRight">
                                <h2>Fully managed enterprise-grade web scraping service</h2>
                                <i class="ion-ios-paper-outline" class="wow fadeInRight" data-wow-duration="0.5s"></i>
                                <p class="wow fadeInRight" data-wow-duration="0.5s">The Data Extraction Engine is designed for the high performance of mass data extraction. Parallelized algorithms allows to run multiple simulations through a proxy-rotating platform.</p>
                                <i class="ion-ios-color-filter-outline wow fadeInRight" data-wow-delay="0.2s" data-wow-duration="0.5s"></i>
                                <p class="wow fadeInRight" data-wow-delay="0.2s" data-wow-duration="0.5s">Each package is tailored to your needs.
The advanced dataflow contains a set of opportunities for status tracking, importing, cleaning and preparing data for analysis so it can be easily and properly queried and analyzed in the analytics tools.</p>
                                <i class="ion-ios-barcode-outline wow fadeInRight" data-wow-delay="0.4" data-wow-duration="0.5s"></i>
                                <p class="wow fadeInRight" data-wow-delay="0.4s" data-wow-duration="0.5s">Our platform deploys quickly and scales easily. Integrate Data Extraction platform with your enterprise systems, while satisfying stringent data security and privacy. We offer flexible Private Deployments that can run in private cloud or on-premise. We can give your developers the utmost flexibility in automating sophisticated data flows end-to-end via API plus rich XML configuration.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div> */}

                        {/* <div class="features-row section-bg">
                        <div class="container">
                            <div class="row">
                            <div class="col-12">
                                <img class="advanced-feature-img-right wow fadeInRight" src={advancedFeature3}  alt=""/>
                                <div class="wow fadeInLeft">
                                <h2>Duis aute irure dolor in reprehenderit in voluptate velit esse</h2>
                                <h3>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                <i class="ion-ios-albums-outline"></i>
                                <p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div> */}

                    </section>
                    {/* <section id="call-to-action">
                        <div class="container">
                        <div class="row">
                            <div class="col-lg-9 text-center text-lg-left">
                            <h3 class="cta-title">Call To Action</h3>
                            <p class="cta-text"> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <div class="col-lg-3 cta-btn-container text-center">
                            <a class="cta-btn align-middle" href="#">Call To Action</a>
                            </div>
                        </div>

                        </div>
                    </section> */}
                    <section id="more-features" class="section-bg">
                        <div class="container">

                        <div class="section-header">
                            <h3 class="section-title">How Tekblg provides you with great value</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Engineering is difficult but rewarding. Our products are elegantly designed so you don't have to struggle</p>
                        </div>

                        <div class="row">

                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><img src={chip} /></div>
                                <div>
                                    <h4 class="title">Artifical Intelligence</h4>
                                    <p class="description">Use some of our text recognition and predictive models for your company's chatbot or data driven operations</p>
                                </div>
                                </div>
                            </div>

                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInRight">
                                <div class="icon"><img src={mining} /></div>
                                <div>
                                    <h4 class="title">Data Mining tools</h4>
                                    <p class="description">Scrape product prices, availability, reviews, inventory, prominence, reputation from eCommerce websites.</p>
                                </div>
                                </div>
                            </div>

                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><img src={course} /></div>
                                <div>
                                    <h4 class="title">Learn Computer Engineering coursework</h4>
                                    <p class="description">Courses in engineering are seldom taught well. Learn about low level concepts in programming and hardware design.</p>
                                </div>
                               </div>
                            </div>

                            <div style={{padding:'20px 20px 0 20px'}} class="col-lg-6">
                            <div class="box wow fadeInRight">
                                <div class="icon"><img src={led} /></div>
                                <div>
                                    <h4 class="title">Purchase well designed circuits</h4>
                                    <p class="description">Powerful bluetooth speaker, home automation systems, and LED matrices which add to the authenticity of any tech space</p>
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

const mapStateToProps = state => (
    { state: state.PageReducer }
)

export default connect(mapStateToProps, { toggleSubscriptionState })(LandingPage);