import React from 'react';
import Post from './Post.js';
import ListFriends from './ListFriends.js';
import 'whatwg-fetch';

const data = [];	

	export default class StreamPosts extends React.Component {
			constructor(props) {
				super(props);
			}

			componentDidMount() {
				fetch('/textform',{ method: 'GET',headers: { 'Content-Type': 'application/json' }})
								 .then(answer1 => answer1.json())
								 .then(answer2 => {
								 	 return answer2 })
								 .catch(err => alert('fecth a plante')
								 	);
			}
			render (){

				const posts = data.map((c) => <Post content={c}/>);
				return (
					<div className="col-lg-7" id="publish_sp">
						<div className="content-position" >
							<ListFriends />
							<div>
							</div>
						</div>
					</div>
				);
			}
		}