import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import AddTeacherModalWindows from './AddTeacherModalWindows.js';

import 'whatwg-fetch';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import Loading from './Loading.js';
	
import { GET_LOGS } from './queries.js';

import './css/Teachers.css';


const HistoriesHk = () => {
	
	const [sysdate, setSysdate] = useState(moment().format('YYYY-MM-DD'));//currentDate
	let  ownerId = localStorage.getItem('user-token');
	
	const onChange = (event) => {
		setSysdate(event.target.value);
		console(event.target.value);
	}
	const { loading, error, data, fetchMore } = useQuery(GET_LOGS,{
		variables: { ownerId, currentDate : sysdate }
	});
  
	
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
	let { getLogs } = data;
  
	return(
		<div className="schedule-frame">
			<div className="yardstick-frame">
				<span className="add-user-button">
					<i   className="fa fa-user-plus"/>
				</span>
				<span>
					<label htmlFor="promotionLevel">Activities on </label>
					<input type="date" onChange={onChange}  name="currentDate"/>
				</span>
				<label className="sort-teachers-label">Sort by</label>
			</div>
			<div className="teacher-main-frame">
				<div>Navigation historis</div>
				<div>
					<div>JUNE MONTH</div>
					{getLogs.pages.map((page)=>(<div>
							<Link to={page.links}>{page.linkName}</Link>
							<div>visited at {page.getInOn}</div>{' '}
							<div>leave at {page.getOutOn}</div>
						</div>))}
				</div>
			</div>
		 </div>
	);
};

export default HistoriesHk;

	
		