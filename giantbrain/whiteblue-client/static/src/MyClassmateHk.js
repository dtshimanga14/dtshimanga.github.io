import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import moment from 'moment';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import './css/MyClassmate.css';
 
import Loading from './Loading.js';
import CorrectorHk from './CorrectorHk.js';
import AssessCorrector from './AssessCorrector.js';
import BarHk from './BarHk.js';
import AddTeachersModWin from './AddTeachersModWin.js';

import { GET_MYCLASSMATE } from './queries.js';
import { PUT_NOTE_MUT, ACCEPT_PUPIL_MUT } from './mutations.js';

const MyClassmateHk = () => {
	
	 const id = localStorage.getItem('user-token')//userId localStorage.setItem('promotionId-tkn',)
	 const promotionId = localStorage.getItem('promotionId-tkn');//this.props.match.params.promotionId.toString();
	 const teacherId = "";
	 const [toggleAddTeacher, setToggleAddTeacher] = useState(false);//addTeacherModalWindowState  toggleAddTeacherModalWindows
	  
	 let classmate = [{ username : "Rachel", middlename : "Zane", firstname : "Junior", picture : "./photos/dan/dan.jpg",
						accountType : "Teachers", Class/* class */ : "first level", payement : 245, 
						presentDays : 183,
						score : 55,
						tutors : [{
							username : "Lee",
							middlename : "Zane",
							firstname : "Junior",
							relationship : "father",
						}],
					},];
					
	 let subFields = [
						{
							orientation : "Rights",
							Option : "Financial laws",
							school : "University Of Harvard",
							session :23,
							year : 1,
						},
					];
					
     const [Frame, setFrame] = useState(false);//assessFrame  handlerAssessFrame
     const [toggleLists, setToggleLists] = useState(false);//requesterListState handlerrequesterListToggle
     const [noter, setNoter] = useState(false);//adderNoteState  handlerAdderNoteToggle 
     const [count, setCount] = useState(0);//numberNote  handlerOnChangeNote
     const [noteId, setNoteId] = useState("");//courseIdNote  handlerOnChangeCourse
     const [topic, setTopic] = useState("");//courseTopic  evt.target.value  handlerTopicChange
     const [certificatId, setCertificatId] = useState("");//CertificatId   handlerOnChangeUserId
     const [classMate, setClassMate] = useState(classmate);//classmate
	 
	 const onSort = (evt) => {//handlerSortClass
		let sortBy = evt.target.value;
		if(sortBy === 'Alphabet order'){
			setClassMate(classMate.sort((a,b)=>(b.username - a.username)));
		}else if(sortBy === 'Performance order'){
			setClassMate(classMate.sort((a,b)=>(b.score - a.score)));
		}else if(sortBy === 'Payement order'){
			setClassMate(classMate.sort((a,b)=>(b.payement - a.payement)));
		}
	};
		
	 const [ addPupilToPromotion ] = useMutation(ACCEPT_PUPIL_MUT);	
	 const [ addCertificatNote ] = useMutation(PUT_NOTE_MUT);
	 
	const { loading, error, data, fetchMore } = useQuery(GET_MYCLASSMATE,{ 
				variables: { promotionId  }
			});
  
	
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
	let { getRequesters, getCoreCoursesForTeacher, getPromotions  } = data;
	
	return(
		<div>
			{Frame ? (<CorrectorHk toggleFrame={()=> setFrame(!Frame)}/>) : null }
			{true ? (<AddTeachersModWin 
									toggleAddTeacherModalWindows={()=>setToggleAddTeacher(!toggleAddTeacher)}
									promotionId={promotionId}
								/>) : null}
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
			
	{noter ?(<div>
			<div className="over-frame-modal"/>
			<div className="subscription-form-frame" >
				<div>Insert Assess results </div>
				<div>
					<input value={topic} type="text" name="username" className="" placeholder="Topic..."
						onChange={(event)=>setTopic(event.target.value)}
					/>
				</div>
				<div>
					<select name="note" onChange={(e)=> setCount(parseInt(evt.target.value))}
						className="teacher-course-selecter" >
						{[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((pupil) => {
							return (<option value={pupil} >{pupil}</option>)
						})}
					</select>
				</div>
				<button className="btn" onClick={() => {
					addCertificatNote({ variables: { cote: count, topic, CertificatId, courseIdNote: noteId }});
					setNoter(!noter);
				}}>
					Publish <i className="fa fa-users"/>
				</button>
			</div>
	</div>):null}
			<div className="yardstick-frame">
				{getPromotions.promotionName}{' '}{getPromotions.promotionLevel}
				<span className="">{getPromotions.pupils.length} {" "}subscribed pupils</span>
				<button className="btn" onClick={()=> setFrame(!Frame)}>
					<i className="fa fa-legal"/>
					<div className="fields-icon-layer" >16</div>
				</button>
				<span className="add-requester-button" onClick={()=> setToggleLists(!toggleLists)}>
					<i   className="fa fa-user-plus"/>
				</span>
				<span className="add-calendar-button">
					<i   className="fa fa-calendar"/>
				</span>
				<span className="add-pencil-button" onClick={()=> setNoter(!noter)}>
					<i   className="fa fa-pencil-square"/>
				</span>
				<label className="sort-teachers-label">Sort by</label>
				<select className="yardstick-options-frame" onChange={(e)=> onSort(e)}>
					<optgroup label="Year of study">
						<option>Alphabet order</option>
						<option>Performance order</option>
						<option>Payement order</option>
					</optgroup>
				</select>
			</div> 
			{toggleLists ? (<div className= "pupil-requester-zone">
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
								<button className="btn" onClick={() => {
									  addPupilToPromotion({ variables: {pupilId: requester.ownerId._id, 
										promotionId: getRequesters.promotionId }
									})
								}}>
									Approve
								</button>
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
							<Link to="/cv">
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
							<Link to="/certificat">
								<button className="btn" onClick={()=> localStorage.setItem('certificat-tokn',mate.certificats[0])}>
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
							<button className="btn" onClick={()=>setToggleAddTeacher(!toggleAddTeacher)}>
								<i   className="fa fa-user-plus"/>
							</button>
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
	</div>
	);
};
export default MyClassmateHk;