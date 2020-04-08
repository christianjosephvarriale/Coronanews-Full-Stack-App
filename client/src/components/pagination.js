import * as React from 'react';
import styles from '../css/blog.module.css';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 

class Pagination extends React.Component {
  render() {
    const props = this.props;
    const url = window.location.href;
    let currentPage = url.slice(url.lastIndexOf('/')+1).replace(/\D/g,'');
    let countryFlag = false;
    let country = '';
    const countries = ['/canada/','/united-states/','/germany/','/italy/','/united-kingdom/','/france/','/netherlands/','/austria/','/switzerland/']
    for (let i=0; i < countries.length; i++) {
        if (url.includes(countries[i])) {
            countryFlag = true;
            country = countries[i];
            break; 
        }
    }
    
    let backDisabled = false;
    let forwardDisabled = false;

    const totalPages = Math.floor(props.total / 12) + 1;


    // on the first set of pages
    if ( Math.floor((currentPage-1) / 5) == 0 ) {
        backDisabled = true;
    }

    // on the last set of pages
    if ( totalPages - (Math.floor((currentPage-1) / 5) * 5) <= 5) {
        forwardDisabled = true;
    }

    console.log(Math.floor((totalPages - currentPage) / 5),forwardDisabled, backDisabled)

    const STARTING_INDEX = (Math.floor((currentPage-1) / 5) * 5);
    const END_INDEX = STARTING_INDEX + 5;
    const pageArray = [...Array(totalPages + 1).keys()].slice(1,).slice(STARTING_INDEX,END_INDEX)

    const pageElements = pageArray.map((pageNumber) => {
        if (pageNumber == currentPage) {
            return  <li><span className={[styles.pgnNum,styles.current].join(" ")}>{pageNumber}</span></li>
        } else {
            return <li><Link className={styles.pgnNum} to={`${pageNumber}`}>{pageNumber}</Link></li>
  
        }
    })

    let back;
    if (!backDisabled) {
        back = <li><Link className={styles.pgnPrev} to={`${(parseInt(currentPage) - 5)}`}>Prev</Link></li>
    }

    let forward;
    if (!forwardDisabled) {
        forward = <li><Link className={styles.pgnNext} to={`${((totalPages - currentPage > 5) ? parseInt(currentPage) + 5 : totalPages)}`} >Next</Link></li>
    }

    return (
        <div className={[styles.row,styles.paginationWrap].join(" ")}>
            <div className={styles.colFull}>
                <Router forceRefresh="true">
                    <nav className={styles.pgn}>
                        <ul>
                            {back}
                            {pageElements}
                            {forward}
                        </ul>
                        <div>showing elements {(parseInt(currentPage-1) * 12) + 1} - {(((parseInt(currentPage) * 12) + 1) > props.total) ? props.total : ((parseInt(currentPage) * 12) + 1)} out of {props.total}</div>
                    </nav>
                </Router>
            </div>
        </div>
    );
  };
};

export default Pagination