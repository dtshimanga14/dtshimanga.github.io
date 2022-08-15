import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';
import moment from 'moment';

import Loading from './Loading.js';

import { GET_USER_CV } from './queries.js';
	
	
	
	const CvHk = () => {
		
		const [work, setWork] = useState("");//workState
		const [workInput, setWorkInput] = useState(false);//workInputState
		const [assetsInput, setAssetsInput] = useState(false);//AssetsInputState
		const [languageInput, setLanguageInput] = useState(false);//LanguageInputState
		const [file, setFile] = useState("");//file
		const [uploadedFile, setUploadedFile] = useState("");
		const [promotionLevel, setPromotionLevel] = useState("");//uploadFileUrl  promotionLevel
		
		let id = localStorage.getItem('cv-tokn')||localStorage.getItem('user-token');
		console.log(id);
	const onFormSubmit = (evt) =>{
		evt.preventDefault();
		const fileField = document.getElementById('avatarFile');
		const formData = new FormData();
		formData.append('file', fileField.files[0]);
		let linkApi = 'http://localhost:8000/avatar/'+id;
		fetch(linkApi,{
			method : 'post',
			body: formData,
			mode : "no-cors"
		}).then(res=> res.json())
		.then(res=> console.log(res));
		console.log("redirect unable")
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
		
		
		
		const { loading, error, data } = useQuery(GET_USER_CV,{ variables: { id }});
		
		
		if (loading) return (<div>'Loading...'</div>);
		if (error) return `Error! ${error.message}`;
		
		let { users } = data;
		console.log(users.personals.username);
		
		return(<div className="flex-cv-main-frame">
				<div className="cv-header">
					<span>Parcours de la vie</span>
				</div>
				<div className="sub-sect-cv-zone">
					<div className="sub-sect-cv">Informations personnelles</div>
					<div  className="cv-flex-box">
						<div className="dl-horizontal">
							<div>
								<span className="bold-cv">Surname </span><span> {users.personals.username}</span>
							</div> 
							<div>
								<span className="bold-cv">Given name </span> <span>{users.personals.middlename} {users.personals.firstname}</span>
							</div>
							<div>
								<span className="bold-cv">Gender </span> <span>{users.personals.gender}</span>
							</div>
							<div>
								<span className="bold-cv">Birthday </span> <i className="fa fa-calendar"></i> <span> {users.personals.birthday}</span>
							</div>
							<div>
								<span className="bold-cv">Marital Status  </span> <span> {users.personals.maritalStatus}</span>
							</div>
							<div>
								<span className="bold-cv">Nationality :</span> <span> {users.personals.nationality}</span>
							</div>
							<div>
								<span className="bold-cv">E-mail</span> <i className="fa fa-calendar"></i> <span> {users.personals.Email}</span>
							</div> 
							<div>
								<i className="fa fa-map-marker"></i>Address 
								<span>{users.personals.country}</span>,
								<span>{users.personals.town}</span>,
								<span>{users.personals.quarter}</span>,
								<span>{users.personals.street}</span>,
								<span>{users.personals.number}</span>
							</div>
							<div><span className="bold-cv">Nationality </span> <span> {users.personals.nationality}</span></div>
							<div><i className="fa fa-phone"></i><span> {users.personals.phone}</span></div>
							<div><i className="fa fa-at"></i><span> {users.personals.Email}</span></div>
							</div>
						<div className="flex-frame-photo-cv">
							<div>
								<img className="photo-cv" src={uploadedFile !=="" ? uploadedFile : `http://localhost:8000/image/${users.avatar}`}  height="300px" width="300px"/>
							</div>
							<div >
								<label className="upload-file-label" htmlFor="avatarFile">
									<i className="fa fa-camera"/>
								</label>
								<label className="pencil-file-label" htmlFor="valideAvatar">
									<i className="fa fa-pencil"/>
								</label>
							</div>
							<div className="">
								<form  method="post" enctype="multipart/form-data" onSubmit={onFormSubmit}>
									<input type="file" className="" name="file" id="avatarFile" onChange = {(e)=> previewImage(e)}/>
									<input type="submit" id="valideAvatar" value="Submit" />
								</form>
							</div>
							<div className="devise-frame"> 
								{users.personals.description}
							</div>
						</div>
					</div>
				</div>
				<div  className="row">
					<div className="col-lg-12">
						<div>Training </div>
					</div>
				</div>	
				<div  className="row">
					<div>Work at</div><hr/> 
					<span  className="add-fields-icon" onClick={()=> setWorkInput(!workInput)}>
						<i className="fa fa-plus-circle"/>
					</span>
					<div>{users.classes.map(pe =>
						(<div>
							<strong>Worked at : </strong>  
							<span>{pe.from}</span>
							<span>{pe.at}</span>
							<span>{pe.duration}</span>
						</div>))}
					</div>
					{workInput ?(<div className="col-lg-12">
						<input 
							placeholder="Add work" 
							value={work} 
							type="text"
							name="fieldsCv"
						/>
						<button type="button" className="btn  btn-default">Apply</button>
					</div>):null}
				</div>	
			</div>
		)
	};   
	
export default CvHk; 