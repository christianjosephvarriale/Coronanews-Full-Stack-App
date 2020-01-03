import React, { Component } from 'react';
import LandingPage from './components/landingPage';
import Blog from './components/blog.js';
import BlogPage from './components/blogPage.js';
import NavBar from './components/navBar.js';
import AmazonScraper from '../src/components/amazonScraper.js';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from '../src/components/footer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }


  render() {

          return (
            <main>
              <NavBar />
              <Router forceRefresh="true">
                <Switch>
                  <Route exact path='' component={LandingPage} />
                  <Route exact path='/amazonTool' component={AmazonScraper} />
                  <Route path='/blog/page/:pageId' component={Blog} />
                  <Route path="/blog/post/:blogId" component={BlogPage} />
                </Switch>
              </Router>
              <Footer />
            </main>
          );

    }
}

export default App;
