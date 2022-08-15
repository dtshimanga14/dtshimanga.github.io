import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

	export default class Results extends React.Component {
			
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
						return (<div className="friend_plholder">
									<img className="pict_rounded size_profil friend_chat" src={resultOne.teacher.picture} />
									<span className="text-align lower-case resultview">{resultOne.assessDetails.level}</span>
									<span className="text-align lower-case">{resultOne.assessDetails.course}</span>
									<span className="text-align lower-case">{resultOne.assessDetails.topic}</span>
									<span className="text-align lower-case">{resultOne.assessDetails.totalQuestions}</span>
									<span className="text-align lower-case">{resultOne.assessDetails.quotaPerQuestion}</span>
									<span className="text-align lower-case">{resultOne.teacher.firstname}</span>
									<span className="text-align lower-case">{resultOne.teacher.middlename}</span>
									<span className="text-align lower-case">{resultOne.teacher.username}</span>
									<span className="text-align lower-case">
										<i className="fa fa-mortar-board"/>
									</span>
								</div>);
				});

						return (
									<div className= "results_zone">
										<div>
											My results
										</div><hr/>
										<div>
											{resultShow}
										</div>
									</div>
							);
					
					}
			}