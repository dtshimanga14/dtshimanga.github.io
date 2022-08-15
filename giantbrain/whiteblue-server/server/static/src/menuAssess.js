import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import Courses from './Courses.js';

	export default class Notes extends React.Component {
			
			constructor(props){
				super(props);
				this.state = {
					results : []
				}
			}
			componentDidMount(){
				fetch('/api/results')
				.then(data => data.json())
				.then(
					answer => this.setState({ results : answer })
				)
				.catch(err => alert('fetch classmate a plante'+err))
			}

			render (){ 
				

				const resultShow = this.state.results.map(resultOne => {
						return (<div className="friend_plholder" onClick={this.props.hideMenuNotes}>
									<Link to="/Course">
										<img className="pict_rounded size_profil friend_chat" src={resultOne.teacher.picture} />
										<span className="text-align lower-case">{resultOne.assessDetails.level}</span>
										<span className="text-align lower-case">{resultOne.assessDetails.course}</span>
										<span className="text-align lower-case">{resultOne.assessDetails.topic}</span>
										<span className="text-align lower-case">{resultOne.assessDetails.totalQuestions}</span>
										<span className="text-align lower-case">{resultOne.assessDetails.quotaPerQuestion}</span>
										<span className="text-align lower-case">{resultOne.teacher.firstname}</span>
										<span className="text-align lower-case">{resultOne.teacher.middlename}</span>
										<span className="text-align lower-case">{resultOne.teacher.username}</span>
									</Link>
								</div>)
				});

						return (
									<div className="assess_frame">
										<div>
											My notes
										</div><hr/>
										<div>
											{resultShow}
										</div>
									</div>
							);
					
					}
			}