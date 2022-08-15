import 'whatwg-fetch';
import 'babel-polyfill';

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';

import ProgressHk from './ProgressHk.js';

import { CREATE_USER } from './mutations.js';

const PosterHk = ({ setPosterToggle }) => {	  
  
  let id = localStorage.getItem('user-token');
  const [urlUploaded, setUrlUploaded] = useState("");
  const [file, setFile] = useState("");
  const [comment, setComment] = useState("");
  const [filename, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);
  
  
  
   const previewImage = async (e) =>{
		e.preventDefault();
		let reader = new FileReader();
		let fileLoad = e.target.files[0];
		let filename = e.target.files[0].name;
		console.log("filename uploaded "+ filename);
		setFileName(filename);
		console.log(fileLoad);
		reader.onloadend = ()=> {
			setFile(fileLoad);
			setUrlUploaded(reader.result);
		}
		reader.readAsDataURL(fileLoad);
	};
	
	const submit = (event) => {
			event.preventDefault();
			const fileField = document.getElementById('labeling-link');
			const formData = new FormData();
			formData.append('file', fileField.files[0]);
			let linkApi = 'http://localhost:8000/upload/'+id;
			fetch(linkApi,{
				method : 'post',
				body: formData,
				mode : "no-cors"
			}).then(res=> console.log(res));
			console.log("redirect unable")
	}; 
	const onFilesAdded = (files) => {
		setFiles(files.concat(files));
	};

  const uploadFiles = async () => {
	setUploadProgress({});
	setUploading(true);
    const promises = [];
    files.forEach(file => {
      promises.push(sendRequest(file));
    });
    try {
      await Promise.all(promises);
	  setSuccessfullUploaded(true);
	  setUploading(false);
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
	  setSuccessfullUploaded(true);
	  setUploading(false);
    }
  }
	const sendRequest = (file) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
		  setUploadProgress(copy);
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
		setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });
	  
      const formData = new FormData();
      formData.append("file", file, filename);
		
	const description1 = document.getElementById("wit-core").innerText
		||document.getElementById("wit-core").textContent;
		let tab = [id, description1];
		let descriptor = tab.join("-");
		console.log(descriptor);
      req.open("POST", "http://localhost:8000/upload/"+descriptor);
      req.send(formData);
    });
  }
  
  const renderProgress = (file) => {
    const uploadProgress = uploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        <div className="ProgressWrapper">
		  <ProgressHk progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }
  
	return (<div>
		<div className="poster-content-modal">
			 <div className="wit-frame">
				<div className="wit-header">
					Express your idea, tell to others yours thinks...
					<span className="poster-close">
						<button className="btn"  onClick={setPosterToggle}>
							<i  className="fa fa-remove"/>
						</button>
					</span>
					<span className="poster-close">
						<button className="btn"  onClick={()=> {
							const description1 = document.getElementById("wit-core").innerText
								||document.getElementById("wit-core").textContent;
								let id = "5f5fc80506bf3f2bb0895954";
								let tab = [id, description1];
								let descriptor = tab.join("-");
								let splitty = descriptor.split("-");
							alert(descriptor);
							alert(splitty[0]);
							alert(splitty[1]);
						}}>
							TEST <i  className="fa fa-remove"/>
						</button>
					</span>
				 </div><hr/>
			<form  method="post" enctype="multipart/form-data" onSubmit={submit}>
				<div className="wit-core" id="wit-core">
					<p contenteditable="true" id="description">hello world</p>
				</div>
				<div className="wit-flex-box">
				{urlUploaded ? 
					(<div className="pre-viewing-image" id="pre-viewing-image-id">
						<img className="pre-viewing-image" src={urlUploaded}/>
					</div>):
					(<div className="pre-viewing-image" id="pre-viewing-image-id">
						Please Select an Image...
					</div>)}
				</div>
				<ProgressHk />
				<renderProgress file={file} />
					<div className="custom-file mb-3">
						<input 
							type="file"
							name="labeling-link" id="labeling-link" 
							onChange = {(e)=> previewImage(e)} 
						/>
						<input type="text" value={comment} name="comment"
							onChange = {(e)=> setComment(e.target.value)} 
						/>
					</div>
					<div className="group-btn-wit">
						<button className="btn">
							<label className="" htmlFor="labeling-link" id="file-label">
								<i className="fa fa-file-image-o"/>
							</label>
						</button>
						<button className="btn">
							<i className="fa fa-thumbs-o-up"/>
						</button>
						<button className="btn">
							<i className="fa fa-heart-o"/>
						</button>
						<button className="btn">
							<input type="submit" value="Submit" />
						</button>
						<button className="btn" onClick={uploadFiles}>
							Upload
						</button>
					</div>
			</form>
			</div>
		</div>
		<div className="over-frame-modal" />
	</div>
	);
}
export default PosterHk;

