import React, { Component } from 'react';
import './pageheader.css';

class PageHeader extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      record: '',
    };
  }

  componentDidMount() {
    (window.location.href.includes('localhost'))
    ? fetch('http://localhost:3001/api/getRecord')
        .then((data) => data.json())
        .then((res) => this.setState({ 
          record: (res.data[0].wins).toString() + '-' + (res.data[0].losses).toString() + '-' + (res.data[0].pushes).toString()
        }))
    : fetch('https://nbaneuralnet.herokuapp.com/api/getRecord')
        .then((data) => data.json())
        .then((res) => this.setState({ 
          record: (res.data[0].wins).toString() + '-' + (res.data[0].losses).toString() + '-' + (res.data[0].pushes).toString()
        }))
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col title-info">
            <h1>NBANeural.net</h1>
            <h4>Score projections and picks against the spread from a neural network algorithm</h4>
          </div>
          <div className="col-sm-12 col-md-4 record-col">
            <div className="card border-dark">
              <div className="card-header">
                <h5 className="mb-0">2019-2020 Record ATS</h5>
              </div>
              <div className="card-body">
                <h1 className="text-center record">{this.state.record}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PageHeader;