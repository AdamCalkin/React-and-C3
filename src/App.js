import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart.js'

export default class App extends Component {

  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: 'root'
  }
  
  render() {
    return (
      <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      <BarChart data={this.state.data} width={this.state.width} height={this.state.height}/>
      </div>
      </Fragment>
    );
  }
}