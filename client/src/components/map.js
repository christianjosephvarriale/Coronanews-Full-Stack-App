import React, { Component, Fragment } from 'react';
import axios from 'axios'
import ReactGlobe from 'react-globe';
import Loader from './loader';
import { connect } from 'react-redux';
import TimelineIcon from '@material-ui/icons/Timeline';

function getTooltipContent(marker) {
  return `Region: ${marker.country}`;
}

class Globe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: null,
            marker: null,
        };
    }

    componentDidMount() {
        axios.get(`/meta`)
        .then((res) => {

            this.setState({
                markers: JSON.parse(res.data.markers) 
            })
            
        })
        .catch(console.error)
    }

    render() {

    const that = this;

    function onClickMarker(marker) {
        that.setState({ marker });
    }
    function onDefocus() {
        that.setState({ marker: null });
    }

    if ( this.state.markers ) {

        const { mobile } = this.props;
        return (
        
            <div>
                <div className={`zoomIn wow`} data-wow-duration="1s" data-wow-delay="1s" style={{ marginTop: 30, width: '100vw', height: '70vh' }}>
                    <ReactGlobe
                        markers={this.state.markers}
                        globeOptions={{
                            enableBackground: false,
                        }}

                        markerOptions={{
                        getTooltipContent,
                        }}
                        onClickMarker={onClickMarker}
                        onDefocus={onDefocus}
                    />
                    </div>
                    <div
                    className={'card'}
                    style={{
                        fontSize: 20,
                        padding: 10,
                        width: '90%',
                        maxWidth: 400,
                        margin: 'auto',
                        marginTop: 50,
                        position: mobile ? 'relative' : 'absolute',
                        left: mobile ? null : 30,
                        top: mobile ? null : 150,
                    }}>
                        {this.state.marker ?  
                            <div style={{padding: 10}}>
                                <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.125)',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                                    <TimelineIcon style={{ fontSize: 60, fill: '#871f78' }} />
                                    <h1 style={{marginTop: 0,fontWeight: 300, textTransform: 'capitalize',padding: 0,textAlign:'center'}}>{this.state.marker.country}</h1>
                                </div>
                                <div style={{padding: '20px 0 0'}}>

                                <p>Cases: <span style={{float: 'right'}}>{this.state.marker.cases.trim() == '' ? 'N/A' : this.state.marker.cases}</span></p>
                                <p>Cases Trend: <span style={{float: 'right'}}>{this.state.marker.casesTrend.trim() == '' ? 'N/A': this.state.marker.casesTrend}</span></p>
                                <p>Deaths: <span style={{float: 'right'}}>{this.state.marker.deaths.trim() == '' ? 'N/A' : this.state.marker.deaths}</span></p>
                                <p>Deaths Trend: <span style={{float: 'right'}}>{this.state.marker.deathsTrend.trim() == '' ? 'N/A' : this.state.marker.deathsTrend}</span></p>

                                </div>
                            </div>
                        : <Fragment>  
                            <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.125)',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                            <TimelineIcon style={{ fontSize: 60, fill: '#871f78' }} />
                            <h1 style={{marginTop: 0, fontWeight: 300, textTransform: 'capitalize',padding: 0,textAlign:'center'}}>No Region Selected</h1>
                            </div>
                                <p style={{padding: 20, textAlign: 'center', margin: 0}}>
                                    Select a region to get a breakdown<br/>
                                </p>
                            </Fragment>
                        } 
                    </div>
            </div>
            );
        } else {
            return (
                <Loader />
            )
        }
    
    }
}

const mapStateToProps = state => (
    { 
        mobile: state.AppReducer.mobile
    }
)

export default connect(mapStateToProps, {})(Globe);