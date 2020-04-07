import React, {Component, Fragment, ReactDOM} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BarChartIcon from '@material-ui/icons/BarChart';
import '../../../css/vendor.css'

import {
    Row, Col,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
} from 'reactstrap';


import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    YAxis,
    Bar,
    XAxis,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart
} from 'recharts';

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faArrowDown,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const graphData = require('../../../ca_stats.json');
const statsData = require('../../../world_stats.json')[0];
const jsonata = require("jsonata");

/**
 * Des: determines the position of a country in statistic using jsonata
 * @param country the country to determine the statistics for
 * @param statistic the statistic to determine from a list of well defined values
 * [ 'cases', 'deaths' , 'tests', 'casesPer1M', 'deathsPer1M', 'testsPer1M' ]
 * 
 */
const statistics = (country, statistic) => {

    const statsMap = {
        cases: 0,
        deaths: 2,
        tests: 9,
        casesPer1M: 7, 
        deathsPer1M: 8,
        testsPer1M: 10,
    }

    const statsVal = jsonata(`$replace($$.${country}[${statsMap[statistic]}],",","").$trim()`).evaluate(statsData)
    const statsArr = jsonata(`$distinct($reverse($sort($$.*#$i[$i%11=${statsMap[statistic]}].$trim().$@$v[$v!=""].$replace($v,",","").$number())).$string())`).evaluate(statsData);


    const statsRank = jsonata(`$@$v#$j[$v="${statsVal}"]{"rank":$j+1}`).evaluate(statsArr).rank
    const statsProgress = (((statsArr.length - ( statsRank - 1 )) / statsArr.length).toFixed(2) * 100)
    
    return { statsVal, statsRank, statsProgress };
}
/**
 * Des: Determines the percentage increase from oldVal to newVal
 */
const percentageIncrease = (oldVal, newVal) => {

    const percent = `${Math.round( ((newVal - oldVal) / oldVal) * 100 )}`
    const sign = Math.sign(percent) == 1 ? '+%' : Math.sign(percent) == -1 ? '-%' : '' 
    const positive = ( sign == '+%' ? true : false ) 
    
    return { percent, positive, sign }
}

