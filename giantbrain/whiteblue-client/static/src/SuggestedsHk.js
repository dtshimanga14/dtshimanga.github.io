import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';

import Loading from './Loading.js';
import Slider from './Slider.js';
/* import './css/SuggestionFriends.css';
import style from './scss/App.scss'; */

import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import { GET_SUGGESTED } from './queries.js';
import { ADD_FRIENDS } from './mutations.js';


const SuggestedsHk = ()=>{
	
		  let id = localStorage.getItem('user-token');	
		  const [startCursor, setStartCursor] = useState("");
		  const [endCursor, setEndCursor] = useState("");
		  const [currentIndex, setCurrentIndex] = useState(0);
		  const [translateValue, setTranslateValue] = useState(0);
  
		  const slideWidth = () => {
			 return document.querySelector('.friends-suggestions').clientWidth
		  };
		const goToPrevSlide = () => {
		  if(currentIndex === 0)
		   return;
			setCurrentIndex(currentIndex - 1);
			setTranslateValue(translateValue + slideWidth());
		  };

		const goToNextSlide = (suggestLenth) => {
			// Exiting the method early if we are at the end of the images array.
			// We also want to reset currentIndex and translateValue, so we return
			// to the first image in the array.
			if(currentIndex === suggestLenth - 1) {
				setCurrentIndex(0);
				setTranslateValue(0);
			  return null
			}
			// This will not run if we met the if condition above
			setCurrentIndex(currentIndex + 1);
			setTranslateValue(translateValue + -(slideWidth()));
		  }
		  
		const [ friendshipQuery,result ] = useMutation(ADD_FRIENDS,{
			onError: (error) => {
			  setError(error.graphQLErrors[0].message)
			}
		  });
	  const { loading, error, data, fetchMore } = useQuery(GET_SUGGESTED,{ 
			variables: { endCursor, startCursor, id }
		});
				
	  if (loading) return (<div>'Loading...'</div>);
	  if (error) return `Error! ${error.message}`;
	  
		let { suggestionsFriends } = data;
		let suggestLenth = suggestionsFriends.suggestions.length;
		
	return(<div className="suggestion-frame">
			<div className="suggestion-chevrons">
				<span className="left-chevrons" >
					<i className="fa fa-chevron-left"/>
				</span>
				<span className="right-chevrons" >
					<i className="fa fa-chevron-right"/>
				</span>
			</div>
			<Slider ownerId = {id}
				suggestions={suggestionsFriends.suggestions}
				propsFriendshipQuery = {friendshipQuery}
				translateValue = {translateValue}
				goToPrevSlide={goToPrevSlide}
				goToNextSlide={goToNextSlide}
				suggestLenth = {suggestLenth}
				onLoadMore={() =>
					fetchMore({
					  variables: {
						endCursor: suggestionsFriends.pageInfoUsers.endCursor,
					  },
					updateQuery: (prev, { fetchMoreResult }) => {
					  if (!fetchMoreResult) return prev;
						console.log(suggestionsFriends.pageInfoUsers.endCursor);
					  return Object.assign({}, prev, {
							pageInfoUsers : fetchMoreResult.suggestionsFriends.pageInfoUsers,
							suggestionsFriends : [...prev.suggestionsFriends.suggestions,
													...fetchMoreResult.suggestionsFriends.suggestions
												]
					  });
					 }
				})
			}/>
		</div>)
};
export default SuggestedsHk;

