import React, { Component } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import '../css/vendor.css'

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';

class BlogPost extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.id)
    }
    render() {
        const props = this.props.state.currPost;
        return (
            <article className={styles.colBlock}>  
                <div className={styles.itemEntry} data-aos="zoom-in">
                    <div className={styles.itemEntryThumb}>
                        <NavLink to={'/blog/post/' + props.id} className={styles.itemEntryThumbLink}>
                            <img src={props.headerImg} alt=""/>
                        </NavLink>
                    </div> 
                    <div className={styles.itemEntryText}>
                        <div className={styles.itemEntryCat}>
                            <NavLink to={'/blog/post/' + props.id}>{props.catagory}</NavLink>
                        </div>
                        <h1 className={styles.itemEntryTitle}><NavLink to={'/blog/' + props.id}>{props.title}</NavLink></h1>
                        <div className={styles.itemEntryDate}>
                            <NavLink to={'/blog/post/' + props.id} role="menuitem">{props.date}</NavLink>
                        </div>
                    </div>
                </div> 
            </article> 
        )
    }
}

const mapStateToProps = state => (
    { state: state.BlogReducer }
)

export default connect(mapStateToProps, { fetchPost })(BlogPost);