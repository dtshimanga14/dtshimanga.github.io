import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

export default class Library extends React.Component {
						     		
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
						<button className="btn admin-btn-size">
							<span className="icon-position-admin">
								<i className="fa fa-book"/>
								<div className="bell-layer" >{this.props.childrenLibraries.length}</div>
							</span>
							<span className="text-button">My Libraries</span>
							<span className="article-caret">
							  {this.state.contentPartTabState ? 
								(<i className="fa fa-caret-down"/>):
								(<i className="fa fa-caret-left"/>)
							  }
							</span>
						</button>
						{this.state.contentPartTabState ?
							(<div>
								{this.props.childrenLibraries.map((library)=> 
									<div>
										<Link to={`/inner/books/${library._id}`}>
											{library.promotionLevel} {" "} {library.promotionName}
										</Link>
									</div>)
								}
							</div>)
						:null}
					</div> )
		}
	}