export default class AnalyticsDashboard1 extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',

        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);

    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    componentDidMount() {
    
        const that = this;
        const script1 = document.createElement("script")
        script1.src = "https://ssl.gstatic.com/trends_nrtr/760_RC08/embed_loader.js"
        script1.async = true

        const script2 = document.createElement("script")
        script2.src = "https://ssl.gstatic.com/trends_nrtr/2152_RC04/embed_loader.js"
        script2.async = true
    
        this.google_trends1.appendChild(script1)
        this.google_trends2.appendChild(script2)
        
        script1.onload = function () {
          window.trends.embed.renderExploreWidgetTo(that.google_trends1, "TIMESERIES", {"comparisonItem":[{"keyword":"coronavirus","geo":"CA","time":"today 3-m"}],"category":0,"property":""}, {"exploreQuery":"geo=CA&q=coronavirus&date=today 3-m","guestPath":"https://www.google.com:443/trends/embed/"})
        }

        script2.onload = function () {
            window.trends.embed.renderWidgetTo(that.google_trends2, "US_cu_E-aoCHEBAADKbM_en", "fe_list_7e016d51-03c6-4ca7-a148-f720abb8b4bd", {"guestPath":"https://trends.google.com:443/trends/embed/"}) 
        }
    }

    render() {

        const statsArr = [ 'cases', 'deaths' , 'tests', 'casesPer1M','testsPer1M', 'deathsPer1M' ]
        
        let statsWidgetCols = statsArr.map((stat) => { 

            const { statsVal, statsRank, statsProgress } = statistics('Canada', stat)

            const statsMap = {
                cases: 'Cases',
                deaths: 'Deaths',
                tests: 'Tests',
                casesPer1M: 'Cases / 1M',
                testsPer1M: 'Tests / 1M',
                deathsPer1M: 'Deaths / 1M'
            }

            return ( <Col md="6">
            <div className="widget-content">
                <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                            <div className="widget-numbers fsize-3 text-muted">
                              {statsVal}
                            </div>
                        </div>
                        <div className="widget-content-right">
                            <div className="text-muted opacity-6">
                                {statsMap[stat]}
                            </div>
                        </div>
                        <div style={{position:'absolute', right:0}}>
                            {statsRank}{[11,12,13].includes(statsRank.toString()) ? 'th' : statsRank.toString()[-1] == 1 ? 'st' : statsRank.toString()[-1] == 2 ? 'nd' : statsRank.toString()[-1] == 3 ? 'rd' : 'th'}
                        </div>
                    </div>
                    <div className="widget-progress-wrapper mt-1">
                        <Progress
                            className="progress-bar-sm progress-bar-animated-alt"
                            value={statsProgress}/>
                    </div>
                </div>
            </div>
        </Col> )
        });

        let statsWidgetRows = [];  
        while ( statsWidgetCols.length > 0 ) { /* group by 2's */
            statsWidgetRows.push ( <Fragment>
                <Row className="mt-3">
                    {statsWidgetCols.shift()}
                    {statsWidgetCols.shift()}
                </Row>
                <div className="divider mt-4"/>
            </Fragment>
            )
        }

        const oldVal = parseInt(graphData.slice(-2)[0].cases)
        const newVal = parseInt(graphData.slice(-1)[0].cases)
        const { percent, positive, sign } = percentageIncrease(oldVal,newVal);

        return (
            <Fragment>
                <Row className="mt-3">
                    <Col md="6">
                <ReactCSSTransitionGroup
                    component="div"
                    data-aos="zoom-in"
                    style={{padding:20}}
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div style={{display: 'flex', padding: '40px 0 0', justifyContent: 'center'}}>
                        <Card style={{width: '100%', maxWidth: 800}} className="mb-3">
                            <CardHeader style={{padding: '40px 0px'}} className="card-header-tab">
                                <div className="card-header-title">
                                    <BarChartIcon style={{ fontSize: 60, fill: '#871f78', marginRight: 10 }} />
                                    <p style={{margin:0}}>Corona Virus Statistics Canada</p>
                                </div>
                                {/* <div style={{display: 'flex', justifyContent:'center' }} className="btn-actions-pane-right">

                                    <Button handleClick={() => {this.toggle1('11')}} label={'Cases'}/>
                                    <Button handleClick={() => {this.toggle1('22')}} label={'Deaths'}/>

                                </div> */}
                            </CardHeader>
                            <TabContent activeTab={this.state.activeTab1}>
                                <TabPane tabId="11">
                                    <CardBody className="pt-2">
                                        {statsWidgetRows}
                                    </CardBody>
                                    <div className="widget-chart p-0">
                                        <div className="widget-chart-content">
                                            <div className={`widget-description mt-0 ${positive ? 'text-danger' : 'text-success'}`}>
                                                <FontAwesomeIcon icon={positive ? faArrowUp : faArrowDown}/>
                                                <span className="pl-1"> {sign}{percent}</span>
                                                <span className="text-muted opacity-8 pl-1"> Cases Trend</span>
                                            </div>
                                        </div>
                                        <div style={{padding: 20}}>
                                        <ResponsiveContainer height={400}>
                                            <AreaChart data={graphData}  margin={{top: 200, right: 10, left: 0, bottom: 0}}>
                                                <defs>
                                                    <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#871f78" stopOpacity={0.7}/>
                                                        <stop offset="90%" stopColor="#871f78" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip/>

                                                <XAxis dataKey="date" />
                                                <Area type='monotoneX' dataKey='cases' stroke='#871f78' strokeWidth={2} fillOpacity={1}
                                                        fill="url(#colorPv1)"/>
                                            </AreaChart>
                                        </ResponsiveContainer>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Card>
                    </div>
                </ReactCSSTransitionGroup>
                </Col>
                <Col md="6">
                    <div data-aos="zoom-in" style={{padding: 20, marginTop: 40, marginBottom: 30}}>
                    <div style={{maxWidth:800, margin: 'auto'}}ref={el => (this.google_trends1 = el)} />
                    </div>

                    <div data-aos="zoom-in" style={{padding: 20, marginBottom: 30}}>
                    <div style={{maxWidth:800, margin: 'auto'}}ref={el => (this.google_trends2 = el)} />
                    </div>
                </Col>
                </Row>
            </Fragment>
        )
    }
}
