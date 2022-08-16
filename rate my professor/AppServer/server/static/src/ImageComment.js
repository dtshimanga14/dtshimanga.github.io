import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

	export default class ImageComment extends React.Component {
			
			constructor(props){
				super(props);
			}

			render (){ 
					
					let id = this.props.userId;
					
					const GET_USER = gql`query ($id: String!){
										 users(id: $id) {
											personals {
											  middlename
											  username
											  picture
											}
										  }
										}`;
					
					return (<Query query={GET_USER} variables={{id}}>
							{({ data: { users  }, loading,})=>{
								if (loading || !users) {
								return null;
							  }
								return (<div className="comment-image">
											<img className = "picture-owner-post" src ={users.personals.picture}/>
										</div>);
							}}
						</Query>);
					}
			}