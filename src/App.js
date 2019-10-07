import React, {Component, Fragment} from 'react';
import './App.css';
import BarChart from './BarChart.js'

export default class App extends Component {

  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
          </header>
          <BarChart />
        </div>
      </Fragment>
    );
  }
}
