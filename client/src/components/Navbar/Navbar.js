import React from 'react';

const Navbar = () => {
  return (
    <div className='container'>
      <nav className="navbar navbar-light navbar-expand-md">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">NBANeural.net</a>
          <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="nav-item" role="presentation"><a className="nav-link" href="#scores">Scores</a></li>
              {/* <li className="nav-item" role="presentation"><a className="nav-link" href="">Model Performance</a></li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
};

export default Navbar;