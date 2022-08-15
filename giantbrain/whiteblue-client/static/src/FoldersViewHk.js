import {  Link } from 'react-router-dom';
import 'whatwg-fetch';
import moment from 'moment';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import Loading from './Loading.js';
	
import { GET_COURSE } from './queries.js';




const FoldersViewHk = () => {
	
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
	let promotionId = "5f638456519d8b2e3cdb72dc";
	  
      
	const { loading, error, data } = useQuery(GET_COURSE,{ variables: { promotionId }});
	
	if (loading) return (<Loading />);
	if (error) return `Error! ${error.message}`;
	
	let { getCourses } = data;
	
	return(<div className="row">
			<div className="col-sm-10 subscription-frame">
				<div className="fileds-header">Courses folders</div>
				{getCourses.map((elt) => 
					(<div className="fileds-subscribes">
						<div className="fields-name">
								{elt.name}
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
						<div className="fields-frame-btn">
							<button className="btn fileds-btn">
								<i className="fa fa-question"/>
								<div className="fields-icon-layer" >15</div>
							</button>
							<button className="btn fileds-btn">
								<i className="fa fa-link"/>
								Question
							</button>
							<Link to="/course" >
								<button className="btn fileds-btn" onClick={
									()=> localStorage.setItem('course-tkn',elt._id)
								}>
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
			{subFields.map((elt) =>(<div className="one-field">
										<div className="header-field">{elt.level}</div>
											<div  className="ca-field">
												<Link to="/cv" >{elt.school}</Link>
											</div>
									</div>)
			)}
			</div>
	</div>)
};

export default FoldersViewHk;
