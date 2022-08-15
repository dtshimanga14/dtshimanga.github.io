import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import moment from 'moment';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import { CREATE_KID } from './mutations.js';

const KidsHk = ({ toggleKids }) => {
	
	  let parentId = localStorage.getItem('user-token');
	  
	  const [username, setUsername] = useState("");
	  const [firstname, setFirstname] = useState("");
	  const [middlename, setMiddlename] = useState("");
	  const [password, setPassword] = useState("");
	  const [email, setEmail] = useState("");
	  const [gender, setGender] = useState("");
	  const [confpassword, setConfpassword] = useState("");
	  
	const onGenre = (e) => {
		setGender(e.target.value);
		alert(e.target.value);
	};
	
	  const [ addKid,result ] = useMutation(CREATE_KID,{
		onError: (error) => {
		  setError(error.graphQLErrors[0].message)
		}
	  });
	  const submit = async (event) => {
		event.preventDefault();
		if(password !=="") {
			addKid({
			  variables: { 
				username ,password,
				middlename ,firstname,
				accountType : "Kid",
				gender ,
				parentId
			  }
			});
			setUsername("");setFirstname("");
			setMiddlename("");setPassword("");
			setEmail("");setConfpassword("");
		}
	  };
	  
	return (<div>
				<div className="windows-modal"/>
				<div className="kids-form-frame" >
					<div>Create account For Kids </div>
					<form  onSubmit={submit}>
						<div>
							<div className="row couple-label-input">
								<div className="form-group">
									<label className="col-md-5">Username</label>
									<input 
										name="username" 
										className="col-md-offset-2 col-md-7" 
										type="text" 
										placeholder="username..."
										value={username}
										onChange={({ target }) => setUsername(target.value)}
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
										value={middlename}
										onChange={({ target }) => setMiddlename(target.value)}
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
										value={firstname}
										onChange={({ target }) => setFirstname(target.value)}/>
								</div>
							</div>
							<div className="row couple-label-input">Sexe
								<input type="radio" id="m" value="M" name="genre" onChange={onGenre}/><label htmlFor="m" >M</label>
								<input type="radio" id="f" value="F" name="genre" onChange={onGenre}/><label htmlFor="f" >F</label>
							</div> 
							<div className="row couple-label-input">
								<div className="form-group">
									<label className="col-md-5">Password</label>
									<input 
										name="password" 
										className="col-md-offset-2 col-md-7" 
										type="password" 
										placeholder="password..."
										value={password}
										onChange={({ target }) => setPassword(target.value)}/>
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
										value={confpassword}
										onChange={({ target }) => setConfpassword(target.value)}/>
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
										value={email}
										onChange={({ target }) => setEmail(target.value)}
									/>
								</div>
							</div>
						  <div className="row group-btn-wit">
							<button className="btn" onClick={toggleKids}>Previous</button>
							<input type="submit" className="btn btn-default"/>
						  </div>
					</div>
				</form>
		</div>
</div>);
};

	
export default KidsHk;