import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';

export default class Friend extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let relations  = this.props.relations;
		return (<div className= "size-friend-zone">
					<div  className= "inner-friend-zone">
						{relations.map((friend) => (<div>
											<div className="friend_plholder" onClick={() => this.props.addChat(friend)}>
												<img className="friend" src={friend.personals.picture} />
												<span className="names-friends">  {friend.personals.firstname}  {friend.personals.middlename}</span>
												<span>
													<div  className={friend.isConnected ? "connected-green-status" :"connected-gray-status"}/>
												</span>
												<div className="last-seen">{moment(friend.lastSeenOnline).fromNow()}</div>
											</div>
									</div>))}
					</div>
				</div>)
		}	
	}