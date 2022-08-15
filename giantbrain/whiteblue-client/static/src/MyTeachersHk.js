import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import moment from 'moment';
import Loading from './Loading.js';
import BarHk from './BarHk.js';
import AddTeachersModWin from './AddTeachersModWin.js';

import './css/Teachers.css';

import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link, NavLink,Redirect } from 'react-router-dom';

import { GET_COURSES_TEACHERS } from './queries.js';
import { REMOVE_COURSES } from './mutations.js';
					
const MyTeachersHk = () => {
	  
	  const promotionId = localStorage.getItem('promotionId-tkn'); //this.props.match.params.promotionId.toString();
	  const [toggleAddTeacher, setToggleAddTeacher] = useState(false);//addTeacherModalWindowState  toggleAddTeacherModalWindows
	  
      const [ removeCoursesForTeacherToPrmotion ] = useMutation(REMOVE_COURSES); 
	  
	  const { loading, error, data } = useQuery(GET_COURSES_TEACHERS,{ variables: { promotionId }});
		
		if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { getCourseByTeachers } = data;
		
	return(
		<div className="col-sm-12">
			<BarHk />
			{toggleAddTeacher ? (<AddTeachersModWin 
									toggleAddTeacherModalWindows={()=>setToggleAddTeacher(!toggleAddTeacher)}
									promotionId={promotionId}
								/>) : null}
			<div className="row">
				<div className="yardstick-frame">
				<span className="add-user-button" onClick={()=>setToggleAddTeacher(!toggleAddTeacher)}>
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
				<div className="ph_classmate">
					{getCourseByTeachers.map((mate)=>(
						<div className="classmate_sp" >
							<div className="teachers-name">
								<Link to={`cv/${mate.teacherId._id}`}>
									<span>
										{mate.teacherId.personals.username} {mate.teacherId.personals.middlename}
									</span>
								</Link>
							</div>
							<div>
								<img className="teacher-image" src={`http://localhost:8000/image/${mate.teacherId.avatar}`} />
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
						</div>))}
				</div>
			</div>
		</div>
		);
	};

export default MyTeachersHk;

	