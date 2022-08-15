import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import 'whatwg-fetch';
import 'babel-polyfill';

	
export default class NotePusherModalWindows extends React.Component {
						     	
	constructor(props){
			super(props);
			this.state = {
				topic : 'Api GraphQL with node.js',
			};
		}
	render(){
				return(
					<div>
						<div className="over-frame-modal"/>
						<div className="subscription-form-frame" >
							<div>Insert Assess results </div>
							<div>
								<select className="teacher-course-selecter" onChange={(e)=> alert("hello"+e.target.value)}>
									{courses.map((course) => {
										return (<option value={course._id}>
													{course.name}
												</option>)
									})}
								</select>
							</div>
							<div>
								<select className="teacher-course-selecter" onChange={(e)=> alert(evt.target.value)}>
									{this.props.pupils.map((pupil) => {
										return (<option value={pupil._id}>
													{pupil.personals.username}
													{' '}
													{pupil.personals.username}
												</option>)
									})}
								</select>
							</div>
							<div>
								<select className="teacher-course-selecter" onChange={(e)=> alert(evt.target.value)}>
									{[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((pupil) => {
										return (<option value={pupil}>{pupil}</option>)
									})}
								</select>
							</div>
						</div>
					</div>
				);
		}
	}