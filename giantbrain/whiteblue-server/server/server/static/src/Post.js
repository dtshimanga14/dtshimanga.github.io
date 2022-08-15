import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ImageComment from './ImageComment.js';

import './css/Post.css';

	export default class Post extends React.Component {
			
			constructor(props){
				super(props);
				this.state = {
					printCommentZone : false,
					printMenuPost : false,
					likeIconPosition : true,
				};
				this.toggleCommentZone = this.toggleCommentZone.bind(this);
				this.toggleMenuPost = this.toggleMenuPost.bind(this);
				this.toggleIconLike = this.toggleIconLike.bind(this);
			}
			toggleIconLike(){
				this.setState(prevState =>{
					return {
						likeIconPosition : !prevState.likeIconPosition,
					}
				});
			}
			toggleMenuPost(){
				this.setState(prevState =>{
					return {
						printMenuPost : !prevState.printMenuPost,
					}
				});
			}
			toggleCommentZone(){
				this.setState(prevState =>{
					return {
						printCommentZone : !prevState.printCommentZone,
					}
				});
			}
			render (){ 
					
					let date = this.props.publicAt;
					let ownerId = "5dc081c60847871e44879735";
					
					const GET_USER = gql`query ($id: String!){
										 users(id: $id) {
											 _id
											personals {
											  middlename
											  username
											  picture
											}
										  }
										}`;
				const SHAREPOST_MUT = gql`
					mutation makeShareblePost($idPost: String!, $sharebility: Boolean!, ){
					  mutateSharebilityPost( idPost : $idPost,sharebility:$sharebility,){
							_id
							sharebility
						  }
						}
						`;
				const LIKEORDISLIKE_MUT = gql`mutation addLikePost($idPost: String!, $userId: String!, ){
							addLikePost(idPost: $idPost, userId: $userId){
								likes
							  }
							}
						`;
				const COMMENT_MUT = gql`
					mutation commentsPost($idPost: String!, $idUser: String!, $commentText: String!, ){
					  addCommentsPost( idPost : $idPost,idUser:$idUser,commentText : $commentText,){
							_id
							idPost
							ownerId
							publicAt
							Picture
							totalComments
							totalLike
							comments {
							  ownerId
							  text
							  when
							  id
							}
						  }
						}
						`;
					let id = ownerId;
					let input;
					let timePost = moment(date).format('DD-MMMM-YYYY HH:mm:ss');
					
					return (<Query query={GET_USER} variables={{id}}>
							{({ data: { users  }, loading,})=>{
								if (loading || !users) {
								return <div>Loading ...</div>;
							  }
								return (
								<div>
									<div className="post"> 
									<div className="flex-box-row">
										<div>
											<img className = "picture-owner-post" src ={users.personals.picture}/>
										</div>
										<div className="post-owner">
											<div>
												<Link to={`cv/${users._id}`} >{users.personals.username} {' '} {users.personals.middlename}</Link>
											</div>
											<div>
												<span className="date-time-hour">{timePost}</span> <i className="fa fa-globe"/>
											</div>
										</div>
										<span  className="ellipsis-post" onClick={()=>this.toggleMenuPost()}>
											<i className="fa fa-ellipsis-h"/>
										</span>
										{this.state.printMenuPost ? 
											(<div className="menu-post">
												<Mutation mutation={SHAREPOST_MUT}>{
												(makeShareblePost, { data })=>{
													return(
														<div className="configure-post" onClick={
															()=> {makeShareblePost({
																	variables: { 
																		idPost : this.props._id,
																		sharebility:!this.props.sharebility,
																	}
																});
															}}>
															Make shareable
														</div>)
												}}
												</Mutation>
											</div>): null}
									</div>
									<div>
										<img className = "post-picture-owner" src={this.props.Picture}/>
									</div>
									<div  className = "post-feeling-frame">
										<div className="group-btn-wit">
											<span>
												<Mutation mutation={LIKEORDISLIKE_MUT}>
													{(addLikePost, { data })=>{
														return (
															<span className="post-like" onClick={()=>{
																()=> addLikePost({ variables: { 
																		idPost : this.props._id,
																		idUser:"5cdf094ac1beac0fcc851fe6",
																	}
																});
																this.toggleIconLike();
																return null; 
															}}>
																{this.state.likeIconPosition ?(<i className="fa fa-thumbs-o-up"/>):(<i className="fa fa-thumbs-down"/>)}
															</span>)
													}}
												</Mutation>
												<span  className="like-indicator">
													{this.props.likes.length}
													<span>likes</span>
												</span>
											</span>
											<span  className="like-indicator">
												<i className="fa fa-heart-o"/>
											</span>
											<span  className="comment-indicator">
												{this.props.comments.length}
												<span onClick={()=> this.toggleCommentZone()}>comments</span>
											</span>
											{this.props.sharebility ? (<button className="btn">
												<i className="fa fa-share"/><span className="text-button">Share</span>
											</button>):null}
												<span className="left-position"/>
										 </div><hr/>
									</div>
									{this.state.printCommentZone ?
									(<div className="wrap-comment">
										{this.props.comments.map(comment =>(
											<div>
												<ImageComment userId={comment.ownerId}/>
												<div className="zone-comment">{comment.text}</div>
												<span className="comment-date">{moment(comment.when).fromNow()}</span>
											</div>
										))}	
									</div>)
									:null}
									<div className="comment-form">
										<div className="comment-image">
											<img className = "picture-owner-post" src ={users.personals.picture}/>
										</div>
										<Mutation mutation={COMMENT_MUT}>
											{(commentsPost, { data })=>{
												return (
													 <form className="post-form"
														onSubmit={(e) => {
														  e.preventDefault();
														  commentsPost({ variables: { 
																		idPost : this.props._id,
																		idUser:ownerId,
																		commentText : input.value,
																	}
															});
														  input.value = "";
														}}
													  >
														<input 
															ref={node => {
																input = node;
															  }}
															className="post-input"
														/>
													</form>)
											}}
										</Mutation>
									</div>
								</div>
							</div>);
							}}
						</Query>);
					}
			}