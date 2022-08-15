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
	
/* 	import './css/Quotation.css'; */
	
		export default class Quotation extends React.Component {
			constructor(props){
				super(props);
				this.state = {
					isLoading : true,
					shareViaState : false,
					certificatsMenuState : false,
				};
				this.toggleShareVia = this.toggleShareVia.bind(this);
				this.toggleMenuCertificats = this.toggleMenuCertificats.bind(this);
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
			
			

				const GET_CERTIFICAT = gql`query ($certificatId: String!){
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
		const certificatId = this.props.match.params.id.toString();
				
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
								return (<Notes note={note} sumNote={sumNote}/>);
						});
					 return (<div className="quotation-main-frame">
							<div>
								<CertDispatcher viewer={getCertificat.viewer}/>
								<div className="quotation-header-frame">
									<span className="cert-ellipsis-left" onClick={()=>this.toggleMenuCertificats()}>
										<i className="fa fa-ellipsis-h"/>
									</span>
									{this.state.certificatsMenuState ? 
									(
										<div className="menu-certificats">
											2015 - 2016
											{this.props.fullCertificatId.map(
												(certificat)=>(
													<div>2015 - 2016 {certificat}</div>
												)
											)}
										</div>
									) 
									: null}
									<span className="cert-ellipsis" onClick={()=>this.toggleShareVia()}>
										<i className="fa fa-ellipsis-h"/>
									</span>
									{this.state.shareViaState ? <ShareCert /> : null}
									<div className="logo-frame">
										<img src="../photos/university/unikin.jpg"/>
										<div>
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
								</div>
								<div  className="identity-frame">
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
								<div className="tittle-assessment-result">Assessment results</div>
								<div className="assess-header">
									<div className="row-assess course-width">COURSE</div>
									<div  className="row-assess">NOTE</div>
								</div>
								<div>{mapNote}</div>
								<div className="assess-footer">
									<div>FINAL RESULT : {reduceNote} % SATISFACTION</div>
									<div>Done at Kinshasa on date here</div>
								</div>
						</div>
					</div>);
					}}
				  </Query>
				);
			}
		}
