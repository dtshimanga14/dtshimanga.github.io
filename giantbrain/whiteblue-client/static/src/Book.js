import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import Loading from './Loading.js';
import 'whatwg-fetch';

	export default class Book extends React.Component {
			
		constructor(props){
			super(props);
			this.state = {
				bookMarkIconState : true,
			};
			this.handlerbookMarkIconState = this.handlerbookMarkIconState.bind(this);
		}
		handlerbookMarkIconState(){
			let invbookMarkIconState = !this.state.bookMarkIconState;
			this.setState({
				bookMarkIconState : invbookMarkIconState
			});
		}
		render (){
			let userId =  "5cdf132bcd42aa0218d6b30d", 
				picture = "./photos/books/Pro React,Cassio de Soussa.PNG",
				tittle = "Pro React",
				subTittle = "Built complex front-end applications in a composable way with React", 
				author = "Cassio de Soussa Antonio",
				editor = "Apress",
				publishDay = "",
				path =  "./docs/REACT/Pro React.pdf";
			
			const BOOKS_MUT = gql`
			mutation addBookMarkedToUser ($userId: String!, $picture: String!, $tittle: String!, $subTittle: String!,
											$author: String!, $editor: String!,
											$publishDay: String!, $path: String!,){
			  addBookMarkedToUser(userId: $userId, picture: $picture, tittle: $tittle,
										  subTittle: $subTittle, author: $author, editor: $editor, 
										  publishDay: $publishDay, 
										  path: $path
									) {
				_id
				books {
				  picture
				  id
				  tittle
				  subTittle
				  editor
				}
			  }
			}
			`;
			
			let book = this.props.bookPassed;
			
			let AnUser = "5cdf132bcd42aa0218d6b30d";
			return (
				<div className="book-frame" >
					<div>
						<a href={book.path} target="_blank">
							<img className="book-picture" src={book.picture}/>
						</a>
					</div>
					<div className="read-button">
						<Link to="#" >
							<button className="btn">
								<i className="fa fa-heart-o"/>
							</button>
						</Link>
						<Link to="#" >
							<button className="btn">
								<i className="fa fa-share-alt"/>
							</button>
						</Link>
						<Mutation mutation={BOOKS_MUT}>
							{(addBookMarkedToUser,{data}) => {
								return(<Link to="#"
											onClick={() => {
												addBookMarkedToUser({ variables: { 
														userId : userId, 
														picture :picture,
														tittle :tittle,
														subTittle : subTittle, 
														author :author,
														editor :editor,
														publishDay :publishDay,
														path :  path
													}
												});
											   this.handlerbookMarkIconState();
										}}>
											<button className="btn">
												{this.state.bookMarkIconState ?
													<i className="fa fa-bookmark-o"/>:
													<i className="fa fa-bookmark"/>
												}
											</button>
									</Link>)
							}}
						</Mutation>
					</div>
				</div>
			);
		}
	}