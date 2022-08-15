import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

import Loading from './Loading.js';

	const GET_CHATS = gql`query ($firstOwner: String,$secondOwner : String){
						  chats(firstOwner: $firstOwner, secondOwner: $secondOwner) {
							_id
							firstOwner
							secondOwner
							messages {
							  digitalSign
							  text
							  when
							}
						  }
						}`;	
						
	const InnerChat = ({firstOwner,secondOwner}) => (<Query query={GET_CHATS} variables={{ firstOwner : firstOwner,secondOwner : secondOwner}}>
								{({ data: { chats  }, loading, fetchMore}) => {
								  if (loading) {
									return <Loading />;
								  }
								   if (!chats) {
									return <div />;
								  }
								  return (<div>
											{chats.messages.map((mes) => 
												(<div>
													<div className="chat-time">16:14:52</div>
													<div className={mes.digitalSign === "5cc0c2ca6176aed2cf4cae92" ? 'me-chat':'you-chat'}>
														{mes.text}
													</div>
												</div>))}
										</div>);
								}}
							  </Query>);

export default InnerChat;
							
					//let timeMessage = moment().format('HH:mm:ss');


