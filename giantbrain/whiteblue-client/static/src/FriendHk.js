import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import {  Link } from 'react-router-dom';
import gql from "graphql-tag";
import moment from 'moment';

import './css/Mainmenu.css';




const FriendHk = ({ relations, kids, tutors, setChatsBoxVisibles }) => {
	
  return (<div className= "size-friend-zone">
			<div  className= "inner-friend-zone">
				<div> tuteurs </div>
				{tutors.map((friend) => (<div>
						<div className="friend_plholder" onClick={() => setChatsBoxVisibles(friend)}>
							<img className="friend" 
								src={friend.avatar !== '' ? 
								`http://localhost:8000/image/${friend.avatar}` : 
								"./photos/defaults/user.jpg"}
							/>
							<span className="names-friends">
								{friend.personals.firstname}  {friend.personals.middlename}</span>
							<span>
								<div  className={friend.isConnected ? "connected-green-status" :"connected-gray-status"}/>
							</span>
							<div className="last-seen">{moment(friend.lastSeenOnline).fromNow()}</div>
						</div>
				</div>))}
				<div> Enfant(s) </div>
				{kids.map((friend) => (<div>
						<div className="friend_plholder" onClick={() => setChatsBoxVisibles(friend)}>
							<img className="friend" 
								src={friend.avatar !== '' ? 
								`http://localhost:8000/image/${friend.avatar}` : 
								"./photos/defaults/user.jpg"}
							/>
							<span className="names-friends">
								{friend.personals.firstname}  {friend.personals.middlename}</span>
							<span>
								<div  className={friend.isConnected ? "connected-green-status" :"connected-gray-status"}/>
							</span>
							<div className="last-seen">{moment(friend.lastSeenOnline).fromNow()}</div>
						</div>
				</div>))}
				<div> Ami(e)s </div>
				{relations.map((friend) => (<div>
						<div className="friend_plholder" onClick={() => setChatsBoxVisibles(friend)}>
							<img className="friend" 
								src={friend.avatar !== '' ? 
								`http://localhost:8000/image/${friend.avatar}` : 
								"./photos/defaults/user.jpg"}
							/>
							<span className="names-friends">
								{friend.personals.firstname}  {friend.personals.middlename}</span>
							<span>
								<div  className={friend.isConnected ? "connected-green-status" :"connected-gray-status"}/>
							</span>
							<div className="last-seen">{moment(friend.lastSeenOnline).fromNow()}</div>
						</div>
				</div>))}
			</div>
		</div>);
}

export default FriendHk;