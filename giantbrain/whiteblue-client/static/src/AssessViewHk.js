import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';
import moment from 'moment';

import Loading from './Loading.js';

	
import { GET_CORRECTED } from './queries.js';
	
const AssessViewHk = () => {
	
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
		
		let ownerId	 = localStorage.getItem("user-token");
		let promotionId	 = "5dda49065232b51c88da601e";
		
		const { loading, error, data } = useQuery(GET_CORRECTED,{ 
			variables: { ownerId , promotionId }
		});
		
		if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { getMyCorrected } = data;
		
		return(
			<div className="row">
				<div className="col-sm-9 subscription-frame">
					<div className="fileds-header">Corrected Assessments</div>
					{getMyCorrected.map((elt) => 
						(<div className="fileds-subscribes">
							<div className="fields-name">
								<Link to={`/inner/Course/${elt.courseId._id}`}>
									{elt.courseId.name}
								</Link>
							</div>
							<div className="authors-name">
								Edit by : <Link to={`/inner/cv/${elt.teacherId._id}`} >
									{Object.values(elt.teacherId.personals).join(' ')}
										</Link>
							</div>
							<div className="fileds-description">{elt.description}</div>
							<div className="fields-frame-btn">
								<button className="btn fileds-btn">
									<i className="fa fa-question"/>
									<div className="fields-icon-layer" >{elt.questionList.length}</div>
								</button>
								{elt.done ? 
									(<div>
										<div className="number-follows">start at {elt.starttime}</div>
										<div className="number-follows">end at {elt.endttime}</div>
										<div className="number-follows">made along </div>
									</div>): 
									<div>You didnt perform that assessment </div>}
								<Link to={`/corrected/${elt._id}`}>
									<button className="btn fileds-btn">
										<i className="fa fa-link"/>
										Read
									</button>
								</Link>
								<button className="btn fileds-btn">
									<i className="fa fa-link"/>
									Share
								</button>
							</div>
						</div>)
					)}
				</div>
				<div className="col-sm-3 col-sm-offset-9 subcribed-fields">
				{subFields.map((elt) => (<div className="one-field">
											<div className="header-field">{elt.level}</div>
												<div  className="ca-field">
													<Link to="/cv" >{elt.school}</Link>
												</div>
										</div>)
				)}
				</div>
		</div>);
};
export default AssessViewHk ;