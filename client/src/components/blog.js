import React, { Component } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import corona from '../img/coronavirus.jpg'

import FeaturedBlogPost from './featuredBlogPost';
import BlogPost from './blogPost';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/postActions';
import { toggleLoader } from '../actions/appActions';

import Pagniation from './pagination';
import { Redirect } from 'react-router-dom';

class Blog extends Component {

    componentDidMount() {

        const url = this.props.location.pathname;

        // see if a country is referenced 
        let allCountries = true;
        const countriesMap = {
            '/canada/' : 'ca',
            '/united-states/' : 'us',
            '/germany/' : 'de',
            '/italy/' : 'it',
            '/united-kingdom/' : 'gb',
            '/france/' : 'fr',
            '/netherlands/' : 'nl',
            '/austria/' : 'at',
            '/switzerland/' : 'ch'
        }
        const countries = ['/canada/','/united-states/','/germany/','/italy/','/united-kingdom/','/france/','/netherlands/','/austria/','/switzerland/']
        for (let i=0; i < countries.length; i++) {
            if (url.includes(countries[i])) {
                this.props.fetchAllPosts(countriesMap[countries[i]])
                allCountries = false;
                break; 
            }
        }

        if (allCountries) {
            this.props.fetchAllPosts() 
        }

        this.props.toggleLoader('ON');
        setTimeout(() => {
            this.props.toggleLoader('OFF');
            require("../js/blog.js");
        }, 3000)

    }

