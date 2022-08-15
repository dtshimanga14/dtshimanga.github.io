		import React, { Component } from "react";
		import ReactDOM from 'react-dom';
		import Post from './Post.js';
		import SuggestionFriends from './SuggestionFriends.js';

		
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
			const data = this.props.posts.posts || [];
			return (
					<div className="post-frame">
						{(data ==[]) ? data.map(singlePost => <Post {...singlePost}/>):null}
						<SuggestionFriends id={this.props.id}/>
					</div>
			);
		  }
		}

		export default Frame;