import React from 'react';
import Loading from './Loading.js';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
import moment from 'moment';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import AddScheduleModalWindows from './AddScheduleModalWindows.js';
/* import './css/Schedule.css'; */
			

export default class Schedule extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			AdderScheduleState : false,
			currentLink : window.location.href,
			fields : {
				currentDate : "",
				},
		};
		this.handlerInputChange = this.handlerInputChange.bind(this);
		this.toggleAdderSchedule = this.toggleAdderSchedule.bind(this);
	}
	
	toggleAdderSchedule(){
		this.setState(prevState => {
			return {
				AdderScheduleState : !prevState.AdderScheduleState
			}
		});
	}
	handlerInputChange(event){
		const fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		this.setState({ fields });
		alert(event.target.value);
	}
	render(){
		let subFields = [
					{
						level : "Database Analysis",
						school : "Some certifies authorities M.I.T, University Of Stanford",
					},{
						level : "Network technologies",
						school : "Cisco System Inc",
					},{
						level : "API GraphQL",
						school : "Facebook Inc",
					},{
						level : "Database Analysis",
						school : "Some certifies authorities M.I.T, University Of Stanford",
					},
				];
				const GET_SCHEDULE = gql`
							query getScheduler($promotionId: String, $creator: String,$currentDate : String) {
							  getScheduler(promotionId: $promotionId, 
								creator: $creator,currentDate:$currentDate) {
								promotionId
								sessions{
								  courseId
								  courseName
								  endingDay
								  startDay
								  startingtime
								  endingtime
								}
							  }
							}
							`;
	let promotionId ="5dda49065232b51c88da601e", creator = "5dd83d6db770581478f9b273";
	let { currentDate } = this.state.fields;
	return (
			<Query query={GET_SCHEDULE} variables={{ promotionId,creator,currentDate }}>
				{({ data :{ getScheduler },loading, error})=>{
					if (loading || !getScheduler) {
						return <div>Loading ...</div>;
					  }
		return (<div>
					{this.state.AdderScheduleState ? (<AddScheduleModalWindows 
															AdderSchedule={this.toggleAdderSchedule}
															promotionId={promotionId}
															creator ={creator}
													/>) : null }
					<div className="history-schedule">
						<div>History schedule</div>
						<div>
							{subFields.map((elt) => (<div className="one-field">
								<div className="header-field">{elt.level}</div>
									<div  className="ca-field">
										<Link to="/cv" >{elt.school}</Link>
									</div>
							</div>))}
						</div>
					</div>
					<div className="schedule-frame"> 
							<div className="schedule-header"> schedule course</div>
							<span>{currentDate}</span>
							<button className="btn"  onClick={this.toggleAdderSchedule}>
								<i className="fa fa-clock-o"/>
							</button>
							<label> currentDate
								<input type="date" 
										onChange={this.handlerInputChange} 
										value={this.state.fields.startingtime}
										name="currentDate"
								/>
							</label>
							<div>{getScheduler.sessions.map((session)=>(<div> 
									<div >
										<Link to={`/inner/Course/${session.courseId}`}>
											{session.courseName}
										</Link>
										<div>started at {moment(session.startDay).fromNow()}</div>
										<div>End {moment(session.endingDay).toNow()}</div>
									</div>
								</div>))}
							</div>
					</div>
				</div>)}}
			</Query>);
		}	
	}





				