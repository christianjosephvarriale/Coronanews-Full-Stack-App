import React, { Component } from 'react';
import LandingPage from './components/landingPage';
import Blog from './components/blog.js';
import BlogPage from './components/blogPage.js';
import NavBar from './components/navBar.js';
import AmazonScraper from '../src/components/amazonScraper.js';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from '../src/components/footer'
import './App.css';
import { toggleMobile } from './actions/appActions.js'
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    // event listeners
    window.addEventListener('resize', this.checkWindowDimensions);

    if ( window.innerWidth < 901 && !this.props.mobile ){
      this.props.toggleMobile('ON');
    } else if ( window.innerWidth >= 901 && this.props.mobile ){
      console.log(`called update`);
      this.props.toggleMobile('OFF');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWindowDimensions);
  }

  checkWindowDimensions = () => {
    // call a re-render upon resizing
    if ( window.innerWidth < 901 && !this.props.mobile ){
      this.props.toggleMobile('ON');
    } else if ( window.innerWidth >= 901 && this.props.mobile ){
      console.log(`called update`);
      this.props.toggleMobile('OFF');
    }
  }

  render() {

          return (
            <main>
              <NavBar />
              <Router forceRefresh="true">
                <Switch>
                  <Route path='/blog/page/:pageId' component={Blog} />
                  <Route path="/blog/post/:blogId" component={BlogPage} />
                </Switch>
              </Router>
              <Footer />
            </main>
          );

    }
}

const mapStateToProps = state => (
  { mobile: state.AppReducer.mobile }
)

export default connect(mapStateToProps, { toggleMobile })(App);
