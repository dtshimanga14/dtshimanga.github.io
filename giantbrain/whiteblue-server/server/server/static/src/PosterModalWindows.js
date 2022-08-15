import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import 'babel-polyfill';
import Comment from './Comment.js';


export default class Poster extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					file : '',
					uploadFileUrl : '',
					loadState : 0,
				};
				this.previewImage = this.previewImage.bind(this);

			}			     		
		previewImage(e){
			e.preventDefault();
			let reader = new FileReader();
			let fileLoad = e.target.files[0];
			reader.onloadend = ()=> {
					this.setState({
						file : fileLoad,
						uploadFileUrl : reader.result,
						loadState : reader.LOADING,
					});
			}
			reader.readAsDataUrl(fileLoad);
		}
		render(){
				let {uploadFileUrl} = this.state;
				let UploadedImage = null;
				if(uploadFileUrl){
					UploadedImage = (<div className="pre-viewing-image" id="pre-viewing-image-id">
										<img src={uploadFileUrl}/>
									</div>);
				}else{
					UploadedImage = (<div className="pre-viewing-image" id="pre-viewing-image-id">
										Please Select an Image...
									</div>);
				}
				return (
					<div>
						<div className="poster-content-modal" >
							 <div className="wit-frame">
								 <div className="wit-header">
									Express your idea, tell to others yours thinks...
									<span className="poster-close">
										<button className="btn"  onClick={() => this.props.togglePosterProps()}>
											<i  className="fa fa-remove"/>
										</button>
									</span>
								 </div><hr/>
									<div className="wit-core">
										<div className="wit-flex-box">
											{UploadedImage}
											<div className="poster-editor">
												<Comment />
											</div>
										</div>
										<span className="wit-authors">
										  By 
											<Link to="/cv"  className="home-btn" >
											  <span className="author-text">Becky Gordon</span>
											</Link>
										</span>
								  </div><hr/>
								  <div className="group-btn-wit">
									<label >
										<i className="fa fa-thumbs-o-up"/>
									</label>
									<label >
										<i className="fa fa-heart-o"/>
									</label>
									<label className="upload-file-label" htmlFor="uploadFile">
										<i className="fa fa-file-image-o"/>
									</label>
									<form action="http://localhost:8000/upload" method="post" enctype="multipart/form-data">
										<div className="custom-file mb-3">
											<input type="file" className="custom-file-input" name="file" id="file1" 
												onChange = {(e)=>this.previewImage(e)} />
											<label className="custom-file-label" htmlFor="file1" id="file-label">Choose file</label>
										</div>
										<input type="submit" value="Submit" className="btn btn-primary btn-block"/>
									</form>
									<button className="btn" onClick={() => this.props.togglePosterProps()}>
										<i className="fa fa-paper-plane-o"/>
									</button>
								  </div>
								</div>
						</div>
						<div className="over-frame-modal" />
					</div>);
				}
		}