import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';

import Loading from './Loading.js';
	
	export default class Cv extends React.Component {
			constructor(props){
				super(props);
				this.state = {
					cv : {},
					workState : "",
					workInputState : false,
					AssetsInputState : false,
					LanguageInputState : false,
					file : '',
					uploadFileUrl : '',
				};
				this.toggleAssetsInput = this.toggleAssetsInput.bind(this);
				this.toggleLanguageInput = this.toggleLanguageInput.bind(this);
				this.toggleWorkInput = this.toggleWorkInput.bind(this);
				this.previewImage = this.previewImage.bind(this);
			}
	toggleWorkInput(){
		this.setState( prevState =>{
			return { workInputState : !prevState.workInputState}
		});
	}
	toggleAssetsInput(){
		this.setState( prevState =>{
			return { AssetsInputState : !prevState.AssetsInputState }
		});
	}
	toggleLanguageInput(){
		this.setState( prevState =>{
			return { LanguageInputState : !prevState.LanguageInputState }
		});
	}      		
	previewImage(e){
		e.preventDefault();
		let reader = new FileReader();
		let fileLoad = e.target.files[0];
		reader.onloadend = ()=> {
				this.setState({
					file : fileLoad,
					uploadFileUrl : reader.result,
					loadState : reader.LOADING,
				});
		}
		reader.readAsDataURL(fileLoad);
	}
			render (){
				const GET_USER_CV = gql`
					query($id: String!){
					  users(id: $id) {
						 _id
						personals {
						  username
						  middlename
						  firstname
						  password
						  picture
						  birthday
						  gender
						  maritalStatus
						  Email
						  nationality
						  phoneNumber
						  country
						  town
						  quarter
						  street
						  number
						  description
						}
						classes {
						  from
						  at
						  duration
						  reference
						}
					  }
					}
					`;

				const id = this.props.match.params.id.toString();
				let {uploadFileUrl} = this.state;

				
		return (
			<Query query={GET_USER_CV} variables={{ id }}>
				{({ data :{ users },loading, error})=>{
					if (loading || !users) {
						return <Loading />;
					  }
					  return (
					<div className="flex-cv-main-frame">
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
										<img className="photo-cv" src={uploadFileUrl} height="300px" width="300px"/>
									</div>
									<div >
										<label className="upload-file-label" htmlFor="uploadFile">
											<i className="fa fa-camera"/>
										</label>
										<input className="hidden-tag" type="file" id="uploadFile" name="file" onChange = {(e)=>this.previewImage(e)}/>
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
							<span  className="add-fields-icon" onClick={this.toggleWorkInput}>
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
							{this.state.workInputState ?(<div className="col-lg-12">
								<input 
									placeholder="Add work" 
									value={this.state.workState} 
									type="text"
									name="fieldsCv"
								/>
								<button type="button" className="btn  btn-default">Apply</button>
							</div>):null}
						</div>	
						<div  className="row">
							<div className="col-lg-12">
								<div>Assets</div><hr/>
								<span  className="add-fields-icon" onClick={this.toggleAssetsInput}>
									<i className="fa fa-plus-circle"/>
								</span>
								<div>I speak english very well</div>
								{this.state.AssetsInputState ? (<div >
								<input 
									placeholder="Add work" 
									value={this.state.workState} 
									type="text"
									name="fieldsCv"
								/>
								<button type="button" className="btn  btn-default">Apply</button>
							</div>):null}
							</div>
						</div>
						<div  className="row">
							<div className="col-lg-12">
								<div>Languages</div><hr/>
								<span  className="add-fields-icon" onClick={this.toggleLanguageInput}>
									<i className="fa fa-plus-circle"/>
								</span>
								{this.state.LanguageInputState ?(<div >
								<select name="promotionLevel" 
										id="pays" 
										value={this.state.fields.promotionLevel}
										onChange={this.handlerInputChange}
								>
								{["English","French","Lingala","Dustch","Hebreux"]
									.map((level)=>(<option value={level}>
														{level}
													</option>)
									)}
								</select>
								<button type="button" className="btn  btn-default">Apply</button>
							</div>):null}
							</div>
						</div>
					</div>
				)}}
			</Query>);
			}
		}