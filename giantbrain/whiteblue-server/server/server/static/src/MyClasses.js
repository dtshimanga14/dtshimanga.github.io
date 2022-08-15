import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

import './css/MyClasses.css';

export default class MyClasses extends React.Component {
						     		
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
								<i className="fa fa-group"/>
								<div className="bell-layer" >{this.props.childrenClasses.length}</div>
							</span>
							<span className="text-button">My Collegues</span>
							<span className="article-caret">
							  {this.state.contentPartTabState ? 
								(<i className="fa fa-caret-down"/>):
								(<i className="fa fa-caret-left"/>)
							  }
							</span>
						</button>
						{this.state.contentPartTabState ?
							(<div>{this.props.childrenClasses.map(
								(childClasses)=>(
									<div>
										<Link to={`/inner/myclass/${childClasses._id}`}>
										{childClasses.promotionLevel} {" "} {childClasses.promotionName}
										</Link>
									</div>))}
							</div>)
						:null}
					</div> )
		}
	}