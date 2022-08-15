import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";


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
}
export default class RatingWidget extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      stars: Array(5).fill(-1),
      rated: 0
    };
  }
  handleMouseOver = ( i ) => {
    let currentRating = this.state.rated;
    
    if ( currentRating > 0 ) {
      const hoverRatedStars = this.state.stars.slice();
      hoverRatedStars.fill( 0, currentRating, i );
      this.setState({ stars: hoverRatedStars });
    }
    else {
      const hoverStars = Array(5).fill(-1);
      hoverStars.fill( 0, 0, (i+1) );     
      this.setState({ stars: hoverStars});
    }
  }
  handleMouseOut = ()=>{
    let currentRating = this.state.rated;
    if ( currentRating > 0) {
      const resetRatedStars = this.state.stars.slice();
      resetRatedStars.fill( -1, currentRating, resetRatedStars.length );
      this.setState({stars: resetRatedStars});
    }
    else {
      const resetStars = this.state.stars.slice();
      resetStars.fill(-1, 0, resetStars.length );
      this.setState({stars: resetStars});
    }
  }
  
  handleClick = ( i )=>{
    const clickedStar = this.state.stars.slice();
    
    clickedStar.fill( 1, 0, i );
    clickedStar.fill(1, i, clickedStar.length );
      
    this.setState({
      stars: clickedStar,
      rated: i
    });
  }
  handleRating( rating ){
    return (<Rating rating={this.state.rated} />)
  }
  renderStar( i ){
    return (
      <Star 
        position={i}
        value={this.state.stars[i]} 
        rated={this.state.rated}
        onMouseEnter={ () => this.handleMouseOver(i) }
        onMouseLeave={ () => this.handleMouseOut() }
        onClick={ () => this.handleClick(i) }
        />
    );
  }
  render(){
    return (
      <div className='rating-stars-widget-outer'>
          <div className='rating-stars'>
			{this.renderStar(1)}
            {this.renderStar(2)}
            {this.renderStar(3)}
            {this.renderStar(4)}
            {this.renderStar(5)}
          </div>
		  <div>{this.handleRating( this.state.rated )}</div>
      </div>
    );
  }
}