    render(){
        const props = this.props;
        var posts = props.state.posts;
        var featPosts = props.state.featPosts
        let loading = props.loading;
        let redirect = false;

        const url = this.props.location.pathname;
        posts = posts.concat(featPosts);

        var length = posts.length;

        if (length > 0) {

            featPosts = featPosts.slice(0,12)

            featPosts = featPosts.map((post) => 
                <FeaturedBlogPost title={post.title} headerImg={post.headerImg} id={post.id} 
                region={post.region} date={post.date} author={post.author} url={post.url}  />
            );

            let page = url.slice(url.lastIndexOf('/')+1);
            if (page > (Math.floor(length / 12) + 1)) { /* throw 404 */ 
                redirect = true; 
            }

            // load only up to 12 posts
            const slcdPostLst = posts.slice( (page-1) * 12, page * 12 );

            posts = slcdPostLst.map((post, index) =>  {
                return (<BlogPost index={index} title={post.title} headerImg={post.headerImg} id={post.id} 
                region={post.region} date={post.date} url={post.url} 
                /> )
                }
            );
        } if (redirect) {
            return (
                <Redirect to="/404" />
            )
        } else if (!loading) {
                return (
                <div id="top">
                        {/* <div id="preloader">
                            <div id="loader" className={styles.dotsFade}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div> */}

                        {/* <section className={'s-featured'}>
                            <div className={styles.row}>
                                <div className={styles.colFull}>

                                    <div className={['featured-slider',styles.featured].join(" ")} data-aos="zoom-in">
                                        {featPosts}
                                    </div>
                                </div>
                            </div>
                        </section>  */}

                        {/* <section style={{width:'80%',margin:'auto',marginTop:150,marginBottom:100}}>
                            <Card>
                                <CardContent>
                                    <img src={corona} />
                                    <h2>Real time news from around the globe</h2>
                                    <p>Select a Country and monitor updates to keep track of loved ones, and get new developments from overseas</p>
                                </CardContent>
                            </Card>
                        </section> */}

                        <section className={'s-featured'}>
                            <div className={styles.row}>
                                <div className={styles.colFull}>

                                    <div className={['featured-slider',styles.featured].join(" ")} data-aos="zoom-in">
                                        {featPosts}
                                    </div>
                                </div>
                            </div>
                        </section> 

                        <div id="container-c6a8c01de8a821e90f26d2bb7ee02fc0" />

                        <section className={styles.sContent}>
                            
                            <div className={[styles.row,styles.entriesWrap,styles.wide].join(" ")}>
                                <div className={styles.entries}>
                                    {posts}
                                </div> 
                            </div>

                            <Pagniation total={length}/>

                        </section> 

                        {/* <section className={styles.sExtra}>

                            <div className={styles.row}>

                                <div className={[styles.colSeven,styles.mdSix,styles.tabFull,styles.popular].join(" ")}>
                                    <h3>Popular Posts</h3>

                                    <div className={[styles.block12,styles.BlockMFull,styles.popularPosts].join(" ")}>
                                        <article className={[styles.colBlock,styles.popularPost].join(" ")}>
                                            <a href="#0" className={styles.popularThumb}>
                                                <img src="images/thumbs/small/tulips-150.jpg" alt=""/>
                                            </a>
                                            <h5>10 Interesting Facts About Caffeine.</h5>
                                            <section className={styles.popularMeta}>
                                                <span className={styles.popularAuthor}><span>By</span> <a href="#0">John Doe</a></span>
                                                <span className={styles.popularDate}><span>on</span> <time datetime="2018-06-14">Jun 14, 2018</time></span>
                                            </section>
                                        </article>
                                        <article className={[styles.colBlock,styles.popularPost].join(" ")}>
                                            <a href="#0" className={styles.popularThumb}>
                                                <img src="images/thumbs/small/wheel-150.jpg" alt=""/>
                                            </a>
                                            <h5><a href="#0">Visiting Theme Parks Improves Your Health.</a></h5>
                                            <section className={styles.popularMeta}>
                                                <span className={styles.popularAuthor}><span>By</span> <a href="#0">John Doe</a></span>
                                                <span className={styles.popularDate}><span>on</span> <time datetime="2018-06-12">Jun 12, 2018</time></span>
                                            </section>
                                        </article>
                                        <article className={[styles.colBlock,styles.popularPost].join(" ")}>
                                            <a href="#0" className={styles.popularThumb}>
                                                <img src="images/thumbs/small/shutterbug-150.jpg" alt=""/>
                                            </a>
                                            <h5><a href="#0">Key Benefits Of Family Photography.</a></h5>
                                            <section className={styles.popularMeta}>
                                                <span className={styles.popularAuthor}><span>By</span> <a href="#0">John Doe</a></span>
                                                <span className={styles.popularDate}><span>on</span> <time datetime="2018-06-12">Jun 12, 2018</time></span>
                                            </section>
                                        </article>
                                        <article className={[styles.colBlock,styles.popularPost].join(" ")}>
                                            <a href="#0" className={styles.popularThumb}>
                                                <img src="images/thumbs/small/cookies-150.jpg" alt=""/>
                                            </a>
                                            <h5><a href="#0">Absolutely No Sugar Oatmeal Cookies.</a></h5>
                                            <section className={styles.popularMeta}>
                                                <span className={styles.popularAuthor}><span>By</span> <a href="#0"> John Doe</a></span>
                                                <span className={styles.popularDate}><span>on</span> <time datetime="2018-06-12">Jun 12, 2018</time></span>
                                            </section>
                                        </article>
                                        <article className={[styles.colBlock,styles.popularPost].join(" ")}>
                                            <a href="#0" className={styles.popularThumb}>
                                                <img src="images/thumbs/small/beetle-150.jpg" alt=""/>
                                            </a>
                                            <h5><a href="#0">Throwback To The Good Old Days.</a></h5>
                                            <section className={styles.popularMeta}>
                                                <span className={styles.popularAuthor}><span>By</span> <a href="#0">John Doe</a></span>
                                                <span className={styles.popularDate}><span>on</span> <time datetime="2018-06-12">Jun 12, 2018</time></span>
                                            </section>
                                        </article>
                                        <article className={[styles.colBlock,styles.popularPost].join(" ")}>
                                            <a href="#0" className={styles.popularThumb}>
                                                <img src="images/thumbs/small/salad-150.jpg" alt=""/>
                                            </a>
                                            <h5>Healthy Mediterranean Salad Recipes</h5>
                                            <section className={styles.popularMeta}>
                                                <span className={styles.popularAuthor}><span>By</span> <a href="#0"> John Doe</a></span>
                                                <span className={styles.popularDate}><span>on</span> <time datetime="2018-06-12">Jun 12, 2018</time></span>
                                            </section>
                                        </article>
                                    </div> 
                                </div> 

                                <div className={[styles.colFour,styles.mdSix,styles.tabFull,styles.end].join(" ")}>
                                    <div className={styles.row}>
                                        <div className={[styles.colSix,styles.mdSix,styles.mobFull,styles.categories].join(" ")}>
                                            <h3>Categories</h3>
                            
                                            <ul className={styles.linklist}>
                                                <li><a href="#0">Lifestyle</a></li>
                                                <li><a href="#0">Travel</a></li>
                                                <li><a href="#0">Recipes</a></li>
                                                <li><a href="#0">Management</a></li>
                                                <li><a href="#0">Health</a></li>
                                                <li><a href="#0">Creativity</a></li>
                                            </ul>
                                        </div> 
                            
                                        <div className={[styles.colSix,styles.mdSix,styles.mobFull,styles.sitelinks].join(" ")}>
                                            <h3>Site Links</h3>
                            
                                            <ul className={styles.linklist}>
                                                <li><a href="#0">Home</a></li>
                                                <li><a href="#0">Blog</a></li>
                                                <li><a href="#0">Styles</a></li>
                                                <li><a href="#0">About</a></li>
                                                <li><a href="#0">Contact</a></li>
                                                <li><a href="#0">Privacy Policy</a></li>
                                            </ul>
                                        </div> 
                                    </div>
                                </div>
                            </div> 

                        </section> 


                        <footer className={styles.sFooter}>

                            <div className={styles.sFooterMain}>
                                <div className={styles.row}>
                                    
                                    <div className={[styles.colSix,styles.tabFull,styles.sFooterAbout].join(" ")}>
                                            
                                        <h4>About Wordsmith</h4>

                                        <p>Fugiat quas eveniet voluptatem natus. Placeat error temporibus magnam sunt optio aliquam. Ut ut occaecati placeat at. 
                                        Fuga fugit ea autem. Dignissimos voluptate repellat occaecati minima dignissimos mollitia consequatur.
                                        Sit vel delectus amet officiis repudiandae est voluptatem. Tempora maxime provident nisi et fuga et enim exercitationem ipsam. Culpa error 
                                        temporibus magnam est voluptatem.</p>

                                    </div> 

                                    <div className={[styles.colSix,styles.tabFull,styles.sFooterSubscribe].join(" ")}>
                                            
                                        <h4>Our Newsletter</h4>

                                        <p>Sit vel delectus amet officiis repudiandae est voluptatem. Tempora maxime provident nisi et fuga et enim exercitationem ipsam. Culpa consequatur occaecati.</p>

                                        <div className={styles.subscribeForm}>
                                            <form id="mc-form" className={styles.group} novalidate="true">

                                                <input type="email" value="" name="EMAIL" className={styles.email} id="mc-email" placeholder="Email Address" required=""/>
                                    
                                                <input type="submit" name="subscribe" value="Send"/>
                                    
                                                <label for="mc-email" className={styles.subscribeMessage}></label>
                                    
                                            </form>
                                        </div>

                                    </div> 

                                </div>
                            </div> 

                            <div className={styles.sFooterBottom}>
                                <div className={styles.row}>

                                    <div className={styles.colSix}>
                                        <ul className={styles.footerSocial}>
                                            <li>
                                                <a href="#0"><i className={[styles.fab,styles.faFacebook].join(" ")}></i></a>
                                            </li>
                                            <li>
                                                <a href="#0"><i className={[styles.fab,styles.faTwitter].join(" ")}></i></a>
                                            </li>
                                            <li>
                                                <a href="#0"><i className={[styles.fab,styles.faInstagram].join(" ")}></i></a>
                                            </li>
                                            <li>
                                                <a href="#0"><i className={[styles.fab,styles.faYoutube].join(" ")}></i></a>
                                            </li>
                                            <li>
                                                <a href="#0"><i className={[styles.fab,styles.faPinterest].join(" ")}></i></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={styles.colSix}>
                                        <div className={styles.sFooterCopyright}>
                                            <span>
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className={[styles.fa,styles.faHeart].join(" ")} aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                        </span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div> 

                             */}

                        {/* </footer> */}

                        <div className={styles.goTop}>
                            <a className={styles.smoothscroll} title="Back to Top" href="#top"></a>
                        </div> 
                </div>
            )
        } else {
            return ( null )
        }
    }
}

const mapStateToProps = state => ({
    state: state.BlogReducer,
    loading: state.AppReducer.loading
})

export default connect(mapStateToProps, { fetchAllPosts, toggleLoader })(Blog);