import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';
import moment from 'moment';

import { CREATE_USER } from './mutations.js';

const SubscriberMW = () => {
	
	const [Form, setForm] = useState({ username: "", firstname: "",middlename : "", password: "",email: "" });//username
	const [ addUser ] = useMutation(CREATE_USER);
  
	const resetForm = (event) => {
		setUsername("");setFirstname("");
		setMiddlename("");setPassword("");
		setEmail("");
	};
	const manageFields = (e) => {
		setForm({...Form, [e.target.name] : e.target.value });
	};
	return(
		<div>
			<div className="over-frame-modal"/>
			<div className="subscription-form-frame" >
				<div className="subscription-wit-frame">
				<input type="button" className="btn" value="previous" onClick={
					()=>alert("hello world")
				}/>
					<form  onSubmit={() => {
						event.preventDefault();
						addUser({ variables: { 
							username : Form.username, password : Form.password,
							middlename: Form.middlename, firstname: Form.firstname,
							accountType : "PUPIL",
						}});
						resetForm();
					}}>
						<div className="wit-header">
							Formulaire d'inscription
						</div><hr/>
						<div className="subscription-wit-core">
							<div className="couple-label-input">
								<div className="label-div-input"><label >Username</label></div>
								<input 
									name="username" value={Form.username} className="" type="text" placeholder="username..."
									onChange={manageFields}
								/>
							</div>
							<div className="couple-label-input">
								<label >Middlename</label>
								<input 
									name="middlename" value={Form.middlename} className="" type="text" placeholder="middlename..."
									onChange={manageFields}
								/>
							</div>
							<div className="couple-label-input">
								<label >Firstname</label>
								<input 
									name="firstname" value={Form.firstname} className="" type="text" placeholder="firstname..."
									onChange={manageFields}
								/>
							</div>
							<div className="couple-label-input">
								<label >Password</label>
								<input 
									name="password" value={Form.password} className="" type="password" placeholder="password..."
									onChange={manageFields}
								/>
							</div>
							
							<div className="couple-label-input">
								<label >E-mail</label>
								<input 
									name="email" value={Form.email} className="" type="email" placeholder="e-mail..."
									onChange={manageFields} 
								/>
							</div>
							<div className="couple-label-input">
								<label >Session</label>
								<input name="author" className="" type="text" placeholder="session..."
								/>
							</div>
							<div className="couple-label-input">
								<label >Level</label>
								<input name="author" className="" type="text" placeholder="level..."
								/>
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
							<input type="button" className="btn" value="previous" />
						  </div>
				</form>
			</div>
		</div>
	</div>
	);
};


export default SubscriberMW;
