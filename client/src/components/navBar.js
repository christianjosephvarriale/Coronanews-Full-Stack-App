/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import logo from '../img/logo/virus.png';

import '../css/main.css';
import Button from './button';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 

import Subscription from './subscription';
import { connect } from 'react-redux';
import { toggleSubscriptionState } from '../actions/pageActions';
import LegoLoader from './legoLoader';
import ComingSoon from './comingSoon';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        // bindings
    }
    
    componentWillUnmount() {
        // Unbind listener
        this.backListener();
    }

    componentDidMount() {

        setTimeout(() => {
            // wait for loader to finish
            require("../js/navbar.js");
        }, 4000);
        
        
        // if the proper cookie tag is not set then show subscribe modal
        // if (!document.cookie.includes('subscribed=true')) {
        //     this.props.toggleSubscriptionState();
        // }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.state.PageReducer.open !== this.props.state.PageReducer.open) {
          this.forceUpdate();
        }

        if (prevProps.state.AppReducer.loading !== this.props.state.AppReducer.loading) {
            this.forceUpdate();
          }
    }

    handleSubmit = () => {
        document.getElementById("paypal").submit();
    }

    render(){
        const { loading } = this.props.state.AppReducer;
        const { mobile } = this.props.state.AppReducer

        // conditionally render header text
        let headerText;
        if (!mobile) {
            headerText = <h1>Corona News</h1>
        }

        if (loading) {
            return (
                <LegoLoader />
            )
        } else {
        return (
            <Router forceRefresh="true">

                <Subscription />
                
                <header id="header" class="s-header header">
                <a class="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>

                <div id="logo" class="pull-left">
                        <Link to="/">
                            <img style={{ height: '40px' }} src={logo} alt="Varritech logo" title="Varritech" />
                        </Link>    
                        {headerText}
                </div>

                <nav class="header__nav-wrap">

                <h2 class="header__nav-heading h6">Navigate to</h2>

                <ul class="header__nav">
                
                <li role="menuitem"><a href="" onClick={(e) => { e.preventDefault(); this.props.toggleSubscriptionState() }}>Subscribe</a></li>
                
                <li class="has-children">
                    <a href="" title="">Countries</a>
                    <ul class="sub-menu">  
                        <li role="menuitem"><NavLink to="/coronavirus/news/canada/1" role="menuitem">Canada</NavLink></li>     
                        <li role="menuitem"><NavLink to="/coronavirus/news/united-states/1" role="menuitem">US</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/germany/1" role="menuitem">Germany</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/italy/1" role="menuitem">Italy</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/austria/1" role="menuitem">Austria</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/france/1" role="menuitem">France</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/netherlands/1" role="menuitem">Netherlands</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/switzerland/1" role="menuitem">Switzerland</NavLink></li>
                        <li role="menuitem"><NavLink to="/coronavirus/news/united-kingdom/1" role="menuitem">United Kingdom</NavLink></li>
                    </ul>
                </li>
                <li role="menuitem">
                    <form id="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="KU96VMCNZELB6" />
                        <Button handleClick={this.handleSubmit} label={'Donate'}/>
                    </form>
                </li>

                {/* <li role="menuitem"><a href="#about">About</a></li>
                <li role="menuitem"><a href="#features">Features</a></li>
                <li role="menuitem"><a href="#pricing">Pricing</a></li>
                <li role="menuitem"><a href="#team">Team</a></li>
                <li role="menuitem"><a href="#gallery">Gallery</a></li>
                <li role="menuitem"><a href="#contact">Contact</a></li>

                <li role="menuitem"><NavLink to="/blog/page/1" role="menuitem">Blog</NavLink></li>
                <li class="has-children">
                    <a href="#0" title="">Products</a>
                    <ul class="sub-menu">       
                        <li><NavLink to="/amazonTool" role="menuitem">Amazon</NavLink></li>
                        <li><NavLink to="/yahooTool" role="menuitem">Yahoo</NavLink></li>
                    </ul>
                </li> */}
                </ul> 

                <a href="#0" title="Close Menu" class="header__overlay-close close-mobile-menu">Close</a>

                </nav> 
                </header>
            </Router>    
            );
        }
    }
}

const mapStateToProps = state => (
    { state: state }
)

export default connect(mapStateToProps, { toggleSubscriptionState })(NavBar);