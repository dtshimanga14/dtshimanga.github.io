import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';

import 'whatwg-fetch';
import 'babel-polyfill';
import { v4 as uuidv4 } from 'uuid';

import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';


import { GET_MY_MANUSCRITS, GET_MY_MANUSCRIT_BYID } from './queries.js';
import { ADD_CONTENT_MANUSCRIT, SAVE_ASSESS, SAVE_QUESTION, 
	ADD_CORRECT_ANSWERS, ADD_ASSERTIONS } from './mutations.js';


const AssessMarker = ( { setAssess, assess } ) => {
	
	let AssertTemp = { text : "No true assertions", answerId : "" };
	let QuestTemp = { questId : "", text : "",
                        type : true, GAV : 10,
                        assertions : [], correctAnswer : ""
                };
	
	const [question, setQuestion] = useState({});
	const [fields, setFields] = useState("");
	const [tittle, setTittle] = useState("");
	const [startDate, setStartdate] = useState("");
	const [assertionList, setAssertionList] = useState([]);
	const [endDate, setEndDate] = useState("");
	const [correctAnswer, setCorrectAnswer] = useState("");
	
	const [assessEditorState, setAssessEditorState] = useState(true);
	const [courseEditorState, setCourseEditorState] = useState(false);
	const [currentContentType, setCurrentContentType] = useState("");
	const [currentPromotion, setCurrentPromotion] = useState("5dda49065232b51c88da601e");
	const [currentSectionId, setCurrentSectionId] = useState("");
	const [currentContent, setCurrentContent] = useState("");
	const [currentHeaderSection, setCurrentHeaderSection] = useState("");
	const [currentCourseId, setCurrentCourseId] = useState("5e6beb47ab921f2065ec7c0e");
	const [currentAssess, setCurrentAssess] = useState("5e04ff31d01b6d1110d80a86");
	const [currentParagraph, setCurrentParagraph] = useState(0);
	const [currentPortion, setCurrentPortion] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState("");
	const [currentAssessId, setCurrentAssessId] = useState("");
	const [currentQuestId, setCurrentQuestId] = useState("");
	const [currentAssertion, setCurrentAssertion] = useState("");
	const [currentAssertionId, setCurrentAssertionId] = useState("");
	const [assessState, setAssessState] = useState({ 
		duration : 50,
		startDay : new Date(),
		endDay : new Date(),
	});
	const [currentQuestion, setCurrentQuestion] = useState({
		  text : "No question entry",type : true,
		  answers : ["No assertions answers"]
		});
	
	const teacherId = localStorage.getItem('user-token'); 
	const promotionId = ""//localStorage.getItem('user-token'); 
	const courseId = "5f651eb834055a28408b3300"//localStorage.getItem('user-token'); 
	
	
	let assessments = {
        Id : "48cc27ba-2a2f-4dcd-8c73-03294113fce6",
        header : tittle, fields : fields,
        promotionId : promotionId, courseId : courseId,
        teacherId : teacherId,
        description : "Using probabilities methods to take decision",
        startDay : startDate, endDay : endDate,
        duration : 50, questionList : [],
        corrected : false
	};
	
	 const [ addAssess ] = useMutation(SAVE_ASSESS);	
	 const [ addQuestionToAssess ] = useMutation(SAVE_QUESTION);
	 const [ addAssertionToQuestion ] = useMutation(ADD_ASSERTIONS);
	 const [ addCorrectAnswerToQuestion ] = useMutation(ADD_CORRECT_ANSWERS);
	
	const OnNewAssess = () => {
		  let currentAssessId = uuidv4();
		  setCurrentAssessId(currentAssessId);
	  }
	const OnNewQuestion = () => {
	  let currentQuestId = uuidv4();
	  setCurrentQuestId(currentQuestId);
	}
  const OnNewAssertion = () => {
	  let currentAssertion = document.getElementById("recipe-name").innerText;
	  let currentAssertionId = uuidv4();
	  setCurrentAssertion(currentAssertion);
	  setCurrentAssertion(currentAssertionId);
	  alert("assertion is correctly save. If you want to save anothers then perform the same process");
	  document.getElementById("recipe-name").innerText="";
  };
  const addSection = () => {
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let currentSectionId = uuidv4();
	  let currentHeaderSection  = textMarker;
	  setCurrentContentType(currentSectionId);
	  setCurrentHeaderSection(currentHeaderSection);
	  alert('current section id is'+currentSectionId+" and current header section is"+currentHeaderSection);
  };
  const saveDescription = () => {
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{description : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  };
  const saveHeader = () => {
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{header : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  };
  const saveField = () => {
	   const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{fields : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  };
  const saveContent = () => {
	 const textMarker = document.getElementById("recipe-name").innerHTML;
	 alert(textMarker);
	  let currentContent = textMarker;
	  setCurrentContent(currentContent);
	  document.getElementById("recipe-name").innerText = "";
  };
  const saveCore = () => {
	  const textMarker = document.getElementById("recipe-name").innerHTML
	  let editorState = this.state.editorState;
	  this.setState({
		  editorState : Object.assign({},editorState,{content : textMarker})
	  });
	  document.getElementById("recipe-name").innerText = "";
  };
  const handlerOnTypeContent = (e) => {
	  let currentContentType = e.target.value;
	  setCurrentContentType(currentContentType);
  };
  const handlerCurrentSectionId = (e) => {
	  alert(e);
	  setCurrentContentType(e);
  };
  const saveQuestion = () => {
	  let textMarker = document.getElementById("recipe-name").innerText;
	  let newCurrentQuestion = Object.assign({},currentQuestion,{text: textMarker});
	  setCurrentQuestion(newCurrentQuestion);
	  alert("Question is temporairely save then entry now assertions answers and click to ASSERTIONS");
	  document.getElementById("recipe-name").innerText="";
  };
  const nextQuestion = () => {
	  
  };
  const previousQuestion = () => {
	  
  };
  const saveAssess = () => {
	  const textMarker = document.getElementById("recipe-name").innerText;
	  let assessState = assessState;
	  let currentQuestion = currentQuestion;
	  let questionList = assessState.questionList.concat(currentQuestion);
	  let newAssessState = Object.assign({},assessState,{questionList : questionList});
	  setAssessState(newAssessState);
	  document.getElementById("recipe-name").innerText="";
  };
  const saveAssertions = () => {
	  let textMarker = document.getElementById("recipe-name").innerText;
	  let currentQuestion = currentQuestion;
	  let answers = currentQuestion.answers;
	  let newCurrentQuestion = Object.assign({},currentQuestion,{answers: answers.concat(textMarker)});
	  setCurrentQuestion(newCurrentQuestion);
	  alert("assertion is correctly save. If you want to save anothers then perform the same process");
	  document.getElementById("recipe-name").innerText="";
  };
  const saveAnswer = () => {
	  
  };
	 
	return(<div>
				<div className="questioner-modal-frame" />
				<div className="questioner-frame">
					<div className="">
						<button id="bold-button"  onClick={()=> {
							let content = document.querySelector("#editor-assess").textContent;
							document.querySelector("#editor-assess").textContent="";
							setTittle(content)
						}}>Tittle</button>
						<button id="underline-button" onClick={()=> {
							let text = document.querySelector("#editor-assess").textContent;
							let questId = uuidv4();
							let newQuestion = { questId , text ,
												type : "assertion", gav : 10,
												assertions : [], correctAnswer
											};
							alert(JSON.stringify(newQuestion));
							setQuestion(newQuestion);
							setCurrentQuestId(questId);
							addQuestionToAssess({ 
								variables: { text , type: "assertion",
											 questId , assessId : currentAssessId,
											GAV:  50
							}});
							document.querySelector("#editor-assess").textContent="";
						}}>Question</button>
						<button id="list-button" title="Bullet List" onClick={()=> {
							
							let text = document.querySelector("#editor-assess").textContent;
							let newAssertion = { text , answerId : uuidv4() };
							let newAssertionLists = assertionList.concat(newAssertion);
							document.querySelector("#editor-assess").textContent="";
							setAssertionList(newAssertionLists);
							alert(JSON.stringify(assertionList));
							
						}}>Assertion</button>
						<button id="image-button" title="Picture" onClick={async () => {
									let currentAssessId = uuidv4();
									setCurrentAssessId(currentAssessId);
									addAssess({ variables: { 
													Id : currentAssessId,
													header: tittle,
													fields: "Programming",
													description: "Réalisez votre site web avec HTML5 et CSS3",
													promotionId: currentPromotion, 
													courseId: currentCourseId,
													teacherId : teacherId,
													startDay : "2020-10-10",
													endDay : "2020-10-10",
													duration : 50,
										}});
									alert(currentAssessId);
							}}>
							save
						</button>
						<select name="promotionLevel" id="gav" value="">
							{["10","20","30","50","100"].map((level)=>(<option value={level}>{level}</option>))}
						</select>
						<select name="promotionLevel" id="pays" value="">
							{["First Graduate","Second Graduate","Third Graduate","First Master","Second Master"]
								.map((level)=>(<option value={level}>
												{level}
											</option>)
							)}
						</select>
						<input type="date" 
							onChange={()=> setEndDate(event.target.value)} 
							value={endDate} name="endDate"
						/>
						<input type="date" 
							onChange={()=> setStartdate(event.target.value)} 
							value={startDate} name="startDate"
						/>
						<button className="getText btn"  onClick={()=> setAssess(!assess)}>
							<i  className="fa fa-sticky-note-o" />
						</button>
					</div>
					<div>{tittle}</div>
					<div>{question.text}</div>
					<div>
						{assertionList.map((assertion)=> (
							<div>
								<li>{assertion.text}</li>
								<div className="radio-btn">
									<label className="switch">
									  <input type="checkbox"/>
									  <span className="slider round"/>
									</label>
								</div>
							</div>
						))}
					</div>
					<div contenteditable="true"  id="editor-assess" >Write question</div>
				</div>
			</div>)
		};


const Container = ({ htmlContent, setContent, manuscritId }) => {
	
	const [currentManuscrit, setCurrentManuscrit] = useState("");
	const [currentManTittle, setCurrentManTittle] = useState("");
	const [currentContent, setCurrentContent] = useState("");
	const [assess, setAssess] = useState(false);
	const [font, setFont] = useState("Arial");
	
	useEffect(() => {
		
		document.querySelector('#bold-button').addEventListener('click', () => {
			document.execCommand('bold');
		});
		
		document.querySelector('#underline-button').addEventListener('click', () => {
			document.execCommand('underline');
		});

		// List menu
		document.querySelector('#list-button').addEventListener('click', () => {
			document.execCommand('insertUnorderedList');
		});

		// Check menu options to be highlighted on keyup and click event  
		/* function format(command, value) {
			document.execCommand(command, false, value);
		 } */
		document.querySelector('#editor-text').addEventListener('keyup', FindCurrentTags);
		document.querySelector('#editor-text').addEventListener('click', FindCurrentTags);
		
	});
	
	const changeColor = () => {
	  var color = prompt("Enter your color in hex ex:#f1f233");
	  document.execCommand("foreColor", false, color);
	};
	
	const fontName = () => {
	  var color = prompt("Enter your color in hex ex:#f1f233");
	  document.execCommand("fontName", false, "Arial");
	};
	
	const copy = () => {
	  document.execCommand("copy", false, "");
	};
	
	const link = () => {
	  var url = prompt("Enter the URL");
	  document.execCommand("createLink", false, url);
	};
	
	const getImage = (e) => {
	  e.preventDefault();
	  var file = e.target.files[0];

	  var reader = new FileReader();

	  let dataURI;
	  const editorContent = document.querySelector("#editor-text");

	  reader.addEventListener(
		"load",
		() => {
		  dataURI = reader.result;
		  const img = document.createElement("img");
		  img.src = dataURI;
		  img.className = "upload-image";
		  editorContent.appendChild(img);
		},
		false
	  );

	  if (file) {
		console.log("s");
		reader.readAsDataURL(file);
	  }
	};
	
	const printMe = () => {
	  if (confirm("Check your Content before print")) {
		const body = document.body;
		const editorContent = document.querySelector("#editor-text");
		let s = body.innerHTML;
		body.textContent = editorContent.innerHTML;

		document.execCommandShowHelp;
		body.style.whiteSpace = "pre";
		window.print();
		location.reload();
	  }
	};
	
	const FindCurrentTags = () => {
		// Editor container 
		var editor_element = document.querySelector('#editor-text');
		
		// No of ranges
		var num_ranges = window.getSelection().rangeCount;

		// Will hold parent tags of a range
		var range_parent_tags;

		// Will hold parent tags of all ranges
		var all_ranges_parent_tags = [];
			
		// Current menu tags
		var menu_tags = [ 'B', 'UL', 'U' ];
			
		// Will hold common tags from all ranges
		var menu_tags_common = [];

		var start_element,
			end_element,
			cur_element;

		// For all ranges
		for(var i=0; i<num_ranges; i++) {
			// Start container of range
			start_element = window.getSelection().getRangeAt(i).startContainer;
			
			// End container of range
			end_element = window.getSelection().getRangeAt(i).endContainer;
			
			// Will hold parent tags of a range
			range_parent_tags = [];

			// If starting node and final node are the same
			if(start_element.isEqualNode(end_element)) {
				// If the current element lies inside the editor container then don't consider the range
				// This happens when editor container is clicked
				if(editor_element.isEqualNode(start_element)) {
					all_ranges_parent_tags.push([]);
					continue;
				}

				cur_element = start_element.parentNode;
				
				// Get all parent tags till editor container    
				while(!editor_element.isEqualNode(cur_element)) {
					range_parent_tags.push(cur_element.nodeName);
					cur_element = cur_element.parentNode;
				}
			}

			// Push tags of current range 
			all_ranges_parent_tags.push(range_parent_tags);
		}

		// Find common parent tags for all ranges
		for(i=0; i<menu_tags.length; i++) {
			var common_tag = 1;
			for(var j=0; j<all_ranges_parent_tags.length; j++) {
				if(all_ranges_parent_tags[j].indexOf(menu_tags[i]) == -1) {
					common_tag = -1;
					break;
				}
			}

			if(common_tag == 1)
				menu_tags_common.push(menu_tags[i]);
		}

		// Highlight menu for common tags
		if(menu_tags_common.indexOf('B') != -1)
			document.querySelector("#bold-button").classList.add("highight-menu");
		else
			document.querySelector("#bold-button").classList.remove("highight-menu");

		if(menu_tags_common.indexOf('U') != -1)
			document.querySelector("#underline-button").classList.add("highight-menu");
		else
			document.querySelector("#underline-button").classList.remove("highight-menu");

		if(menu_tags_common.indexOf('UL') != -1)
			document.querySelector("#list-button").classList.add("highight-menu");
		else
			document.querySelector("#list-button").classList.remove("highight-menu");
	};
	
	return(<div>
	{assess ? (<AssessMarker  setAssess={setAssess}  assess={assess}  />) : null}
			<div className="editor-css">
				<div>{currentManTittle} {currentManuscrit}</div>
				<div id="editor-container">
					<div id="editor-menu">
						<button id="bold-button" title="Bold">Bold</button>
						<button id="underline-button" title="Underline">Underline</button>
						<button id="list-button" title="Bullet List">List</button>
						<button id="image-button" title="Picture">Picture</button>
						<button className="tool-items fa fa-underline"  
							onClick={()=> document.execCommand('underline', false, '')}
						/>
						<button className="tool-items fa fa-italic" 
							onClick={()=> document.execCommand('italic', false, '')}
						/>
						<button className="tool-items fa fa-bold" 
							onClick={()=> document.execCommand('bold', false, '')}
						/>
						<button className="tool-items fa fa-align-center" 
							onClick={()=> document.execCommand('justifyCenter',false,'')}
						/>
						<button className="tool-items fa fa-align-left" 
							onClick={()=> document.execCommand('justifyLeft',false,'')}
						/>
						<button className="tool-items fa fa-align-right" 
							onClick={()=> document.execCommand('justifyRight',false,'')}
						/>
						<button className="tool-items fa fa-link" onClick={()=> link()}/>
						<input className="tool-items fa fa-file-image-o" type="file" 
							style={{ display: "none" }} id="file"  onChange={(e)=> getImage(e)}
						/> <label htmlFor="file" className="tool-items fa fa-file-image-o"/>
						<button className="tool-items fa fa-scissors" onClick={()=> document.execCommand('cut',false,'')}/>
						<button className="tool-items fa fa-undo" onClick={()=> document.execCommand('undo',false,'')}/>
						<button className="tool-items fa fa-repeat" onClick={()=> document.execCommand('redo',false,'')}/>
						<button className="tool-items fa fa-tint" onClick={()=> changeColor()}/>
						<button className="tool-items fa fa-strikethrough" onClick={()=> document.execCommand('strikeThrough',false,'')}/>
						<button className="tool-items fa fa-trash" onClick={()=> document.execCommand('delete',false,'')}/>
						<button className="tool-items fa fa-scribd" onClick={()=> document.execCommand('selectAll',false,'')}/>
						<button className="tool-items fa fa-clone" onClick={()=> copy()}/>
						<button id="save-button" title="Picture">save</button>
						<button className="btn print" onClick={()=> printMe()}>PrintHtml</button>
						<button id="text-button" onClick={async()=> {
							let content = await document.querySelector("#editor-text").textContent;
							alert(content);
							setContent(content, manuscritId)
						}}>
							<i  className="fa fa-floppy-o" />
						</button>
						<button className="getText btn"  onClick={()=> setAssess(!assess)}>
							<i  className="fa fa-sticky-note-o" />
						</button>
					</div>
					<div id="editor-text" 
						contenteditable="true" 
						spellcheck="false" 
						dangerouslySetInnerHTML={{ __html: htmlContent }}
					/>
				</div>
			</div>
		</div>
    )
	
};


const ManuscritsList = ({ setCurrentManuscrit, setCurrentManTittle }) => {
	
	const teacherId = "5f008b00d1a45b2d6cc57f07"; //localStorage.getItem('user-token');
	const { loading, error, data } = useQuery(GET_MY_MANUSCRITS,{ 
			variables: { teacherId }
		});
		
	if (loading) return (<div>'Loading...'</div>);
    if (error) return `Error! ${error.message}`;
    let { getMyManuscrits } = data;
  
	return(<div className="schools-map"> 
				{getMyManuscrits.map((manuscrit)=>(
					<div onClick={()=> {
						setCurrentManuscrit(manuscrit._id);
						setCurrentManTittle(manuscrit.tittle);
					}}>{manuscrit.tittle}</div>
				))}
			</div>)
};

	
const EditorHk = () => {
	
  const [manuscritId, setManuscritId] = useState("5f651eb634055a28408b32ff");
  const [currentManuscrit, setCurrentManuscrit] = useState("5f651eb634055a28408b32ff");
  const [currentManTittle, setCurrentManTittle] = useState("");
  const [ onUpdateManuscrit ] = useMutation(ADD_CONTENT_MANUSCRIT);
  
  const setContent = (Content, manuscritId) => {
	onUpdateManuscrit({
	  variables: { 
		manuscritId, 
		Content
	  }
	});
  };
  
  const { loading, error, data } = useQuery(GET_MY_MANUSCRIT_BYID,{ 
			variables: { manuscritId : currentManuscrit }
		});
  	
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  let { Content } = data.getMyManuscritById;
  
	return(<div>
				<Container 
					htmlContent={Content} 
					setContent={setContent} 
					manuscritId={currentManuscrit} 
				/>
				<ManuscritsList 
					setCurrentManuscrit={setCurrentManuscrit} 
					setCurrentManTittle={setCurrentManTittle}
				/>
			</div>); 
	
};

export default EditorHk;
