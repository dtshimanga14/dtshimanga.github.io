import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Chapter from './Chapter.js';
import Loading from './Loading.js';
import RatingWidget from './RatingWidget.js';
import SectionBar from './SectionBar.js';

import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';



const Paragraph = (props) => {
  return (<div className="tab-chapter-head" onClick={props.changeSection}>
			{props.section.tittle}
		</div>
  );
}


export default class Courses extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				courses : {},
				cursorSection : 0,
				topic : '',
				currentChapter : '',
				currentChapterRang : 0,
				sectionTittle : {tittle : '', rang : 0},
				content : "",
				isLoading : true
			};
	  this.followingSection = this.followingSection.bind(this);
	  this.precedentSection = this.precedentSection.bind(this);
	  this.changeSection = this.changeSection.bind(this);
      this.changeContent = this.changeContent.bind(this);
      this.changeChapter = this.changeChapter.bind(this);
		}
		precedentSection(){
			const decrement = this.state.cursorSection-1;
			this.setState({
				cursorSection : decrement
			});
		}
    changeChapter(evt){
      this.setState({
        currentChapter : evt.chapterTittle,
      // currentChapterRang : evt
      });
    }
    changeContent(contents,key,sectionTittle){
      this.setState({
        content : contents.content,
        topic : contents.subSectionsTittle,
        sectionTittle : sectionTittle
      });
    }
	changeSection(key){
		this.setState({
			cursorSection : key
		});
	}
	followingSection(){
		const increment = this.state.cursorSection+1;
		this.setState({
			cursorSection : increment
		});
	}
		render(){const GET_COURSE = gql`
							query getCoreCourses ($courseId: String, $ownerId: String){
							  getCoreCourses(courseId: $courseId ,ownerId : $ownerId){
									_id
									createdDate
									lastUpdate
									promotionId
									name
									summary
									teacherId {
									  _id
									  personals {
										username
										middlename
										firstname
									  }
									}
									approvedBy {
									  _id
									  personals {
										username
										middlename
										firstname
									  }
									}
									sections {
									  sectionId
									  tittle
									  paragraphs {
										type
										content
									  }
									}
									ponderation
									likers
									dislikers
								  }
							}
						`;
				const courseId = this.props.match.params.id.toString();
				let { cursorSection } = this.state;
				let AlternateSection = {
                        sectionId : "ejglsijzib",
                        tittle : "No tittle to print",
                        paragraphs : [{ type : "text",content : "No text to print" }]
                };
				let ownerId = localStorage.getItem("userId");
				return (<Query query={GET_COURSE} variables={{ courseId,ownerId }}>
						{({ data :{ getCoreCourses },loading, error})=>{
							if (loading || !getCoreCourses) {
								return (<Loading />);
							  }
						   return (
							   <div className="col-sm-12">
								 <div className="row">
								  <div className="col-sm-9">
									Par <Link to={`/inner/cv/${getCoreCourses.teacherId._id}`} >
											{Object.values(getCoreCourses.teacherId.personals).join(' ')}
										</Link>
								  </div>
								 </div>
								 <div className="row">
									Approve by : {getCoreCourses.approvedBy.map((approver) =>
									 (<div >
										<Link to={`/inner/cv/${approver._id}`} >
											{Object.values(approver.personals).join(' ')}
										</Link>
									  </div>))}
							      </div>
								<div className="row">
									<div className="col-sm-8">
										<span className="">Chapter {this.state.currentChapterRang} : </span>
										<span className=""> {getCoreCourses.sections[cursorSection].tittle} </span>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-8">
										<span className="">{this.state.currentChapterRang}.{this.state.sectionTittle.rang} : </span>
										<span className=""> {this.state.sectionTittle.tittle} </span>
									</div>
								</div>
								<div className="row" >
									<div className="col-sm-12 lesson-tittle-position lesson-tittle-policy" >
									<h6>{this.state.currentChapterRang}.{this.state.sectionTittle.rang}.{this.state.cursorSection} : {this.state.topic}  </h6>
									</div>
								</div>
								<RatingWidget />
								<div className="row">
									<div className="col-sm-10">
									  <div className="row">
										<div className="col-sm-12">
										  {getCoreCourses.sections !== [] ? getCoreCourses.sections[cursorSection].paragraphs[0].content  
											: AlternateSection.sections[0].paragraphs[0].content}
										</div>
									  </div>
									</div>
									<div className="col-sm-4">
									  <div className="white-space tab-books visible-lg">
										<div className="tab-chapter">
										  {getCoreCourses.sections.map((section,key) => 
											(<Paragraph section={section} key={key} changeSection ={this.changeSection}/>))}
										</div>
									  </div>
									</div>
							    </div>
							    <div className="row">
								  <div className="col-sm-12">
									<ul className="pagination">
										<li>
											<a href="#" onClick={this.precedentSection}><i className="fa fa-chevron-left"/>
										</a></li>
										{getCoreCourses.sections[cursorSection].paragraphs
											.map((chapter,key) => (<li><a href="#">{key}</a></li>)
										)}
										<li><a href="#" onClick={this.followingSection}><i className="fa fa-chevron-right"/></a>
										</li>
									</ul>
								  </div>
							    </div>
						  </div>)}}
					</Query>);
					}
			}