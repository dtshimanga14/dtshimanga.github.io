import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import moment from 'moment';
import 'babel-polyfill';
import Loading from './Loading.js';
import './css/Schedule.css';
	
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';

import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';

import { GET_ASSESS_Q } from './queries.js';
import { SAVE_ANSWERS } from './mutations.js';

const AssessmentHk = () => {
	
	let assessId = localStorage.getItem('evaluation-token');
	let ownerId = localStorage.getItem('user-token');
	
	const [cursor, setCursor] = useState(0);//cursorQuestionState
	const [currQuest, setCurrQuest] = useState("");//currentQuestion
	const [currAnswer, setCurrAnswer] = useState("");//currentAnswer
	const [timeline, setTimeLine] = useState(0);//timeFlowState
	
	const timeFlow = ( ) => setTimeLine((prev) => (prev+1));
	
	const onAnswer = (e) => setCurrAnswer(e.target.value);//ChoiceAnswers
	
	const pushedQuestion = (d,index) => {//pushedQuestion
		let { questId } = d;
		console.log(questId);
		setCursor(index);
		setCurrQuest(questId);
	};
        
	const previousQuestion = () => {//previousQuestion
		setCursor((prev)=>(prev-1));
	};	
	const nextQuestion = () => {//nextQuestion
		setCursor((prev)=>(prev+1));
	};
    
	const [ onSubmitAnswersToQuestions ] = useMutation(SAVE_ANSWERS);	
	
	const { loading, error, data } = useQuery(GET_ASSESS_Q,{
		variables: { assessId }
	});
  
	
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
	let { getAnAssess } = data;
	
	return(
		<div className="row fixed-position" >
			<div className="col-md-12" >
					<div className="row" >
						<div className="col-md-12  more-rised-position white-space shadow-style">
							<div className="person-name"> Par <span > {Object.values(getAnAssess.teacherId.personals).join(' ')}</span></div>
							<div className="course-name"> {getAnAssess.courseId.name}</div>
							<div className="topic-name"> Topic : {getAnAssess.header}</div>
							<div > Available time {getAnAssess.endDay} - {getAnAssess.startDay}</div>
							<div id="Bar">
								<div id="time-flow" style={{ width : `${timeline}%` }}/>
							</div>
						</div>
					</div>
					<div className="row" >
					{currQuest ===""?
						(<div className="middle-center">
							Consign or description
						</div>):(<div className="col-md-7 core_asset" >
								<div>
									<span  className="questions">
										Question :{getAnAssess.questionList[cursor].text}
									</span>
								</div>
								<div>
									{getAnAssess.questionList[cursor].assertions.
											map((assertion,key)=> (
											  <div>
												<input type="radio" onChange={(e)=> onAnswer(e)} id={key} 
													value={assertion.answerId} name="answer" 
												/>
												<label htmlFor={key}>{assertion.text}</label>
											  </div>  
											))
									  }
								</div>	
								<button onClick={()=>{
									console.log(ownerId);
									console.log(currAnswer);
									console.log(assessId);
									console.log(currQuest);
									onSubmitAnswersToQuestions({ variables: {
										ownerId , answerId : currAnswer,
										assessId, questId: currQuest,
									}})
								}}>
									send
								</button>
					</div>)}
					</div>
				</div>
				<div className="pagination">
					  <a href="#" onClick={()=> previousQuestion()}><i className="fa fa-chevron-left"/></a>
					   {getAnAssess.questionList.map(
							(d,index)=>(<a href="#" onClick={()=> pushedQuestion(d,index)}>{index+1}</a>)
						)}
					  <a href="#" onClick={()=> nextQuestion()}><i className="fa fa-chevron-right"/></a>
				</div> 
			</div>
	);
};
export default AssessmentHk;
