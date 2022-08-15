
import React from 'react';
import ReactDOM from 'react-dom'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import 'whatwg-fetch';
import 'babel-polyfill';

	
export default class AddTeacherModalWindows extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					courseName : "Tape course name below",
				};
				this.handlerInsertCourseState = this.handlerInsertCourseState.bind(this);
			}
		handlerInsertCourseState(courseName){
			alert(courseName);
			this.setState({ courseName : courseName });
		}
		render(){
			let input;
			const GET_USERS = gql`query getCurrentPromotionTeachers{
									  getCurrentPromotionTeachers {
										_id
										isId
										personals {
										  middlename
										  username
										  picture
										  password
										}
										lastSeenOnline
									  }			
									}`;	
								const ADD_COURSE_TO_PRO_MUT = gql`
											mutation addCourses($name: String, $teacherId: String,$promotionId: String,$ponderation: Int, ){
											  addCoursesForTeacherToPrmotion(name: $name, teacherId: $teacherId, promotionId: $promotionId, ponderation: $ponderation) {
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
			return(<Query query={GET_USERS}>
							{({ data: { getCurrentPromotionTeachers  }, loading,})=>{
								if (loading || !getCurrentPromotionTeachers) {
								return <div>Loading ...</div>;
							  }
								return (
									<div>
										<div className="over-frame-modal"/>
										<div className="subscription-form-frame" >
											<button className="btn" onClick={()=> this.props.toggleAddTeacherModalWindows()}>
												Previous
											</button>
											<div>
												<label className="course-options-label">Course : </label><span className="">{this.state.courseName}</span>
												
												<form
													onSubmit={(e) => {
															  e.preventDefault();
															  this.handlerInsertCourseState(input.value);
															  alert(input.value);
															  input.value = "";
															  }}
												  >
													<input 
														ref={node => {
															input = node;
														  }}
														className="input-course" 
													/>
												</form>
											</div>
											<div><input className="input-chat"/></div>
											{getCurrentPromotionTeachers.map((friend) =>{
												return (<div className="suggestion-teachers-frame">
															<img className="teacher-picture-suggestion" src="./photos/defaults/user.jpg"/>
															<div  className="suggestion-details-frame">
																<Link to={`cv/${friend._id}`}>
																	<span>{friend.personals.username}</span>{' '}
																	<span>{friend.personals.middlename}</span>
																</Link>
															</div>
															<span className="add-teacher-button">
																<Mutation mutation={ADD_COURSE_TO_PRO_MUT}>
																		{(addCourses, { data })=>{
																			return (
																				<button className="btn" onClick={()=> {
																					addCourses({ variables: { 
																								name: this.state.courseName, 
																								teacherId: friend._id,
																								promotionId: this.props.promotionId,
																								ponderation: 2
																							}});
																					alert(this.state.courseName);
																					this.props.toggleAddTeacherModalWindows();
																				}}>
																					Add
																				</button>)
																		}}
																	</Mutation>
															</span>
														</div>)
											})}
										</div>
									</div>)
							}}
						</Query>
					);
			}
		}