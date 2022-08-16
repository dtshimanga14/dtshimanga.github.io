import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Attendent from './Attendent.js';
import 'whatwg-fetch';
import 'babel-polyfill';



export default class Sheets extends React.Component {
						     	
		constructor(props){
				super(props);
			}	
		render(){

				return (<div>
						<div className="bookmarked-article">Attendant Sheets</div>
						<div className="article-frame">
							<div >
								<table>
									<tr>
										<th>NOM</th>
										<th>POSTNOM</th>
										<th>PRENOM</th>
										<th>STATUS</th>
										<th>HOUR</th>
										<th>BY </th>
									</tr>
									<Attendent />
								</table>
							</div>
						</div>
				</div>);
				}
		}