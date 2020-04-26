import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BarChartIcon from '@material-ui/icons/BarChart';
import Loader from './loader'
import '../css/dashboard.css'

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
import axios from 'axios'

const jsonata = require("jsonata");
let statsData = ''
let graphData = ''

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

    const percent =  (((newVal - oldVal) / oldVal) * 100).toFixed(3) 
    const positive = ( percent > 0 ? true : false ) 
    
    return { percent, positive }
}

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',

        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);

    }

    componentDidMount() {
        axios.get(`/meta`)
        .then((res) => {
            statsData = JSON.parse(res.data.world_stats)
            graphData = JSON.parse(res.data.ca_stats)
            this.forceUpdate()
        })
        .catch(console.error)
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

    render() {

        const statsArr = [ 'cases', 'deaths' , 'tests', 'casesPer1M','testsPer1M', 'deathsPer1M' ]
        const maxValCases = jsonata('$max($map($.cases , $number))').evaluate(graphData)
        const maxValDeaths = jsonata('$max($map($.deaths , $number))').evaluate(graphData)
        console.log(this.state.meta)

        if ( statsData && graphData ) {

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

        const oldValCases = parseInt(graphData.slice(-2)[0].cases)
        const newValCases = parseInt(graphData.slice(-1)[0].cases)
        const { percent: percentCases, positive: positiveCases } = percentageIncrease(oldValCases,newValCases);

        const oldValDeaths = parseInt(graphData.slice(-2)[0].deaths)
        const newValDeaths = parseInt(graphData.slice(-1)[0].deaths)
        const { percent: percentDeaths, positive: positiveDeaths } = percentageIncrease(oldValDeaths,newValDeaths);

        return (
            <Fragment>
                <Row className="mt-3">
                    <Col md="6" className={`fadeInLeft wow`} data-wow-duration="1s" data-wow-delay="1s"> 
                <ReactCSSTransitionGroup
                    component="div"
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
                                            <div className={`widget-description mt-0 ${positiveDeaths ? 'text-danger' : 'text-success'}`}>
                                                <FontAwesomeIcon icon={positiveDeaths ? faArrowUp : faArrowDown}/>
                                                <span className="pl-1"> %{percentDeaths}</span>
                                                <span className="text-muted opacity-8 pl-1"> Deaths Trend</span>
                                            </div>
                                        </div>   
                                        <div style={{padding: 20, marginBottom: 110}}>
                                        <ResponsiveContainer height={400}>
                                            <AreaChart data={graphData}  margin={{right: 10, left: 0, bottom: 0}}>
                                                <defs>
                                                    <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#871f78" stopOpacity={0.7}/>
                                                        <stop offset="90%" stopColor="#871f78" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip/>

                                                <YAxis type="number" domain={[0, maxValDeaths]} />
                                                <XAxis dataKey="date" />
                                                <Area type='monotoneX' dataKey='deaths' stroke='#871f78' strokeWidth={2} fillOpacity={1}
                                                        fill="url(#colorPv1)"/>
                                            </AreaChart>
                                        </ResponsiveContainer>
                                        </div>
                                        <div className="widget-chart-content">
                                            <div className={`widget-description mt-0 ${positiveCases ? 'text-danger' : 'text-success'}`}>
                                                <FontAwesomeIcon icon={positiveCases ? faArrowUp : faArrowDown}/>
                                                <span className="pl-1"> %{percentCases}</span>
                                                <span className="text-muted opacity-8 pl-1"> Cases Trend</span>
                                            </div>
                                        </div> 
                                        <div style={{padding: 20}}>
                                        <ResponsiveContainer height={300}>
                                            <AreaChart data={graphData}  margin={{right: 10, left: 0, bottom: 0}}>
                                                <defs>
                                                    <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="10%" stopColor="#871f78" stopOpacity={0.7}/>
                                                        <stop offset="90%" stopColor="#871f78" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip/>

                                                <YAxis type="number" domain={[0, maxValCases]} />
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
                <Col className={`fadeInRight wow`} data-wow-duration="1s" data-wow-delay="1s" md="6">
                    <div style={{padding: 20, marginTop: 40}}>
                    <div style={{maxWidth:800, margin: 'auto'}}>
                        <iframe className={'card'} allowfullscreen id="trends-widget-1" src="https://trends.google.com:443/trends/embed/US_cu_4Rjdh3ABAABMHM_en/fe_line_chart_e9d325a0-e899-4215-a8bf-e1857ef601d8" width="100%" frameborder="0" scrolling="1" style={{borderRadius: 2, height: 370}}></iframe>
                    </div>

                    </div>

                    <div style={{padding: 20}}>
                    <div style={{maxWidth:800, margin: 'auto'}}>
                        <iframe className={'card'} allowfullscreen id="trends-widget-2" src="https://trends.google.com:443/trends/embed/US_cu_4Rjdh3ABAABMHM_en/fe_geo_chart_bc3cd05f-ca09-4ab5-9aeb-cdb8bbba0147" width="100%" frameborder="0" scrolling="1" style={{borderRadius: 2, height: 524}}></iframe>
                    </div>
                    </div>

                    <div style={{padding: 20, marginBottom: 30}}>
                    <div style={{maxWidth:800, margin: 'auto'}}>
                        <iframe className={'card'} allowfullscreen id="trends-widget-3" src="https://trends.google.com:443/trends/embed/US_cu_4Rjdh3ABAABMHM_en/fe_related_queries_b9864784-1203-4c1f-808b-98506e8d1281" width="100%" frameborder="0" scrolling="1" style={{borderRadius: 2, height: 314}}></iframe>
                    </div>
                    </div>
                </Col>
                </Row>
            </Fragment>

            )
        } else {
            return (
                <Fragment>
                <Row className="mt-3">
                    <Col md="6" className={`fadeInLeft wow`} data-wow-duration="1s" data-wow-delay="1s"> 
                <ReactCSSTransitionGroup
                    component="div"
                    style={{padding:20}}
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div style={{display: 'flex', padding: '40px 0 0', justifyContent: 'center'}}>
                        <Card style={{width: '100%', maxWidth: 800}} className="mb-3">            
                            <Loader />
                        </Card>
                    </div>
                </ReactCSSTransitionGroup>
                </Col>
                <Col className={`fadeInRight wow`} data-wow-duration="1s" data-wow-delay="1s" md="6">
                    <div style={{padding: 20, marginTop: 40}}>
                    <div style={{maxWidth:800, margin: 'auto'}}>
                        <iframe className={'card'} allowfullscreen id="trends-widget-1" src="https://trends.google.com:443/trends/embed/US_cu_4Rjdh3ABAABMHM_en/fe_line_chart_e9d325a0-e899-4215-a8bf-e1857ef601d8" width="100%" frameborder="0" scrolling="1" style={{borderRadius: 2, height: 370}}></iframe>
                    </div>

                    </div>

                    <div style={{padding: 20}}>
                    <div style={{maxWidth:800, margin: 'auto'}}>
                        <iframe className={'card'} allowfullscreen id="trends-widget-2" src="https://trends.google.com:443/trends/embed/US_cu_4Rjdh3ABAABMHM_en/fe_geo_chart_bc3cd05f-ca09-4ab5-9aeb-cdb8bbba0147" width="100%" frameborder="0" scrolling="1" style={{borderRadius: 2, height: 524}}></iframe>
                    </div>
                    </div>

                    <div style={{padding: 20, marginBottom: 30}}>
                    <div style={{maxWidth:800, margin: 'auto'}}>
                        <iframe className={'card'} allowfullscreen id="trends-widget-3" src="https://trends.google.com:443/trends/embed/US_cu_4Rjdh3ABAABMHM_en/fe_related_queries_b9864784-1203-4c1f-808b-98506e8d1281" width="100%" frameborder="0" scrolling="1" style={{borderRadius: 2, height: 314}}></iframe>
                    </div>
                    </div>
                </Col>
                </Row>
            </Fragment>
            )
        }
    }
}
