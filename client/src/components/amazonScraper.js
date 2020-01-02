import React, { Component } from 'react';
import TextInput from './textInput';
import Button from './button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Loader from './loader';
import tutorialVid from '../img/tutorialVid.mp4'

const styles = {
    container: {
      width: '90%',
      marginTop: '150px',
      margin: 'auto'
    },
    vidContainer : {
      margin: '5% 0px',
      width:'100%',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    margin : {
      margin: 20
    },
    buttonPositioning : {
      display: 'flex',
      justifyContent: 'center',
      padding: 30
    },
  };  

class AmazonScraper extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        url: 'https://www.amazon.com/Compression-Medical-Nursing-Socks-Running-Fitness-15-20mmHg/product-reviews/B079RBNMXR/ref=cm_cr_dp_d_show_all_top?ie=UTF8&reviewerType=all_reviews',
        loading: false,
      };
    }

    handleSubmit = () => {
      document.getElementById("paypal").submit();
    }

    handleChange = url => event => {
        this.setState({
            [url]: event.target.value
        });
    };

    handleScrape = () => {
        this.setState({
           loading: true
         })
          axios.post('http://localhost:3001/scripts/amazon' , {
              url: this.state.url,
          })
          .then(response => {

            var blob = new Blob([response.data], {type: "application/csv"});
            var url  = window.URL.createObjectURL(blob);
            
            var element = document.createElement('a');
            element.setAttribute('download', 'comments.csv');
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
        } else {
            return ( 
                <div className={classes.container}>  
                    <p className={classes.margin}>
                      Enter a url to scrape amazon for all comment information
                    </p>
                    <TextInput handleChange={this.handleChange} name={'url'} value={this.state.url} />
                    <Button label={'Scrape'} handleClick={this.handleScrape}/>
                    
                    <p> Below is a walkthrough on how to use the application</p>

                    <video className={classes.vidContainer} muted="true" autoplay="true" loop="true">
                      <source src={tutorialVid} type="video/mp4" />
                    </video>

                    <p> Although the application is free, there is a cost for the maintenance of this great application. Any donations are appreciated. Sincerely, the Varritech Team </p>

                    <form id="paypal" className={classes.buttonPositioning} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="KU96VMCNZELB6" />
                    <Button handleClick={this.handleSubmit} label={'donate'}/>
                    </form>



                </div>
            )
        }
    }
}

export default withStyles(styles)(AmazonScraper);
