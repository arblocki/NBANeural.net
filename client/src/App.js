import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar.js'; 
import PageHeader from './components/PageHeader/PageHeader.js';
import ScoresContainer from './containers/ScoresContainer.js';
 
import "react-datepicker/dist/react-datepicker.css";

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
