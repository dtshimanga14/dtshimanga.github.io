import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

export default class PartTab extends React.Component {
						     		
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
							{this.props.children}
							<span className="article-caret">
							  {this.state.contentPartTabState ? 
								(<i className="fa fa-caret-down"/>):
								(<i className="fa fa-caret-left"/>)
							  }
							</span>
						</button>
						{this.state.contentPartTabState ?
							(<div>
								{this.props.means.map((l)=> {
									return (<div>
												<Link to={this.props.toLink}>
													{l.asset}
												</Link>
											</div>);
										}
									)
								}
							</div>)
						:null}
					</div> )
		}
	}