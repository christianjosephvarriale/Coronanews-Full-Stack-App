import React, { Component } from 'react';
import '../css/slick-slider.css';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';

import Skeleton from '@material-ui/lab/Skeleton';

const colorArray = ['#283593','#c62828', '#0277BD', '#00695C', '#558B2F', '#F9A825', '#EF6C00', '#4E342E', '#37474F'];

const generateColor = () => { return colorArray [ Math.round(Math.random() * (colorArray.length - 1)) ] }

class FeaturedBlogPost extends Component {
    render() {
        const state = this.props;

        // data hasn't arrived
        if (Object.keys(state).length === 0 && state.constructor === Object) {
            return ( <Skeleton variant="rect" width={210} height={118} /> )
        } else {
            const headerImg = state.headerImg;
            let author;
            if (!state.author) {
                author = 'Corona News'
            } else {
                author = state.author;
            }
            const generateInitials = () => {
                try {
                    let names = author.split(" ");
                    let initials = ""
                    names.forEach(e => {
                        initials += e[0].toUpperCase()
                    });
                    return initials
                } catch (error) {
                    console.log('yikes')
                }
            }
            return (
                <div className={'featured-slide'}>
                    <div className={'entry'}>
                        <div className={'entry-background'} style={{ backgroundImage: 'url(' + headerImg + ')' }}></div>
                        
                        <div className={'entry-content'}>
                            <span className={'entry-category'}><a href={state.url}> {state.region} </a> </span>

                            <h1><a href={state.url}>{state.title}</a></h1>

                            <div className={'entry-info'}>
                                <a href={state.url} className={'entry-profile-pic'}>
                                    <Avatar style={{backgroundColor: generateColor() }}> {generateInitials()} </Avatar>
                                </a>
                                <ul className={'entry-meta'}>
                                    <li><a href={state.url}>{author}</a></li>
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