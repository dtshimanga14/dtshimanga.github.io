import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import moment from 'moment';
import BarHk from './BarHk.js';
import AddPromoModWinHk from './AddPromoModWinHk.js';
import MapHk from './MapHk.js';
import AddTeachersModWin from './AddTeachersModWin.js';
import AddCoursesModWinHk from './AddCoursesModWinHk.js';

/* import './css/School.css'; */

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import { GET_SCHOOL_ONE, GET_PROMOTION_COURSE } from './queries.js';
import { SUBSCRIBE_MUT } from './mutations.js';


const CourseList = ({ promotionId }) => {
	const { loading, error, data } = useQuery(GET_PROMOTION_COURSE,{ variables: { promotionId }});
	  if (loading) return (<div>'Loading...'</div>);
	  if (error) return `Error! ${error.message}`;
	let { getCourseList } = data;
	return(
	<div>
		{getCourseList.map((course)=>
		(<div>
			<Link to="/course"  
				onClick={()=> {
						 localStorage.setItem("note-token",course._id)
			}}>{course.tittle}</Link>
		</div>)
		)}
	</div>
	);
};

const SchoolDashBoardHk = () => {
	
let schoolId = "5f65dd372ea7e5260c941e0c"//await localStorage.getItem("ownSchool-tkn");
    let fonder = "5dc688a3c99ebe17c806cf08"; //await localStorage.getItem("user-tkn")||
	
	const [togglePromoFrame, setTogglePromoFrame] = useState(false);//promotionName setToggleCourseFrame
	const [toggleCourseFrame, setToggleCourseFrame] = useState(false);//promotionName 
	const [uploadedFile, setUploadedFile] = useState("");
	const [file, setFile] = useState("");//file
	const [toggleAddTeacher, setToggleAddTeacher] = useState(false);//addTeacherModalWindowState  toggleAddTeacherModalWindows
	
	console.log(schoolId);
	
	const onFormSubmit = (evt) =>{
		evt.preventDefault();
		const fileField = document.getElementById('avatarFile');
		const formData = new FormData();
		formData.append('file', fileField.files[0]);
		let linkApi = 'http://localhost:8000/logo/'+schoolId;
		fetch(linkApi,{
			method : 'post',
			body: formData,
			mode : "no-cors"
		}).then(res=> res.json())
		.then(res=> console.log(res));
		console.log("redirect unable")
	};	
	const onWallPicture = (e) => {
		e.preventDefault();
	};
	const previewImage = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let fileLoad = e.target.files[0];
		reader.onloadend = ()=> {
			setFile(fileLoad);
			setUploadedFile(reader.result);
		}
		reader.readAsDataURL(fileLoad);
	};
	
	const { loading, error, data } = useQuery(GET_SCHOOL_ONE,{ variables: { fonder, schoolId }});
	  if (loading) return (<div>'Loading...'</div>);
	  if (error) return `Error! ${error.message}`;
  
  let { getSchoolOne, getPromotionBySchool } = data;
	return(
		<div className="">
			<div className="">
				<img className="school-wall" src="http://localhost:8000/image/350e5c24ced1ccd8b2c37240414fe636.jpg"/>
				<div >
						<label className="upload-file-label" htmlFor="avatarFile">
							<i className="fa fa-camera"/>
						</label>
						<form  method="post" enctype="multipart/form-data" onSubmit={onWallPicture}>
							<input type="file" className="" name="file" id="avatarFile" onChange = {(e)=> previewImage(e)}/>
							<input type="submit" id="valideAvatar" value="Submit" />
						</form>
					</div>
			</div >
			{toggleCourseFrame ? 
			<AddCoursesModWinHk 
				toggleAddCourse ={()=> setToggleCourseFrame(!toggleCourseFrame)}
				schoolId={schoolId}
				promotions={getPromotionBySchool} 
			/> : null}
			<div  className="tittle-wall">{getSchoolOne.name}</div >
			<div className="logo-frame">
				<img className="logo-school" src="http://localhost:8000/image/6a2f315d27703d114154b1bc1dea4181.png"  height="300px" width="300px"/>
				<div >
					<label className="upload-file-label" htmlFor="avatarFile">
						<i className="fa fa-camera"/>
					</label>
					<form  method="post" enctype="multipart/form-data" onSubmit={onFormSubmit}>
						<input type="file" className="" name="file" id="avatarFile" onChange = {(e)=> previewImage(e)}/>
						<input type="submit" id="valideAvatar" value="Submit" />
					</form>
				</div>
			</div>
		{togglePromoFrame ? 
			<AddPromoModWinHk 
				toggleAddPromotion={()=> setTogglePromoFrame(!togglePromoFrame)}
				schoolId={schoolId} 
			/> : null}
			<div className="row">
				<Link to="/">
					<button className="btn btn-bottom-border">
						<i className="fa fa-home"/>
					</button>
				</Link>
				<button className="btn" onClick={()=> setTogglePromoFrame(!togglePromoFrame)}>
				  Add Promotion <i className="fa fa-group"/>
				</button>
				<button className="btn" onClick={()=> setToggleCourseFrame(!toggleCourseFrame)}>
				  Add Course <i className="fa fa-file-text"/>
				</button>
				<button className="btn" onClick={()=>setToggleAddTeacher(!toggleAddTeacher)}>
					<i   className="fa fa-user-plus"/>
				</button>
			</div>
			{toggleAddTeacher ? 
				(<AddTeachersModWin 
					toggleAddTeacherModalWindows={()=>setToggleAddTeacher(!toggleAddTeacher)}
					promotionId={promotionId}
				/>) 
			: null}
			<div>
				<div className="wb-row">
				  <div className="wb-column">
						<div>address</div>
						{getSchoolOne.address.map((address)=>(<div>
							{address.country},
							{address.state},
							{address.town},
							{address.township},
							{address.number},
							{address.reference}
						</div>))}
						<div>contacts</div>
						<div>
							<div>{getSchoolOne.contact[0].phone}</div>
							<div>{getSchoolOne.contact[0].email}</div>
						</div>
				  </div>
				  <div className="wb-column">
					<MapHk 
						width={50} height={50}
						lat={getSchoolOne.location[0].latitude} 
						lng={getSchoolOne.location[0].longitude} 
					/>
				  </div>
				</div>
			</div>
			 <div>
				<div>Promotions</div>
				{getPromotionBySchool.map(
					(promotion)=>(<div>
						<span>{promotion.promotionName}</span>
						<span>{promotion.promotionLevel}</span>
						<Link to="/myclass" onClick={()=> {
							 localStorage.setItem("promotionId-tkn",promotion._id)
						}}>
							room
						</Link>
						<CourseList  promotionId={promotion._id} />
					</div>)
				)}
			</div>
		</div>
	)
};

export default SchoolDashBoardHk;

