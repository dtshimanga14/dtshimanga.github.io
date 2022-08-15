import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';

import './css/Notifications.css';

export default class Notifications extends React.Component {							
	constructor(props){
			super(props);
	}

	render(){
		const ACCEPT_FRIENDS = gql`
			mutation acceptFriendShip($answerer: String!,$asker: String!,$NotifId:String!) {
			  acceptFriendShip(answerer: $answerer,asker: $asker,NotifId:$NotifId) {
				owner
				notifications{
				  NotifId
				  owner
				  message
				  time
				  status
				  answer
				}
			  }
			}`;
		let id = this.props.owner;
		const GET_NOTIFICATIONS = gql`query ($id : String!){
								  getNotification(id: $id) {
									owner
									notifications {
									  NotifId
									  owner
									  message
									  time
									  status
									  answer
									}
								  }
								}`;		
			return (<Query query={GET_NOTIFICATIONS} variables={{ id }}>
					{({ data: { getNotification }, loading}) => {
					  if (loading) {
						return <div>Loading ...</div>;
					  }
					  return (<div className="notif-frame" onClick={this.props.hideMenuMessages}>
								{getNotification.notifications.map((notification)=>(
									<div>
										<i className="fa fa-birthday-cake"/>
										{notification.message}
										<span>{notification.time}</span>
										<Mutation 
											mutation={ACCEPT_FRIENDS}
											update={(cache, { data: { acceptFriendShip } }) => {
												const { getNotification } = cache.readQuery({ query: GET_NOTIFICATIONS });
												cache.writeQuery({
												  query: GET_NOTIFICATIONS,
												  data: { getNotification:  acceptFriendShip},
												});
										}}>
											{(acceptFriendShip, { data })=>{
												return (<button className="btn" onClick={()=>{
															acceptFriendShip({ variables: {
																	answerer: getNotification.owner,
																	asker: notification.owner,
																	NotifId:notification.NotifId
																}
															});
														}}>
															accept
														</button>);
											}}
										</Mutation>
									</div>
								))}
								<hr/>
							</div>)
					}}
				  </Query>);
		}
}