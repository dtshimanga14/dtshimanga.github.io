import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';

import Loading from './Loading.js';

	export default class Corrected extends React.Component {
				constructor(props){
					super(props);
          this.state = {
            cursorQuestionState : 0,
			currentQuestion : "",
			currentAnswer : "",
          };
          this.nextQuestion = this.nextQuestion.bind(this);
          this.previousQuestion = this.previousQuestion.bind(this);
          this.pushedQuestion = this.pushedQuestion.bind(this);
		  this.ChoiceAnswers = this.ChoiceAnswers.bind(this);
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
				render(){
					const GET_ASSESS = gql`
					query getCorrectedAssess ($assessId: String, $ownerId: String){
					  getCorrectedAssess(assessId: $assessId, ownerId: $ownerId) {
						_id
						Id
						header
						fields
						promotionId
						courseId {
						  _id
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
						  correctAnswer
						  answer
						  assertions {
							text
							answerId
						  }
						}
					  }
					}
						`;
		let ownerId = localStorage.getItem("userId");
						
		const assessId = this.props.match.params.id.toString();
		
		const  { cursorQuestionState } = this.state;
		return (
			<Query query={GET_ASSESS} variables={{ assessId ,ownerId  }}>
				{({ data :{ getCorrectedAssess },loading, error})=>{
					if (loading || !getCorrectedAssess) {
						return <Loading />;
					  }
					 let qlst = getCorrectedAssess.questionList[cursorQuestionState];
					 let correctAnswer = qlst.assertions.find((assert) =>( assert.answerId === qlst.correctAnswer));
					 let assertionAnswer = qlst.assertions.find((assert) =>( assert.answerId === qlst.answer));
					 let others = qlst.assertions.filter((assert) =>(assert.answerId !== qlst.correctAnswer));
					return (
							<div className="col-lg-12 content-position" >
								<div className="row" >
									<div className="col-lg-6 fixed-position more-rised-position white-space shadow-style">
										<div className="person-name"> Par 
											<span > {Object.values(getCorrectedAssess.teacherId.personals).join(' ')}</span></div>
										<div className="course-name"> {getCorrectedAssess.courseId.name}</div>
										<div className="topic-name"> Topic : {getCorrectedAssess.header}</div>
										<div > Available time {getCorrectedAssess.endDay} - {getCorrectedAssess.startDay}</div>
										<div id="Bar">
					  						<div id="time-flow"/>
										</div>
									</div>
									<div className="row" >
										<div className="col-lg-6 core_asset" >
											<div>
												<span  className="questions"> 
													Question :{getCorrectedAssess.questionList[cursorQuestionState].text}
												</span>
											</div>
											<div>
												<ul>
												{correctAnswer ?(<li className='correct-assertion'>{correctAnswer.text}</li>):null}
												{assertionAnswer ?(<li className='correct-assertion'>{assertionAnswer.text}</li>):null}
													{others.map((assertion,key)=> (<li className="">{assertion.text}</li>))}
												</ul>
											</div>	
										</div>
									</div>
								</div>
								<div className="pagination" >
									  <a href="#" onClick={()=> this.previousQuestion()}><i className="fa fa-chevron-left"/></a>
									   {getCorrectedAssess.questionList.map(
											(d,index)=>(<a href="#" onClick={()=> this.pushedQuestion(d,index)}>{index+1}</a>)
										)}
									  <a href="#" onClick={()=> this.nextQuestion()}><i className="fa fa-chevron-right"/></a>
								</div> 
							</div>
							)}}
			</Query>);
				}	
			
		}