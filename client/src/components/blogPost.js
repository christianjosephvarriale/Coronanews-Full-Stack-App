import React, { Component } from 'react';

import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import '../css/vendor.css'

import { NavLink } from 'react-router-dom';

class BlogPost extends Component {

    render() {
        const props = this.props;
        debugger;
        if (!props.url) {
            return null
        } else {
            return (
                <article className={styles.colBlock}>  
                <div className={styles.itemEntry} data-aos="zoom-in">
                    <div className={styles.itemEntryThumb}>
                        <a href={props.url} className={styles.itemEntryThumbLink}>
                            <img src={props.headerImg} alt=""/>
                        </a>
                    </div> 
                    <div className={styles.itemEntryText}>
                        <div className={styles.itemEntryCat}>
                            <a href={props.url}>{props.catagory}</a>
                        </div>
                        <h1 className={styles.itemEntryTitle}><a href={props.url}>{props.title}</a></h1>
                        <div className={styles.itemEntryDate}>
                            <a href={props.url} role="menuitem">{props.date}</a>
                        </div>
                    </div>
                </div> 
            </article> 
            )
        }
    }
}

export default BlogPost;