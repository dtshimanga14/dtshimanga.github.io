import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import moment from 'moment';
import { useQuery, useApolloClient , useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import Loading from './Loading.js';

import { GET_MY_CORRECTED } from './queries.js';

const Button = ({ type = "primary", children, onClick }) => (
  <button className={`btn btn-${type}`} onClick={onClick}>
    {children}
  </button>
);

const CorrectedHk = ({ match }) => {
	
	  let ownerId = localStorage.getItem('user-token');
	  const assessId = localStorage.getItem('corrected-token')//match.params.id.toString();
		
	  const [cursorQuest, setCursorQuest] = useState(0);//cursorQuestionState
	  const [currentQuest, setCurrentQuest] = useState("");//currentQuestion
	  const [currentAns, setCurrentAns] = useState("");//currentAnswer
	  
	  
		const ChoiceAnswers = (e) => {
			setCurrentAns(e.target.value);
		};
        const pushedQuestion = (d,index) => {
			let { questId } = d;
			setCurrentQuest(questId);
			setCursorQuest(index);
        };
        const previousQuestion = () => {
		  setCursorQuest(prev => prev-1);
        };
        const nextQuestion = () => {
		  setCursorQuest(prev => prev+1);
        };
		
	  const { loading, error, data } = useQuery(GET_MY_CORRECTED,
			{ variables: { assessId, ownerId }
		});
	  
	  if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { getCorrectedAssess } = data;
		
		 let qlst = getCorrectedAssess.questionList[cursorQuest];
		 let correctAnswer = qlst.assertions.find((assert) =>( assert.answerId === qlst.correctAnswer));
		 let assertionAnswer = qlst.assertions.find((assert) =>( assert.answerId === qlst.answer));
		 let others = qlst.assertions.filter((assert) =>(assert.answerId !== qlst.correctAnswer));
		 
	return(
		<div className="col-lg-12 content-position" >
			<div className="row" >
				<div className="fixed-position more-rised-position white-space shadow-style">
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
								Question :{getCorrectedAssess.questionList[cursorQuest].text}
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
				  <a href="#" onClick={previousQuestion}><i className="fa fa-chevron-left"/></a>
				   {getCorrectedAssess.questionList.map(
						(d,index)=>(<a href="#" onClick={()=> pushedQuestion(d,index)}>{index+1}</a>)
					)}
				  <a href="#" onClick={nextQuestion}><i className="fa fa-chevron-right"/></a>
			</div> 
		</div>
	);
};
export default CorrectedHk;

