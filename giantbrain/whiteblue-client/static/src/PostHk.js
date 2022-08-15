
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { BrowserRouter as Router, Switch, Route, Link, NavLink,Redirect } from 'react-router-dom';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';


import Loading from './Loading.js';

import { GET_USER, GET_COMMENTS } from './queries.js';
import { SHAREPOST_MUT, LIKEORDISLIKE_MUT, COMMENT_MUT, ONSHARE } from './mutations.js';
import { COMMENT_POST } from './subscriptions.js';


	class CommentsPage extends React.Component {
	  
	  render(){
		  return(
			<div className="wrap-comment">
				<span  className="comment-indicator">
					{this.props.comments.length}
					<span onClick={this.props.setFeedBacks}>comments</span>
				</span>
				{this.props.comments.length !== 0 ? (<div>{this.props.comments.map(comment =>(
					<div>
						<img src={`http://localhost:8000/image/${comment.user.avatar}`} 
							className = "picture-owner-post" 
						/>
						<div className="zone-comment">{comment.text}</div>
						<span className="comment-date">{moment(comment.when).fromNow()}</span>
					</div>
				))}</div>) : null}	
			</div>
		  );
		  }
		}

const Comments = ({ postId, setFeedBacks }) => {
	
  const { loading, error, data, subscribeToMore } = useQuery(GET_COMMENTS,{ variables: { postId }});
  
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  let { comments } = data;
	return (<CommentsPage comments={comments} setFeedBacks={setFeedBacks}/>)
};


const LastComment = ({ postId, setFeedBacks }) => {
	
  const { data , loading} = useSubscription(COMMENT_POST, { variables: { postId } });

  if (loading) 
	  return null;
  let { onComment } = data;
  let tabComment = [onComment];  
  
return (<CommentsPage comments={tabComment} setFeedBacks={setFeedBacks}/>)
	
};

const PostHk = ({ getOnePost }) => {
  //let id = getOnePost.ownerId.avatar._id;
  let id = localStorage.getItem('user-token');
  let currAvatar = localStorage.getItem('user-tkn');
  console.log("avatar "+currAvatar);
  
  let posterId = getOnePost.ownerId;
  let timePost = moment(new Date()).format('DD-MMMM-YYYY HH:mm:ss');
  
  const [feedBacks, setFeedBacks] = useState(false);
  const [menuSetting, setmenuSetting] = useState(false);
  const [likerIcon, setLikerToggle] = useState(false);
  const [comment, setComment] = useState("");
  
  // mutations
  const [ makeShareblePost ] = useMutation(SHAREPOST_MUT);
  const [ addLikePost ] = useMutation(LIKEORDISLIKE_MUT);
  const [ addCommentsPost ] = useMutation(COMMENT_MUT);
  const [ onShare ] = useMutation(ONSHARE);
  // functions
  const setShareSetting = () => {
    makeShareblePost({
	  variables : { idPost : getOnePost._id, 
		sharebility:!getOnePost.sharebility
	}})
  };
  
  const setLike = () => {
    addLikePost({
	  variables : { idPost : getOnePost._id,
		idUser: id
	}});
  };
  const setComments = (value) => {
    addCommentsPost({
	  variables : { idPost : getOnePost._id,
		idUser: id,
		commentText : value,
	}});
  };
  
  const { loading, error, data } = useQuery(GET_USER,{ variables: { id : posterId }});
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  
  let { users } = data;
  
  return (<div className="post">
			<div className="flex-box-row">
				<div>
					<img className = "picture-owner-post" src={`http://localhost:8000/image/${users.avatar}`}/>
				</div>
				<div className="post-owner">
					<div>
						<Link to={`cv/${users._id}`} >{users.personals.username} {' '} {users.personals.middlename}</Link>
					</div>
					<div>
						<span className="date-time-hour">{timePost}</span> <i className="fa fa-globe"/>
					</div>
				</div>
				<span  className="ellipsis-post" onClick={()=>setmenuSetting(!menuSetting)}>
					<i className="fa fa-ellipsis-h"/>
				</span>
				{menuSetting ? 
					(<div className="menu-post">
						<div className="configure-post" onClick={()=> {setShareSetting()}}>
							Make shareable
						</div>
					</div>): null}
			</div>
			{getOnePost.descriptor =="" ? null : (<div><p>{getOnePost.descriptor}</p></div>)}
			<div>
				<img className = "post-picture-owner" 
					src={`http://localhost:8000/image/${getOnePost.filename}`} 
				/>
			</div>
			<div  className = "post-feeling-frame">
				<div className="group-btn-wit">
					<span><span className="post-like" >
								{getOnePost.likes.includes(getOnePost._id) ?
								(<i className="fa fa-thumbs-o-up"/>):
								(<i className="fa fa-thumbs-down"/>)}
							</span>
					</span>
					<span  className="like-indicator">
						<i className="fa fa-heart-o"/>
					</span>
						<span className="left-position"/>
				 </div><hr/>
			<div  className = "post-feeling-frame">
				<button className="btn" onClick={setLike}>
					<i className="fa fa-thumbs-up"/><span className="text-button">J'aime</span>
				</button>
				<button className="btn" onClick={()=> document.getElementById(getOnePost._id).focus() }>
					<i className="fa fa-comments-o"/><span className="text-button">Commenter</span>
				</button>
				{getOnePost.sharebility ? 
				(<button className="btn" onClick={()=> onShare({ variables : { postId : getOnePost._id}})}>
					<i className="fa fa-share"/><span className="text-button">Partager</span>
				</button>):null}
				
			 </div><hr/>
			</div>
			{!feedBacks ? (<span  className="comment-indicator">
				<span onClick={()=> setFeedBacks(!feedBacks)}>show comments</span>
			</span>): null}
			<LastComment postId={getOnePost._id} setFeedBacks={()=> setFeedBacks(!feedBacks)}/>
			{feedBacks ? (<Comments postId={getOnePost._id} setFeedBacks={()=> setFeedBacks(!feedBacks)}/>):null} 
			<div className="comment-form">
				<div className="comment-image">
					<img className = "picture-owner-post" src={`http://localhost:8000/image/${users.avatar}`}/>
				</div>
				<form className="post-form" onSubmit={(e) => {
						  e.preventDefault();
						  setComments(comment);
						  setComment("");
				}}>
					<input value={comment} id={getOnePost._id}
						onChange={({ target }) => setComment(target.value)}  
						className="post-input"
					/>
				</form>
			</div>
		</div>);
}


export default PostHk;