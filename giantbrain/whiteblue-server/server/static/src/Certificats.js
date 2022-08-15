	import React from 'react';
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
	
	import './css/Quotation.css';
	
		export default class Certificats extends React.Component {
			constructor(props){
				super(props);
				this.state = {
					isLoading : true,
					shareViaState : false,
					certificatsMenuState : false,
					shareCloserState : false,
				};
				this.toggleShareVia = this.toggleShareVia.bind(this);
				this.toggleMenuCertificats = this.toggleMenuCertificats.bind(this);
				this.shareCloserFriends = this.shareCloserFriends.bind(this);
			}
			shareCloserFriends(){
				this.setState(
					prevState =>{
						return {
							shareCloserState : !prevState.shareCloserState
						};
					}
				);
			}
			toggleMenuCertificats(){
				this.setState(
					prevState =>{
						return {
							certificatsMenuState : !prevState.certificatsMenuState
						};
					}
				);
			}
			
			toggleShareVia(){
				this.setState(
					prevState =>{
						return {
							shareViaState : !prevState.shareViaState
						};
					}
				);
			}
			render(){

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
			
			
				const GET_MY_CLOSERS_FRIENDS = gql`query getFriendsNoCertificats ($certificatId : String) {
													  getFriendsNoCertificats(certificatId: $certificatId) {
														_id
														personals {
														  username
														  middlename
														  firstname
														}
													  }
													}`;
				const GET_CERTIFICAT = gql`query ($certificatId: String){
											  getCertificat(id: $certificatId) {
												owner {
												  _id
												  personals {
													username
													middlename
													firstname
												  }
												}
												emitter
												courses {
												  courseName
												  courseId
												  notes {
													idAssess
													cote
													topic
													date
												  }
												  lastupdate
												  ponderation
												}
												year
												viewer {
												  _id
												  personals {
													username
													middlename
													firstname
													picture
												  }
												  lastSeenOnline
												}
											  }
											}`;	
											
		
		const GET_MY_CERTIFICAT = gql`query getMyCertificats($ownerId: String){
										  getMyCertificats (ownerId : $ownerId){
											_id
											year
										  }
										}`;	
		
		const PLUG_USERS_CERTIFICAT_MUT = gql`
			mutation plugToCertificatUsers($certificatId: String, $userId : String ){
			  plugToCertificatUsers( certificatId: $certificatId, userId : $userId){
				_id
				personals {
				  username
				  middlename
				  firstname
				}
			  }
			}
			`;
		
		const certificatId = this.props.match.params.id.toString();
		let ownerId = localStorage.getItem("userId");	
		return (<Query query={GET_CERTIFICAT} variables={{ certificatId }}>
					{({ data: { getCertificat }, loading }) => {
					  if (loading || !getCertificat) {
						return <div>Loading ...</div>;
					  }
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
					 return (<div className="row">
								<div className="col-md-10 quotation-main-frame"><div className="row">
									<div className="col-md-12">
										<div className="list-nav-certificat">
											<ol className="">
													<button className="btn btn-bottom-border" onClick={()=>this.shareCloserFriends()}>
														<i className="fa fa-plug"/>
													</button>
													<button className="btn" onClick={()=>this.toggleShareVia()}>
															<i className="fa fa-send-o"/>
													</button>
													<button className="btn btn-bottom-border" onClick={()=>this.toggleMenuCertificats()}>
														<i className="fa fa-mortar-board"/>
													</button>
											</ol>
										</div>
										<div className="quotation-header-frame">
											{this.state.certificatsMenuState ? 
											(<Query query={GET_MY_CERTIFICAT} variables={{ ownerId }}>
												{({ data: { getMyCertificats }, loading }) => {
												  if (loading || !getMyCertificats) {
													return <div>Loading ...</div>;
												  }
												  return(<div className="menu-certificats">
															{getMyCertificats.map(
																(certificat)=>(
																	<div>{certificat.year} {certificat._id}</div>
																)
															)}
														</div>);}}
											</Query>) 
											: null}
											{this.state.shareViaState ? <ShareCert /> : null}
											{this.state.shareCloserState ? 
											(<Query query={GET_MY_CLOSERS_FRIENDS} variables={{ certificatId }}>
												{({ data: { getFriendsNoCertificats }, loading }) => {
												  if (loading || !getFriendsNoCertificats) {
													return <div>Loading ...</div>;
												  }
												  return(<div className="users-certificats">
															{getFriendsNoCertificats.map(
																(user)=>(
																	<div>
																		<span>{user.personals.username} 
																			{user.personals.middlename}
																			{user.personals.firstname}
																		</span>
																		<Mutation mutation={PLUG_USERS_CERTIFICAT_MUT} >
																			{(plugToCertificatUsers, { data })=>{
																				return (
																				<button className="btn" onClick={()=>
																				plugToCertificatUsers({ variables: { 
																						certificatId : certificatId, 
																						userId : user._id
																					}})}>
																					<i className="fa fa-plug"/> Plug
																				</button>)
																			}}
																		</Mutation>
																	</div>))}
														</div>);}}
											</Query>)
											: null}
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
										<div className="row" >
											<div className=""> Assessment results </div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="row-assess">COURSE</div>
												<div  className="row-assess">NOTE</div>
											</div>
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
							<div className="col-md-2">
								<CertDispatcher viewer={getCertificat.viewer}/>
							</div>
							</div></div>);}}
						  </Query>);
						}
					}
