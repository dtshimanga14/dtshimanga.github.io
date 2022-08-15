		import React, { Component } from "react";
		import ReactDOM from 'react-dom';
		import Post from './Post.js';
		import SuggestionFriends from './SuggestionFriends.js';
		import PostHk from './PostHk.js';

		
		import './css/Frame.css';

		class Frame extends Component {
		  componentDidMount() {
			window.addEventListener("scroll", this.handleOnScroll);
		  }

		  componentWillUnmount() {
			window.removeEventListener("scroll", this.handleOnScroll);
		  }

		  handleOnScroll = () => {
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
			  this.props.onLoadMore();
			}
		  };

		  render() {
			if (!this.props.posts) return <p>Loading....</p>;
			const posts = this.props.posts || [];
			return (
					<div className="post-frame">
						{(posts !==[]) ? posts.map(singlePost => <PostHk getOnePost={singlePost}/>):null}
					</div>
			);
		  }
		}

		export default Frame;