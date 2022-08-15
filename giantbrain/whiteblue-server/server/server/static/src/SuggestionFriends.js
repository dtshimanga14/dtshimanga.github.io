import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';

import Loading from './Loading.js';
import Slider from './Slider.js';
import './css/SuggestionFriends.css';
import style from './scss/App.scss';


export default class SuggestionFriends extends React.Component {
						     		
		constructor(props){
				super(props);
				this.state = {
					startCursor : "5dc085e10847871e44879736",
					endCursor :"5dc3290f644e5c04e0f63aca",
					currentIndex: 0,
					translateValue: 0
				};
			}
		comonentDidMount(){

		}
		slideWidth = () => {
			 return document.querySelector('.friends-suggestions').clientWidth
		}
		goToPrevSlide = () => {
			if(this.state.currentIndex === 0)
			  return;
			
			this.setState(prevState => ({
			  currentIndex: prevState.currentIndex - 1,
			  translateValue: prevState.translateValue + this.slideWidth()
			}))
		  }

		  goToNextSlide = (suggestLenth) => {
			// Exiting the method early if we are at the end of the images array.
			// We also want to reset currentIndex and translateValue, so we return
			// to the first image in the array.
			if(this.state.currentIndex === suggestLenth - 1) {
			  return this.setState({
				currentIndex: 0,
				translateValue: 0
			  })
			}
			
			// This will not run if we met the if condition above
			this.setState(prevState => ({
			  currentIndex: prevState.currentIndex + 1,
			  translateValue: prevState.translateValue + -(this.slideWidth())
			}));
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
					
			const GET_USERS = gql`query($id:String,$endCursor :String,$startCursor:String){
									  suggestionsFriends(endCursor: $endCursor, startCursor: $startCursor, id: $id) {
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
			let { startCursor ,endCursor  } = this.state;
			let suggestLenth;
			let id = localStorage.getItem("userId");
			return (<Query query={GET_USERS}  variables={{ id,endCursor,startCursor }}>
							{({ data: { suggestionsFriends  }, loading, fetchMore, subscribeToMore })=>{
								if (loading){
									return <div>Loading ...</div>;
								}else if(!suggestionsFriends){
									return <div>No suggestions to  render ...</div>;
								}
								suggestLenth = suggestionsFriends.suggestions.length;
								return (
								<div className="suggestion-frame">
									<div className="suggestion-chevrons">
										<span className="left-chevrons" >
											<i className="fa fa-chevron-left"/>
										</span>
										<span className="right-chevrons" >
											<i className="fa fa-chevron-right"/>
										</span>
									</div>
									<Mutation 
										mutation={ADD_FRIENDS}
										update={(cache, { data: { friendshipQuery } }) => {
											const { suggestionsFriends } = cache.readQuery({ query: GET_USERS });
											cache.writeQuery({
											  query: GET_USERS,
											  data: { suggestionsFriends :  friendshipQuery},
											});
									}}>
										{(friendshipQuery, { data })=>{
											return (<Slider 
														ownerId = {this.props.id}
														suggestions={suggestionsFriends.suggestions}
														propsFriendshipQuery = {friendshipQuery}
														translateValue = {this.state.translateValue}
														goToPrevSlide={this.goToPrevSlide}
														goToNextSlide={this.goToNextSlide}
														suggestLenth = {suggestLenth}
														onLoadMore={() =>
															fetchMore({
															  variables: {
																endCursor: suggestionsFriends.pageInfoUsers.endCursor,
															  },
															updateQuery: (prev, { fetchMoreResult }) => {
															  if (!fetchMoreResult) return prev;
																console.log(prev.suggestionsFriends.length+fetchMoreResult.suggestionsFriends.length);
															  return Object.assign({}, prev, {
																	pageInfoUsers : fetchMoreResult.suggestionsFriends.pageInfoUsers,
																	suggestionsFriends : [...prev.suggestionsFriends.suggestions,
																							...fetchMoreResult.suggestionsFriends.suggestions
																						]
															  });
															 }
													})}/>
													);
										}}
									</Mutation>
								</div>)}}
				</Query >);
			}
}


