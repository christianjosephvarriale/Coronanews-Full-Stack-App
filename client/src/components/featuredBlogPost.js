import React, { Component } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import { NavLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';

import Skeleton from '@material-ui/lab/Skeleton';

const colorArray = ['#283593','#c62828', '#0277BD', '#00695C', '#558B2F', '#F9A825', '#EF6C00', '#4E342E', '#37474F'];

const generateColor = () => { return colorArray [ Math.round(Math.random() * (colorArray.length - 1)) ] }

class FeaturedBlogPost extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.id)
    }
    render() {
        const props = this.props;
        const state = props.state;

        // data hasn't arrived
        if (Object.keys(state).length === 0 && state.constructor === Object) {
            return ( <Skeleton variant="rect" width={210} height={118} /> )
        } else {
            const headerImg = state.headerImg;
            const generateInitials = () => {
                let names = state.author.split(" ");
                let initials = ""
                names.forEach(e => {
                    initials += e[0].toUpperCase()
                });
                return initials
            }
            return (
                <div className={'featured-slide'}>
                    <div className={'entry'}>
                        <div className={'entry-background'} style={{ backgroundImage: 'url(' + headerImg + ')' }}></div>
                        
                        <div className={'entry-content'}>
                            <span className={'entry-category'}><NavLink to={'/blog/post/' + state.id}> {state.catagory} </NavLink> </span>

                            <h1><NavLink to={'/blog/post/' + state.id}>{state.title}</NavLink></h1>

                            <div className={'entry-info'}>
                                <NavLink to={'/blog/post/' + state.id} className={'entry-profile-pic'}>
                                    <Avatar style={{backgroundColor: generateColor() }}> {generateInitials()} </Avatar>
                                </NavLink>
                                <ul className={'entry-meta'}>
                                    <li><NavLink to={'/blog/post/' + state.id}>{state.author}</NavLink></li>
                                    <li>{state.date}</li>
                                </ul>
                            </div>
                        </div> 
                    </div> 
            </div> 
            )
        }
    }
}

const mapStateToProps = state => (
    { state: state.BlogReducer.currPost }
)

export default connect(mapStateToProps, { fetchPost })(FeaturedBlogPost);