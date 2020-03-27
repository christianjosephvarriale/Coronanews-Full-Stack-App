/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 
import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';
import { toggleLoader } from '../actions/appActions';
import '../css/code.css'

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // bindings
    }

    insertBody = (post) => {

        // parse the html string
        setTimeout(() => {
            var wrapper = document.getElementById('body');
            wrapper.innerHTML= post.body;
        }, 0);
    }

    componentDidMount() {

        const url = this.props.location.pathname;
        const title = url.slice(url.lastIndexOf('/')+1);

        // fetch the post information based on location
        setTimeout(() => {

            // unescape quotes and decodeURI
            this.props.fetchPost(title);
        }, 500);

        this.props.toggleLoader('ON');
        setTimeout(() => {
            this.props.toggleLoader('OFF');
            require("../js/blog.js");
        }, 5000)
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { props } = this;
        const { loading } = props;

        if (loading) { 
            return ( null )
        } else {

            const { post } = props.state.post;
            let { prevPost } = props.state.post;
            let { nextPost } = props.state.post;
            
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

            // change the title and the meta on the page
            try {
                const { meta } = post;
                const { title } = post;
                document.getElementById("metaDes").setAttribute("content", meta);
                document.querySelector('title').text = title;
            } catch (error) {
                console.log(error)
            }
        return ( 
                <section className={[styles.sContent,styles.sContentTopPadding,styles.sContentNarrow].join(" ")}>

                    <article className={[styles.row,styles.entry,styles.formatStandard].join(" ")}>
                        <div className={[styles.entryMedia,styles.colFull].join(" ")}>
                            <div className={styles.entryPostThumb}>
                                <img src={post.headerImg} alt="" />
                            </div>
                        </div>
    
                        <div className={[styles.entryHeader,styles.colFull].join(" ")}>
                            <h1 className={[styles.entryHeaderTitle,styles.display1].join(" ")}>
                                {post.title}
                            </h1>
                            <ul className={styles.entryHeaderMeta}>
                                <li className={styles.date}>{date.toDateString()}</li>
                                <li className={styles.byline}>
                                    By {post.author}
                                </li>
                            </ul>
                        </div>
    
                        <div id="body" className={[styles.colFull,styles.entryMain].join(" ")}>
                            {this.insertBody(post)}
                        </div>
    
                        <div className={styles.entryTaxonomies}>
                                <div className={styles.entryCat}>
                                    <h5>Original Source: </h5>
                                    <span className={styles.entryTaxList}>
                                        <span>{post.source}</span>
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
                                    <p>
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

                    <div className={styles.sContentEntryNav}>
                        <div className={[styles.row,styles.sContentNav].join(" ")}>
                            {prevPost}
                            {nextPost}
                        </div>
                    </div> 
                </section> 
            )
        } 
    }
}

const mapStateToProps = state => (
    { 
        state: state.BlogReducer,
        loading: state.AppReducer.loading,
        mobile: state.AppReducer.mobile
    }
)

export default connect(mapStateToProps, { fetchPost, toggleLoader })(BlogPage);