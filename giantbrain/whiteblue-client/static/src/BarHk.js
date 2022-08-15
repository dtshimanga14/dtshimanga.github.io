import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
import moment from 'moment';
import gql from 'graphql-tag';
import AddScheduleModalWindows from './AddScheduleModalWindows.js';
import './css/Schedule.css';
	
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';
	
	


const BarHk =(props)=> {
	
	  const [bar, setBar] = useState(false);//callStatus
	 
	return(
		 <div className="row">
			<Link to="/">
				<button className="btn btn-bottom-border">
					<i className="fa fa-home"/>
				</button>
			</Link>
			<Link to="/folders">
				<button className="btn btn-bottom-border">
					<span className="article-caret">
						<i className="fa fa-folder-o"/>
					</span>
				</button>
			</Link>
			<Link to="/assess">
				<button className="btn btn-bottom-border">
					<span className="article-caret">
						<i className="fa fa-folder-o"/>
					</span>
				</button>
			</Link> 
			{props.children}
			<Link to="/myteachers">
				<button className="btn btn-bottom-border">
					<span className="icon-position-admin">
						<i className="fa fa-group"/>
						<div className="bell-layer" >2</div>
					</span>
				</button>
			</Link>
			<Link to="/histories">
				<button className="btn btn-bottom-border">
					<span className="icon-position-admin">
						<i className="fa fa-road"/>
						<div className="bell-layer" >2</div>
					</span>
				</button>
			</Link>
			<Link to="/billing">
				<button className="btn btn-bottom-border">
					<span className="icon-position-admin">
						<i className="fa fa-money"/>
					</span>
				</button>
			</Link>
			<Link to="/libraries">
				<button className="btn btn-bottom-border">
					<span className="article-caret">
						<i className="fa fa-book"/>
					</span>
				</button>
			</Link>
			<Link to="/editor">
				<button className="btn btn-bottom-border">
					<span className="article-caret">
						<i className="fa fa-file-text"/>
					</span>
				</button>
			</Link>
			<Link to="/tags">
				<button className="btn btn-bottom-border">
					<span className="icon-position-admin">
						<i className="fa fa-bookmark"/>
						<div className="bell-layer" >2</div>
					</span>
				</button>
			</Link>
		</div>);
};
export default BarHk;

	