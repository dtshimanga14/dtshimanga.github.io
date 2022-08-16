import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import {  Link } from 'react-router-dom';

export default class ShareCert extends React.Component {
		constructor(props){
			super(props);
		}
		render(){
			return (<div className="menu-cert-frame">
                <div >
                  <Link to="#" >
                    <button className="btn">
                      <i className="fa fa-twitter"/> <span className="text-button"> Via twitter</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="#" >
                    <button className="btn">
                      <i className="fa fa-whatsapp"/> <span className="text-button"> Via whatsapp</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="#" >
                    <button className="btn">
                      <i className="fa fa-reddit"/><span className="text-button">Via reddit</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="#">
                    <button className="btn">
                      <i className="fa fa-linkedin"/><span className="text-button">Via linkedIn</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="#" >
                    <button className="btn">
                      <i className="fa fa-facebook-f"/><span className="text-button">Via facebook</span>
                    </button>
                  </Link>
                </div>
                <div >
                  <Link to="#" >
                    <button className="btn">
                     <i className="fa fa-google"/><span className="text-button">Via gmail</span>
                    </button>
                  </Link>
                </div>
           </div>);
			}	
	}