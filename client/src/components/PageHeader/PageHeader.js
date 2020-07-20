import React from 'react';
import './pageheader.css';

const PageHeader = () => {
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
              <h1 className="text-center record">127-94-9</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PageHeader;