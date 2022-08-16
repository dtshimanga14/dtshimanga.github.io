import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import 'whatwg-fetch';

export default class Bills extends React.Component {
						     		
		constructor(props){
				super(props);
		}
		render(){
			
			return (<Link to="/inner/bills">
						<button className="btn admin-btn-size">
							<span className="icon-position-admin">
								<i className="fa fa-money"/>
							</span>
							<span className="text-button">Bills</span>
						</button>
					</Link>)
		}
	}