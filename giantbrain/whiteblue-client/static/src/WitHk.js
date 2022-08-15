
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { BrowserRouter as Router, Switch, Route, useLocation,Link, NavLink,Redirect } from 'react-router-dom';	
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient,useSubscription } from '@apollo/client';

import { GET_SUGGESTED_COURSES, GET_MESSAGES_TWO } from './queries.js';
import { MESSAGE_CREATED } from './subscriptions.js';

const Comments = () => {
	
  const { data: { messageCreated }, loading } = useSubscription(MESSAGE_CREATED);
  const { loaded, error, data } = useQuery(GET_MESSAGES_TWO);
   if (loaded) return (<div>'Loading...'</div>);
   if (error) return `Error! ${error.message}`;
  let { messagesQL } = data;
   return <h4>New comment: {messagesQL.content} {!loading && messageCreated.content}</h4>;
};

const WitHk = ({ togglePosterProps }) => {
  
  let id = localStorage.getItem('user-token');
  const [cursorWit, setCursorWit] = useState(0);
  const { loading, error, data } = useQuery(GET_SUGGESTED_COURSES,{ variables: { id }});
  
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  
	let { getSuggestedCourse } = data;
	
  return (
	<div className="wit-frame">
		{getSuggestedCourse==[] ?  (<div className="wit-header">
			What may be you don t know about
		 </div>):
		 (<div>
			<div className="wit-header">
				What may be you don t know about
				<span className="wit-field">{getSuggestedCourse[cursorWit].name}</span>
			 </div><hr/>
			 <div className="wit-core">
				<div className="wit-flex-box">
					<div className="previous-wit" onClick={()=> this.previousWit()}>
					  <button className="btn">
						<i className="fa fa-chevron-left"/>
					  </button>
					</div>
					<div className="wit-content">
					  {getSuggestedCourse[cursorWit].summary}
					</div>
					<div className="next-wit" onClick={()=> this.nextWit()}>
					  <button className="btn">
						<i className="fa fa-chevron-right"/>
					  </button>
					</div>
				</div>
				<span className="wit-authors">
				  Author 
					<Link to={`/inner/cv/${getSuggestedCourse[cursorWit].teacherId._id}`}  className="home-btn" >
					  <span className="author-text">{getSuggestedCourse[cursorWit].teacherId.personals.username} 
					  {getSuggestedCourse[cursorWit].teacherId.personals.middlename}</span>
					</Link>
				</span>
				<span className="wit-approvaler">
				  Approve by
				  {getSuggestedCourse[cursorWit].approvedBy.map(approver => (
					<Link to={`/inner/cv/${approver._id}`}  className="home-btn" >
					  <span className="author-text">{approver.personals.username}
					  {approver.personals.middlename}</span>
					</Link>
				  ))}
				</span>
				<span >100 ,34 ,{getSuggestedCourse[cursorWit].likers.length} ,
				{getSuggestedCourse[cursorWit].dislikers.length} </span>
			  </div><hr/>
		 </div>)}
		  <div className="group-btn-wit">
			<button className="btn">
				<i className="fa fa-thumbs-down"/>
			</button>
			<button className="btn">
				<i className="fa fa-share"/><span className="text-button">Share</span>
			</button>
			<button className="btn">
				<i className="fa fa-file-o"/><span className="text-button">Read</span>
			</button>
			<button className="btn" onClick={()=> togglePosterProps()}>
				<i className="fa fa-paper-plane-o"/><span className="text-button">Post</span>
			</button>
		  </div>
	</div>);
}

export default WitHk;