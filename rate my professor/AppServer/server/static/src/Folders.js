import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';

export default class Folders extends React.Component {
						     		
		constructor(props){
				super(props);
				this.state = {
					contentPartTabState : false,
				};
				this.handlercontentPartTabState = this.handlercontentPartTabState.bind(this);
		}
		handlercontentPartTabState(){
			this.setState({
				contentPartTabState : !this.state.contentPartTabState
			});
		}
		render(){
			return (<div onClick={() => this.handlercontentPartTabState()}>
						<Link to="/inner/folders">
							<button className="btn admin-btn-size">
								<span className="icon-position-admin">
									<i className="fa fa-folder-o"/>
									<div className="bell-layer" >2</div>
								</span>
								<span className="text-button">My Folders</span>
								<span className="article-caret">
								  {this.state.contentPartTabState ? 
									(<i className="fa fa-caret-down"/>):
									(<i className="fa fa-caret-left"/>)
								  }
								</span>
							</button>
						</Link>
					</div>)
		}
	}