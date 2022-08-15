import React,{ useCallback } from 'react';
import ReactDOM from 'react-dom';
import useDropzone from 'react-dropzone';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import 'babel-polyfill';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { useQuery,useMutation } from '@apollo/react-hooks';


export class Uploader extends React.Component {
  constructor(props){
	super(props);	
  }
  render() {
	
	const uploadFileMutation = gql`
			mutation uploadFile($file : Upload!){
				uploadFile(file : $file)
			}`;
	const filesQuery = gql`
		query files {
			files
		}`;
	const [uploadFile] = useMutation(uploadFileMutation,{
		refetchQueries : [{ query : filesQuery }]
	});
	const onDrop = useCallback(
		([file])=>{
			uploadFile({ variables : { file }});
		},[uploadFile]);
	const { getRootProps, 
		getInputProps, 
		isDragActive } = useDropzone({ onDrop });  
		
    return (<div {...getRootProps()}>
					<input {...getInputProps()}/>
					{isDragActive ? (<p>Drop the files here ...</p>):
					(<p>Drop 'n' drop some files here, or click to elect files ...</p>)}
				</div>);
  }
}