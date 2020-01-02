import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import AutoSelect from './autoselect';
import { withStyles } from '@material-ui/core/styles';
import Button from './button';
import Loader from './loader';
const FileDownload = require('js-file-download');


const styles = {
  container: {
    width: '90%',
    marginTop: '150px',
    margin: 'auto'
  },
};


class YahooScraper extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        selectedTickers: [],
        loading: false
      };
    }

    handleChangeMulti = (array) => {

      if (array) {
        var tickerList = array.map(ticker => ticker.value);
      }
      
       this.setState({
          selectedTickers: tickerList
       })

    }

    handleScrape = () => {
      this.setState({
         loading: true
       })
       
        axios.post('http://localhost:3001/scripts/yahoo' , {
            tickers: this.state.selectedTickers,
        })
        .then(response => {

            var blob = new Blob([response.data], {type: "application/zip"});
            var url  = window.URL.createObjectURL(blob);
            
            var element = document.createElement('a');
            element.setAttribute('download', 'zipFile.zip');
            element.setAttribute('target', '_blank');
            element.setAttribute('href', url);
            element.click();
          
          this.setState({
            loading: false
          })
        })
        .catch(error => console.log(error))
    }

    render() {
      
        const { classes } = this.props;
        if (this.state.loading) {
          return (
            <div className={classes.container}>
              <p> We are Loading Some awesome data for you </p>
              <Loader />
            </div> 
            
          )
        }
        else {
          return ( 
            <div className={classes.container}>  
                <p>
                  Select from the list of tickers to scrape Yahoo Finance Real time
                </p>
                <AutoSelect multi={this.stateselectedTickers} handleChangeMulti={this.handleChangeMulti} />
                <Button label={'Scrape'} handleClick={this.handleScrape}/>
            </div>
                )
            }
        }
    }



export default withStyles(styles)(YahooScraper);
