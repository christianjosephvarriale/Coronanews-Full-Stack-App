import React, { Component } from 'react';
import Button from './button'
import Snackbar from './snackbar';
import Textfield from './textInput';
import axios from 'axios';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { toggleSubscriptionState } from '../actions/pageActions';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
}

export class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openSuccess: false,
            openError: false,
            email: '',
            emailError: false,
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

    handleSubmit = e => {
        console.log('called submit form')
        e.preventDefault();

        // see if the email is in error
        if (validateEmail(this.state.email)) {
            
            // set the error state
            this.setState({
                emailError: true,
                openError: true
            });

        } else {
            // no errors are reported, sent off the contact email
            const bodyFormData = new FormData();
            bodyFormData.set('EMAIL', this.state.email);
            bodyFormData.set('b_02be227eb8d0b055f158fcbe1_4e44f0be3d',null);
            bodyFormData.set('subscribe','Subscribe');

            axios({
                url: 'https://cors-anywhere.herokuapp.com/https://tekblg.us4.list-manage.com/subscribe/post?u=02be227eb8d0b055f158fcbe1&amp;id=4e44f0be3d', 
                data: bodyFormData,
                method: 'post'
            })
            .then(response => {
                console.log(response.data);
    
                this.setState({
                    email: '',
                    openSuccess: true,
                    emailError:false,
                })

                // toggle the state of the dialog
                this.props.toggleSubscriptionState()

                // add cookie
                this.setCookie()
            })
            .catch(error => console.log(error))
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
                    <div style={{padding:'0 40px 20px 40px'}}>
                        <h2 id="form-dialog-title">Subscribe</h2>
                        <p> To subscribe to this website, please enter your email address here. We will send updates
                            occasionally. </p>
                        <Textfield helperText={(this.state.emailError) ? 'Please fill out your email' : ''} error={this.state.emailError} name={'email'} value={this.state.email} handleChange={this.handleChange} />
                        
                        <DialogActions>
                        <div class="text-center"><Button handleClick={this.handleSubmit} label={'Subscribe'}/></div>
                        <div class="text-center"><Button handleClick={this.handleClose} label={'Cancel'}/></div>
                        </DialogActions>
                    </div>
                </Dialog>
   
                {/* <div id="mc_embed_signup">
                <form action="https://webhook.site/d358d128-e7a6-49cd-bf4b-5cbdefd9eeab" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                    <label for="mce-EMAIL">Subscribe</label>
                    <input type="email" value="coolemail@email.com" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required />
                    <div aria-hidden="true"><input type="text" name="b_02be227eb8d0b055f158fcbe1_4e44f0be3d" tabindex="-1" value=""/></div>
                    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" /></div>
                    </div>
                </form>
                </div> */}
            </section>
        )
    };
};

const mapStateToProps = state => (
    { state: state.PageReducer }
)

export default connect(mapStateToProps, { toggleSubscriptionState })(Subscription);