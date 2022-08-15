import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import {  Link } from 'react-router-dom';

import './css/Mainmenu.css';

export default class Mainmenu extends React.Component {
		constructor(props){
			super(props);
		}
		render(){
			let ownerId = localStorage.getItem("userId");
			return (<div className="menu-frame">
                <div onClick={this.props.toggleOpenMenu}>
                  <Link to="/inner/schools" >
                    <button className="btn">
                      <i className="fa fa-map-marker"/><span className="text-button">Find out school</span>
                    </button>
                  </Link>
                </div>
                <div onClick={this.props.toggleOpenMenu}>
                  <Link to={`/inner/cv/${ownerId}`}>
                    <button className="btn">
                      <i className="fa fa-user"/> <span className="text-button"> Curriculum vitae</span>
                    </button>
                  </Link>
                </div>
                <div onClick={this.props.toggleOpenMenu}>
                    <button className="btn" onClick={this.props.toggleAddPromoFrame}>
                      <i className="fa fa-book"/> <span className="text-button"> Add promotion</span>
                    </button>
                </div>
                <div onClick={this.props.toggleOpenMenu}>
                  <Link to="/inner/schedule" >
                    <button className="btn">
                      <i className="fa fa-clock-o"/><span className="text-button">Schedule</span>
                    </button>
                  </Link>
                </div>
                <div onClick={this.props.toggleOpenMenu}>
                  <Link to="/inner/live">
                    <button className="btn">
                      <i className="fa fa-television"/><span className="text-button">live</span>
                    </button>
                  </Link>
                </div>
                <div onClick={this.props.logout}>
                  <Link to="/" >
                    <button className="btn">
                     <i className="fa fa-power-off"/><span className="text-button">Log Out</span>
                    </button>
                  </Link>
                </div>
           </div>);
			}	
	}