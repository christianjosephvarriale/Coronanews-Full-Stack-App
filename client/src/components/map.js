import ReactTooltip from 'react-tooltip';
import React, { Component} from 'react';

import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps"
import chroma from "chroma-js"
import {scaleLinear} from "d3-scale"
import Loader from './loader'
import axios from 'axios'

const colorScale = chroma
    .scale([
        '#FF6E40',
        'FFD740',
        '#00B8D4',
    ])
    .mode('lch')
    .colors(24)

const subregions = [
    "Southern Asia",
    "Polynesia",
    "Micronesia",
    "Southern Africa",
    "Central Asia",
    "Melanesia",
    "Western Europe",
    "Central America",
    "Seven seas (open ocean)",
    "Northern Africa",
    "Caribbean",
    "South-Eastern Asia",
    "Eastern Africa",
    "Australia and New Zealand",
    "Eastern Europe",
    "Western Africa",
    "Southern Europe",
    "Eastern Asia",
    "South America",
    "Middle Africa",
    "Antarctica",
    "Northern Europe",
    "Northern America",
    "Western Asia",
]

const scale = scaleLinear()
    .domain([0, 100, 1000, 10000, 100000, 500000])
    .range(["#e6e4e1", "#bdbcbb", "#949291", "#636261", "#3b3a39", "#37474F"])


class VecMap extends Component {
    constructor() {
        super()
        this.state = {
            toolTip: "",
            meta: null
        }
    }

    componentDidMount() {
        axios.get(`/meta`)
        .then((res) => {
            this.setState({
                meta: JSON.parse(res.data.world_map)
            })
        })
        .catch(console.error)
    }

    setTooltipContent = (toolTip) => {
        this.setState({toolTip})
    }

    render() {
        debugger;
        if ( this.state.meta ) {
        return (
            <div 
                data-wow-duration="1s" 
                data-wow-delay="1s"
                className={'zoomIn wow'}>

                <ComposableMap
                    projectionConfig={{
                        scale: 205,
                        rotation: [-11, 0, 0],
                    }}
                    width={980}
                    height={651}
                    style={{
                        width: "100%",
                        height: "auto",
                        marginTop: 60
                    }}
                >
                    <Geographies
                            geography={this.state.meta}
                            disableOptimization
                        >
                            {(geographies, projection) =>
                                geographies.map((geography, i) => (
                                    <Geography

                                        data-tip 
                                        data-for='map'
                                        key={`${geography.properties.iso_a3}-${i}`}
                                        cacheId={`${geography.properties.iso_a3}-${i}`}
                                        geography={geography}
                                        projection={projection}
                                        onClick={this.handleClick}
                                        onMouseEnter={() => {
                                            const { name, cases, deaths, deathsTrend, casesTrend } = geography.properties;
                                            cases == 'data not reported' ?  
                                             
                                            this.setTooltipContent(`
                                                <h5 style="color:white;font-weight:400;padding:0;margin-top:10px;text-align:center">${name}</h5>
                                                <p>Insufficient data for ${name}</p>
                                             `)
                                             : 
                                             this.setTooltipContent(`
                                                <h5 style="color:white;font-weight:400;padding:0;margin-top:10px;text-align:center">${name}</h5> 
                                                <p>Cases: ${cases}</p> 
                                                <p>Cases Trend: ${casesTrend}</p> 
                                                <p>Deaths: ${deaths}</p> 
                                                <p>Deaths Trend: ${deathsTrend}</p> 
                                            `)
                                        }}
                                        onMouseLeave={() => {
                                            this.setTooltipContent("error in parsing");
                                        }}
                                        round
                                        style={{
                                            default: {
                                                fill: isNaN(geography.properties.cases.replace(',','')) ? scale(0) : scale(parseInt(geography.properties.cases.replace(',',''))),
                                                stroke: "#adb5bd",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                            hover: {
                                                fill: "#263238",
                                                stroke: "#adb5bd",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            },
                                            pressed: {
                                                fill: "#263238",
                                                stroke: "#adb5bd",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                            }
                                        }}
                                    />
                                ))}
                        </Geographies>
                </ComposableMap>
                <ReactTooltip html multiline id='map'>{this.state.toolTip}</ReactTooltip>
            </div>
            )
        } else {
            return (
                <Loader />
            )
        }
    }
}

export default VecMap;