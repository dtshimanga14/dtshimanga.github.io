import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post.js';
import Friend from './Friend.js';
import Chat from './Chat.js';
import 'whatwg-fetch';
import 'babel-polyfill';
export default class Actu extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					posts : []
				};

			}	
		componentDidMount(){
			fetch('/api/posts')
			.then(data => data.json())
			.then(
				answer => this.setState({ posts : answer })
			)
			.catch('fetch a plante');
		}
		render(){
			const ListPost = this.state.posts.map(singlePost => <Post id={singlePost.Id} dataSingle={singlePost}/>);

				return ( 
						<div className="col-lg-7" >
							<div className="home-frame">
								{ListPost}
							</div>
							<Friend />
							<div className="chats_zone" id="popup-chat-zone">
								<Chat />
								<Chat />
							</div>
							<Footer />
						</div>);
				}
		}