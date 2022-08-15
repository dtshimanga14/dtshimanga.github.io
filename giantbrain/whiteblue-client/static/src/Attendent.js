import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';


export default class Attendent extends React.Component {
						     	
		constructor(props){
				super(props);
			}			     		
		render(){
				return (<tr >
							<th>JOHN</th>
							<th>WAYNE</th>
							<th>WICK</th>
							<th>PRESENT</th>
							<th>12:40:37</th>
							<th>
								<Link to="/cv" >Kerry Watson</Link>
							</th>
							<th>
								<span>
									<button className="btn">
										<span className="text-button">PRESENT</span>
									</button>
									<button className="btn">
										<span className="text-button">ABSENT</span>
									</button>
								</span>
							</th>
						</tr>);
				}
		}