import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import Loading from './Loading.js';

import './css/SuggestionFriends.css';
import style from './scss/App.scss';

const GET_USER_ID = gql`
  query users{
	users {
		_id
	  }
	}
`; 

const newId = async () => {
	  const { users } = await cache.readQuery({ query: GET_USER_ID });;
	  return users._id;
};
export default class SuggestionFriends extends React.Component {
						     		
		constructor(props){
				super(props);
		}
		comonentDidMount(){

		}
		handlerNextSuggestion(){
			alert('hello next suggestion');
		}
		handlerPreviousSuggestion(){
			alert('hello previous suggestion');
		}
render(){
	const ADD_FRIENDS = gql`
			mutation friendshipQuery($answerer: String!,$asker:String!) {
			  friendshipQuery(answerer: $answerer, asker: $asker) {
				pageInfoUsers {
				  hasPreviousCursor
				  hasNextCursor
				  startCursor
				  endCursor
				}
				suggestions {
				  _id
				  isId
				  personals {
					username
					middlename
					firstname
					password
					picture
				  }
				  accountType
				  library
				}
			  }
			}`;
			
	
	return ((<div className="friends-suggestions" >
			<div className="suggestion-friends-name">
				<Link to={`cv/${friend._id}`}>
					<span>
						{friend.personals.username}
					</span>{' '}
					<span>
						{friend.personals.middlename}
					</span>
				</Link>
			</div>
			<div>
				<img className="suggestion-image" src="./photos/dan/dan.jpg"/>
			</div>
			<div className="suggestion-btn-frame">
			<Mutation 
				mutation={ADD_FRIENDS}
				update={(cache, { data: { friendshipQuery } }) => {
					const { suggestionsFriends } = cache.readQuery({ query: GET_USERS });
					cache.writeQuery({
					  query: GET_USERS,
					  data: { suggestionsFriends:  friendshipQuery},
					});
			}}>
				{(friendshipQuery, { data })=>{
					return (<button className="btn" onClick={()=>{
								friendshipQuery({ variables: { 
										answerer: this.props.id,
										asker: friend._id,
									}
								});
							}}>
								<i className="fa fa-link"/>
							</button>);
				}}
			</Mutation>
				<button className="btn">
					<i className="fa fa-feed"/>
				</button>
			</div>
			<div className="suggestion-fields-frame">
				<div className="suggestion-profession">
					Physician,degree Phd
				</div>
				<div className="suggestion-profession">
					Genetic biology at M.I.T
				</div>
			</div>
		</div>)
	}
}


