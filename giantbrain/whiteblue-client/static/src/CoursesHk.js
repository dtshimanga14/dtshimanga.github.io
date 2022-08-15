import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Loading from './Loading.js';
import RatingStars from './RatingStars.js';
import BarHk from './BarHk.js';

import gql from "graphql-tag";
import moment from 'moment';

import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';
	
import { GET_MANUSCRIT } from './queries.js';

const Paragraph = (props) => {
  return (<div className="tab-chapter-head" onClick={props.changeSection}>
			{props.section.tittle}
		</div>
  );
}

const CoursesHk = (props) => {
	
	  let ownerId = localStorage.getItem('user-token');
	  let manuscritId = localStorage.getItem('course-tkn');
	
	const { loading, error, data } = useQuery(GET_MANUSCRIT,{ variables: { manuscritId }});
		
		if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { getManuscrit } = data;
		let { Content } = getManuscrit;
  return (
	<div className="col-sm-12">
		<RatingStars />
		<div id="editor-text" dangerouslySetInnerHTML={
			{__html: Content }
		}/>
	</div>);
}

export default CoursesHk;
