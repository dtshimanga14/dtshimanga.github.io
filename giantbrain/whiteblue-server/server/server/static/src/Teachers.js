import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
import Correcter from './Correcter.js';
import AddTeacherModalWindows from './AddTeacherModalWindows.js';

import './css/Teachers.css';

	export default class Teachers extends React.Component {
			
			constructor(props){
				super(props);
				this.toggleAddTeacherModalWindows = this.toggleAddTeacherModalWindows.bind(this);
				this.state = {
					addTeacherModalWindowState : false
				};
			}
			toggleAddTeacherModalWindows(){
				this.setState(prevState => {
					return {
						addTeacherModalWindowState : !prevState.addTeacherModalWindowState
					};
				});
			}
			render (){ 
					let _id = "5cdf094ac1beac0fcc851fe6";
					let coursesAndTeachers =[{
						id : "",
						createdDate : "",
						lastUpdate : "",
						teacherId : "",
						promotionId : "",
						name : "Single Page Web developpement",
						content : "",
					}];
			
					let subFields = [
						{
							orientation : "Database Analysis",
							Option : "Computer science",
							school : "University Of Stanford",
							session :23,
							year : 1,
						},{
							orientation : "Database Analysis",
							Option : "Computer science",
							school : "University Of Stanford",
							session :23,
							year : 2,
						},{
							orientation : "Database Analysis",
							Option : "Computer science",
							school : "University Of Stanford",
							session :23,
							year : 3,
						},{
							orientation : "Database Analysis",
							Option : "Computer science",
							school : "University Of Stanford",
							session :23,
							year : 4,
						},
					];
					const GET_COURSES = gql`
							query getCourseByTeachers($promotionId : String!){
							  getCourseByTeachers(promotionId: $promotionId) {
								_id
								lastUpdate
								teacherId {
								  _id
								  personals {
									username
									middlename
									firstname
									picture
								  }
								  lastSeenOnline
								  certificats
								}
								name
							  }
							}
							`;
					const REMOVE_COURSES = gql`
											mutation rmCourses($id: String,$promotionId: String){
											  removeCoursesForTeacherToPrmotion (id: $id,promotionId:$promotionId){
												_id
												createdDate
												lastUpdate
												teacherId {
												  _id
												  personals {
													username
												  }
												}
												name
												promotionId
												ponderation
											  }
											}
											`;	
		const promotionId = this.props.match.params.promotionId.toString();
		return (
			<Query query={GET_COURSES} variables={{ promotionId }}>
				{({ data :{ getCourseByTeachers },loading, error})=>{
					if (loading || !getCourseByTeachers) {
						return (<Loading />);
					  }
					  return (<div className="col-sm-12">
								{this.state.addTeacherModalWindowState ? 
								(<AddTeacherModalWindows 
									toggleAddTeacherModalWindows={this.toggleAddTeacherModalWindows}
									promotionId={promotionId}
								/>) : null}
								<div className="row">
									<div className="yardstick-frame">
									<span className="add-user-button" onClick={()=>this.toggleAddTeacherModalWindows()}>
										<i   className="fa fa-user-plus"/>
									</span>
										<label className="sort-teachers-label">Sort by</label>
										<select className="yardstick-options-frame">
											<optgroup label="Year of study">
												<option>2017 - 2018</option>
												<option>2016- - 2017</option>
												<option>2015 - 2016</option>
												<option>2014 - 2015</option>
											</optgroup>
											<optgroup label="Children">
												<option>Jane Becky</option>
												<option>David Becky</option>
												<option>Oneself</option>
											</optgroup>
											<optgroup label="School">
												<option>M.I.T</option>
												<option>Unikin</option>
											</optgroup>
										</select>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-3 col-sm-offset-9 core-courses">
									{subFields.map((elt) => (<div className="one-field">
																<div className="header-field">{elt.orientation}</div>
																<div className="option">
																	<span className="option-text">{elt.Option}</span>
																	<button className="btn">
																		<i className="fa fa-edit"/>
																		<div className="fields-icon-layer" >16</div>
																	</button>
																	<button className="btn">
																		<i className="fa fa-users"/>
																		<div className="fields-icon-layer" >12</div>
																	</button>
																	<span className="from-year">{elt.year} years ago</span>
																</div>
																<div  className="ca-field">
																	<Link to="/cv" >{elt.school}</Link>
																</div>
															</div>)
										)}
									</div>
									<div className="col-sm-12 teacher-main-frame">
										{getCourseByTeachers.map((mate)=>(
											<div className="teacher-single-frame" >
												<div className="teachers-name">
													<Link to={`cv/${mate.teacherId._id}`}>
														<span>
															{mate.teacherId.personals.username} {mate.teacherId.personals.middlename}
														</span>
													</Link>
													<Mutation mutation={REMOVE_COURSES}>
															{(rmCourses, { data })=>{
																return (
																	<span className="substract-course" onClick={()=> {
																		rmCourses({ variables: { 
																					id: mate._id,
																					promotionId : promotionId
																				}});
																	}}>
																		<i className="fa fa-minus-circle"/>
																	</span>)
															}}
													</Mutation>
												</div>
												<div>
													<img className="teacher-image" src={mate.teacherId.personals.picture}/>
												</div>
												<div className="icon-right-flex">
													<Link to="/inner/schedule" >
														<button className="btn">
															<i className="fa fa-calendar-plus-o"/>
														</button>
													</Link>
													<Link to="/inner/coursesmaker" >
														<button className="btn">
															<i className="fa fa-comments-o"/>
														</button>
													</Link>
													<Link to="#" >
														<button className="btn">
															<i className="fa fa-chain"/>
														</button>
													</Link>
												</div>
												<div className="teachers-course-frame">
													<Link to="/inner/Course">
														<span className="text-button">{mate.name}</span>
													</Link>
												</div>
											</div>)
										)}
									</div>
							</div>
						</div>)}}
					</Query>);
					}
			}