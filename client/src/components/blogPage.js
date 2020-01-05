/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { fetchPost, fetchComments } from '../actions/postActions';
import Textfield from './textInput';
import Loader from './loader';
import Snackbar from './snackbar';

import Img from './avatar';

import logo from '../img/logo/companyLogoV2.png';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from './button'
import axios from 'axios';

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
            messageError: false
        };
        // bindings
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

    insertBody = (post) => {

        // parse the html string
        setTimeout(() => {
            var wrapper = document.getElementById('body');
            wrapper.innerHTML= post.body;
        }, 500);
    }

    formatCodeSnippets = () => {
        // apply custom styles to all code blocks

        setTimeout(() => {
            var addScript = document.createElement('script');
            addScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js');
            document.body.appendChild(addScript);

            const codeLst = document.getElementsByTagName("code");
            const body = document.getElementById('body');

            if (codeLst.length > 0) {

                // insert a pre tag before the start of the code
                let pre = document.createElement('pre');
                let code = document.createElement('code');
                pre.setAttribute('class', 'prettyprint');
                body.insertBefore(pre,codeLst[0].parentNode);
                pre.appendChild(code)

                let textContent = ''

                for (let i=0; i < codeLst.length; i++) {
                    textContent += codeLst[i].textContent;
                    textContent += '\n'
                }

                const textNode = document.createTextNode(textContent)
                code.appendChild(textNode);

                const removeLst = document.querySelectorAll('p code')
                for (let i=0; i < removeLst.length; i++) {
                    body.removeChild(removeLst[i].parentNode)
                }
            }

        }, 500);
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
        const id = url.slice(url.lastIndexOf('/')+1);
        // call axios to create the comment 

        axios.post('/comments' , {
            post: id,
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
        const id = url.slice(url.lastIndexOf('/')+1);

        // fetch the post information based on location
        setTimeout(() => {
            this.props.fetchComments(id);
            this.props.fetchPost(id)
        }, 500);

        setTimeout(() => {
            require("../js/blog.js");
        }, 500);
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        var commentsLst = this.props.state.comments;
        var post = this.props.state.currPost

        if (Object.keys(post).length === 0 && post.constructor === Object) { 
            return ( <div id="preloader">
                        <div id="loader" className={styles.dotsFade}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> )
        } else {
            var tags = post.tags.map((tag) => {
                return <a>{tag}</a>
            });

            const generateInitials = (author) => {
                let names = author.split(" ");
                let initials = ""
                names.forEach(e => {
                    initials += e[0].toUpperCase()
                });
                return initials
            }

        // see if we have comments
        if (commentsLst.length > 0) {

                var comments = commentsLst.map((comment) => { return (
                    
                    <Card style={{margin:'40px 0', padding:'0px 20px'}}>
                        <CardContent>
                        <li style={{margin:'40px 0'}} className={[styles.threadAlt,styles.depth1,styles.Comment].join(" ")}>

                            <div className={styles.commentAvatar}>
                                <Avatar style={{marginRight: 20, backgroundColor: generateColor() }}> {generateInitials(comment.name)} </Avatar>
                            </div>

                            <div className={styles.commentContent}>

                                <div className={styles.commentInfo}>
                                    <div className={styles.commentAuthor}>{comment.name}</div>

                                    <div className={styles.commentMeta}>
                                        <div className={styles.commentTime}> {timeConverter(comment.created_at)} </div>
                                    </div>
                                </div>

                                <div className={styles.commentText}>
                                    <p>{comment.message}</p>
                                </div>
                            </div>
                            </li>
                        </CardContent>
                    </Card>

                     );
                })
        } else {
            var comments = '';
        } return (
            
                <section className={[styles.sContent,styles.sContentTopPadding,styles.sContentNarrow].join(" ")}>

                    <Snackbar handleClose={this.handleClose} open={this.state.openSuccess} variant={'success'} message={"Thanks for posting the comment"} />
                    <Snackbar handleClose={this.handleClose} open={this.state.openError} variant={'error'} message={"You've got some errors on the comment form"} />

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
                                <li className={styles.date}>{post.date}</li>
                                <li className={styles.byline}>
                                    By {post.author}
                                </li>
                            </ul>
                        </div>
    
                        <div id="body" className={[styles.colFull,styles.entryMain].join(" ")}>
                            {this.insertBody(post)}
                            {this.formatCodeSnippets()}
                        </div>
    
                        <div className={styles.entryTaxonomies}>
                                <div className={styles.entryCat}>
                                    <h5>Posted In: </h5>
                                    <span className={styles.entryTaxList}>
                                        <span>{post.catagory}</span>
                                    </span>
                                </div> 
    
                                <div className={styles.entryTags}>
                                    <h5>Tags: </h5>
                                    <span className={[styles.entryTaxList,styles.entryTaxListPill].join(" ")}>
                                        {tags}
                                    </span>
                                </div> 
                            </div> 
    
                            <div className={styles.entryAuthor}>


                                <div className={styles.entryAuthorAbout}>
                                    <h5 className={styles.entryAuthorName}>
                                        <span>Posted by</span>
                                        <h2 style={{marginTop:0}}>Tekblg</h2>
                                    </h5>
    
                                    <div className={styles.entryAuthorDesc}>
                                        <p>
                                        Tekblg's team of engineers and writers provide you with
                                        high quality content in many different catagories relating 
                                        to the tech space ranging from instructional to motivational.
                                        Tell us what you thought about this post. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article> 
                    {/* <div className={styles.sContentEntryNav}>
                        <div className={[styles.row,styles.sContentNav].join(" ")}>
                            <div className={[styles.colSix,styles.sContentPrev].join(" ")}>
                                <a href="#0" rel="prev">
                                    <span>Previous Post</span>
                                    The Pomodoro Technique Really Works. 
                                </a>
                            </div>
                            <div className={[styles.colSix,styles.sContentNext].join(" ")}>
                                <a href="#0" rel="next">
                                    <span>Next Post</span>
                                    3 Benefits of Minimalism In Interior Design.
                                </a>
                            </div>
                        </div>
                    </div>  */}
                <div className={styles.commentsWrap}>
                    <div id="comments" className={styles.row}>
                        <div className={styles.colFull}>
                            <h3 className={styles.h2}>{(commentsLst.length > 0) ? commentsLst.length + ' Comments' : 'Be the first Comment'}</h3>
                            <ol style={{ display: (commentsLst.length > 0) ? '' : 'none' }} className={styles.commentlist}>
                                {comments}
                            </ol> 
                        </div> 
                    </div> 
    
                <div style={{padding:0}} className={[styles.row,styles.commentRespond].join(" ")}>
                    <div id="respond" className={styles.colFull}>
                        <h3 className={styles.h2}>Add Comment <span>Your email address will not be published</span></h3>
    
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
            </div> 
        </section> 
    
            )
        } 
    }
}

const mapStateToProps = state => (
    { state: state.BlogReducer }
)

export default connect(mapStateToProps, { fetchPost, fetchComments })(BlogPage);