import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart.js'

function App() {
  return (
    <Fragment>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    <BarChart />
    </Fragment>
  );
}

export default App;
