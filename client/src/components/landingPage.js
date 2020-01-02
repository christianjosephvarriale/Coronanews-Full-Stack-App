import React, { Component } from 'react';
import jquery from 'jquery';
import '../lib/bootstrap/css/bootstrap.min.css';
import '../lib/animate/animate.min.css';
import '../lib/font-awesome/css/font-awesome.min.css';
import '../lib/ionicons/css/ionicons.min.css';
import '../lib/magnific-popup/magnific-popup.css';
import '../css/style.css';

import dataVisualization from '../img/dataVisualization.png';
import scraping from '../img/scraping.png';
import hardware from '../img/hardware.png';

import scraper from '../img/realTimeScraper.png';
import computer from '../img/computer.png';
import team from '../img/team.jpg';
import photo from '../img/photo.jpg';

import client1 from '../img/clients/client-1.png'
import client2 from '../img/clients/client-2.png'
import client3 from '../img/clients/client-3.png'
import client4 from '../img/clients/client-4.png'
import client5 from '../img/clients/client-5.png'
import client6 from '../img/clients/client-6.png'

import team1 from '../img/team/team-1.jpg'
import team2 from '../img/team/team-2.jpg'
import team3 from '../img/team/team-3.jpg'
import team4 from '../img/team/team-4.jpg'

import gallery1 from '../img/gallery/gallery-1.jpg'
import gallery2 from '../img/gallery/gallery-2.jpg'
import gallery3 from '../img/gallery/gallery-3.jpg'
import gallery4 from '../img/gallery/gallery-4.jpg'
import gallery5 from '../img/gallery/gallery-5.jpg'
import gallery6 from '../img/gallery/gallery-6.jpg'

import about from '../img/about-img.jpg'
import features from '../img/product-features.png'
import advancedFeature1 from '../img/advanced-feature-1.jpg';
import advancedFeature2 from '../img/advanced-feature-2.jpg';
import advancedFeature3 from '../img/advanced-feature-3.jpg';

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
                        <h2>Welcome to Varritech</h2>
                        <p>We provide awesome resources, and powerful tools for your business</p>
                        <a href="#about" class="btn-get-started scrollto">Get Started</a>
                    </div>

                    {/* <div class="product-screens">

                        <div class="product-screen-1 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.6s">
                            <img src={dataVisualization} alt="Data Visualization"/>
                            <p>Data Visualization</p>
                        </div>

                        <div class="product-screen-2 wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.6s">
                            <img src={scraping} alt=""/>
                            <p>Information Scraping</p>
                        </div>

                        <div class="product-screen-3 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.6s">
                            <img src={hardware} alt=""/>
                            <p>Hardware Insights</p>
                        </div>

                    </div> */}

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
                            <div class="col-lg-6 about-img wow fadeInLeft">
                            <img src={scraper} alt="" />
                            </div>

                            <div class="col-lg-6 content wow fadeInRight">
                            <h2> Engineering. Insights. Knowledge </h2>
                            <h3> Pickup an interesting new project or Build something great </h3>

                            <ul>
                                <li><i class="ion-android-checkmark-circle"></i> No ads </li>
                                <li><i class="ion-android-checkmark-circle"></i> Detailed technical posts </li>
                                <li><i class="ion-android-checkmark-circle"></i> Hardware and Software insights </li>
                            </ul>

                            </div>
                        </div>

                        </div>
                    </section>
                    <section id="features">
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

                    </section>
                    <section id="advanced-features">

                        <div class="features-row section-bg">
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
                        </div>

                        <div class="features-row">
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
                        </div>

                        <div class="features-row section-bg">
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
                        </div>
                    </section>
                    <section id="call-to-action">
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
                    </section>
                    <section id="more-features" class="section-bg">
                        <div class="container">

                        <div class="section-header">
                            <h3 class="section-title">How businesses use data through web scraping</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Web scraping enables businesses to take unstructured data on the world wide web and turn it into structured data so that it can be consumed by their applications, providing significant business value</p>
                        </div>

                        <div class="row">

                            <div class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><i class="ion-ios-stopwatch-outline"></i></div>
                                <h4 class="title"><a href="">Stock Market and Financial Data</a></h4>
                                <p class="description">Gather data about global financial markets, stock markets, trading, commodity and economic indicators. Enhance and augment the data available to analysts and internal financial models to make them perform better.</p>
                            </div>
                            </div>

                            <div class="col-lg-6">
                            <div class="box wow fadeInRight">
                                <div class="icon"><i class="ion-ios-bookmarks-outline"></i></div>
                                <h4 class="title"><a href="">Product, Pricing and Review Data</a></h4>
                                <p class="description">Scrape product prices, availability, reviews, inventory, prominence, reputation from eCommerce websites. Monitor your distribution chain, analyze customer reviews and improve your products and profits with this data.</p>
                            </div>
                            </div>

                            <div class="col-lg-6">
                            <div class="box wow fadeInLeft">
                                <div class="icon"><i class="ion-ios-heart-outline"></i></div>
                                <h4 class="title"><a href="">Real Estate and Housing Data</a></h4>
                                <p class="description">Scrape Real Estate listings, Agents, Brokers, Houses, Apartments, Mortgages, Foreclosures, MLS. Keep a watch on new data by setting up custom email alerts.</p>
                            </div>
                            </div>

                            <div class="col-lg-6">
                            <div class="box wow fadeInRight">
                                <div class="icon"><i class="ion-ios-analytics-outline"></i></div>
                                <h4 class="title"><a href="">Data for Research and Journalism</a></h4>
                                <p class="description">Power your next research project or news story with data from the web - Environmental Data, Third World Development Data, Crime Data, Local and Global trends etc.</p>
                            </div>
                            </div>

                        </div>
                        </div>
                    </section>
                    <section id="clients">
                        <div class="container">

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
                    </section>
                    <section id="pricing" class="section-bg">
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
                    </section>
                    <section id="faq">
                        <div class="container">

                        <div class="section-header">
                            <h3 class="section-title">Frequently Asked Questions</h3>
                            <span class="section-divider"></span>
                            <p class="section-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                        </div>

                        <ul id="faq-list" class="wow fadeInUp">
                            <li>
                            <a data-toggle="collapse" class="collapsed" href="#faq1">Non consectetur a erat nam at lectus urna duis? <i class="ion-android-remove"></i></a>
                            <div id="faq1" class="collapse" data-parent="#faq-list">
                                <p>
                                Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq2" class="collapsed">Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque? <i class="ion-android-remove"></i></a>
                            <div id="faq2" class="collapse" data-parent="#faq-list">
                                <p>
                                Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq3" class="collapsed">Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi? <i class="ion-android-remove"></i></a>
                            <div id="faq3" class="collapse" data-parent="#faq-list">
                                <p>
                                Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq4" class="collapsed">Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla? <i class="ion-android-remove"></i></a>
                            <div id="faq4" class="collapse" data-parent="#faq-list">
                                <p>
                                Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq5" class="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i class="ion-android-remove"></i></a>
                            <div id="faq5" class="collapse" data-parent="#faq-list">
                                <p>
                                Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
                                </p>
                            </div>
                            </li>

                            <li>
                            <a data-toggle="collapse" href="#faq6" class="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i class="ion-android-remove"></i></a>
                            <div id="faq6" class="collapse" data-parent="#faq-list">
                                <p>
                                Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
                                </p>
                            </div>
                            </li>

                        </ul>

                        </div>
                    </section>
                    <section id="team" class="section-bg">
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
                    </section>
                    <section id="gallery">
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
                    </section>
              

                    </main>
                  

                    <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
            </div>
        )
    }
}    
export default LandingPage;
