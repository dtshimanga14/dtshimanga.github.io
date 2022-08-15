import React, { Component } from 'react';
import './css/react-draft-wysiwyg.css';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation,Query } from 'react-apollo';

import 'whatwg-fetch';
import 'babel-polyfill';
import uuid from 'uuid';
import Loading from './Loading.js';
import Section from './Section.js';
import CoursePrint from './CoursePrint.js';


export default class CoursesMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  assessEditorState : true,
	  courseEditorState : false,
	  currentContentType : "Course",
	  currentPromotion : "5dda49065232b51c88da601e",
	  currentSectionId : "",
	  currentContent : "",
	  currentHeaderSection : "",
	  currentCourseId :"5e6beb47ab921f2065ec7c0e",
	  currentAssess :"5e04ff31d01b6d1110d80a86",
	  assessState : { 
        promotionId: "",
        courseId: "",
        teacherId: "",
		duration : 50,
		startDay : new Date(),
		endDay : new Date(),
		questionList : [],
	  },
      editorState: {
			header : "",
			fields : "",
			description : "Using probabilities methods to take decision",
			authors : {
				username : "Satoshi",
				middlename : "Nakamoto",
				firstname : "",
				picture : ""
			},
			approvor : {
				username : "James",
				middlename : "Crock",
			},
			content : "",
			section : [
				{	
					sectionId : "",
					tittle : "",
					paragraphs : [{
						type :"text",
						content : "",
						},
					],
				},
			],
		},
	  currentParagraph : 0,
	  currentPortion : 0,
	  currentQuestion : {text : "No question entry",type : true,answers : ["No assertions answers"]},
	  currentAnswer : "",
	  currentAssessId : "",
	  currentQuestId : "",
	  currentAssertion : "",
	  currentAssertionId : "",
    };
	
	this.saveAnswer = this.saveAnswer.bind(this);
	this.saveQuestion = this.saveQuestion.bind(this);
	this.saveAssertions = this.saveAssertions.bind(this);
	this.saveAssess = this.saveAssess.bind(this);
	this.previousQuestion = this.previousQuestion.bind(this);
	this.nextQuestion = this.nextQuestion.bind(this);
	this.saveHeader = this.saveHeader.bind(this);
	this.saveField = this.saveField.bind(this);
	this.saveDescription = this.saveDescription.bind(this);
	this.saveContent = this.saveContent.bind(this);
	this.addSection = this.addSection.bind(this);
	this.saveCore = this.saveCore.bind(this);
	this.handlerOnTypeContent = this.handlerOnTypeContent.bind(this);
	this.handlerOnTittleContent = this.handlerOnTittleContent.bind(this);
	this.handlerCurrentSectionId = this.handlerCurrentSectionId.bind(this);
	this.OnNewQuestion = this.OnNewQuestion.bind(this);
	this.OnNewAssess = this.OnNewAssess.bind(this);
	this.OnNewAssertion = this.OnNewAssertion.bind(this);
  }
  OnNewAssess(){
	  let currentAssessId = uuid.v4();
	  this.setState({ currentAssessId });
  }
  OnNewQuestion(){
	  this.setState({ currentQuestId : uuid.v4() });
  }
  OnNewAssertion(){
	  let currentAssertion = document.getElementById("recipe-name").innerText;
	  let currentAssertionId = uuid.v4();
	  this.setState({ currentAssertion,currentAssertionId });
	  alert("assertion is correctly save. If you want to save anothers then perform the same process");
	  document.getElementById("recipe-name").innerText="";
  }
  addSection(){
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let currentSectionId = uuid.v4();
	  let currentHeaderSection  = textMarker;
	  this.setState({ currentSectionId, currentHeaderSection});
	  alert('current section id is'+currentSectionId+" and current header section is"+currentHeaderSection);
  }
  saveDescription(){
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{description : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  }
  saveHeader(){
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{header : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  }
  saveField(){
	   const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{fields : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  }
  saveContent(){
	 const textMarker = document.getElementById("recipe-name").innerHTML;
	 alert(textMarker);
	  let currentContent = textMarker;
	  this.setState({ currentContent });
	  document.getElementById("recipe-name").innerText = "";
  }
  saveCore(){
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{content : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  }
  handlerOnTittleContent(e){
	  let currentCourseId = e.target.value;
	  this.setState({ currentCourseId });
  }
  handlerOnTypeContent(e){
	  let currentContentType = e.target.value;
	  this.setState({ currentContentType });
  }
  handlerCurrentSectionId(e){
	  this.setState({ currentSectionId : e });
	  alert(this.state.currentSectionId);
  }
  saveQuestion(){
	  let textMarker = document.getElementById("recipe-name").innerText;
	  let currentQuestion = this.state.currentQuestion;
	  let newCurrentQuestion = Object.assign({},currentQuestion,{text: textMarker});
	  this.setState({ currentQuestion : newCurrentQuestion });
	  alert("Question is temporairely save then entry now assertions answers and click to ASSERTIONS");
	  document.getElementById("recipe-name").innerText="";
  }
  nextQuestion(){
	  
  }
  previousQuestion(){
	  
  }
  saveAssess(){
	  const textMarker = document.getElementById("recipe-name").innerText;
	  let assessState = this.state.assessState;
	  let currentQuestion = this.state.currentQuestion;
	  let questionList = assessState.questionList.concat(currentQuestion);
	  let newAssessState = Object.assign({},assessState,{questionList : questionList});
	  this.setState({ assessState : newAssessState });
	  document.getElementById("recipe-name").innerText="";
  }
  saveAssertions(){
	  let textMarker = document.getElementById("recipe-name").innerText;
	  let currentQuestion = this.state.currentQuestion;
	  let answers = currentQuestion.answers;
	  let newCurrentQuestion = Object.assign({},currentQuestion,{answers: answers.concat(textMarker)});
	  this.setState({ currentQuestion : newCurrentQuestion });
	  alert("assertion is correctly save. If you want to save anothers then perform the same process");
	  document.getElementById("recipe-name").innerText="";
  }
  saveAnswer(){
	  
  }
  render() {
		const GET_COURSES = gql`
							query getCourses ($promotionId: String,$courseId: String) {
							  getCourses (promotionId: $promotionId){
								_id
								createdDate
								lastUpdate
								promotionId
								name
								summary
								ponderation
							  }
							  getCoreCourses(courseId: $courseId){
								_id
								createdDate
								lastUpdate
								promotionId
								name
								summary
								ponderation
								sections {
								  sectionId
								  tittle
								  paragraphs {
									type
									content
								  }
								}
							  }
							}
						`;	
						const SAVE_PARAGRAPH = gql`
							mutation addParagraphToSection(
									$id: String,$sectionId: String, 
									$type: String,$content: String
									) {
								  addParagraphToSection(id: $id, sectionId: $sectionId,
										type: $type,content: $content) {
									_id
									sections {
									  sectionId
									  tittle
									  paragraphs {
										type
										content
									  }
									}
								  }
								}
							`;
		const SAVE_SECTION = gql`
					mutation addSectionToCourse(
									$id: String,
									$sectionId: String, 
									$tittle: String
									) {
						addSectionToCourse(
							id :$id,
							sectionId :$sectionId,
							tittle :$tittle
						) {
							_id
							sections {
							  sectionId
							  tittle
							  paragraphs {
								type
								content
							  }
							}
						  }
						}

					`;
		const SAVE_QUESTION = gql`
					mutation addQuestionToAssess ($text: String,$type: Boolean,$assessId: String,$questId: String,$GAV: Int){
					  addQuestionToAssess(
						text: $text,
						type: $type,
						questId: $questId,
						assessId: $assessId,
						GAV: $GAV) {
						questionList{
						  questId
						  text
						  type
						  GAV
						  assertions{
							text
							answerId
						  }
						  correctAnswer
						}
					  }
					}
					`;
					
	const ADD_ASSERTIONS = gql`
					mutation addAssertionToQuestion($assessId: String,$questId: String,$text: String,$answerId: String){
					  addAssertionToQuestion (assessId: $assessId,questId: $questId,text: $text,answerId:$answerId){
						_id
						questionList{
						  questId
						  text
						  GAV
						  assertions{
							text
							answerId
						  }
						}
					  }
					}
					`;				
	
const ADD_CORRECT_ANSWERS = gql`
					mutation addCorrectAnswerToQuestion($questId: String,$assessId: String, $answerId: String) {
						  addCorrectAnswerToQuestion(questId: $questId,assessId: $assessId, answerId: $answerId) {
							_id
							Id
							header
							fields
							promotionId
							courseId{
							  _id
							  name
							}
							teacherId
							description
							startDay
							endDay
							duration
							questionList{
							  questId
							  text
							  GAV
							  type
							  correctAnswer
							  assertions{
								text
								answerId
							  }
							}
						  }
						}
					`;
	
	const SAVE_ASSESS = gql`
			mutation addAssess(
							$Id : String,
							$header: String,
							$fields: String, 
							$promotionId: String, 
							$courseId: String, 
							$teacherId: String,
							$description: String,
							$startDay : String,
							$endDay : String,
							$duration : Int,
							) {
				addAssess(
						Id : $Id,
						header: $header,
						fields: $fields,
						promotionId: $promotionId, 
						courseId: $courseId,
						teacherId : $teacherId,
						description: $description,
						startDay : $startDay,
						endDay : $endDay,
						duration : $duration, 
			  ){
					Id
				    header
					fields
				 }
			}
			`;
    const { editorState } = this.state;
	let id = localStorage.getItem("userId");
	let courseId = localStorage.getItem("courseId");
	let promotionId = localStorage.getItem("promotionId");
	
	let defaultyQuestionList = "No questions inserted";
	let emptySection = [{
			sectionId : "ejglsijzib",
			tittle : "",
			paragraphs : [
				{
					type : "text",
					content : "No text to print"
				}
			]
		},];
	return (
			<Query query={GET_COURSES} variables={{ promotionId,courseId }}>
				{({ data :{ getCourses,getCoreCourses },loading, error})=>{
					if (loading || !getCourses || !getCoreCourses) {
						return <div>Loading ...</div>;
					  }
    return (
		<div className="editor-css">
			<div className="editor-header">
			<div>Tittle : {this.state.editorState.header}</div>
			<div>Field : {this.state.editorState.fields}</div>
			<div>
				Brief description : {this.state.editorState.description}
			</div>
			<div>
				Authors : {Object.values(this.state.editorState.authors).join(' ')}
			</div>
			<div>
				Course : 
				<select name="course" id="pays" onChange={(e)=> this.handlerOnTittleContent(e)}>
					{getCourses.map((course)=>(<option value={course._id}>
										{course.name}
									</option>)
					)}
				</select>
			</div>
			<div>
				Type : 
				<select name="assess" id="pays" onChange={(e)=> this.handlerOnTypeContent(e)}>
					{["Course","Assessment","Exercises"]
						.map((level)=>(<option value={level}>
										{level}
									</option>)
					)}
				</select>
			</div>
			<div>
				Promotion : 
				<select name="promotionLevel" id="pays" value="">
					{["First Graduate","Second Graduate","Third Graduate","First Master","Second Master"]
						.map((level)=>(<option value={level}>
										{level}
									</option>)
					)}
				</select>
			</div>
			</div>
			{this.state.currentContentType =="Course" ?(<div id="core-content">
				{this.state.editorState.content}
			</div>): null}
		  {this.state.currentContentType =="Assessment" ? (
			<div id="core-content">
				{this.state.assessState.questionList ===[] ? (<div>{defaultyQuestionList}</div>)
				: this.state.assessState.questionList.map((question)=>{
					return (<div>
							<div>{question.text}</div>
							<div>
								{question.answers.map((answer,key)=>(
									<div>
										<input type="checkbox" value={key} name={key}/>
										<label htmlFor={key}>{answer}</label>
								</div>))}
							</div>
						</div>)
				})}
			</div>): null}
			<div className="bookmarked-article">
							<div className="current-article">Article bookmarked</div>
							<div className="core-article">
								{getCoreCourses.sections.map((signet,key) =>(
									<div >
										<a href={`#${key}`}>{signet.tittle}</a>
									</div>
								))}
							</div>
						</div>
			<div className="">
							<div className="sefl-article-main-header">{getCoreCourses.name}</div>
							<div>
							{
								getCoreCourses.sections ===[]?(
									emptySection.map((portion,key) => (
									<div>
										<div className="portion-header" id={`${key}`}>{portion.tittle}</div>
										<div>{
											portion.paragraphs.map((paragraph) => {
												return (<p className="paragraph-article">{paragraph.content}</p>);
											})
										}
										</div>
									</div>
								))): getCoreCourses.sections.map((portion,key) => (
									<div>
										<div className="portion-header" id={`${key}`}>{portion.tittle}</div>
										<div>{
											portion.paragraphs.map((paragraph) => {
												if(paragraph.type == 'text'){
													return (<p className="paragraph-article">{paragraph.content}</p>);
												}else if(paragraph.type == 'list'){
													return (<ol>
																{paragraph.list.map(l => <li>{l}</li>)}
															</ol>);
												}else if(paragraph.type == 'image'){
													return (<img src={paragraph.source}/>);
												}else if(paragraph.type == 'equation'){
													return (<div>{paragraph.equation}</div>);
												}else{
													return (<div/>);
												}
											})
										}
										</div>
									</div>
								))
							}
							</div>
						</div>
			<p contenteditable="true" id="recipe-name"/>
		  {this.state.currentContentType =="Assessment" ? 
			(<div>		
				<Mutation mutation={SAVE_QUESTION}>
					{(addQuestionToAssess, { data })=>{
						return (<button onClick={async ()=>{
									await this.OnNewQuestion();
									addQuestionToAssess({ variables: {
										questId: this.state.currentQuestId,
										GAV: 10,
										text: this.state.currentQuestion.text,
										type: this.state.currentQuestion.type, 
										assessId: this.state.currentAssessId, 
									}});
								}}>
								 INSERT QUESTION
								</button>)
					}}
				</Mutation>
				<button className="btn" onClick={this.saveQuestion}>
					 SAVE
				</button>
				<Mutation mutation={ADD_CORRECT_ANSWERS}>
					{(addCorrectAnswerToQuestion, { data })=>{
						return (<button onClick={()=>{
									addCorrectAnswerToQuestion({ variables: {
										answerId: this.state.currentAssertionId,
										assessId: this.state.currentAssessId,
										questId: this.state.currentQuestId,
									}});
								}}>
								 ANSWER
								</button>)
					}}
				</Mutation>
				<Mutation mutation={ADD_ASSERTIONS}>
					{(addAssertionToQuestion, { data })=>{
						return (<button onClick={async ()=>{
									await this.OnNewAssertion();
									addAssertionToQuestion({ variables: {
										assessId: this.state.currentAssessId,
										questId: this.state.currentQuestId,
										answerId : this.state.currentAssertionId,
										text: this.state.currentAssertion, 
									}});
								}}>
								 ASSERTIONS
								</button>)
					}}
				</Mutation>	
				<Mutation mutation={SAVE_ASSESS} >
					{(addAssess, { data })=>{
						return (<button className="btn" onClick={async () => {
									await this.OnNewAssess();
									addAssess({ variables: { 
													Id : this.state.currentAssessId,
													header: this.state.editorState.header,
													fields: this.state.editorState.fields,
													description: this.state.editorState.description,
													promotionId: this.state.currentPromotion, 
													courseId: this.state.currentCourseId,
													teacherId : this.props.teacherId,
													startDay : this.state.assessState.startDay,
													endDay : this.state.assessState.endDay,
													duration : this.state.assessState.duration,
										}});
									alert(this.state.currentAssessId);
							}}>NEW ASSESSMENT</button>)
					}}
				</Mutation>			
				<button className="btn" onClick={this.previousQuestion}>PREVIOUS</button>
				<button className="btn" onClick={this.nextQuestion}>NEXT</button>
			  </div>): null}
		{this.state.currentContentType =="Course" ?(<div>
		<div className="editor-footer">
			<button className="btn" onClick={this.saveHeader}>HEADER</button>
			<button className="btn" onClick={this.saveField}>FIELD</button>
			<button className="btn" onClick={this.saveDescription}>DESCRIPTION</button>
			<button className="btn" onClick={this.saveContent}>CONTENT</button>
			<Mutation mutation={SAVE_SECTION}>
					{(addSectionToCourse, { data })=>{
						return (
							<button className="btn" onClick={async ()=>{
								await this.addSection();
								await addSectionToCourse({ variables: {
									id: this.state.currentCourseId,
									sectionId: this.state.currentSectionId, 
									tittle: this.state.currentHeaderSection, 
								}});
								document.getElementById("recipe-name").innerText = "";
							}}>
								SECTION
							</button>)
					}}
				</Mutation>
				<Mutation mutation={SAVE_PARAGRAPH} >
					{(addParagraphToSection, { data })=>{
						return (<button className="btn" onClick={async() => {
									await this.saveContent();
									await addParagraphToSection({ variables: { 
													id: this.state.currentCourseId,
													sectionId: this.state.currentSectionId, 
													type: "text",
													content:  this.state.currentContent
										}});
									alert('paragraph sucessfull saved');
							}}>PARAGRAPH</button>)
					}}
				</Mutation>
			<button className="btn" onClick={this.saveContent}>SAVE</button>
		</div></div>):null}
		</div>
    )}}
</Query>);
  }
}

