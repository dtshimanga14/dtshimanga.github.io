import React, { Component } from 'react';
import './css/react-draft-wysiwyg.css';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation,Query } from 'react-apollo';

import 'whatwg-fetch';
import 'babel-polyfill';
import uuid from 'uuid';
import Loading from './Loading.js';
import Section from './Section.js';


export default class CoursePrint extends Component {
  constructor(props) {
    super(props);
  }
  render() {
		const GET_COURSES = gql`
							query getCoreCourses($id: String){
							  getCoreCourses(id: $id) {
								_id
								createdDate
								lastUpdate
								promotionId
								name
								teacherId {
								  _id
								}
								summary
								ponderation
								sections {
								  sectionId
								  tittle
								  paragraphs {
									type
									content
								  }
								}
							  }
							}
						`;	
	let id = "5deb57ebe0928e22c0770c62";
	return (<Query query={GET_COURSES} variables={{ id }}>
				{({ data :{ getCoreCourses },loading, error})=>{
					if (loading || !getCoreCourses) {
						return <div>Loading ...</div>;
								  }
				return (<div className="article-post-frame">
					<div className="article-main-header">
						{getCoreCourses.name}
					</div><hr />
					<div>
						{getCoreCourses.sections==[]? null 
							: getCoreCourses.sections
									.map(portion => 
										< Section portion={portion}/>
						)}
					</div><hr />
				</div>)}}
			</Query>);
  }
}

