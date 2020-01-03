/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import logo from '../img/logo/companyLogoV2.png';

import '../css/main.css';
import Button from './button';
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom"; 



class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        // bindings
    }
    componentDidMount() {
        require("../js/navbar.js");
    }

    handleSubmit = () => {
        document.getElementById("paypal").submit();
    }

    render(){
        return (
            <Router forceRefresh="true">
                <header id="header" class="s-header header">

                <a class="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>

                <div id="logo" class="pull-left">
                        <Link to="/">
                            <img style={{ height: '40px' }} src={logo} alt="Varritech logo" title="Varritech" />
                        </Link>    
                        <h1>Tekblg</h1>
                </div>

                <nav class="header__nav-wrap">

                <h2 class="header__nav-heading h6">Navigate to</h2>

                <ul class="header__nav">
                
                <li role="menuitem"><NavLink to="/blog/page/1" role="menuitem">Blog</NavLink></li>
                <form id="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="KU96VMCNZELB6" />
                    <Button handleClick={this.handleSubmit} label={'Donate'}/>
                </form>

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
export default NavBar;