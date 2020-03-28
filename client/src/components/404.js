// @flow
import * as React from 'react';
import page from '../img/404.png';
import { connect } from 'react-redux';
import { toggleLoader } from '../actions/appActions';

class Page404 extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.toggleLoader('OFF');
        }, 5000)
    }
  render() {
    const { props } = this;
    const { loading } = props;
    if (loading) {
        return (
            null
        )
    } else {
    return (
        <div>
            <div style={{padding:30, marginTop: 60,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <h1>Oops, you've got a 404 Error</h1>
                <p style={{margin:0}}>Send us a message and let us know what you were looking for</p>
            </div>
            <img src={page} />
        </div>
        );
    }
  };
};


const mapStateToProps = state => ({
    loading: state.AppReducer.loading,
    mobile: state.AppReducer.mobile
})

export default connect(mapStateToProps, { toggleLoader })(Page404);