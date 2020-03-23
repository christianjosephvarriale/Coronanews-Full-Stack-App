import React, { Component } from 'react';
import Button from './button'
import Snackbar from './snackbar';
import Textfield from './textInput';
import axios from 'axios';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import corona from '../img/coronavirus.jpg'
import AutoSelect from './autoselect';
import { toggleSubscriptionState } from '../actions/pageActions';
import '../lib/ionicons/css/ionicons.min.css';
import logo from '../img/logo/virus.png';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
}

const suggestions = [
    { label : 'Canada', value : 'ca' },
    { label : 'United States', value : 'us' },
    { label : 'Germany', value : 'de' },
    { label : 'Italy', value : 'it' },
    { label : 'Austria', value : 'at' },
    { label : 'France', value : 'fr' },
    { label : 'Netherlands', value : 'nl' },
    { label : 'Switzerland', value : 'cl' },
    { label : 'United Kingdom', value : 'gb' },

  ].map(suggestion => ({
    value: suggestion.value,
    label: suggestion.label,
  }));

export class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openSuccess: false,
            openError: false,
            email: '',
            emailError: false,
            selectedCountries: [],
            countriesError: false
          };
    }
    /**
     * Des: sets the cookie to have subscribed=true; 
     * @param none
     * @return none
    */
    setCookie = () => {
        // Build the expiration date string:
        var expiration_date = new Date();
        var cookie_string = '';
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        // Build the set-cookie string:
        cookie_string = "subscribed=true; path=/; expires=" + expiration_date.toUTCString();
        // Create or update the cookie:
        document.cookie = cookie_string;
    }

    handleChangeMulti = (array) => {

        if (array) {
          var countryList = array.map(country => country.value);
        }
        
         this.setState({
            selectedCountries: countryList
         })
  
    }

    handleSubmit = async (e) => {
        console.log('called submit form')
        e.preventDefault();

        // see if the email is in error
        if (validateEmail(this.state.email)) {

            // set the error state
            this.setState({
                emailError: true,
                openError: true
            });
        } else { /* no errors are reported, sent off the contact email */

            try {
                const res = await axios.post('/subscribers', { address: this.state.email, countries: this.state.selectedCountries.length === 0 ? 'all' : this.state.selectedCountries });
                console.log(res.data);
            } catch (err) {
                throw Error(err);
            }

            this.setState({
                email: '',
                openSuccess: true,
                emailError:false,
            })

            // toggle the state of the dialog
            this.props.toggleSubscriptionState()

            // add cookie
            this.setCookie()
        }
    }

    handleChange = name => event => {

        this.setState({
            [name]: event.target.value
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        // close the modal
        this.props.toggleSubscriptionState();
    
        this.setState({
            openSuccess: false,
            openError: false
        })
    }

    render() {
        const { open } = this.props.state;
        console.log('called')
        return (
            <section>
                <Snackbar handleClose={this.handleClose} open={this.state.openSuccess} variant={'success'} message={"Thanks for signing up! We'll reach out soon"} />
                <Snackbar handleClose={this.handleClose} open={this.state.openError} variant={'error'} message={"You've got some errors on the page"} />

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">    
                    <div style={{padding:'40px 40px 20px 40px'}}>
                        <img src={corona} />
                        <h2 style={{paddingTop:20}} id="form-dialog-title">Subscribe to Corona Virus breaking news</h2>
                        <ul style={{margin:0}}>
                            <li style={{display:'flex'}}> <img src={logo} style={{width:20,height:20,marginTop:5,marginRight:15}} /><p> Please enter your email address here and select countries to monitor. </p> </li>
                            <li style={{display:'flex'}}> <img src={logo} style={{width:20,height:20,marginTop:5,marginRight:15}} /><p> We will send you breaking news over the last 24 hours from high quality news sources </p> </li>
                        </ul>
                        <Textfield helperText={(this.state.emailError) ? 'Please fill out your email' : ''} error={this.state.emailError} name={'email'} value={this.state.email} handleChange={this.handleChange} />
                        <AutoSelect suggestions={suggestions} label={'Countries'} placeholder={'Select countries to monitor. default: all'} handleChangeMulti={this.handleChangeMulti} multi={this.stateselectedCountries} />

                        <DialogActions>
                        <div class="text-center"><Button handleClick={this.handleSubmit} label={'Subscribe'}/></div>
                        <div class="text-center"><Button handleClick={this.handleClose} label={'Cancel'}/></div>
                        </DialogActions>
                    </div>
                </Dialog>
            </section>
        )
    };
};

const mapStateToProps = state => (
    { state: state.PageReducer }
)

export default connect(mapStateToProps, { toggleSubscriptionState })(Subscription);