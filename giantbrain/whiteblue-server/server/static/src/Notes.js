	import React from 'react';
	import ReactDOM from 'react-dom';
	import 'whatwg-fetch';
	import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
	import Courses from './Courses.js';
	import moment from 'moment';

	import './css/Notes.css';

	export default class Notes extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				assessState : false,
			};
			this.toggleAssessContent = this.toggleAssessContent.bind(this);
		}
		toggleAssessContent(){
			this.setState(prevState => {
				return {
					assessState : !prevState.assessState
				};
			});
		}
		render (){ 
		let courseId = this.props.note.courseId;
			return (
				<div className="course-quotation" onClick={()=> this.toggleAssessContent()}>
					<span>{this.props.note.courseName}</span>
					<span className="note-cote">{this.props.sumNote}</span>
					<i className="show fa fa-ellipsis-h"/>
					{this.state.assessState	?(<div className="assess-quotation">
							<div>
								<span className="note-topic">Topic</span>
								<span className="view-courses">
									<Link to={`/inner/Course/${courseId}`}>
										view course
									</Link>
								</span>
							</div>
							{this.props.note.notes.map(
								(n)=>(<div>
										<Link to={`/inner/corrected/${n.idAssess}`}>
											{n.topic}
										</Link>
										<span className="note-quotation">{n.cote}</span>
										<span className="date-quotation">{moment(n.date).format('YYYY-MM-dd')}</span>
									</div>)
							)}
						</div>):null
					}
				</div>
			);
		}
	}