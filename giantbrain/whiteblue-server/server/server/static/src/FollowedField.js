import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import 'babel-polyfill';


export default class FollowedField extends React.Component {
						     	
		constructor(props){
				super(props);

			}			     		
		
		render(){
				let fieldsToSubscribe = [{
					
				}];

				return (<div className="over-frame-modal" >
								<div className="content-modal" >
									Hello world
								</div>
				  <Link to="/" >
                    <button className="btn">
                      <i className="fa fa-book"/> <span className="text-button"> Library</span>
                    </button>
                  </Link>
						</div>);
				}
		}