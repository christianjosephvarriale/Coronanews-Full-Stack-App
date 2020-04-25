/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router } from "react-router-dom"; 
import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';
import '../css/code.css';
import '../css/style.css';
import Snackbar from './snackbar';

import SideNav from './sideNav.js'
import _ from 'underscore';

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            openSuccess: false,
            openError: false,
            emailError:false,
            nameError: false,
            messageError: false,
            sectionIds: {}, /* holds the IDs of the h tags */
            sectionsExist: false
        };
        // bindings
    }

    formatCodeSnippets = () => {
        // apply custom styles to all code blocks

        setTimeout(() => {

            var addScript = document.createElement('script');
            addScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js');
            document.body.appendChild(addScript);

        }, 100);
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            openSuccess: false,
            openError: false
        })
    }

    getTitles = () => { /* sets the state for all title tags */

        setTimeout(() => {
            const titles = document.getElementsByClassName('blog-heading');
            const sectionIds = {};
            for ( let i=0; i < titles.length; i++ ) { /* setState */ 
                sectionIds[`${titles[i].id}`] = titles[i].id;
            }
            this.setState({ sectionIds });
        }, 500);
    }

    componentDidMount() {

        const url = window.location.href;
        const title = url.slice(url.lastIndexOf('/')+1);

        // unescape quotes and decodeURI
        this.props.fetchPost(decodeURI(title));

        setTimeout(() => {
            
            var script = document.createElement("script");
            script.innerHTML = `var disqus_config = function () {
                this.page.url = "${_.unescape(window.location.href)}";  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = "${_.unescape(title)}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                };
                
                (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://coronanews-ca.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();
            ` 
            const el = document.getElementById('disqus_thread')
            el.parentElement.appendChild(script);

        }, 1000)
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { props } = this;
        const { post } = props.state.post;
        let { prevPost } = props.state.post;
        let { nextPost } = props.state.post;
        const { mobile } = props;

        if ( post ) {

        this.getTitles();
        this.formatCodeSnippets()

        const date = new Date(post.date);
        console.log(`Here is the post ${JSON.stringify(post)}`)
        const countryMap = {
            ca : 'canada',
            us : 'united-states',
            de : 'germany',
            it : 'italy',
            gb : 'united-kingdom',
            fr : 'france',
            nl : 'netherlands',
            at : 'austria',
            ch : 'switzerland'
        } 

        const media = <div data-wow-duration="1s" className={`${styles.entryPostThumb} wow fadeInUp`}>
                <img itemprop="image" id={'headerImg'} src={post.headerImg} alt="" />
            </div>

        // see if prevPost and nextPost are found
        if (prevPost) {
            prevPost = <Router forceRefresh="true"> <div className={[styles.colSix,styles.sContentPrev].join(" ")}>
                    <NavLink to={`${prevPost.title}`}>
                    <span>Previous Post</span>
                    {prevPost.title} 
                </NavLink> </div> </Router>
        }

        if (nextPost) {
            nextPost = <Router forceRefresh="true"> <div className={[styles.colSix,styles.sContentNext].join(" ")}>
                <NavLink to={`${nextPost.title}`}>
                <span>Next Post</span>
                {nextPost.title} 
            </NavLink> </div> </Router>
        }

        let sideNav;
        if ( !mobile && Object.keys(this.state.sectionIds).length > 0 ) {
            sideNav = <SideNav sectionIds={this.state.sectionIds} />
        }

        const generateInitials = (author) => {
            let names = author.split(" ");
            let initials = ""
            names.forEach(e => {
                initials += e[0].toUpperCase()
            });
            return initials
        }

        // change the title and the meta on the page
        try {
            const { body } = post;
            const { title } = post;
            document.getElementById("metaDes").setAttribute("content", body.slice(0,100));
            document.querySelector('title').text = title;
        } catch (error) {
            console.log(error)
        }

        return ( 
            <section itemscope itemtype ="http://schema.org/Blog" className={[styles.sContent,styles.sContentTopPadding,styles.sContentNarrow].join(" ")}>

                    <meta itemprop="position" content={props.index} />
                    <meta itemprop="keywords" content={'coronavirus,coronanewscanada,coronavirus tips,when will coronavirus end'} />

                {sideNav}

                <Snackbar handleClose={this.handleClose} open={this.state.openSuccess} variant={'success'} message={"Thanks for posting the comment"} />
                <Snackbar handleClose={this.handleClose} open={this.state.openError} variant={'error'} message={"You've got some errors on the comment form"} />

                <article className={[styles.row,styles.entry,styles.formatStandard].join(" ")}>
                    <div className={[styles.entryMedia,styles.colFull].join(" ")}>
                        {media}
                    </div>

                    <div className={[styles.entryHeader,styles.colFull].join(" ")}>
                        <h1 itemprop="name" className={[styles.entryHeaderTitle,styles.display1].join(" ")}>
                            {post.title}
                        </h1>
                        <ul className={styles.entryHeaderMeta}>
                            <li itemprop="dateCreated" className={styles.date}>{date.toDateString()}</li>
                            <li itemprop="author" className={styles.byline}>
                                By {post.author}
                            </li>
                        </ul>
                    </div>

                    <div itemprop="text" dangerouslySetInnerHTML={{__html:  post.body}} id="body" style={{whiteSpace: 'pre-line'}}className={[styles.colFull,styles.entryMain].join(" ")} />

                    <div className={styles.entryTaxonomies}>
                            <div className={styles.entryCat}>
                                <h5>Original Source: </h5>
                                <span className={styles.entryTaxList}>
                                    <span itemprop="contributor" >{post.source}</span>
                                    <a href={post.url}>{post.url}</a>
                                </span>
                            </div> 
                        </div> 

                        <div className={styles.entryTags}>
                            <h5>Tags: </h5>
                            <span className={[styles.entryTaxList,styles.entryTaxListPill].join(" ")}>
                                <a>{countryMap[post.region]}</a>
                                <a>Corona Virus</a>
                                <a>News</a>
                                <a>{post.source}</a>
                                <a>Corona Virus tips</a>
                                <a>Covid-19</a>
                            </span>
                        </div> 

                        <div className={styles.entryAuthor}>
                        <div className={styles.entryAuthorAbout}>
                            <div style={{float:'none',width:'auto'}}className={styles.entryAuthorDesc}>
                                <h5 style={{float:'none',width:'auto'}} className={styles.entryAuthorName}>
                                    <span>A word from Corona News...</span>
                                </h5>
                                <p itemprop="comment">
                                    Scared about the coronavirus? It's important to keep informed during this crisis
                                    for the countries and people you care about around the globe, that's our vision. The best way to help
                                    others is to spread quality information, and prepare yourself for any situation. We 
                                    offer a free newsletter providing you with real time updates every 24 hours with articles
                                    from sources of your choice. Subscribe to help us acheive our vision during this difficult time
                                </p>
                            </div>
                        </div>
                    </div>

                    </article> 

                <div style={{ display: !(prevPost || nextPost) ? 'none' : 'block' }} className={styles.sContentEntryNav}>
                    <div className={[styles.row,styles.sContentNav].join(" ")}>
                        {prevPost}
                        {nextPost}
                    </div>
                </div> 

                <div style={{padding:40}} id="disqus_thread"></div>
            </section> 
        )
        
        } else {
            return (
                null
            )
        }
    }
}

const mapStateToProps = state => (
    { 
        state: state.BlogReducer,
        mobile: state.AppReducer.mobile
    }
)

export default connect(mapStateToProps, { fetchPost })(BlogPage);