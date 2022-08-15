import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import 'whatwg-fetch';
import 'babel-polyfill';
import Loading from './Loading.js';
	
	
moment.locale('en');
export default class AddScheduleModalWindows extends React.Component {
						     	
	constructor(props){
			super(props);
			this.state = {
				fields : {
					promotionId : "5dda49065232b51c88da601e",
					courseId : "",
					creator : "5dd83d6db770581478f9b273",
					endingdate : "",
					startingdate : "",
					endingtime : "",
					startingtime : "",
					dayOfWeek : "",
				},
			};
			this.handlerInputChange = this.handlerInputChange.bind(this);
		}
	handlerInputChange(event){
		const fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		this.setState({ fields });
		alert(event.target.value);
	}
	render(){
			var monthTab = moment.weekdays();
			const GET_COURSE = gql`
							query getCourses ($promotionId: String){
							  getCourses (promotionId: $promotionId){
									_id
									promotionId
									name
								  }
							}
						`;
			const ADD_SCHEDULE = gql`
				mutation onAddSessionToScheduler($promotionId : String,$creator: String, 
					$courseId : String,$startingtime: String, $endingtime: String, 
					$dayOfWeek : String, $endingdate : String, $startingdate: String){
				  onAddSessionToScheduler(promotionId: $promotionId, 
						creator: $creator,courseId: $courseId, startingtime: $startingtime,
						endingtime :$endingtime,dayOfWeek: $dayOfWeek,
						endingdate: $endingdate,startingdate: $startingdate){
					promotionId
					sessions {
					  courseId
					  courseName
					  dayOfWeek
					  startDay
					  endingDay 
					}
				  }
				}
				`;
				
			let { promotionId,courseId,startingtime,
					creator,endingdate,dayOfWeek,startingdate,endingtime }	 = this.state.fields;
			return (<Query query={GET_COURSE} variables={{ promotionId }}>
				{({ data :{ getCourses },loading, error})=>{
					if (loading || !getCourses) {
						return (<Loading />);
					  }
				return(
					<div>
						<div className="over-frame-modal"/>
						<div className="subscription-form-frame" >
							<div>
								<label htmlFor="courseId">Course </label>
								<select name="courseId" value={this.state.fields.courseId}
									onChange={this.handlerInputChange}
								>
								{getCourses.map((course)=>
								   (<option value={course._id}>
										{course.name}
									</option>)
									)}
								</select>
							</div>
							<div>
								<label htmlFor="startingdate">Day Of start </label>
								<input type="date" 
									onChange={this.handlerInputChange} 
									name="startingdate"
								/>
							</div>
							<div>
								<label htmlFor="promotionLevel">Day Of Ending </label>
								<input type="date"
									onChange={this.handlerInputChange} 
									name="endingdate"
								/>
							</div>
							<div>
								<label htmlFor="dayOfWeek">Every day Of week </label>
								<select name="dayOfWeek" 
										id="pays" 
										value={this.state.fields.dayOfWeek}
										onChange={this.handlerInputChange}
								>
								{[{day :"Sun",fullDay : "Sunday"},{day :"Mon",fullDay : "Monday"},
									{day :"Tue",fullDay : "Tuesday"},{day :"Wed",fullDay : "Wednesday"},
								{day :"Thu",fullDay : "Thurday"},{day :"Fri",fullDay : "Friday"},
								{day :"Sat",fullDay : "Saturday"}]
								  .map((dayOfWeek)=>
								   (<option value={dayOfWeek.day}>
										{dayOfWeek.fullDay}
									</option>)
									)}
								</select>
							</div>
							<div>
								<label htmlFor="startingtime">At</label>
								<input type="time" 
									onChange={this.handlerInputChange} 
									name="startingtime"
									value={this.state.fields.startingtime}
									/>
							</div>
							<div>
								<label htmlFor="endingtime">Untill </label>
								<input type="time" 
									onChange={this.handlerInputChange} 
									value={this.state.fields.endingtime}
									name="endingtime"/>
							</div>
							<div>
								<button className="btn"  onClick={this.props.AdderSchedule}>
									Previous
								</button>
								<Mutation mutation={ADD_SCHEDULE}>
									{(onAddSessionToScheduler, { data })=>{
										return (<button className="btn"  onClick={() => {
													  onAddSessionToScheduler({ variables: { 
															promotionId,creator,
															courseId, 
															startingtime,
															endingtime,
															dayOfWeek,
															endingdate,
															startingdate
												}});}}>
													Submit
												</button>)
									}}
								</Mutation>
							</div>
						</div>	
					</div>
				)}}
			</Query>);
		}
	}