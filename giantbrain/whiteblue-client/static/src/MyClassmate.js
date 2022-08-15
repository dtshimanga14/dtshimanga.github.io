import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';

import AssessCorrector from './AssessCorrector.js';
import Loading from './Loading.js';
import HiddenEye from './HiddenEye.js';

import './css/MyClassmate.css';

	export default class MyClassmate extends React.Component {
			
			constructor(props){
				super(props);
				this.handlerSortClass = this.handlerSortClass.bind(this);
				this.handlerrequesterListToggle = this.handlerrequesterListToggle.bind(this);
				this.handlerAdderNoteToggle = this.handlerAdderNoteToggle.bind(this);
				this.handlerOnChangeCourse = this.handlerOnChangeCourse.bind(this);
				this.handlerOnChangeNote = this.handlerOnChangeNote.bind(this);
				this.handlerTopicChange = this.handlerTopicChange.bind(this);
				this.handlerOnChangeUserId = this.handlerOnChangeUserId.bind(this);
				this.handlerAssessFrame = this.handlerAssessFrame.bind(this);
				
				this.state = {
					assessFrame : false,
					requesterListState : false,
					adderNoteState : false,
					numberNote : 0,
					courseIdNote : "",
					courseTopic : "",
					userId : "",
					CertificatId : "",
					classmate : [
				{
					username : "Rachel",
					middlename : "Zane",
					firstname : "Junior",
					picture : "./photos/dan/dan.jpg",
					accountType : "Teachers",
					class : "first level",
					payement : 245,
					presentDays : 183,
					score : 55,
					tutors : [{
						username : "Lee",
						middlename : "Zane",
						firstname : "Junior",
						relationship : "father",
					}],
					},]
				}
			}
			handlerAssessFrame(){
				this.setState(prevState => {
					return {
						assessFrame : !prevState.assessFrame,
					}
				});
			}
			handlerOnChangeUserId(evt){
				this.setState({ CertificatId : evt.target.value });
			}
			handlerOnChangeCourse(evt){
				this.setState({ courseIdNote : evt.target.value });
			}
			handlerOnChangeNote(evt){
				let numberNote = parseInt(evt.target.value);
				this.setState({ numberNote });
			}
			handlerTopicChange(evt){
				this.setState({ courseTopic : evt.target.value });
			}
			handlerAdderNoteToggle(){
				this.setState(prevState => {
					return {
						adderNoteState : !prevState.adderNoteState,
					}
				});
			}
			handlerrequesterListToggle(){
				this.setState(prevState => {
					return {
						requesterListState : !prevState.requesterListState,
					}
				});
			}
			handlerSortClass(evt){
				let sortBy = evt.target.value;
				let classMateState = this.state.classmate;
				if(sortBy === 'Alphabet order'){
					let newclassMateState = classMateState.sort((a,b)=>(
						b.username - a.username
					));
					this.setState({
						classmate : newclassMateState
					});
				}else if(sortBy === 'Performance order'){
					let newclassMateState = classMateState.sort((a,b)=>(
						b.score - a.score
					));
					this.setState({
						classmate : newclassMateState
					});
				}else if(sortBy === 'Payement order'){
					let newclassMateState = classMateState.sort((a,b)=>(
						b.payement - a.payement
					));
					this.setState({
						classmate : newclassMateState
					});
				}
			}
			render (){ 
					let subFields = [
						{
							orientation : "Rights",
							Option : "Financial laws",
							school : "University Of Harvard",
							session :23,
							year : 1,
						},
					];
					const GET_MYCLASSMATE = gql`
							query ($promotionId: String!,$teacherId: String){
							  getPromotions (promotionId: $promotionId) {
								schoolId
								promotionName
								promotionLevel
								scheduleId
								pupils {
								  _id
								  avatar
								  personals {
									username
									middlename
									firstname
									picture
									description
								  }
								  certificats
								  lastSeenOnline
								  performance
								}
							  }
							  getRequesters(promotionId: $promotionId){
								promotionId
								requesters {
								  ownerId {
									_id
									personals {
									  username
									  middlename
									  firstname
									  picture
									}
									certificats
								  }
								  status
								  submitdate
								}
							  }
							  getCoreCoursesForTeacher(teacherId: $teacherId,promotionId: $promotionId){
									_id
									name
							}
						}
						`;
						
						

		const ACCEPT_PUPIL_MUT = gql`
			mutation addPupilToPromotion($pupilId: String,$promotionId: String){
			  addPupilToPromotion(pupilId: $pupilId, promotionId: $promotionId) {
				_id
				schoolId
				promotionName
				promotionLevel
				scheduleId
				pupils {
				  _id
				  personals {
					username
					middlename
					firstname
					picture
					description
				  }
				  lastSeenOnline
				  performance
				}
			  }
			}
			`;
			
		const PUT_NOTE_MUT = gql`
			mutation addCertificatNote($cote: Int, $topic: String, $CertificatId: String, $courseIdNote: String){
				  addCertificatNote(cote: $cote, topic: $topic, CertificatId: $CertificatId, courseIdNote: $courseIdNote) {
					courses {
					  courseId
					  courseName
					  ponderation
					  notes {
						idAssess
						topic
						cote
						date
					  }
					}
				  }
				}
			`;
		const promotionId = this.props.match.params.promotionId.toString();
		
		return (
			<Query query={GET_MYCLASSMATE} variables={{ promotionId }}>
				{({ data :{ getPromotions,getCoreCoursesForTeacher,getRequesters },loading, error})=>{
					if (loading || !getPromotions|| !getCoreCoursesForTeacher|| !getRequesters) {
						return (<Loading />);
					  }
					  return (<div>
								{this.state.assessFrame ? 
									(<AssessCorrector reverseHandlerAssessFrame={this.handlerAssessFrame}/>) :
									null }
								<div className="core-courses">
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
						{this.state.adderNoteState ?(<div>
								<div className="over-frame-modal"/>
								<div className="subscription-form-frame" >
									<div>Insert Assess results </div>
									<div>
										<select className="teacher-course-selecter"  name="CertificatId" onChange={(e)=> this.handlerOnChangeUserId(e)}>
											{getPromotions.pupils.map((pupil) => {
												return (<option value={pupil.certificats[0]}>
															{pupil.personals.username}
															{' '}
															{pupil.personals.username}{pupil.certificats[0]}
														</option>)
											})}
										</select>
									</div>
									<div>
										<select className="teacher-course-selecter" name="course" onChange={(e)=> this.handlerOnChangeCourse(e)}>
											{getCoreCoursesForTeacher.map((course)=>
														(<option value={course._id}>
															{course.name}
														</option>)
											)}
										</select>
									</div>
									<div>
										<input 
											name="username" 
											className="" 
											type="text" 
											placeholder="Topic..."
											value={this.state.courseTopic}
											onChange={this.handlerTopicChange}
										/>
									</div>
									<div>
										<select className="teacher-course-selecter" name="note" onChange={(e)=> this.handlerOnChangeNote(e)}>
											{[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((pupil) => {
												return (<option value={pupil} >{pupil}</option>)
											})}
										</select>
									</div>
									<Mutation mutation={PUT_NOTE_MUT}>
										{(addCertificatNote, { data })=>{
											return (<button className="btn" onClick={() => {
														  addCertificatNote({ variables: { 
															  cote: this.state.numberNote, 
															  topic: this.state.courseTopic, 
															  CertificatId: this.state.CertificatId, 
															  courseIdNote: this.state.courseIdNote
															}});
															this.handlerAdderNoteToggle();
														}}>
														Publish <i className="fa fa-users"/>
													</button>)
										}}
									</Mutation>
								</div>
						</div>):null}
								<div className="yardstick-frame">
									{getPromotions.promotionName}{' '}{getPromotions.promotionLevel}
									<span className="">{getPromotions.pupils.length} {" "}subscribed pupils</span>
									<button className="btn" onClick={()=> this.handlerAssessFrame()}>
										<i className="fa fa-legal"/>
										<div className="fields-icon-layer" >16</div>
									</button>
									<span className="add-requester-button" onClick={()=> this.handlerrequesterListToggle()}>
										<i   className="fa fa-user-plus"/>
									</span>
									<span className="add-calendar-button">
										<i   className="fa fa-calendar"/>
									</span>
									<span className="add-pencil-button" onClick={this.handlerAdderNoteToggle}>
										<i   className="fa fa-pencil-square"/>
									</span>
									<label className="sort-teachers-label">Sort by</label>
									<select className="yardstick-options-frame" onChange={(e)=> this.handlerSortClass(e)}>
										<optgroup label="Year of study">
											<option>Alphabet order</option>
											<option>Performance order</option>
											<option>Payement order</option>
										</optgroup>
									</select>
								</div> 
								{this.state.requesterListState ? (<div className= "pupil-requester-zone">
									<div className= "pupil-requester-header">
										 Pupils subscriptions requests
									</div><hr/>
									<div className= "assesses">
										{getRequesters.requesters.map((requester) =>
											(<div className="assess_menu" onClick={()=> alert('hello requester')}>
												<img src={requester.ownerId.personals.picture}  className="user-avatar-pr"/>
												<Link to={`cv/${requester.ownerId._id}`}>
													<span className="assess-topic">
														<i className="fa fa-hand-o-right"/>
														{requester.ownerId.personals.username}{" "}
														{requester.ownerId.personals.middlename}{" "}
														{requester.ownerId.personals.firstname}
													</span>
												</Link>
												<div>
													{requester.ownerId.certificats.map(certificat =>(
														<div>
														<Link to={`quotation/${certificat}`}>
															<span className="assess-course">
																<i className="fa fa-folder-o"/>view certificats
															</span>
														</Link>
															<span className="assess-release-hour">{requester.submitdate}</span>
															<span className="assess-release-hour">request status : {requester.Status}</span>
														</div>	
													))}
												</div>
												<div className="button-frame">
													<Mutation mutation={ACCEPT_PUPIL_MUT}>
														{(addPupilToPromotion, { data })=>{
															return (<button className="btn" onClick={() => {
																		  addPupilToPromotion({ variables: { 
																						pupilId: requester.ownerId._id,
																						promotionId: getRequesters.promotionId
																					}
																			})
																		}}>
																		Approve
																	</button>)
														}}
													</Mutation>
													<button className="btn">Delete</button>
												</div>
												<hr/>
											</div>))}
									</div>
								</div>):null}
								<div className="ph_classmate">
									{getPromotions.pupils.map((mate)=>{
										return(
										<div className="classmate_sp" >
				                      		<div className="teachers-name">
					                      		<Link to={`cv/${mate._id}`}>
													<span>
														{mate.personals.username} {mate.personals.middlename}
													</span>
					                      		</Link>
				                      		</div>
											<div className="score-scope">{mate.performance}{' '}%</div>
											<div>
												<img className="classmate_img"  src={`http://localhost:8000/image/${mate.avatar}`}/>
											</div>
											<div className="tutors-frame">
												tutors :
											</div>
											<div className="second-frame-classmate">
												<Link to={`/inner/certificat/${mate.certificats[0]}`}>
													<button className="btn">
														<i className="fa fa-graduation-cap"/>
													</button>
												</Link>
												<Link to="/inner/histories">
													<button className="btn">
														<i className="fa fa-road"/>
													</button>
												</Link>
												<Link to="/inner/bills">
													<button className="btn">
														<i className="fa fa-money"/>
													</button>
												</Link>
											</div>
											<div className="radio-btn">
												<label className="switch">
												  <input type="checkbox"/>
												  <span className="slider round"/>
												</label>
											</div>
											<div>
												<div className="indicator-total-days" >
													<div className="indicator-present-days" />
												</div>
												<div className="cypher-indicator-days">120 days</div>
											</div>
											<div>
												<div className="indicator-total-payment" >
													<div className="indicator-present-payment"/>
												</div>
												<div className="cypher-indicator-payment">23 dollars</div>
											</div>
										</div>);
										}
									)}
								</div>
						</div>)}}
					</Query>);
					}
			}