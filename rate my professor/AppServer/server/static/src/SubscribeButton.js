import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

export default class SubscribeButton extends React.Component {
						     		
		constructor(props){
				super(props);
		}
		render(){
			
			return (<Link to="/inner/subscriber">
						<button className="btn admin-btn-size">
							<span className="icon-position-admin">
								<i className="fa fa-feed"/>
							</span>
							<span className="text-button">Subscribe fields</span>
						</button>
					</Link>)
		}
	}