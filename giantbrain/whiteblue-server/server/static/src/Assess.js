import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

export default class Assess extends React.Component {
						     		
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
						<Link to="/inner/mycorrected">
							<button className="btn admin-btn-size">
								<span className="icon-position-admin">
									<i className="fa fa-stethoscope"/>
									<div className="bell-layer" >2</div>
								</span>
								<span className="text-button">My Assess</span>
								<span className="article-caret">
								  {this.state.contentPartTabState ? 
									(<i className="fa fa-caret-down"/>):
									(<i className="fa fa-caret-left"/>)
								  }
								</span>
							</button>
						
						</Link>
					</div> )
		}
	}