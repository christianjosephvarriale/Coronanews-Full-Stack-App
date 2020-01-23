import React, { Component } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';

import guitarman from '../img/thumbs/featured/featured-guitarman.jpg'
import watch from '../img/thumbs/featured/featured-watch.jpg';
import beetle from '../img/thumbs/featured/featured-beetle.jpg';

import FeaturedBlogPost from './featuredBlogPost';
import BlogPost from './blogPost';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/postActions';

import Pagniation from './pagination';
import Loader from './loader';

const contentful = require('contentful');

class Blog extends Component {

    componentDidMount() {

        this.props.fetchAllPosts()        

        // wait until state is changed before loading javascript
        setTimeout(() => {
            require("../js/blog.js");
        }, 500);

    }

    render(){
        const props = this.props;
        var featPosts = props.state.featPosts
        var posts = props.state.posts;

        console.log(`Here are the posts: ${JSON.stringify(posts)}`)

        posts = posts.concat(featPosts);

        // sort the posts by datetime
        posts.sort(function(a, b) {
            return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
        });

        var length = posts.length;

        console.log(`Here are the posts: ${JSON.stringify(posts)}`)

        if (posts && featPosts) {
            
            featPosts = featPosts.map((post) => 
                <FeaturedBlogPost title={post.title} headerImg={post.headerImg} id={post.id} 
                catagory={post.catagory} date={post.date} author={post.author}  />
            );

            const url = props.location.pathname;
            const page = url.slice(url.lastIndexOf('/')+1);

            // load only up to 12 posts
            const slcdPostLst = posts.slice( (page-1) * 12, page * 12 );

            console.log(`Here are the sliced posts: ${JSON.stringify(slcdPostLst)}`)

            posts = slcdPostLst.map((post) =>  
                <BlogPost title={post.title} headerImg={post.headerImg} id={post.id} 
                            catagory={post.catagory} date={post.date} 
                /> 
            );
        }

        if (posts && featPosts) {
                return (
                <div id="top">
                        <div id="preloader">
                            <div id="loader" className={styles.dotsFade}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                        <section className={'s-featured'}>
                            <div className={styles.row}>
                                <div className={styles.colFull}>

                                    <div className={['featured-slider',styles.featured].join(" ")} data-aos="zoom-in">
                                        {featPosts}
                                    </div>
                                </div>
                            </div>
                        </section> 


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
            return (
                <div style={{margin:'auto', marginTop:'150px 0', width:'90%'}}>
                  <p> We are Loading Some awesome data for you </p>
                  <Loader />
                </div> 
            )
        }
    }
}

const mapStateToProps = state => ({
    state: state.BlogReducer
})

export default connect(mapStateToProps, { fetchAllPosts })(Blog);