import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';

	export default class Classes extends React.Component {
			
			constructor(props){
				super(props);
				this.state = {
					classes : []
				};
			}
			componentDidMount(){
				fetch('/api/classes')
				.then(data => data.json())
				.then(
					answer => this.setState({ classes : answer })
				)
				.catch(err => alert('fetch classmate a plante'+err))
			}
			render (){ 
				const classesShow = this.state.classes.map(oneClass => {
						return (<div className="friend_plholder" onClick={this.props.hideMenuClasses}>
									<Link to="/classmate" >
										<button className="btn">
											<span className="text-align lower-case">{oneClass.level}</span>
											<span className="text-align lower-case">{oneClass.option}</span>
											<span className="text-align lower-case">{oneClass.orientation}</span>
										</button>
									</Link>
								</div>)
				});

						return (
									<div className= "classes_zone">
										<div className="assisted-classes-menu">
											My assisted classes
										</div><hr/>
										<div>
											{classesShow}
										</div>
									</div>
							);
					
					}
			}