import React from 'react';
import ReactDOM from 'react-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import Courses from './Courses.js';
import Loading from './Loading.js';
import 'whatwg-fetch';

	export default class AssessCorrector extends React.Component {
			
			constructor(props){
				super(props);
			}
			render (){	
			let promotionId = localStorage.getItem("promotionId");
			let teacherId = localStorage.getItem("userId");
			const GET_ASSESSES_TO_CORRECT = gql`query onGetAssessToCorrect($promotionId: String, $teacherId: String){
												  onGetAssessToCorrect(promotionId: $promotionId,teacherId: $teacherId) {
													_id
													Id
													header
													fields
													promotionId
													courseId {
													  _id
													  createdDate
													  lastUpdate
													  name
													}
													description
													startDay
													endDay
													duration
													done
													corrected
													count
												  }
												}`;	
				const CORRECT_ASSESS = gql`
					mutation onBulkCorrection($assessId: String) {
						  onBulkCorrection(assessId: $assessId) {
							_id
							Id
							header
							fields
							promotionId
							courseId {
							  _id
							  createdDate
							  lastUpdate
							  name
							}
							teacherId {
							  _id
							  personals {
								username
								middlename
								firstname
							  }
							}
							description
							startDay
							endDay
							duration
							corrected
						  }
						}
					`;
				return (<Query query={GET_ASSESSES_TO_CORRECT} variables={{ promotionId, teacherId }}>
							{({ data :{ onGetAssessToCorrect },loading, error})=>{
								if (loading || !onGetAssessToCorrect) {
									return <Loading />;
								  }
								return (<div className= "assess-zone">
											<div className= "assess-header-zone">
												Assessments
												<button className="btn"onClick={()=>this.props.reverseHandlerAssessFrame()}>
													<i className="fa-ellipsis-h"/>
												</button>
											</div><hr/>
											<div className= "assesses">
												{onGetAssessToCorrect.map((assessOne) => {
														return (<div className="assess_menu">
																	<span className="assess-topic">{assessOne.header}</span>
																{assessOne.corrected ? 
																	(<div>
																		statistic
																	</div>) : 
																(<Mutation mutation={CORRECT_ASSESS}>
																{(onBulkCorrection, { data })=>{
																	return (
																	<button onClick={()=>{
																				alert(assessOne._id);
																				onBulkCorrection({ variables: {
																					assessId: assessOne._id 
																				}})
																			}}>
																			Correct
																	</button>)
																}}
																</Mutation>)}
																	<div>
																		<span className="assess-course"><i className="fa fa-folder-o"/>{assessOne.courseId.name}</span><br/>	
																		<span className="assess-release-hour"> Publish at  </span> 
																		<span className="text-align lower-case">{assessOne.startDay}</span>	
																		<span className="assess-finish-hour">limit at  </span>
																		<span className="text-align lower-case">{assessOne.endDay}</span>	
																		<span className="assess-finish-hour">limit at  </span>
																		<span className="text-align lower-case">{assessOne.duration}</span>	
																	</div>
																<hr/>
																</div>)
												})}
											</div>
								</div>)}}
					</Query>);
				}
			}