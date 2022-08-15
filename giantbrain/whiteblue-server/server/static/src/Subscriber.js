import React from 'react';
import ReactDOM from 'react-dom'
import { Link,Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import 'whatwg-fetch';
import 'babel-polyfill';
import mentions from './mentions.js';


const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;


const CREATE_USER = gql`
	mutation addUser($username: String!, $password: String!, $middlename: String, $firstname: String, $accountType: String!) {
		addUser(input:{
		username : $username,
		password : $password,
		middlename : $middlename,
		firstname : $firstname,
		accountType : $accountType
	  }){
		  isId
		 }
	}
	`;
	
export default class Subscriber extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					fields : {
						username : "",
						firstname : "",
						middlename : "",
						password : "",
						email : "",
					},
				};
				this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
				this.handlerInputChange = this.handlerInputChange.bind(this);
			}
		handlerInputChange(event){
			const fields = this.state.fields;
			fields[event.target.name] = event.target.value;
			this.setState({ fields });
		}
		handlerOnSubmit(event){
			this.setState({
				fields : {
						username : "",
						firstname : "",
						middlename : "",
						password : "",
						email : "",
						confpassword : "",
					},
				errorMessageState : false,
			});
		}
		render(){

				return (
				<Mutation mutation={CREATE_USER}>
				{(addUser,{ data })=>{
					return(<div className="row">
								<div className="col-md-12">
									<form  onSubmit={() => {
										event.preventDefault();
										if(this.state.fields.password === this.state.fields.confpassword){
											addUser({ variables: { 
														username : this.state.fields.username,
														password : this.state.fields.password,
														middlename : this.state.fields.middlename,
														firstname : this.state.fields.firstname,
														accountType : "PUPIL",
													}
											});
										this.handlerOnSubmit();
										}else{
											this.setState(prevState =>{
												return {
													prevState : !prevState.errorMessageState
												}
											});
										}
									}}>
										<div className="row wit-header">
											Formulaire d'inscription
										</div>
										{this.state.errorMessageState ? 
											(<div className="row error-message">
												the confirmation password entry don't match the password 
											</div>):null
										}
										<div className="row couple-label-input">
											<div className="form-group">
												<label className="col-md-5">Username</label>
												<input 
													name="username" 
													className="col-md-offset-2 col-md-7" 
													type="text" 
													placeholder="username..."
													value={this.state.fields.username}
													onChange={this.handlerInputChange}
												/>
											</div>
										</div>
										<div className="row couple-label-input">
											<div className="form-group">
												<label className="col-md-5">Middlename</label>
												<input 
													name="middlename" 
													className="col-md-offset-2 col-md-7" 
													type="text" 
													placeholder="middlename..."
													value={this.state.fields.middlename}
													onChange={this.handlerInputChange}
												/>
											</div>
										</div>
										<div className="row couple-label-input">
											<div className="form-group">
												<label className="col-md-5">Firstname</label>
												<input 
													name="firstname" 
													className="col-md-offset-2 col-md-7" 
													type="text" 
													placeholder="firstname..."
													value={this.state.fields.firstname}
													onChange={this.handlerInputChange}/>
											</div>
										</div>
										<div className="row">
											<div className="form-group">
												<label  className="col-md-3" htmlFor="uploadingFile">Picture</label>
												<Mutation mutation={UPLOAD_FILE}>
												  {uploadFile => (
													<input
														type="file"
														name="uploadingFile"
														required
														onChange={({ target: { validity, files: [file] } }) =>
														  validity.valid && uploadFile({ variables: { file } })
														}
												   />
												  )}
												</Mutation>
											</div>
										</div>
										<div className="row couple-label-input">
											<div className="form-group">
												<label className="col-md-5">Password</label>
												<input 
													name="password" 
													className="col-md-offset-2 col-md-7" 
													type="password" 
													placeholder="password..."
													value={this.state.fields.password}
													onChange={this.handlerInputChange}/>
											</div>
										</div>
										<div className="row couple-label-input">
											<div className="form-group">
												<label className="col-md-5">Confirm</label>
												<input 
													name="confpassword" 
													className="col-md-offset-2 col-md-7" 
													type="password" 
													placeholder="confirm password..."
													value={this.state.fields.confpassword}
													onChange={this.handlerInputChange}/>
											</div>
										</div>
										<div className="row couple-label-input">
											<div className="form-group">
												<label className="col-md-5">E-mail</label>
												<input 
													name="email" 
													className="col-md-offset-2 col-md-7" 
													type="email" 
													placeholder="e-mail..." 
													value={this.state.fields.email}
													onChange={this.handlerInputChange}
												/>
											</div>
										</div>
									  <div className="row group-btn-wit">
										<input type="submit" className="btn btn-default"/>
										<Link to="/"  className="btn btn-default">Previous</Link>
									  </div>
								</form>
							</div>
						</div>)}}
					</Mutation>);}
		}