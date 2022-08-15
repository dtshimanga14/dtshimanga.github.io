import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';
import gql from "graphql-tag";
import moment from 'moment';
import Loading from './Loading.js';
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';

import './css/Teachers.css';




import { GET_CURRENT_PROMOTION } from './queries.js';
import { ADD_COURSE_TO_PRO_MUT } from './mutations.js';

const AddTeachersModWin = ({ toggleAddTeacherModalWindows }) => {
	
	  const promotionId = "5dda49065232b51c88da601e"//this.props.match.params.promotionId.toString();
	  const [courseName, setCourseName] = useState("Tape course name below");//addTeacherModalWindowState  toggleAddTeacherModalWindows
	  
      const [ addCoursesForTeacherToPrmotion ] = useMutation(ADD_COURSE_TO_PRO_MUT); 
	  
	  const { loading, error, data } = useQuery(GET_CURRENT_PROMOTION,{ variables: { promotionId }});
		
		if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { getCurrentPromotionTeachers } = data;
		
	return(
		
	<div>
		<div className="over-frame-modal"/>
		<div className="subscription-form-frame" >
			<button className="btn" onClick={toggleAddTeacherModalWindows}>
				Previous
			</button>
			<div>
				<label className="course-options-label">Course : </label><span className="">{courseName}</span>
				<form onSubmit={(e) => { e.preventDefault(); setCourseName(""); }}>
					<input value={courseName} onChange={(e)=> setCourseName(e.target.value)} className="input-course" />
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
								<button className="btn" onClick={()=> {
									addCourses({ variables: { 
												name: courseName, teacherId: friend._id,
												promotionId: promotionId, ponderation: 2
											}});
									console.log(courseName);toggleAddTeacherModalWindows();
								}}>
									Add
								</button>
							</span>
						</div>)
			})}
		</div>
	</div>);
};
	
export default AddTeachersModWin;


	