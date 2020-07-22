import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar.js'; 
import PageHeader from './components/PageHeader/PageHeader.js';
import ScoresContainer from './containers/ScoresContainer.js';
import ReactGA from 'react-ga';

import './assets/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";

ReactGA.initialize('UA-173205165-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {

  render () {
    return (
      <div>
        <Navbar/>
        <PageHeader/>
        <ScoresContainer/>
      </div>
    );
  }
}

export default App;
