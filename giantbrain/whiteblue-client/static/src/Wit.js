import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation ,Subscription } from 'react-apollo';
import 'babel-polyfill';
import 'whatwg-fetch';

/* 	
import './css/Wit.css'; */

	export default class Wit extends React.Component {
				constructor(props){
					super(props);
          this.state = {
            cursorWitState : 0,
            bookMarkIconState : true,
          };
          this.nextWit = this.nextWit.bind(this);
          this.previousWit = this.previousWit.bind(this);
          this.handlerBookMarkIcon = this.handlerBookMarkIcon.bind(this);
				}
        handlerBookMarkIcon(){
          this.setState({
            bookMarkIconState : !this.state.bookMarkIconState
          });
        }
        previousWit(){
          let previousedWit = this.state.cursorWitState;
          let newpreviousedWit = previousedWit-1;
          this.setState({
                  cursorWitState : newpreviousedWit
          });
        }
        nextWit(){
          let followedWit = this.state.cursorWitState;
          let newfollowedWit = followedWit+1;
          this.setState({
                  cursorWitState : newfollowedWit
          });
        }
		render(){
				let currentWit = 0;
				let cursorWit = this.state.cursorWitState;
				const BOOKMARKED_MUT = gql`
					mutation addCourseBookMarkers($userId: String,$courseId: String){
					  addCourseBookMarkers( userId : $userId,courseId:$courseId)
					}
					`;
					
				const GET_SUGGESTED_COURSES = gql`query {
									   getSuggestedCourse {
										 _id
										 createdDate
										 lastUpdate
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
										likers
										dislikers
									   }
									}`;	
									
		let userId = localStorage.getItem("userId");
		let courseId;
		return (<Query query={GET_SUGGESTED_COURSES}>
		{({ data: { getSuggestedCourse }, loading, fetchMore}) => {
		  if (loading || !getSuggestedCourse) {
			return <div>Loading ...</div>;
		  }
		  courseId = getSuggestedCourse[cursorWit]._id
		  console.log(courseId);
					  return (
						<div className="wit-frame">
							{getSuggestedCourse==[] ?  (<div className="wit-header">
								What may be you don t know about
							 </div>):
							 (<div>
								<div className="wit-header">
									What may be you don t know about
									<span className="wit-field">{getSuggestedCourse[cursorWit].name}</span>
								 </div><hr/>
								 <div className="wit-core">
									<div className="wit-flex-box">
										<div className="previous-wit" onClick={()=> this.previousWit()}>
										  <button className="btn">
											<i className="fa fa-chevron-left"/>
										  </button>
										</div>
										<div className="wit-content">
										  {getSuggestedCourse[cursorWit].summary}
										</div>
										<div className="next-wit" onClick={()=> this.nextWit()}>
										  <button className="btn">
											<i className="fa fa-chevron-right"/>
										  </button>
										</div>
									</div>
									<span className="wit-authors">
									  Author 
										<Link to={`/inner/cv/${getSuggestedCourse[cursorWit].teacherId._id}`}  className="home-btn" >
										  <span className="author-text">{getSuggestedCourse[cursorWit].teacherId.personals.username} 
										  {getSuggestedCourse[cursorWit].teacherId.personals.middlename}</span>
										</Link>
									</span>
									<span className="wit-approvaler">
									  Approve by
									  {getSuggestedCourse[cursorWit].approvedBy.map(approver => (
										<Link to={`/inner/cv/${approver._id}`}  className="home-btn" >
										  <span className="author-text">{approver.personals.username}
										  {approver.personals.middlename}</span>
										</Link>
									  ))}
									</span>
								  </div><hr/>
								  <div className="group-btn-wit">
									<button className="btn">
										<i className="fa fa-thumbs-down"/>
									</button>
									<button className="btn">
										<i className="fa fa-share"/><span className="text-button">Share</span>
									</button>
									<Mutation mutation={BOOKMARKED_MUT} >
										{(addCourseBookMarkers, { data })=>{
											return (
													<button className="btn" onClick={()=> {
														this.handlerBookMarkIcon();
														addCourseBookMarkers({ variables: { 
															userId: this.props.userId, 
															courseId: getSuggestedCourse[cursorWit]._id
														}});
														alert("hello world");
													}}>
														{this.state.bookMarkIconState ? 
															(<i className="fa fa-bookmark-o"/>) :
															(<i className="fa fa-bookmark"/>)}
													</button>
												)
										}}
									</Mutation>
									<button className="btn">
										<i className="fa fa-file-o"/><span className="text-button">Read</span>
									</button>
									<button className="btn" onClick={()=> this.props.togglePosterProps()}>
										<i className="fa fa-paper-plane-o"/><span className="text-button">Post</span>
									</button>
									<span >100 ,34 ,{getSuggestedCourse[cursorWit].likers.length} ,
									{getSuggestedCourse[cursorWit].dislikers.length} </span>
								  </div>
							 </div>)}
						</div>);}}
				  </Query>
				);
				}	
			
		}