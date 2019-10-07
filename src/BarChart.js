import React, {Component} from 'react';
import * as c3 from 'c3';
import '../node_modules/c3/c3.css'
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFile, faFunnelDollar, faClock } from '@fortawesome/free-solid-svg-icons'

class BarChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stats: {
                hits: [],
                pageTimes: [],
            },
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('https://admin.wb.gs/api/ServerStats', {headers: new Headers({'Content-Type': 'application/json'})}).then(
            (response) => {
                response.json().then((data) => {
                    let hits = this.state.stats.hits;
                    hits.push(data.hits['60']);
                    while (hits.length > 1200)
                        hits.pop();

                    let pageTimes = this.state.stats.pageTimes;
                    pageTimes.push(data.scriptTimes['50']);
                    while (pageTimes.length > 1200)
                        pageTimes.pop();

                    this.setState({stats: {
                        hits: hits,
                        pageTimes: pageTimes,
                    }});

                    this.drawCharts();
                });
                setTimeout(this.fetchData.bind(this), 3000);
            }, (response) => {
                setTimeout(this.fetchData.bind(this), 3000);
            }
        );
    }

    chartOptions() {
        return {
            data: {
                columns: null,
            },
            legend: {
                show: false,
            },
            tooltip: {
                show: false,
            },
            axis: {
                x: {
                    show: false,
                },
                y: {
                    show: false,
                },
            },
            size: {
                height: 80,
                width: 160,
            },
            point: {
                show: false,
            },
        };
    }

    drawCharts() {
        var chartOptions;

        chartOptions = this.chartOptions();
        chartOptions.bindto = '#chart1';
        chartOptions.data.columns = [
            ['sample', 30, 200, 100, 400, 150, 250, 20, 80, 0, 400, 500, 1000, 2000, 200],
        ];
        c3.generate(chartOptions);

        chartOptions = this.chartOptions();
        chartOptions.bindto = '#chartHits';
        chartOptions.data.columns = [this.state.stats.hits.slice(0)];
        chartOptions.data.columns[0].unshift('sample');
        c3.generate(chartOptions);

        chartOptions = this.chartOptions();
        chartOptions.bindto = '#chart3';
        chartOptions.data.columns = [
            ['sample', 30, 200, 100, 400, 150, 250, 20, 80, 0, 400, 500, 1000, 2000, 200],
        ];
        c3.generate(chartOptions);

        chartOptions = this.chartOptions();
        chartOptions.bindto = '#chartPageTime';
        chartOptions.data.columns = [this.state.stats.pageTimes.slice(0)];
        chartOptions.data.columns[0].unshift('sample');
        c3.generate(chartOptions);
    }

    render() {
        return (
          <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-md-6">
                        <div className="d-flex">
                          <div className="wrapper">
                            <h3 className="mb-0 font-weight-semibold">904</h3>
                            <h5 className="mb-0 font-weight-medium text-secondary"><FontAwesomeIcon icon={faUser} /> Users Online</h5>
                            <p className="mb-0 text-muted">Last 60 minutes</p>
                          </div>
                          <div className="wrapper my-auto ml-auto ml-lg-4">
                            <div id="chart1"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div className="d-flex">
                          <div className="wrapper">
                            <h3 className="mb-0 font-weight-semibold">
                              <NumberFormat value={this.state.stats.hits[this.state.stats.hits.length - 1]} displayType={'text'} thousandSeparator={true} />
                            </h3>
                            <h5 className="mb-0 font-weight-medium text-secondary"><FontAwesomeIcon icon={faFile} /> Page Views</h5>
                            <p className="mb-0 text-muted">Last 60 minutes</p>
                          </div>
                          <div className="wrapper my-auto ml-auto ml-lg-4">
                            <div id="chartHits"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div className="d-flex">
                          <div className="wrapper">
                            <h3 className="mb-0 font-weight-semibold">109</h3>
                            <h5 className="mb-0 font-weight-medium text-secondary"><FontAwesomeIcon icon={faFunnelDollar} /> New Leads</h5>
                            <p className="mb-0 text-muted">Last 24 hours</p>
                          </div>
                          <div className="wrapper my-auto ml-auto ml-lg-4">
                            <div id="chart3"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div className="d-flex">
                          <div className="wrapper">
                            <h3 className="mb-0 font-weight-semibold">{this.state.stats.pageTimes[this.state.stats.pageTimes.length - 1]}<small>s</small></h3>
                            <h5 className="mb-0 font-weight-medium text-secondary"><FontAwesomeIcon icon={faClock} /> Page Time</h5>
                            <p className="mb-0 text-muted">Last 1,000 hits</p>
                          </div>
                          <div className="wrapper my-auto ml-auto ml-lg-4">
                            <div id="chartPageTime"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default BarChart;
