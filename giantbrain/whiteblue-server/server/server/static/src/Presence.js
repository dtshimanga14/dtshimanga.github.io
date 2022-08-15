	
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
	
import './css/Presence.css';

	export default class Presence extends React.Component {
				constructor(props){
					super(props);
					this.state = {
						time : '',
						Status : '',
					};
					this.markTime = this.markTime.bind(this);
				}
				markTime(attendent){
					let newTime = moment();
					this.setState({
						time : newTime,
						Status : attendent
					});
				}
				render(){
					
					return (<div className="pupil-presence">
								<div className="pupil-figure">
									<div className="pupil-name">{this.props.fullName}</div>
									<img  className="as-img" src="./photos/defaults/user.jpg"/>
								</div>
								<div className="pupil-description">
									<div className="fileds-description">{this.props.results}</div>
									<div className="fileds-description">{this.props.description}</div>
									<div className="fileds-description">{this.state.time} {this.state.Status}</div>
									<div className="attendent-sheets-frame-btn">
										<span className="number-follows">Total days of {this.props.totalPresent} presents</span>
										<span className="number-follows">Total days of {this.props.totalAbsent} presents</span>
										<button className="btn fields-btn-pres" onClick={()=> this.markTime('Absent')}>
											<i className="fa fa-times-circle"/>
											Absent
										</button>
										<button className="btn fields-btn-pres" onClick={()=> this.markTime('Present')}>
											<i className="fa fa-check-circle"/>
											Present
										</button>
									</div>
								</div>
							</div>);
				}	
			
		}