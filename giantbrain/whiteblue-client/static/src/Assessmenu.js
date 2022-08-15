import ReactDOM from 'react-dom';
import gql from "graphql-tag";
import moment from 'moment';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import Courses from './Courses.js';

import 'babel-polyfill';
import 'whatwg-fetch';

import './css/Notifications.css';

import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import { GET_NOTIFICATIONS } from './queries.js';
import { SAVE_RESPONDERS } from './mutations.js';



	const Assessmenu = ({ assessTab, hideMenuAssess }) => {
		
	  const [ onOpenAssessment ] = useMutation(SAVE_RESPONDERS);
	  
		return(
		<div className= "assess-zone">
			<div className= "assess-header-zone">
				Assessments
			</div><hr/>
			<div className= "assesses">
				{assessTab.map((assessOne) => {
						return (<div className="assess_menu" onClick={hideMenuAssess}>
									<span className="assess-topic">{assessOne.header}</span>
										{assessOne.done ? 
										(<div>
											<Link to="/corrected" >
												<button  onClick={()=>{
													localStorage.setItem('corrected-token',assessOne._id);
													onOpenAssessment({ variables: {
														ownerId: localStorage.getItem('user-token'), 
														assessId: assessOne._id 
													}})
												}}>
													See result
												</button>
											</Link>
										</div>) : (
										<Link to="/assessment" >
											<button  onClick={()=>{
												localStorage.setItem('evaluation-token',assessOne._id);
												onOpenAssessment({ variables: {
													ownerId: localStorage.getItem('user-token'), 
													assessId: assessOne._id 
												}})
											}}>
												start
											</button>
										</Link>)}
								<div>
										<span className="assess-course"><i className="fa fa-folder-o"/>{assessOne.courseId}</span><br/>	
										<span className="assess-release-hour"> Publish at  </span> <span className="text-align lower-case">{assessOne.startDay}</span>	
										<span className="assess-finish-hour">limit at  </span><span className="text-align lower-case">{assessOne.endDay}</span>	
										<span className="assess-finish-hour">limit at  </span><span className="text-align lower-case">{assessOne.duration}</span>	
									</div>
									<hr/>
								</div>)
				})}
			</div>
		</div>
		);
	};
	
	export default Assessmenu;