import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import { Query, Mutation } from 'react-apollo';
import 'whatwg-fetch';
import { useQuery, useApolloClient , useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import Loading from './Loading.js';
import Book from './Book.js';
import AddBookModWin from './AddBookModWin.js';

import { GET_BOOKSTORES } from './queries.js';
import { DELETE_BOOKMARKS_MUT, ADD_BOOKS_MUT,  } from './mutations.js';

import './css/BookStore.css';



const LibrariesHk = () => {
	
	  let userId =  localStorage.getItem('user-token');
	  let id = localStorage.getItem('user-token');
	  const promotionId = "5dda49065232b51c88da601e"//this.props.match.params.promotionId.toString();
	  
	  const [books, setBook] = useState([]);//books
	  const [search, setSearch] = useState("");//bookSearch
	  const [tags, setTags] = useState([]);//bookMarksState
	  const [isLoading, setIsLoading] = useState(true);//isLoading
	  const [toggleAddBook, setToggleAddBook] = useState(true);//addBookModalWindowState
	  
	  
	  const [ deleteBookMarkedToUser ] = useMutation(DELETE_BOOKMARKS_MUT);
	  const [ addBookMarkedToUser ] = useMutation(ADD_BOOKS_MUT);
	  
	  const handlerAddBookModalWindows = ()=>{
		  setToggleAddBook(!toggleAddBook);
		};
	  const UnbookMarkLink = (book) => {
			setTags((prevTags)=> prevTags.filter((currentBook) => (currentBook.tittle !== book.tittle)));
		};
	  const bookMarkLink = (book)=> {
			if(!tags.find((attachedBook) => (attachedBook.tittle === book.tittle))){
				let newTags = tags.concat(book);
				setTags(newTags);
			}
		};
		
		const searchBooks = (event)=> {
			let bookFinded = event.target.value;
			let booksStateFilter = books.filter(
				(book) => {
					if((book.tittle.indexOf(bookFinded)> -1)){
							return book;
					}
				}
			);
			setBook(booksStateFilter);
			setSearch(bookFinded);
			alert(books);
		};
		
	  const { loading, error, data } = useQuery(GET_BOOKSTORES,
			{ variables: { promotionId, id }
		});
	  
	  if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { libraries, users } = data;
	return(
		<div>
		{toggleAddBook ? null : (<AddBookModWin 
			handlerAddBookModalWindows={handlerAddBookModalWindows} 
			libraryId={libraries._id}
		/>)}
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
			<button className="btn add-book" onClick={() => handlerAddBookModalWindows()}>
				<i className="fa fa-book"/><span className="text-button">Add Books</span>
			</button>
			<button className="btn icon-search-book">
				<i className="fa fa-search"/>
			</button>
			<input type="search" value={search} className="search-book-store" onChange={searchBooks}/>
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
					<Link to="#" onClick={() => { addBookMarkedToUser({ variables: { 
						userId : userId,picture : book.picture,
						tittle : book.tittle,subTittle : book.subTittle, 
						author : book.author,editor : book.editor,
						publishDay : book.publishDay,filename :  book.filename
					}})}}>
							<button className="btn">
								{true ? <i className="fa fa-bookmark-o"/>:<i className="fa fa-bookmark"/>}
							</button>
						</Link>
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
						<button className="btn library-trash-btn" 
							onClick={() => deleteBookMarkedToUser({ variables: { userId : userId, bookId : newBook.id }})}
						>
							<i className="fa fa-trash"/>
						</button>
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
	</div>
	);
	
};

export default LibrariesHk;

	