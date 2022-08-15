import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import moment from 'moment';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import React, { useState, useEffect, Component } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import { ADD_SCHOOL } from './mutations.js';
import Map from './Map.js'; 


const CreateSchoolHk = ({ toggleSchooler }) => {
	 
	  let ownerId = localStorage.getItem('user-token');
	  
	  const [schoolName, setSchoolName] = useState("");
	  const [email, setEmail] = useState("");
	  const [phone, setPhone] = useState("");
	  const [lat, setLat] = useState(41.0082); 
	  const [lng, setLng] = useState(28.9784);
	  const [alt, setAlt] = useState(0);
	  const [logo, setLogo] = useState("");
	  const [country, setCountry] = useState("");
	  const [state, setState] = useState("");
	  const [town, setTown] = useState("");
	  const [township, setTownship] = useState("");
	  const [street, setStreet] = useState("");
	  const [number, setNumber] = useState("24356");
	  const [reference, setReference] = useState("");
	  
	/* useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=> {
				console.log(position);
				setLng(position.coords.longitude);
				setLat(position.coords.latitude);
		});
	  }
	},[]); */
	
	
	  const [ addInstitut, result ] = useMutation(ADD_SCHOOL);
	  const submit = async (event) => {
		event.preventDefault();
		addInstitut({
			  variables: { 
				ownerId , country , state , 
				town , township , street , number , reference,
				latitude : lat, longitude : lng, 
				schoolName
			  }
			});
			setSchoolName("");setEmail("");setCountry("");
			setState("");setTown("");setTownship("");
			setStreet("");setNumber("24356");setReference("");
			setPhone("");setLat(41.0082); setLng(28.9784);
			setAlt(0);setLogo("");setStreet(""); 
	  };
	  
	return (<div>
				<div className="windows-modal"/>
				<div className="schools-form-frame" >
					<div>Create Institution </div>
					<form  onSubmit={submit}>
						<div className="">
							<label className="col-md-5">Institution name</label>
							<input 
								name="schoolName" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="Institution name..."
								value={schoolName}
								onChange={({ target }) => setSchoolName(target.value)}
							/>
						</div>
						<div className="">
							<label className="col-md-5">email</label>
							<input 
								name="email" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="email..."
								value={email}
								onChange={({ target }) => setEmail(target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="col-md-5">Phone</label>
							<input 
								name="phone" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="Phone..."
								value={phone}
								onChange={({ target }) => setPhone(target.value)}/>
						</div>
						<div className="form-group">
							<label className="col-md-5">Country</label>
							<input 
								name="country" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="Country..."
								value={country}
								onChange={({ target }) => setCountry(target.value)}/>
						</div>
						<div className="form-group">
							<label className="col-md-5">State</label>
							<input 
								name="state" 
								className="col-md-offset-2 col-md-7" 
								placeholder="State..."
								value={state} type="text" 
								onChange={({ target }) => setState(target.value)}/>
						</div>
						<div className="form-group">
							<label className="col-md-5">Town</label>
							<input 
								name="town" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="Town..." 
								value={town}
								onChange={({ target }) => setTown(target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="col-md-5">township</label>
							<input 
								name="township" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="township..." 
								value={township}
								onChange={({ target }) => setTownship(target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="col-md-5">Street</label>
							<input 
								name="township" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="street..." 
								value={street}
								onChange={({ target }) => setStreet(target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="col-md-5">Reference</label>
							<input 
								name="township" 
								className="col-md-offset-2 col-md-7" 
								type="text" 
								placeholder="reference..." 
								value={reference}
								onChange={({ target }) => setReference(target.value)}
							/>
						</div>
					  <div className="">
						<button className="btn">Get Location</button>
						<span className="coordinates">coordinates</span>
						<Map 
							id="myMap"
							options={{ center: { lat , lng }, zoom: 8 }}
							onMapLoad={map => {
							  var marker = new window.google.maps.Marker({
								position: { lat , lng },
								map: map,
								title: 'Hello Istanbul!'
							  });
							}}
							setLat={setLat} 
							setLng={setLng}
					    />
					  </div>
					  <div className="">
						<button className="btn" onClick={toggleSchooler}>Previous</button>
						<input type="submit" className="btn btn-default"/>
					  </div>
				</form>
		</div>
</div>);
};

	
export default CreateSchoolHk;