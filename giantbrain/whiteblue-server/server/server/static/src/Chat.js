import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation,Subscription } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
import './css/Chat.css';


const ONCHATSTREAM_SUBS = gql`
	subscription{
	   messages {
		id
		digitalSign
		when
		text
	  }
	}`;


class Messages extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore({
      document: ONCHATSTREAM_SUBS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) 
			return prev;
        return Object.assign({},prev.chats,{
			messages: [
            ...prev.chats.messages,
            subscriptionData.data.messages,
          ]});
      },
    });
  }

  render() {
		return (<div className="chat-box">
				{this.props.messages.map((message) =>(
					<div>
						<div className="chat-time">{moment(message.when).format('MMMM Do YYYY, h:mm:ss a')}</div>
						<span className="delete-hook-left"><i className="fa fa-ellipsis-h"/></span>
						<div className={message.digitalSign === this.props.firstOwner ? 'me-chat delete-hook-left':'you-chat delete-hook-right'}>
							{message.text}
						</div>
					</div>))}
				</div>);
		}
}	


export default class Chat extends React.Component {
						     		
		constructor(props){
			super(props);
			this.closeChat = this.closeChat.bind(this);
			
		}
		state = {message : ""};
		
		OnChangeState = (evt)=> {
			evt.preventDefault();
			let message = evt.target.value;
			alert('here i am'+ message);
		}
		OnFormSubmit= (e) =>{
			e.preventDefault();
			alert('welcom to chat system');
		}
		closeChat(){
			this.props.filterChat(this.props._id);
		}
		render(){
				
			const CHATS_MUT = gql`
			mutation chats($firstOwner: String!, $secondOwner: String!,$digitalSign: String!,$text: String!, ){
			  addChats( firstOwner : $firstOwner,secondOwner:$secondOwner,
					 digitalSign : $digitalSign,text : $text){
						secondOwner
						firstOwner
						messages {
							id
							digitalSign
							when
							text
						}
				  }
				}
			`;
			const GET_MESSAGES = gql`
			  query chats($firstOwner: String!, $secondOwner: String!){
				  chats(firstOwner: $firstOwner, secondOwner: $secondOwner) {
					firstOwner
					secondOwner
					messages {
					  id
					  digitalSign
					  when
					  text
					}
				  }
			}
			`;	
				let input;
				let firstOwner = this.props.ownerId;
				let secondOwner = this.props._id;
		return (
			<Query query={GET_MESSAGES} variables={{ firstOwner,secondOwner }}>
				{({ data ,loading, error, subscribeToMore})=>{
					if (loading || !data) {
						return <div>Loading ...</div>;
					  }
				return(
					<div className="chats-frame">
					<span  className="margin-right-10">
						<div  className={this.props.isConnected ? "connected-status-chat-green" :"connected-status-chat-gray"}/>
					</span>
					<div className="peer-chat">
						<Link to={`cv/${this.props._id}`}>
							<a href="#" title="view cv">
								{this.props.personals.username}  {this.props.personals.middlename}
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
						<span   className="cursor-image" onClick={this.closeChat}> 
							<i className="fa fa-times"/>
						</span >
					</div>
					<Messages
					  messages={data.chats.messages}
					  subscribeToMore={subscribeToMore}
					  firstOwner={firstOwner}
					/>
					<div className="editor-box">
						<Mutation mutation={CHATS_MUT} >
							{(chats, { data })=>{
								return (<form
									onSubmit={(e) => {
									  e.preventDefault();
									  chats({ variables: { 
													firstOwner: firstOwner, 
													secondOwner: this.props._id,
													digitalSign: firstOwner,
													text: input.value
												}
										});
									  input.value = "";
									}}
								  >
									<input 
										ref={node => {
											input = node;
										  }}
										className="input-chat" 
									/>
								</form>)
							}}
						</Mutation>
					</div>
				</div>
				)}}
			</Query>);
		}
}


