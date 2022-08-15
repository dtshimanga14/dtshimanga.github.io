
import React from 'react';
import {  Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
	
export default class FoldersView extends React.Component {
			constructor(props){
				super(props);
			}
			render(){
				let courses = [{
						fieldName : "database analysis",
						summary : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
						authories : [{
							username : "Robert",
							middlename : "Zhu",
							entreprise : "Alphabet Inc.",
						},]
					},{
						fieldName : "network technologies",
						summary : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
						authories : [{
							username : "Robert",
							middlename : "Zhu",
							entreprise : "Alphabet Inc.",
						},]
					},{
						fieldName : "systeme administration",
						summary : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
						authories : [{
							username : "Robert",
							middlename : "Zhu",
							entreprise : "Alphabet Inc.",
						},]
					},{
						fieldName : "biology genetic",
						summary : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
						authories : [{
							username : "Robert",
							middlename : "Zhu",
							entreprise : "Alphabet Inc.",
						},]
					},
				];
				let subFields = [
					{
						level : "Database Analysis",
						school : "Some certifies authorities M.I.T, University Of Stanford",
					},{
						level : "Network technologies",
						school : "Cisco System Inc",
					},{
						level : "API GraphQL",
						school : "Facebook Inc",
					},{
						level : "Database Analysis",
						school : "Some certifies authorities M.I.T, University Of Stanford",
					},
				];
			const GET_COURSE = gql`
							query getCourses ($promotionId: String){
							  getCourses (promotionId: $promotionId){
									_id
									createdDate
									lastUpdate
									promotionId
									name
									summary
									teacherId {
									  _id
									  personals {
										username
										middlename
										firstname
									  }
									}
									approvedBy {
									  _id
									  personals {
										username
										middlename
										firstname
									  }
									}
									ponderation
									likers
									dislikers
								  }
							}
						`;
			let promotionId	 = localStorage.getItem("promotionId");
			
		return (<Query query={GET_COURSE} variables={{ promotionId }}>
				{({ data :{ getCourses },loading, error})=>{
					if (loading || !getCourses) {
						return (<Loading />);
					  }
				return (<div className="row">
						<div className="col-sm-10 subscription-frame">
							<div className="fileds-header">Courses folders</div>
							{getCourses.map((elt) => 
								(<div className="fileds-subscribes">
									<div className="fields-name">
										<Link to={`/inner/Course/${elt._id}`}>
											{elt.name}
										</Link>
									</div>
									<div className="authors-name">
										Edit by : <Link to={`/inner/cv/${elt.teacherId._id}`} >
													{Object.values(elt.teacherId.personals).join(' ')}
												</Link>
									</div>
									  <div>Approve by : {elt.approvedBy.map((approver) =>
											 (<div >
												<Link to={`/inner/cv/${approver._id}`} >
													{Object.values(approver.personals).join(' ')}
												</Link>
											  </div>))}
									  </div><span className="number-follows">2 days</span>
									<div className="fileds-description">{elt.summary}</div>
									<div className="fields-frame-btn">
										<button className="btn fileds-btn">
											<i className="fa fa-question"/>
											<div className="fields-icon-layer" >15</div>
										</button>
										<button className="btn fileds-btn">
											<i className="fa fa-link"/>
											Question
										</button>
										<button className="btn fileds-btn">
											<i className="fa fa-link"/>
											Read
										</button>
										<button className="btn fileds-btn">
											<i className="fa fa-link"/>
											Share
										</button>
									</div>
								</div>)
							)}
						</div>
						<div className="col-sm-3 col-sm-offset-9 subcribed-fields">
						{subFields.map((elt) =>(<div className="one-field">
													<div className="header-field">{elt.level}</div>
														<div  className="ca-field">
															<Link to="/cv" >{elt.school}</Link>
														</div>
												</div>)
						)}
						</div>
				</div>)}}
			</Query>);
			}
		}