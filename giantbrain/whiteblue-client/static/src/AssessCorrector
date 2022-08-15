import React from 'react';
import ReactDOM from 'react-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import Courses from './Courses.js';
import 'whatwg-fetch';

	export default class Assessmenu extends React.Component {
			
			constructor(props){
				super(props);
			}
			render (){	
					const SAVE_RESPONDERS = gql`
									mutation onOpenAssessment ($ownerId: String, $assessId : String){
										  onOpenAssessment(ownerId: $ownerId, assessId: $assessId){
											_id
											starttime
											endtime
											ownerId
											assessId
											answersCorrect {
											  answerIdSubmit
											  questIdResponded
											  submitedtime
											}
										  }
										}
									`;
						return (<div className= "assess-zone">
									<div className= "assess-header-zone">
										Assessments
									</div><hr/>
									<div className= "assesses">
										{this.props.assessTab.map((assessOne) => {
												return (<div className="assess_menu" onClick={this.props.hideMenuAssess}>
															<span className="assess-topic">{assessOne.header}</span>
																{assessOne.done ? 
																(<div>
																	<Link to={`/inner/corrected/${assessOne._id}`}>
																		See result
																	</Link>
																</div>) : (<Mutation mutation={SAVE_RESPONDERS}>
																{(onOpenAssessment, { data })=>{
																	return (
																		<Link to={`/inner/assessment/${assessOne._id}`}  onClick={()=>{
																				onOpenAssessment({ variables: {
																					ownerId: localStorage.getItem("userId"), 
																					assessId: assessOne._id 
																				}})
																			}}>
																		start
																	</Link>)
																}}
																</Mutation>)}
														<div>
																<span className="assess-course"><i className="fa fa-folder-o"/>{assessOne.courseId}</span><br/>	
																<span className="assess-release-hour"> Publish at  </span> <span className="text-align lower-case">{assessOne.startDay}</span>	
																<span className="assess-finish-hour">limit at  </span><span className="text-align lower-case">{assessOne.endDay}</span>	
																<span className="assess-finish-hour">limit at  </span><span className="text-align lower-case">{assessOne.duration}</span>	
															</div>
															<hr/>
														</div>)
										})}
									</div>
								</div>);
					}
			}