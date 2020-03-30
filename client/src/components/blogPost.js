import React, { Component } from 'react';
import styles from '../css/blog.module.css';
import '../css/slick-slider.css';
import '../css/vendor.css'
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 

class BlogPost extends Component {

    render() {
        const props = this.props;
        const date = new Date(props.date);

        let title = props.title
        if ( title.length > 100 ) { /* truncate the length for readability */
            title = title.slice(0, 100) + '...'
        } 

        const escaped_title = props.title.replace('.','&#46;')

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

        if (!props.url) {
            return null
        } else {
            return (
                <Router forceRefresh="true">
                    <article className={styles.colBlock}>  
                        <div className={styles.itemEntry} data-aos="zoom-in">
                            <div className={styles.itemEntryThumb}>
                                <NavLink to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`} className={styles.itemEntryThumbLink}>
                                    <img src={props.headerImg} alt=""/>
                                </NavLink>
                            </div> 
                            <div className={styles.itemEntryText}>
                                <div className={styles.itemEntryCat}>
                                    <NavLink to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`}>{countryMap[props.region]}</NavLink>
                                </div>
                                <h1 className={styles.itemEntryTitle}><NavLink to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`}>{title}</NavLink></h1>
                                <div className={styles.itemEntryDate}>
                                    <NavLink to={`/coronavirus/news/${countryMap[props.region]}/articles/${encodeURI(escaped_title)}`} role="menuitem">{date.toDateString()}</NavLink>
                                </div>
                            </div>
                        </div> 
                    </article> 
                </Router>
            )
        }
    }
}

export default BlogPost;