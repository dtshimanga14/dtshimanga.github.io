		import ReactDOM from 'react-dom';
		import Post from './Post.js';
		import SuggestionFriends from './SuggestionFriends.js';
		import PostHk from './PostHk.js';
		import React, { Component, useState, useEffect } from 'react';

		
		import './css/Frame.css';


		const FrameHk = ({ onLoadMore,posts,id }) => {
			
			 const handleOnScroll = () => {
				var scrollTop =
					(document.documentElement && document.documentElement.scrollTop) ||
					   document.body.scrollTop;
						var scrollHeight =
						  (document.documentElement && document.documentElement.scrollHeight) ||
						  document.body.scrollHeight;
						var clientHeight =
						  document.documentElement.clientHeight || window.innerHeight;
						var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
						if (scrolledToBottom) {
						  onLoadMore();
						}
					  };
			useEffect(() => {
				window.addEventListener("scroll", handleOnScroll);
			 });
		  
			if (!posts) return <p>Loading....</p>;
			const postStream = posts || [];
			
			return (
					<div className="post-frame">
						{(postStream !==[]) ? postStream.map(singlePost => <PostHk getOnePost={singlePost}/>):null}
					</div>
			)
		}

		export default FrameHk;