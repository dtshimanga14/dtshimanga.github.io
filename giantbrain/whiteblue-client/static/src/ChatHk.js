import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import moment from 'moment';
import Loading from './Loading.js';
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import './css/Chat.css';


import { GET_MESSAGES } from './queries.js';
import { CHATS_MUT } from './mutations.js';
import { CHAT_SUB } from './subscriptions.js';


const ChatBox = ({ messages, firstOwner, secondOwner }) => {
	
  const { data , loading} = useSubscription(CHAT_SUB, { variables: { secondOwner, firstOwner } });

  if (loading) 
	  return (<div className="chat-box">
				{messages.map((message) =>(
					<div>
						<div className="chat-time">{moment(message.when).format('MMMM Do YYYY, h:mm:ss a')}</div>
						<span className="delete-hook-left"><i className="fa fa-ellipsis-h"/></span>
						<div className={message.digitalSign === firstOwner ? 'me-chat delete-hook-left':'you-chat delete-hook-right'}>
							{message.text}
						</div>
					</div>))}
				</div>);
	
	let { onChat } = data;			
  
	return (<div className="chat-box">
			{onChat.messages.map((message) =>(
				<div>
					<div className="chat-time">{moment(message.when).format('MMMM Do YYYY, h:mm:ss a')}</div>
					<span className="delete-hook-left"><i className="fa fa-ellipsis-h"/></span>
					<div className={message.digitalSign === firstOwner ? 'me-chat delete-hook-left':'you-chat delete-hook-right'}>
						{message.text}
					</div>
				</div>))}
			</div>)
	
};


const ChatHk = ({ closeChatBox,_id,personals,ownerId }) => {

  let firstOwner = ownerId;
  let secondOwner = _id;
  
  const [message, setMessage] = useState("");
  
  const [ chats ] = useMutation(CHATS_MUT);
  const { loading, error, data } = useQuery(GET_MESSAGES,{ 
			variables: { firstOwner , secondOwner }
		});
  
   const submit = async (event) => {
		event.preventDefault();
		chats({
		  variables: { 
			firstOwner,secondOwner,
			digitalSign: firstOwner,
			text: message }
		});
		setMessage('');
  };		
  
  
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  let { messages } = data.chats;
  return (<div className="chats-frame">
			<span  className="margin-right-10">
				<div  className={true ? "connected-status-chat-green" :"connected-status-chat-gray"}/>
			</span>
			<div className="peer-chat">
				<Link to={`cv/${_id}`}>
					<a href="#" title="view cv">
						{personals.username}  {personals.middlename}
					</a>
				</Link>
			</div>
			<div className="icon-right-chat">
				<span  className="cursor-image"> 
					<i className="fa fa-user-plus"/>
				</span>
				<span className="cursor-image">
					<i className="fa fa-minus"/>
				</span >
				<span   className="cursor-image" onClick={()=> closeChatBox(_id)}> 
					<i className="fa fa-times"/>
				</span >
			</div>
			<ChatBox 
				messages={messages}
				firstOwner={firstOwner}
				secondOwner={secondOwner}
			/>
			<div className="editor-box">
			  <form onSubmit={submit}>
				<input className="input-chat"  
					value={message} 
					onChange={({ target }) => setMessage(target.value)} 
				/>
			  </form>
			</div>
		</div>);
}

export default ChatHk;
