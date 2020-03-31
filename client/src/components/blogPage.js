/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 
import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import { connect } from 'react-redux';
import { fetchPost, fetchComments } from '../actions/postActions';
import { toggleLoader } from '../actions/appActions';
import '../css/code.css'
import axios from 'axios';
import Textfield from './textInput';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from './snackbar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import SideNav from './sideNav.js'
import Button from './button'
import _ from 'underscore';

const colorArray = ['#283593','#c62828', '#0277BD', '#00695C', '#558B2F', '#F9A825', '#EF6C00', '#4E342E', '#37474F'];

const generateColor = () => { return colorArray [ Math.round(Math.random() * (colorArray.length - 1)) ] }

function validateEmail(email) {
    console.log(email);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
}

function timeConverter(timestamp){
    return timestamp.slice(0,10)
}

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

    insertBody = (post) => {

        // parse the html string
        setTimeout(() => {
            var wrapper = document.getElementById('body');
            wrapper.innerHTML= post.post.body;
        }, 0);
    }

    handleSubmit = e => {
        e.preventDefault();

        // check all the states to see if one is in error
        let errors = {};
        let raiseErrors = false;
        Object.keys(this.state).map(state => 
            { 
                console.log(state);
                console.log(this.state[state])
                if (['name','message'].includes(state)) {
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

        const url = this.props.location.pathname;
        const title = url.slice(url.lastIndexOf('/')+1);
        // call axios to create the comment 

        axios.post('/comments' , {
            post: title,
            name: this.state.name,
            message: this.state.message,
            email: this.state.email
        })
        .then(response => {
            console.log(response.data);

            this.setState({
                name: '',
                email: '',
                message: '',
                openSuccess: true
            })
            window.location.reload();
        })
        .catch(error => console.log(error))
        }
    }

    componentDidMount() {

        const url = this.props.location.pathname;
        const title = url.slice(url.lastIndexOf('/')+1);

        // fetch the post information based on location
        setTimeout(() => {

            this.props.fetchComments(title);

            // unescape quotes and decodeURI
            this.props.fetchPost(title);
        }, 500);

        this.props.toggleLoader('ON');
        setTimeout(() => {
            this.props.toggleLoader('OFF');
            require("../js/blog.js");
            this.getTitles();
            this.formatCodeSnippets()
            this.insertBody(this.props.state.post)

            
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


            setTimeout(() => {
                const el = document.querySelector('div#disqus_thread > iframe').contentWindow.window;
            }, 2000)

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

            const commentsLst = props.state.comments;
            const { post } = props.state.post;
            let { prevPost } = props.state.post;
            let { nextPost } = props.state.post;
            const { mobile } = props;

            
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

            const tags = post.tags.map((tag) => {
                return <a>{tag}</a>
            });

            // change the title and the meta on the page
            try {
                const { description } = post;
                const { title } = post;
                document.getElementById("metaDes").setAttribute("content", description);
                document.querySelector('title').text = title;
            } catch (error) {
                console.log(error)
            }

            // let comments = ''
            // if (commentsLst.length > 0) {

            //     comments = commentsLst.map((comment) => { return (
                    
            //         <Card style={{margin:'20px 0', padding:'0px 20px'}}>
            //             <CardContent>
            //             <li style={{margin:'40px 0'}} className={[styles.threadAlt,styles.depth1,styles.Comment].join(" ")}>

            //                 <div className={styles.commentAvatar}>
            //                     <Avatar style={{marginRight: 20, backgroundColor: generateColor() }}> {generateInitials(comment.name)} </Avatar>
            //                 </div>

            //                 <div className={styles.commentContent}>

            //                     <div className={styles.commentInfo}>
            //                         <div className={styles.commentAuthor}>{comment.name}</div>

            //                         <div className={styles.commentMeta}>
            //                             <div className={styles.commentTime}> {timeConverter(comment.created_at)} </div>
            //                         </div>
            //                     </div>

            //                     <div className={styles.commentText}>
            //                         <p style={{margin:0}}>{comment.message}</p>
            //                     </div>
            //                 </div>
            //                 </li>
            //             </CardContent>
            //         </Card>
            //         );
            //     })
            // }

            return ( 
                <section className={[styles.sContent,styles.sContentTopPadding,styles.sContentNarrow].join(" ")}>

                    {sideNav}

                    <Snackbar handleClose={this.handleClose} open={this.state.openSuccess} variant={'success'} message={"Thanks for posting the comment"} />
                    <Snackbar handleClose={this.handleClose} open={this.state.openError} variant={'error'} message={"You've got some errors on the comment form"} />

                    <article className={[styles.row,styles.entry,styles.formatStandard].join(" ")}>
                        <div className={[styles.entryMedia,styles.colFull].join(" ")}>
                            <div className={styles.entryPostThumb}>
                                <img id={'headerImg'} src={post.headerImg} alt="" />
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
    
                        <div id="body" className={[styles.colFull,styles.entryMain].join(" ")} />
    
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
                                    {tags}
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

                    <div style={{ display: !(prevPost || nextPost) ? 'none' : 'block' }} className={styles.sContentEntryNav}>
                        <div className={[styles.row,styles.sContentNav].join(" ")}>
                            {prevPost}
                            {nextPost}
                        </div>
                    </div> 

                    <div style={{padding:40}} id="disqus_thread"></div>

                    {/* <div className={styles.commentsWrap}>
                        <div id="comments" className={styles.row}>
                            <div className={styles.colFull}>
                                <h3 style={{padding:0}} className={styles.h2}>{(commentsLst.length > 0) ? commentsLst.length + ' Comments' : 'Be the first Comment'}</h3>
                                <ol style={{ display: (commentsLst.length > 0) ? '' : 'none' }} className={styles.commentlist}>
                                    {comments}
                                </ol> 
                            </div> 
                        </div> 

                        <div style={{padding:0}} className={[styles.row,styles.commentRespond].join(" ")}>
                            <div id="respond" className={styles.colFull}>
                                <h3 style={{padding:0}} className={styles.h2}>Add Comment <span>Your email address will not be published</span></h3>
                                <Card>
                                    <CardContent>
                                        <form name="commentForm" id="commentForm" method="post" action="/comment" autocomplete="off">
                                            <fieldset>
                                                <div className={styles.formField}>
                                                    <Textfield helperText={(this.state.nameError) ? 'Please fill out your name' : ''} error={this.state.nameError} name={'name'} value={this.state.name} handleChange={this.handleChange} />
                                                </div>
                                                <div className={styles.formField}>
                                                    <Textfield helperText={(this.state.emailError) ? 'Please fill out your email' : ''} error={this.state.emailError} name={'email'} value={this.state.email} handleChange={this.handleChange} />
                                                </div>
                                                <div className={[styles.message,styles.formField].join(" ")}>
                                                    <Textfield helperText={(this.state.messageError) ? 'Please have a non-empty message' : ''} error={this.state.messageError} multiline name={'message'} value={this.state.message} handleChange={this.handleChange} />
                                                </div>
                                                <Button handleClick={this.handleSubmit} label={'Submit Comment'}/>
                                            </fieldset>
                                        </form> 
                                    </CardContent>
                                </Card>
                            </div> 
                        </div>  
                    </div> */}
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

export default connect(mapStateToProps, { fetchPost, fetchComments, toggleLoader })(BlogPage);