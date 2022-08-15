
import React from 'react';
import ReactDOM from 'react-dom'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import 'whatwg-fetch';
import 'babel-polyfill';

	
export default class AddNoteModalWindows extends React.Component {
						     	
		constructor(props){
				super(props);
			}
		render(){
			return (
				<div>
					<div className="over-frame-modal"/>
					<div className="subscription-form-frame" >
						<button className="btn">
							Previous
						</button>
					</div>
					<div>
						{this.props.pupils.map((pupil)=(
							<div>
								{pupil.personals.username}
							</div>
						))}
					</div>
				</div>)
			}
		}