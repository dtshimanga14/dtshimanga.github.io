import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';

import './css/Notifications.css';

import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import { GET_NOTIFICATIONS } from './queries.js';
import { ACCEPT_FRIENDS } from './mutations.js';

const NotifiyerHk = ({ hideMenuMessages }) => {
	  
	  let id = localStorage.getItem('user-token');
	  
	  const [ acceptFriendShip ] = useMutation(ACCEPT_FRIENDS);
	  const { loading, error, data, fetchMore } = useQuery(GET_NOTIFICATIONS,{ 
			variables: { id }
		});
	  if (loading) return (<div>'Loading...'</div>);
	  if (error) return `Error! ${error.message}`;
	  
	  let { getNotification }	= data;	
	  
	return (
		<div className="notif-frame" onClick={hideMenuMessages}>
			{getNotification.notifications.map((notification)=>{
				let { user } = notification;
				return(
				<div>
					<div className="flex-box-row">
						<div>
							<img className = "picture-owner-post" src={`http://localhost:8000/image/${user.avatar}`}/>
						</div>
						<div className="post-owner">
							<div>
								<Link to={`cv/${user._id}`} >{user.personals.username} {' '} {user.personals.middlename}</Link>
							</div>
							<div className="last-seen">{notification.mutualFriends} ami(e)s en commun </div>
							<button className="btn">
								<span className="text-button">Supprimer</span>
							</button>
							<button className="btn" onClick={()=>{
								acceptFriendShip({ variables: {
										answerer: getNotification.owner,
										asker: notification.owner,
										NotifId:notification.NotifId
									}
								});
							}}>
								<span className="text-button">Confirmer</span>
							</button>
						</div>
					</div>
				</div>
				)})}
			<hr/>
		</div>
	)
};
export default NotifiyerHk;