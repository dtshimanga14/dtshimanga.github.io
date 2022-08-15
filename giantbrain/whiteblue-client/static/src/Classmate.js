import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

	export default class Classmate extends React.Component {
			
			constructor(props){
				super(props);
				this.state = {
					classmate : []
				}
			}

			componentDidMount(){
				fetch('/api/classmate')
				.then(data => data.json())
				.then(
					answer => this.setState({ classmate : answer })
				)
				.catch(err => alert('fetch classmate a plante'+err))
			}
			render (){ 

					return (
									<div className="ph_classmate">
											<input type="text" className="search-zone" onKeyup={this.onSearch} placeholder="Search for classes.."/>
											<button type="submit"><i className="fa fa-search"></i></button>
										{this.state.classmate.map((mate)=>(
											<div className="classmate_sp" >
												<span>{mate.username} {mate.middlename}</span>
												<div><img className="classmate_img" src={mate.picture}/></div>
												<div className="icon-right-flex">
													<Link to="/teachers" ><button className="btn"><i className="fa fa-gavel"></i></button></Link>
					                      			<Link to="/teachers" ><button className="btn"><i className="fa fa-calendar"></i></button></Link>
					                      			<Link to="/sheets" ><button className="btn"><i className="fa fa-certificate"></i></button></Link>
												</div>
				                      			
											</div>)
											)
										}
									</div>
						);
					}
			}