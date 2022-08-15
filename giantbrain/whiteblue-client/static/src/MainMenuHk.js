import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import {  Link } from 'react-router-dom';

import './css/Mainmenu.css';




const MainMenuHk = ({ logout }) => {
	
  let ownerId = localStorage.getItem('user-token');
	
  return (<div className="menu-frame">
                <div >
                  <Link to="/schools" >
                    <button className="btn">
                      <i className="fa fa-map-marker"/><span className="text-button">Find out school</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to={`/cv`}>
                    <button className="btn">
                      <i className="fa fa-user"/> <span className="text-button"> Curriculum vitae</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="/inner/schedule" >
                    <button className="btn">
                      <i className="fa fa-clock-o"/><span className="text-button">Schedule</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="/live">
                    <button className="btn">
                      <i className="fa fa-television"/><span className="text-button">live</span>
                    </button>
                  </Link>
                </div>
                <div onClick={()=> logout()}>
                  <Link to="/" >
                    <button className="btn">
                     <i className="fa fa-power-off"/><span className="text-button">Log Out</span>
                    </button>
                  </Link>
                </div>
           </div>);
}

export default MainMenuHk;
