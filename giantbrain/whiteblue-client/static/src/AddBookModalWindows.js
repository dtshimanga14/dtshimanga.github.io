import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import 'babel-polyfill';


	
export default class AddBookModalWindows extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					fields : {
						picture : "",
						tittle : "",
						subTittle : "",
						author : "",
						editor : "",
						publishDay : "29.09.2014"
				},
			};
		}		
	handlerInputChange(event){
		const fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		this.setState({ fields });
	}
	onFormSubmit = async(evt) =>{
		evt.preventDefault();
		const fileField = document.getElementById('uploadDoc');
		const formData = new FormData();
		let { picture, tittle, subTittle, author, editor, publishDay} = this.state.fields;
		let Book =  {   picture , tittle , subTittle ,author , 
						editor ,library : this.props.libraryId,
                        publishDay 
					};
		let BookString = JSON.stringify(Book);
		formData.append('file', fileField.files[0]);
		let linkApi = 'http://localhost:8000/libraries/'+BookString;
		await fetch(linkApi,{ method : 'post', body: formData })
		.then(res => JSON.parse(res))
		.then(res => this.setState({ filename : res }))
		.then(data => alert(this.state.filename));
		
	}
		render(){

				return (<div>
							<div className="over-frame-modal"/>
							<div className="book-adder" >
									<div className="wit-header">
										Add Book 
									</div><hr/>
									<div className="book-inner-adder">
										<form method="post" enctype="multipart/form-data" onSubmit={this.onFormSubmit}>
											<div>
												<input type="file" name="file" id="uploadDoc"/>
											</div>
											<div className="">
												<div className="label-div-input"><label >Tittle</label></div>
												<input 
													className="" type="text" 
													placeholder="Tittle" name="tittle"
													value={this.state.fields.tittle} onChange={this.handlerInputChange}/>
											</div>
											<div className="">
												<label >SubTittle</label>
												<input className=""  type="text" 
													placeholder="Subtittle" name="subTittle"
													value={this.state.fields.subTittle} onChange={this.handlerInputChange}
												/>
											</div>
											<div className="">
												<label >Authors</label>
												<input className="" type="text" placeholder="authors..."  name="author"
													value={this.state.fields.author} onChange={this.handlerInputChange}
												/>
											</div>
											<div className="">
												<label >Editor</label>
												<input className="" type="text" placeholder="editor..." name="editor"
													value={this.state.fields.editor} onChange={this.handlerInputChange}
												/>
											</div>
											<div className="">
												<label >File</label>
												<input className="" type="file" placeholder="Book to upload"/>
											</div>
											<div className="">
												<label >Publication date</label>
												<input className="" type="date" placeholder="option..." name="publishDay"
													value={this.state.fields.publishDay} onChange={this.handlerInputChange}
												/>
											</div>
											<div className="">
												<label >CoverBook</label>
												<input className="" type="file" placeholder="CoverBook..."/>
											</div><hr/>
											<button className="btn" >
												<i className="fa fa-paper-plane-o"/><input type="submit" value="Submit"/>
											</button>
											<button className="btn"  onClick={() => {this.props.handlerAddBookModalWindows()}}>
												<i  className="fa fa-remove"/><span className="text-button">Cancel</span>
											</button>
									</form>
								</div>
							</div>
						</div>);
				}
		}