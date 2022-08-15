	import ReactDOM from 'react-dom';
	import 'babel-polyfill';
	import { Link } from 'react-router-dom';
	import gql from 'graphql-tag';
	import moment from 'moment';
	import { Query, Mutation } from 'react-apollo';
	import 'whatwg-fetch';

	import Loading from './Loading.js';
	import CertDispatcher from './CertDispatcher.js';
	import ShareCert from './ShareCert.js';
	import Notes from './Notes.js';
	import BarHk from './BarHk.js';
	
	
	import React, { useState, useEffect } from 'react';
	import { useQuery, useApolloClient } from '@apollo/client';
	
	import './css/Quotation.css';
	
	import { GET_MY_CLOSERS_FRIENDS, GET_CERTIFICAT, GET_MY_CERTIFICAT } from './queries.js';
	import { PLUG_USERS_CERTIFICAT_MUT } from './mutations.js';
	//import { GET_PROFIL } from './subscriptions.js';

	


	let emitter = {
					university : 'University of Kinshasa',
					option : 'Electrical and Computer science',
					orientation : 'Database management and administration',
					faculty : 'Polytechnic',
					level : 'Second',
					year : '2015-2016',
					logo : './photos/university/unikin.jpg',
					signBy : 10,
				};

	const CertificatsHk = ( ) => {
		
		const [isLoading, setIsLoading] = useState(true);//shareCloserFriends shareCloserState bool
		const [shareWithClosers, setShareWithClosers] = useState(true);//shareCloserFriends shareCloserState bool
		const [certificatMenu, setCertificatMenu] = useState(true);//toggleMenuCertificats certificatsMenuState bool
		const [toggleShareSN, setToggleShareSN] = useState(true);//toggleShareVia shareViaState bool
		
		let certificatId = localStorage.getItem('certificat-tokn');
		console.log(certificatId);
		
		const { loading, error, data } = useQuery(GET_CERTIFICAT,
					{ variables: {  
						certificatId
					}});
		  if (loading) return (<div>'Loading...'</div>);
		  if (error) return `Error! ${error.message}`;
		  
		let { getCertificat } = data;
		let countCourse = getCertificat.courses.length;
			let reduceNote = getCertificat.courses.map(
				(note) =>{
					let count = note.notes.length;
					let sumNote = note.notes.reduce(
						(accumulator,currentValue,currentIndex,array) =>{
							return ((accumulator+(currentValue.cote)/count)/(20*countCourse))*100
						},0
					);
					return Math.round(sumNote);
				}).reduce(
						(accumulator,currentValue,currentIndex,array) =>{
							return (accumulator+currentValue)
						},0
					);
				
			let mapNote = getCertificat.courses.map(
				(note) =>{
					let count = note.notes.length;
					let sumNote = note.notes.reduce(
						(accumulator,currentValue,currentIndex,array) =>{
							return Math.round(accumulator+(currentValue.cote)/count)
						},0
					);
					return (<Notes note={note} sumNote={sumNote} />);
			});
			
		return (
			<div className="row">
				<BarHk />
				<div className="col-md-10 quotation-main-frame">
				<div className="row">
					<div className="col-md-12">
						<div className="list-nav-certificat">
							<ol className="">
								<button className="btn btn-bottom-border" onClick={()=>setShareWithClosers(!shareWithClosers)}>
									<i className="fa fa-plug"/>
								</button>
								<button className="btn" onClick={()=>setToggleShareSN(!toggleShareSN)}>
										<i className="fa fa-send-o"/>
								</button>
								<button className="btn btn-bottom-border" onClick={()=>setCertificatMenu(!certificatMenu)}>
									<i className="fa fa-mortar-board"/>
								</button>
							</ol>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="row">
									<img src="../photos/university/unikin.jpg"/>
								</div>
								<div className="row">
									<div>
										FACULTY OF POLYTECHNIC
									</div>
									<div>
										{emitter.university}
									</div>
									<div>
										B.P 255 Kinshasa XI
									</div>
									<div>
										DEMOCRATIC REPUBLIC OF CONGO
									</div>
								</div>
								<div  className="col-md-6">
									<div>
										<span className="names-quotation">
											NAME :{' '} {Object.values(getCertificat.owner.personals).join(' ')}
										</span>
									</div>
									<div>
										<span className="names-quotation">YEAR OF STUDY :</span>
										{emitter.level}
										<span className="names-quotation"> LEVEL ENGINEERING</span>
									</div>
									<div>ACADEMIC YEAR : {emitter.year}</div>
									<div>SESSION : FIRST</div>
								</div>
								</div>
							</div>
							<div className="row" >
								<div className=""> Assessment results </div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div className="row-assess">COURSE</div>
									<div  className="row-assess">NOTE</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										{getCertificat.courses.map(
											(note) =>{
												let count = note.notes.length;
												let sumNote = note.notes.reduce(
													(accumulator,currentValue,currentIndex,array) =>{
														return Math.round(accumulator+(currentValue.cote)/count)
													},0
												);
												return (<Notes note={note} sumNote={sumNote} />);
										})}
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<div>FINAL RESULT : {reduceNote} % SATISFACTION</div>
										<div>Done at Kinshasa on date here</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
				)
	};
	export default CertificatsHk;
	