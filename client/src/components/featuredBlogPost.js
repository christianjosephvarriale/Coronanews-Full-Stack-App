import React, { Component } from 'react';
import '../css/slick-slider.css';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 
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
            const date = new Date(state.date);

            let title = state.title
            if ( title.length > 100 ) { /* truncate the length for readability */
                title = title.slice(0, 100) + '...'
            } 

            const escaped_title = state.title.replace('.','&#46;')

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
                <Router forceRefresh="true">
                    <div className={'featured-slide'}>
                        <div className={'entry'}>
                            <div className={'entry-background'} style={{ backgroundImage: 'url(' + headerImg + ')' }}></div>
                            
                            <div className={'entry-content'}>
                                <span className={'entry-category'}><NavLink to={`/coronavirus/news/${countryMap[state.region]}/articles/${encodeURI(escaped_title)}`}> {state.region} </NavLink> </span>

                                <h1><NavLink to={`/coronavirus/news/${countryMap[state.region]}/articles/${encodeURI(escaped_title)}`}>{title}</NavLink></h1>

                                <div className={'entry-info'}>
                                    <NavLink to={`/coronavirus/news/${countryMap[state.region]}/articles/${encodeURI(escaped_title)}`} className={'entry-profile-pic'}>
                                        <Avatar style={{backgroundColor: generateColor() }}> {generateInitials()} </Avatar>
                                    </NavLink>
                                    <ul className={'entry-meta'}>
                                        <li><NavLink to={`/coronavirus/news/${countryMap[state.region]}/articles/${encodeURI(escaped_title)}`}>{author}</NavLink></li>
                                        <li>{date.toDateString()}</li>
                                    </ul>
                                </div>
                            </div> 
                        </div> 
                    </div> 
                </Router>
            )
        }
    }
}

const mapStateToProps = state => (
    { state: state.BlogReducer.currPost }
)

export default connect(mapStateToProps, { fetchPost })(FeaturedBlogPost);