import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { useQuery,useMutation } from '@apollo/react-hooks';

import Post from './Post.js';
import Friend from './Friend.js';
import Chat from './Chat.js';
import Frame from './Frame.js';
import SuggestionFriends from './SuggestionFriends.js';
import Publish from './Publish.js';
import PosterModalWindows from './PosterModalWindows.js';
import Wit from './Wit.js';
import Online from './Online.js';
import ArticlePost from './ArticlePost.js';
import Adminmenu from './Adminmenu.js';
import AddPromotionModalWindows from './AddPromotionModalWindows.js';


import './css/Home.css';


export default class Home extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				currentLink : window.location.href,
				posterPrintState : false,
				friends : [],
				file : '',
				uploadFileUrl : '',
				loadState : 0,
				currentLink : "",
			};
			this.previewImage = this.previewImage.bind(this);
			this.togglePoster = this.togglePoster.bind(this);
			this.addChatUser = this.addChatUser.bind(this);
			this.endChatUser = this.endChatUser.bind(this);
		}
		
		 componentWillMount(){
			 this.props.onMountComponent;
		}
		togglePoster(){
				this.setState(prevState => {
					return {
						posterPrintState : !prevState.posterPrintState
					}
				});
		}
	
	addChatUser(names){
		const exFriendsChat = this.state.friends;
		if(exFriendsChat.find(index => index._id == names._id)){
			this.setState({friends });
		}else{
			const newFriendsChat = exFriendsChat.concat(names);
			this.setState({friends : newFriendsChat});
		}
	}
	endChatUser(index){
		const newFriendsChat = this.state.friends.filter((c) => ( c._id !== index));
		this.setState({friends : newFriendsChat});

	}		     		
	previewImage(e){
		e.preventDefault();
		let reader = new FileReader();
		let fileLoad = e.target.files[0];
		reader.onloadend = ()=> {
				this.setState({
					file : fileLoad,
					uploadFileUrl : reader.result,
					loadState : reader.LOADING,
				});
		}
		reader.readAsDataURL(fileLoad);
	}
	render(){
		const listchats = this.state.friends.map((c,index) => <Chat {...c} ownerId={this.props.ownerId} filterChat={this.endChatUser}/>);
		const GET_POSTS = gql`query ($cursor: String,$limit : Int,$id : String){
			  users (id: $id){
				_id
				isId
				isConnected
				personals {
				  firstname
				  middlename
				  username
				  picture
				  password
				}
				lastSeenOnline
				friends {
				  _id
				  isConnected
				  personals {
					username
					middlename
					firstname
					password
					picture
				  }
				  lastSeenOnline
				} 
				library
				bookmarked
			  }
			  posts(index: $cursor, limit: $limit) {
				pageInfoPost {
				  hasPreviousCursor
				  hasNextCursor
				  startCursor
				  endCursor
				}
				posts {
				  _id
				  ownerId
				  Picture
				  publicAt
				  totalLike
				  totalComments
				  comments {
					ownerId
					text
					when
					id
				  }
				  sharebility
				  certifiedBy
				  likes
				}
			  }
			}`;		
			const UPLOAD_FILE = gql`
				mutation uploadFile($file : Upload!){
					uploadFile(file : $file){
						filename
					}
				}`
				let cursor ="5dd5a47699f69611cc23b4de";
				let limit = 5;
				let id = this.props.ownerId;
				
		return (<Query query={GET_POSTS} variables={{ cursor,limit,id }}>
					{({ data: { users,posts }, loading, fetchMore}) => {
					  if (loading || !users|| !posts) {
						return <div>Loading ...</div>;
					  }
					  
				let {uploadFileUrl} = this.state;
				let UploadedImage = null;
				if(uploadFileUrl){
					UploadedImage = (<div className="pre-viewing-image" id="pre-viewing-image-id">
										<img className="pre-viewing-image" src={uploadFileUrl}/>
									</div>);
				}else{
					UploadedImage = (<div className="pre-viewing-image" id="pre-viewing-image-id">
										Please Select an Image...
									</div>);
				}
					  return (<div className="row">
								{this.state.posterPrintState ? (
								<div>
									<div className="poster-content-modal">
										 <div className="wit-frame">
											 <div className="wit-header">
												Express your idea, tell to others yours thinks...
												<span className="poster-close">
													<button className="btn"  onClick={() => this.togglePoster()}>
														<i  className="fa fa-remove"/>
													</button>
												</span>
											 </div><hr/>
											 <div className="wit-flex-box">
													{UploadedImage}
											 </div>
												<div className="wit-core">
													<span className="wit-authors">
													  By 
														<Link to="/cv"  className="home-btn" >
														  <span className="author-text">Becky Gordon</span>
														</Link>
													</span>
											  </div><hr/>
											  <div className="group-btn-wit">
												<label >
													<i className="fa fa-thumbs-o-up"/>
												</label>
												<label >
													<i className="fa fa-heart-o"/>
												</label>
												<label className="upload-file-label" htmlFor="uploadFile">
													<i className="fa fa-file-image-o"/>
												</label>
												<form action="/upload" method="post" enctype="multipart/form-data">
													<div className="custom-file mb-3">
														<input type="file" className="custom-file-input" name="file" id="file1" 
															onChange = {(e)=>this.previewImage(e)} />
														<label className="custom-file-label" htmlFor="file1" id="file-label">Choose file</label>
														<input type="submit" value="Submit" className="btn btn-primary btn-block"/>
													</div>
												</form>
											  </div>
											</div>
									</div>
									<div className="over-frame-modal" />
								</div>) : null}
								<div className="chats-zone">
									{listchats}
								</div>
								<div  className="col-md-12">
									<div  className="row">
										<div  className="col-md-7">
											<Wit 
												togglePosterProps={this.togglePoster}
												userId={users._id}
											/>
											{posts.posts!==[] ?
											(<Frame id={users._id} posts={posts} onLoadMore={() =>
												fetchMore({
												  variables: {
													cursor: posts.pageInfoPost.endCursor,
													limit : 4,
												  },
												updateQuery: (prev, { fetchMoreResult }) => {
												  if (!fetchMoreResult) return prev;
												  return Object.assign({}, prev, {
													posts: {
														pageInfoPost : fetchMoreResult.posts.pageInfoPost,
														posts : [...prev.posts.posts, ...fetchMoreResult.posts.posts]
													}
												  });uploadFile
												 }
											  })
											}/>)
											:(<div>None post to print</div>)}
										</div>
										<div className="col-md-5">
											<Online />
										</div>
									</div>
								</div>
								<div  className="col-md-3">
									<Friend relations={users.friends} addChat={this.addChatUser} />
								</div>
							</div>);
					}}
				  </Query>
				);
		}
	}