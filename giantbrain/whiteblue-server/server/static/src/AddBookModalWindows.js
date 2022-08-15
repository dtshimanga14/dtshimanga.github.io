import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import 'babel-polyfill';


	
export default class AddBookModalWindows extends React.Component {
						     	
		constructor(props){
				super(props);
			}			     		
		
		render(){

				return (<div>
							<div className="over-frame-modal"/>
							<div className="subscription-form-frame" >
							<div className="subscription-wit-frame">
								  <div >
										<div className="wit-header">
											Add Book
										</div><hr/>
									  <form action="http://localhost:8000/inner/books/fileupload" method="post" enctype="multipart/form-data">
										<input type="file" name="filetoupload"/>
										<input type="submit"/>
									  </form>
								  </div>/* 
								<form onSubmit={this.onSubmit}>
									
									<div className="subscription-wit-core">
										<div className="couple-label-input">
											<div className="label-div-input"><label >Tittle</label></div>
											<input className="" type="text" placeholder="tittle..."/>
										</div>
										<div className="couple-label-input">
											<label >SubTittle</label>
											<input className="" type="text" placeholder="subtittle..."/>
										</div>
										<div className="couple-label-input">
											<label >Authors</label>
											<input className="" type="text" placeholder="authors..."/>
										</div>
										<div className="couple-label-input">
											<label >Editor</label>
											<input className="" type="password" placeholder="editor..."/>
										</div>
										<div className="couple-label-input">
											<label >File</label>
											<input className="" type="file" placeholder="upload file..."/>
										</div>
										<div className="couple-label-input">
											<label >Publication date</label>
											<input className="" type="date" placeholder="option..."/>
										</div>
										<div className="couple-label-input">
											<label >Overview Picture</label>
											<input className="" type="file" placeholder="overview picture..."/>
										</div>
										<span className="wit-authors">
										  By 
											<Link to="/cv"  className="home-btn" >
											  <span className="author-text">Becky Gordon</span>
											</Link>
										</span>
									  </div><hr/>
									  <div className="group-btn-wit">
										<button className="btn" onClick={() => {alert('essaie')}}>
											<i className="fa fa-paper-plane-o"/><span className="text-button">Submit</span>
										</button>
										<button className="btn"  onClick={() => {this.props.handlerAddBookModalWindows()}}>
											<i  className="fa fa-remove"/><span className="text-button">Cancel</span>
										</button>
									  </div>
							</form> */
						</div>
					</div>
				</div>);
				}
		}