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
/* import './css/SuggestionFriends.css';
import style from './scss/App.scss'; */




const SuggestedsHk = ()=>{
	return(<div className="suggestion-frame">
			<div className="suggestion-chevrons">
				<span className="left-chevrons" >
					<i className="fa fa-chevron-left"/>
				</span>
				<span className="right-chevrons" >
					<i className="fa fa-chevron-right"/>
				</span>
				stream files
			</div>
		</div>)
};
export default SuggestedsHk;

