import ReactTooltip from 'react-tooltip';
import MapChart from '../DemoPages/Components/Maps/Examples/VectorMaps/Datasets'
import React, { Component, Fragment } from 'react';

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import chroma from "chroma-js"
import {scaleLinear} from "d3-scale"

import world from '../world_map.json';

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
        }
    }

    setTooltipContent = (toolTip) => {
        this.setState({toolTip})
    }

    render() {
        return (
            <Fragment>
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
                            geography={world}
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
                                            this.setTooltipContent(`
                                            <h5 style="color:white;font-weight:400;padding:0;margin-top:10px;text-align:center">${name}</h5> 
                                            <p>Cases: ${cases}</p> 
                                            <p>Cases Trend: ${casesTrend}</p> 
                                            <p>Deaths: ${deaths}</p> 
                                            <p>Deaths Trend: ${deathsTrend}</p> 
                                            `);
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
            </Fragment>
        )
    }
}

export default VecMap;