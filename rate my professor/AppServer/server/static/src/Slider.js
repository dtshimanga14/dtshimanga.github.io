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

const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-left" aria-hidden="true"></i>
    </div>
  );
}


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={()=>{
		props.onLoadMoreResult();
		props.goToNextSlide();
	}}>
      <i className="fa fa-arrow-right" aria-hidden="true"></i>
    </div>
  );
}  

export default class Slider extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			suggestLeng : 0,
		};
	}
	comonentDidMount(){
	}
	render(){
		let { suggestLenth } = this.props;
		return(<div className="card-slider">
				<LeftArrow goToPrevSlide={this.props.goToPrevSlide} />
				<RightArrow 
					goToNextSlide={()=> this.props.goToNextSlide(suggestLenth)} 
					onLoadMoreResult={()=> this.props.onLoadMore()}
				/>
			<div className="flex-suggestion-frame" style={{
				transform: `translateX(${this.props.translateValue}px)`,
				transition: 'transform ease-out 0.45s'
			  }}>
			{this.props.suggestions.map((friend,key) =>
				(<div className="friends-suggestions" >
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
							<button className="btn" onClick={()=>
								this.props.propsFriendshipQuery({ 
									variables: { 
										answerer: this.props.ownerId,
										asker: friend._id,
							}})}>
								<i className="fa fa-link"/>
							</button>
							<button className="btn" >
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
			)}
		</div>
	</div>)}
}


