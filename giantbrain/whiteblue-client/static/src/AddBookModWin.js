import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import 'babel-polyfill';
import gql from 'graphql-tag';
import moment from 'moment';
import 'whatwg-fetch';
import { useQuery, useApolloClient , useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import Loading from './Loading.js';

const AddBookModWin = ({ libraryId, handlerAddBookModalWindows }) => {
	
	const [book, setBook] = useState({
			picture : "",tittle : "",
			subTittle : "",author : "",
			editor : "",publishDay : "29.09.2014"
	});//books 
	
	const [filename, setFilename] = useState("");//filename
	
	const onForm = (e) => {//handlerInputChange
		setBook((prev) => {
			return { ...prev, [e.target.name] : e.target.value }
		})
	};
	const submit = async (event) => {//onFormSubmit
		event.preventDefault();
		const fileField = document.getElementById('uploadDoc');
		const formData = new FormData();
		
		let { picture, tittle, subTittle, author, editor, publishDay} = book;
		let Book =  {   picture , tittle , subTittle ,author , 
						editor ,library : libraryId,
                        publishDay 
					};
		let BookString = JSON.stringify(Book);
		formData.append('file', fileField.files[0]);
		let linkApi = 'http://localhost:8000/libraries/'+BookString;
		await fetch(linkApi,{ method : 'post', body: formData })
		.then(res => JSON.parse(res))
		.then(res => setFilename(res))
		.then(data => alert(filename));
	};
	return(
		<div>
		<div className="over-frame-modal"/>
		<div className="book-adder" >
				<div className="wit-header">
					Add Book 
				</div><hr/>
				<div className="book-inner-adder">
					<form method="post" enctype="multipart/form-data" onSubmit={submit}>
						<div>
							<input type="file" name="file" id="uploadDoc"/>
						</div>
						<div className="">
							<div className="label-div-input"><label >Tittle</label></div>
							<input 
								className="" type="text" 
								placeholder="Tittle" name="tittle"
								value={book.tittle} onChange={onForm}/>
						</div>
						<div className="">
							<label >SubTittle</label>
							<input className=""  type="text" 
								placeholder="Subtittle" name="subTittle"
								value={book.subTittle} onChange={onForm}
							/>
						</div>
						<div className="">
							<label >Authors</label>
							<input className="" type="text" placeholder="authors..."  name="author"
								value={book.author} onChange={onForm}
							/>
						</div>
						<div className="">
							<label >Editor</label>
							<input className="" type="text" placeholder="editor..." name="editor"
								value={book.editor} onChange={onForm}
							/>
						</div>
						<div className="">
							<label >File</label>
							<input className="" type="file" placeholder="Book to upload"/>
						</div>
						<div className="">
							<label >Publication date</label>
							<input className="" type="date" placeholder="option..." name="publishDay"
								value={book.publishDay} onChange={onForm}
							/>
						</div>
						<div className="">
							<label >CoverBook</label>
							<input className="" type="file" placeholder="CoverBook..."/>
						</div><hr/>
						<button className="btn" >
							<i className="fa fa-paper-plane-o"/><input type="submit" value="Submit"/>
						</button>
						<button className="btn"  onClick={() => {handlerAddBookModalWindows()}}>
							<i  className="fa fa-remove"/><span className="text-button">Cancel</span>
						</button>
				</form>
			</div>
		</div>
	</div>
	);
};

export default AddBookModWin;
	