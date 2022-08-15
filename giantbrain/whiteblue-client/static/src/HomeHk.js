import ReactDOM from 'react-dom';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import Frame from './Frame.js';
import WitHk from './WitHk.js';
import FriendHk from './FriendHk.js';
import PosterHk from './PosterHk.js';
import ChatHk from './ChatHk.js';
import SuggestedsHk from './SuggestedsHk.js';
import CreateSchoolHk from './CreateSchoolHk.js'; 
import KidsHk from './KidsHk.js'; 

import { GET_POSTS } from './queries.js';
import { MESSAGE_CREATED } from './subscriptions.js';
import { MESSAGE_UPLOADED } from './mutations.js';

import './css/Home.css';
			
const HomeHk = ({ kid, toggleKids, toggleSchooler , schooler }) => {
	
  let id = localStorage.getItem('user-token');
  let ownerId = id, startCursor = "", endCursor = "";
  
  const [friendsChat, setFriendsChatBox] = useState([]);
  const [loadedState, setloadedState] = useState("");
  const [posterToggle, setPosterToggle] = useState(false);
  
  const setChatsBoxVisibles = (userBox) => {
	  if(friendsChat.find(index => index._id == userBox._id)){
			return null
		}else{
		  let newChatBoxVisibles = friendsChat.concat(userBox);
		  setFriendsChatBox(newChatBoxVisibles)
		}
  };
  const closeChatBox = (index) => {
	  let newChatBoxVisibles = friendsChat.filter((c) => ( c._id !== index));
	  setFriendsChatBox(newChatBoxVisibles)
  };
  	 
	

  const listchats = friendsChat.map((c,index) => <ChatHk {...c} ownerId={ownerId} closeChatBox={closeChatBox}/>);
  
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_POSTS,{ 
				variables: { id ,ownerId , startCursor , endCursor }
			});
  
	
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
	let { users, getPosts } = data;
	
		  return (<div className="row">
					{posterToggle ? 
					(<PosterHk 
						setPosterToggle={() =>setPosterToggle(!posterToggle)}
						refresh={() => refetch()}
					/>) : null}
					<div className="chats-zone">
						{listchats}
					</div>
					{kid ? (<KidsHk toggleKids={toggleKids}/>):null} 
					{schooler ? (<CreateSchoolHk toggleSchooler={toggleSchooler}/>):null}
					<div  className="col-md-12">
						<div  className="row">
							<div  className="col-md-12">
								{getPosts.posts!==[] ?
								(<Frame id={users._id} 
									onLoadMore={() =>{
										return fetchMore({
											  query: GET_POSTS,
											  notifyOnNetworkStatusChange: true,
											  variables: {
												id : users._id, ownerId: users._id,
												startCursor : getPosts.pageInfoPost.startCursor,
												endCursor: getPosts.pageInfoPost.endCursor,
											  },
											 updateQuery : (prev, { fetchMoreResult }) => {
											   if (!fetchMoreResult) return prev;
											   console.log("startCursor "+fetchMoreResult.getPosts.pageInfoPost.startCursor);
											   console.log("endCursor "+fetchMoreResult.getPosts.pageInfoPost.endCursor);
											   return Object.assign({}, prev, {
												 getPosts : {
													pageInfoPost : fetchMoreResult.getPosts.pageInfoPost,
													posts : [...prev.getPosts.posts, ...fetchMoreResult.getPosts.posts ]
												}
											  });
											 }
										  })
										}}
									posts={getPosts.posts} 
								/>)
								:(<div>None post to print</div>)}
							</div>
						</div>
					</div>
					<div  className="col-md-3">
						<FriendHk 
							relations={users.friends} 
							kids ={users.kids} tutors ={users.tutors}
							setChatsBoxVisibles={setChatsBoxVisibles} />
					</div>
				</div>);
			}

export default HomeHk;
