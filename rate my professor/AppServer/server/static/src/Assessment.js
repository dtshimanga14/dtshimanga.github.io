import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';

import Loading from './Loading.js';

	export default class Assessment extends React.Component {
				constructor(props){
					super(props);
          this.state = {
            cursorQuestionState : 0,
			currentQuestion : "",
			currentAnswer : "",
			timeFlowState : 0,
          };
          this.nextQuestion = this.nextQuestion.bind(this);
          this.previousQuestion = this.previousQuestion.bind(this);
          this.pushedQuestion = this.pushedQuestion.bind(this);
		  this.ChoiceAnswers = this.ChoiceAnswers.bind(this);
		  this.timeFlow = this.timeFlow.bind(this);
		}
		timeFlow(){
			this.setState((prev )=> { 
				return { timeFlowState : prev.timeFlowState+1 }
			});
		}
		ChoiceAnswers(e){
			this.setState({ currentAnswer : e.target.value });
		}
        pushedQuestion(d,index){
			let { questId } = d;
          this.setState({ cursorQuestionState : index,
							currentQuestion : questId
		  });
        }
        previousQuestion(){
          let previousedQuestion = this.state.cursorQuestionState;
          let newpreviousedQuestion = previousedQuestion-1;
          this.setState({
                  cursorQuestionState : newpreviousedQuestion
          });
        }
        nextQuestion(){
          let followedQuestion = this.state.cursorQuestionState;
          let newfollowedQuestion = followedQuestion+1;
          this.setState({
                  cursorQuestionState : newfollowedQuestion
          });
        }
		componentDidMount(){
				this.forceInterval = setInterval(()=>this.timeFlow(),3000)
		}
		componentWillUnmount(){
			clearInterval(this.forceInterval)
		}
				render(){
					const GET_ASSESS = gql`
					query ($assessId: String){
					  getAnAssess(assessId: $assessId) {
							Id
							_id
							header
							fields
							promotionId
							courseId {
							  _id
							  createdDate
							  lastUpdate
							  name
							}
							teacherId {
							  _id
							  personals {
								username
								middlename
								firstname
							  }
							}
							description
							startDay
							endDay
							duration
							questionList {
							  questId
							  text
							  type
							  GAV
							  assertions {
								text
								answerId
							  }
							  correctAnswer
							}
						  } 
						}
						`;
						
						const SAVE_ANSWERS = gql`
									mutation onSubmitAnswersToQuestions($ownerId :String,$questId :String,$assessId :String,$answerId :String){
									  onSubmitAnswersToQuestions(ownerId :$ownerId,questId :$questId,assessId :$assessId,answerId :$answerId){
										starttime
										endtime
										ownerId
										assessId
										answersCorrect{
										  answerIdSubmit
										  questIdResponded
										  submitedtime
										}
									  }
									}
									`;
		const assessId = this.props.match.params.id.toString();
		let ownerId =  localStorage.getItem("userId");
		const  { cursorQuestionState } = this.state;
		return (
			<Query query={GET_ASSESS} variables={{ assessId }}>
				{({ data :{ getAnAssess },loading, error})=>{
					if (loading || !getAnAssess) {
						return <Loading />;
					  }
					return (
						<div className="row fixed-position" >
							<div className="col-md-12" >
									<div className="row" >
										<div className="col-md-12  more-rised-position white-space shadow-style">
											<div className="person-name"> Par <span > {Object.values(getAnAssess.teacherId.personals).join(' ')}</span></div>
											<div className="course-name"> {getAnAssess.courseId.name}</div>
											<div className="topic-name"> Topic : {getAnAssess.header}</div>
											<div > Available time {getAnAssess.endDay} - {getAnAssess.startDay}</div>
											<div id="Bar">
												<div id="time-flow" style={{ width : `${this.state.timeFlowState}%` }}/>
											</div>
										</div>
									</div>
									<div className="row" >
									{this.state.currentQuestion ===""?
										(<div className="middle-center">
					  						Consign or description
										</div>):(<div className="col-md-7 core_asset" >
												<div>
													<span  className="questions">
														Question :{getAnAssess.questionList[cursorQuestionState].text}
													</span>
												</div>
												<div>
													{getAnAssess.questionList[cursorQuestionState].assertions.
															map((assertion,key)=> (
															  <div>
																<input type="radio" 
																	id={key} 
																	value={assertion.answerId} 
																	name="answer"
																	onChange={(e)=>this.ChoiceAnswers(e)}
																/>
																<label for={key}>{assertion.text}</label>
															  </div>  
															))
													  }
												</div>	
												<Mutation mutation={SAVE_ANSWERS}>
													{(onSubmitAnswersToQuestions, { data })=>{
														return (<button onClick={()=>{
																	alert(ownerId);
																	onSubmitAnswersToQuestions({ variables: {
																		ownerId : ownerId,
																		answerId : this.state.currentAnswer,
																		assessId: id,
																		questId: this.state.currentQuestion,
																	}})
																}}>
																	send
																</button>)
													}}
												</Mutation>	
									</div>)}
									</div>
								</div>
								<div className="pagination">
									  <a href="#" onClick={()=> this.previousQuestion()}><i className="fa fa-chevron-left"/></a>
									   {getAnAssess.questionList.map(
											(d,index)=>(<a href="#" onClick={()=> this.pushedQuestion(d,index)}>{index+1}</a>)
										)}
									  <a href="#" onClick={()=> this.nextQuestion()}><i className="fa fa-chevron-right"/></a>
								</div> 
							</div>
							)}}
			</Query>);
				}	
			
		}