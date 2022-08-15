import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import gql from "graphql-tag";
import moment from 'moment';
import Loading from './Loading.js';
import React, { useState, useEffect } from 'react';

/* import './css/Chat.css'; */


import { GET_MESSAGES } from './queries.js';

const Star = ( props )=>{
  return (
    <div className={`star ${(props.value == 0) ? 'semi-active' : ''} 
			${(props.position <= props.rated) ? 'active' : ''}
		`} 
         onMouseEnter={ props.onMouseEnter }
         onMouseLeave={ props.onMouseLeave }
         onClick={ props.onClick }

    >
      <i className="fa fa-star"/>
    </div>
  );
}
const Rating = ( props )=> {
  const messages = {
    "1": "Poor content",
    "2": "medium",
    "3": "necessary",
    "4": "Well!", 
    "5": "Excellent"
  };
  
  let rating = props.rating;
  
  return(
      <div className={"after-rating-message " + ((rating > 0) ? 'show': '')} >
          <span>{ messages[rating] }</span>
      </div>
  );
};

const RatingStars = (  )=> {
	
	const star = Array(5).fill(-1);
	const [stars, setStars] = useState(star);
	const [rated, setRated] = useState(0);//currentRating
	  
	const handleMouseOver = ( i ) => {
		if ( rated > 0 ) {
		  const hoverRatedStars = stars.slice();
		  setStars(hoverRatedStars.fill( 0, rated, i ));
		}
		else {
		  const hoverStars = Array(5).fill(-1);
		  setStars(hoverStars.fill( 0, 0, (i+1) ));
		}
	  };
	const handleMouseOut = ()=>{
		if ( rated > 0) {
		  const resetRatedStars = stars.slice();
		  setStars(resetRatedStars.fill( -1, rated, resetRatedStars.length ));
		}
		else {
		  const resetStars = stars.slice();
		  setStars(resetStars.fill(-1, 0, resetStars.length ));
		}
	  };
	const handleClick = ( i ) => {
		const clickedStar = stars.slice();
		clickedStar.fill( 1, 0, i );
		
		setStars(clickedStar.fill(1, i, clickedStar.length ));
		setRated(i);
	  };
	const handleRating = ( rating )=> {
		return (<Rating rating={rated} />)
	  };
	  
	const renderStar = ( i )=> {
		return (
		  <Star 
			position={i}
			value={stars[i]} 
			rated={rated}
			onMouseEnter={ () => handleMouseOver(i) }
			onMouseLeave={ () => handleMouseOut() }
			onClick={ () => handleClick(i) }
			/>
		);
	  };
	  
	return(
		<div className='rating-stars-widget-outer'>
          <div className='rating-stars'>
			<renderStar i={1}/>
			<renderStar i={2}/>
			<renderStar i={3}/>
			<renderStar i={4}/>
			<renderStar i={5}/>
          </div>
		  <div>{handleRating( rated )}</div>
      </div>
	);
};

export default RatingStars;
