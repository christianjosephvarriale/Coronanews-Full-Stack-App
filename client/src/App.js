import React, { Component } from 'react';
import LandingPage from './components/landingPage';
import Blog from './components/blog.js';
import BlogPage from './components/blogPage.js';
import NavBar from './components/navBar.js';
import AmazonScraper from '../src/components/amazonScraper.js';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Footer from '../src/components/footer'
import './App.css';
import { toggleMobile } from './actions/appActions.js'
import { connect } from 'react-redux';
import Page404 from './components/404.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import TermsOfUse from './components/TermsOfUse.js';

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
                  <Route path="/coronavirus/news/:country/articles/:title" component={BlogPage} />
                  <Route path="/coronavirus/news/:country/page/:page" component={Blog} />
                  <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                  <Route exact path="/terms-of-use" component={TermsOfUse} />
                  <Route exact path='/'>
                    <Redirect to="/coronavirus/news/all-countries/page/1" />
                  </Route>
                  <Route path="/404" component={Page404} />
                  <Redirect to="/404" />
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
