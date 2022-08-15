import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
import AddTeacherModalWindows from './AddTeacherModalWindows.js';

import './css/Teachers.css';

	export default class Histories extends React.Component {
			
		constructor(props){
			super(props);
			this.state = {
				currentDate : moment().format('YYYY-MM-DD'),
			};
		this.handlerInputChange = this.handlerInputChange.bind(this);
		}
	handlerInputChange(event){
		this.setState({ currentDate  : event.target.value });
		alert(event.target.value);
	}
		render (){ 
		const GET_LOGS = gql`query getLogs ($ownerId: String, $currentDate: String){
								  getLogs(ownerId: $ownerId, currentDate: $currentDate) {
									ownerId
									currentDate
									pages {
									  id
									  links
									  linkName
									  getInOn
									  getOutOn
									}
								  }
								}
								`;
			let  ownerId = "5dd137d95390a5064468978f";
	        let { currentDate } = this.state;
		return (<Query query={GET_LOGS} variables={{ ownerId,currentDate }}>
				{({ data :{ getLogs },loading, error})=>{
					if (loading || !getLogs) {
						return (<Loading />);
					  }
		  return (<div className="schedule-frame">
					<div className="yardstick-frame">
						<span className="add-user-button">
							<i   className="fa fa-user-plus"/>
						</span>
						<span>
							<label htmlFor="promotionLevel">Activities on </label>
							<input type="date" onChange={this.handlerInputChange}  name="currentDate"/>
						</span>
						<label className="sort-teachers-label">Sort by</label>
					</div>
					<div className="teacher-main-frame">
						<div>Navigation historis</div>
						<div>
							<div>JUNE MONTH</div>
							{getLogs.pages.map((page)=>(<div>
									<Link to={page.links}>{page.linkName}</Link>
									<div>visited at {page.getInOn}</div>{' '}
									<div>leave at {page.getOutOn}</div>
								</div>))}
						</div>
					</div>
				 </div>)}}
			</Query>);
				}
	}