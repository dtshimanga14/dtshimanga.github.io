import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import { Query, Mutation } from 'react-apollo';
import 'whatwg-fetch';

import Book from './Book.js';


import './css/BookStore.css';

import AddBookModalWindows from './AddBookModalWindows.js';
import Loading from './Loading.js';

	export default class BookStore extends React.Component {
			
		constructor(props){
			super(props);
			this.state = {
				books : [],
				bookSearch  : '',
				bookMarksState : [],
				isLoading : true,
				addBookModalWindowState : true,
			};
			this.searchBooks = this.searchBooks.bind(this);
			this.bookMarkLink = this.bookMarkLink.bind(this);
			this.UnbookMarkLink = this.UnbookMarkLink.bind(this);
			this.handlerAddBookModalWindows = this.handlerAddBookModalWindows.bind(this);
		}
		handlerAddBookModalWindows(){
			this.setState(prevState => {
				return {
					addBookModalWindowState : !prevState.addBookModalWindowState
				};
			});
		}
		UnbookMarkLink(book){
			let BookMarks = this.state.bookMarksState;
			let filterBookMarks = BookMarks.filter((currentBook) => (currentBook.tittle !== book.tittle));
			this.setState({ bookMarksState : filterBookMarks });
		}
		bookMarkLink(book){
			let BookMarks = this.state.bookMarksState;
			if(!BookMarks.find((attachedBook) => (attachedBook.tittle === book.tittle))){
				let newBookMarksState = BookMarks.concat(book);
				this.setState({ bookMarksState : newBookMarksState });
			}
		}
		searchBooks(event){
			let booksState = this.state.books;
			let bookFinded = event.target.value;
			let booksStateFilter = booksState.filter(
				(book) => {
					if((book.tittle.indexOf(bookFinded)> -1)){
							return book;
					}
				}
			);
			this.setState({
				books : booksStateFilter,
				bookSearch : bookFinded
			});
			alert(this.state.books);
		}
		componentDidMount(){
		}
			render (){
				let userId =  localStorage.getItem("userId");
			const DELETE_BOOKMARKS_MUT = gql`
			mutation deleteBookMarkedToUser($userId: String!, $bookId: String!,){
			  deleteBookMarkedToUser(userId: $userId, bookId: $bookId) {
				_id
				books{
				  id
				  BookMarkDay
				  filename
				  picture
				  tittle
				  subTittle
				  author
				  editor
				  publishDay
				}
			  }
			}
			`;
			const ADD_BOOKS_MUT = gql`
			mutation addBookMarkedToUser ($userId: String!, $picture: String!, $tittle: String!, $subTittle: String!,
											$author: String!, $editor: String!,
											$publishDay: String!, $filename: String!,){
			  addBookMarkedToUser(userId: $userId, picture: $picture, tittle: $tittle,
										  subTittle: $subTittle, author: $author, editor: $editor, 
										  publishDay: $publishDay, 
										  filename: $filename
									) {
				_id
				books {
				  id
				  BookMarkDay
				  picture
				  tittle
				  filename
				  subTittle
				  author
				  editor
				  publishDay
				}
			  }
			}
			`;
			
			let id = localStorage.getItem("userId");
				const GET_BOOKSTORES = gql`query ($promotionId: String!, $id: String){
											users (id: $id) {
												_id
												books{
												  id
												  BookMarkDay
												  filename
												  picture
												  tittle
												  subTittle
												  author
												  editor
												  publishDay
												}
										  }
										  libraries(promotionId: $promotionId){
											  _id
											books {
											  picture
											  tittle
											  subTittle
											  author 
											  editor
											  filename
											  publishDay
											}
										  }
											}`;		
		const promotionId = this.props.match.params.promotionId.toString();	
		
		return (<Query query={GET_BOOKSTORES} variables={{ promotionId,id }}>
					{({ data: { libraries,users }, loading }) => {
					  if (loading || !libraries|| !users) {
						return <div>Loading ...</div>;
					  }
					  return (<div>
								{this.state.addBookModalWindowState ? null : 
								<AddBookModalWindows 
									handlerAddBookModalWindows={this.handlerAddBookModalWindows}
									libraryId={libraries._id}
									/>}
								<div className="frame-book-store">
									<button className="btn">
										<i className="fa fa-book"/><span className="text-button">Sort by</span>
									</button>
									<select className="yardstick-books-frame">
										<optgroup label="Year of study">
											<option>2017 - 2018</option>
											<option>2016- - 2017</option>
											<option>2015 - 2016</option>
											<option>2014 - 2015</option>
										</optgroup>
										<optgroup label="Year of advertising">
											<option>2017 - 2018</option>
											<option>2016- - 2017</option>
											<option>2015 - 2016</option>
											<option>2014 - 2015</option>
										</optgroup>
										<optgroup label="Authors">
											<option>Jane Becky</option>
											<option>David Becky</option>
											<option>Oneself</option>
										</optgroup>
										<optgroup label="School">
											<option>M.I.T</option>
											<option>Unikin</option>
										</optgroup>
									</select>
									<button className="btn add-book" onClick={() => this.handlerAddBookModalWindows()}>
										<i className="fa fa-book"/><span className="text-button">Add Books</span>
									</button>
									<button className="btn icon-search-book">
										<i className="fa fa-search"/>
									</button>
									<input type="search" value={this.state.bookSearch} className="search-book-store" onChange={this.searchBooks}/>
								</div>
								<div className="ph_classmate">
									{libraries[0] !==[] ? libraries[0].books.map(
												(book)=>{
													return (
									<div className="classmate_sp" >
										<div>
											<a href={`http://localhost:8000/docs/${book.filename}`} target="_blank">
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
											<Mutation mutation={ADD_BOOKS_MUT}
												update={(cache, { data: { addBookMarkedToUser } }) => {
												const { users } = cache.readQuery({ query: GET_BOOKSTORES });
												cache.writeQuery({
												  query: GET_BOOKSTORES,
												  data: { users :  addBookMarkedToUser},
												});
											}}>
												{(addBookMarkedToUser,{data}) => {
													return(<Link to="#"
																onClick={() => {
																	addBookMarkedToUser({ variables: { 
																			userId : userId, 
																			picture : book.picture,
																			tittle : book.tittle,
																			subTittle : book.subTittle, 
																			author : book.author,
																			editor : book.editor,
																			publishDay : book.publishDay,
																			filename :  book.filename
																		}
																	});
															}}>
																<button className="btn">
																	{true ?
																		<i className="fa fa-bookmark-o"/>:
																		<i className="fa fa-bookmark"/>
																	}
																</button>
														</Link>)
												}}
											</Mutation>
										</div>
									</div>)}
									): <div>Your books box is empty</div>}
								</div>
								<div className="bookmarked-store">
									<div className="book-history-head">
										<i className="fa fa-thumb-tack"/>{'  '}Books history
									</div>
									<div className="booksMarked-rendered">
										{users.books.map(
											(newBook,key) => (
											<div className="basket-book-frame">
												<span className="booksMarked-key">{key}</span>.{' '}
												<a href={newBook.filename} tittle={newBook.tittle} target="_blank" className="basket-book-tittle">
													{newBook.tittle}
												</a>
												<Mutation mutation={DELETE_BOOKMARKS_MUT}
													update={(cache, { data: { deleteBookMarkedToUser } }) => {
													const { users } = cache.readQuery({ query: GET_BOOKSTORES });
													cache.writeQuery({
													  query: GET_BOOKSTORES,
													  data: { users :  deleteBookMarkedToUser},
													});
												}}>
													{(deleteBookMarkedToUser,{data}) => {
														return(<button className="btn library-trash-btn" 
																	onClick={() => {
																		deleteBookMarkedToUser({ variables: { 
																				userId : userId, 
																				bookId : newBook.id,
																			}
																		});
																}}>
																	<i className="fa fa-trash"/>
																</button>)
													}}
												</Mutation>
												<div>
													<Link to="/Cv" className="basket-book-author">
														{newBook.author}
													</Link>
												</div>
												<span className="bookmarked-date">
													{moment(newBook.BookMarkDay).fromNow()}
												</span>
											</div>)
										)}
									</div>
								</div>
							</div>);
					}}
				  </Query>
				);
			}
		}