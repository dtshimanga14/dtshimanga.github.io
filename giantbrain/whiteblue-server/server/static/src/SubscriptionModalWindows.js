import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import 'whatwg-fetch';
import 'babel-polyfill';
import mentions from './mentions.js';

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
	
export default class SubscriptionModalWindows extends React.Component {
						     	
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
					},
			});
		}
		render(){

				return (
				<Mutation mutation={CREATE_USER}>
				{(addUser,{ data })=>{
					
					return(
						<div>
							<div className="over-frame-modal"/>
							<div className="subscription-form-frame" >
							
							
							<div className="subscription-wit-frame">
							<input type="button" className="btn" value="previous" onClick={
								()=>this.props.showSubscriptionModalWindows()
							}/>
								<form  onSubmit={() => {
									event.preventDefault();
									addUser({ variables: { 
												username : this.state.fields.username,
												password : this.state.fields.password,
												middlename : this.state.fields.middlename,
												firstname : this.state.fields.firstname,
												accountType : "PUPIL",
											}
									});
									this.handlerOnSubmit();
								}}>
									<div className="wit-header">
										Formulaire d'inscription
									</div><hr/>
									<div className="subscription-wit-core">
										<div className="couple-label-input">
											<div className="label-div-input"><label >Username</label></div>
											<input 
												name="username" 
												className="" 
												type="text" 
												placeholder="username..."
												value={this.state.fields.username}
												onChange={this.handlerInputChange}
											/>
										</div>
										<div className="couple-label-input">
											<label >Middlename</label>
											<input 
												name="middlename" 
												className="" 
												type="text" 
												placeholder="middlename..."
												value={this.state.fields.middlename}
												onChange={this.handlerInputChange}
											/>
										</div>
										<div className="couple-label-input">
											<label >Firstname</label>
											<input 
												name="firstname" 
												className="" 
												type="text" 
												placeholder="firstname..."
												value={this.state.fields.firstname}
												onChange={this.handlerInputChange}/>
										</div>
										<div className="couple-label-input">
											<label >Password</label>
											<input 
												name="password" 
												className="" 
												type="password" 
												placeholder="password..."
												value={this.state.fields.password}
												onChange={this.handlerInputChange}/>
										</div>
										
										<div className="couple-label-input">
											<label >E-mail</label>
											<input 
												name="email" 
												className="" 
												type="email" 
												placeholder="e-mail..." 
												value={this.state.fields.email}
												onChange={this.handlerInputChange}
											/>
										</div>
										<div className="couple-label-input">
											<label >Session</label>
											<input name="author" className="" type="text" placeholder="session..."/>
										</div>
										<div className="couple-label-input">
											<label >Level</label>
											<input name="author" className="" type="text" placeholder="level..."/>
										</div>
										<span className="wit-authors">
										  By 
											<Link to="/cv"  className="home-btn" >
											  <span className="author-text">Becky Gordon</span>
											</Link>
										</span>
									  </div><hr/>
									  <div className="group-btn-wit">
										<input type="submit" className="btn" />
										<input type="button" className="btn" value="previous" onClick={
											()=>this.props.showSubscriptionModalWindows()
										}/>
									  </div>
							</form>
						</div>
					</div>
				</div>
					);
				}}
				</Mutation>
				);
			}
		}