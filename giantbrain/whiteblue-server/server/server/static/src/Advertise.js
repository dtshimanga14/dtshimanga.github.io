
import React from 'react';
import ListFriends from './ListFriends.js';

	
	export default class Advertise extends React.Component {
		
				render(){
					return (
							<div className="col-lg-2" id="advertise_sp">
								<aside id="advertise_sc">
									<ListFriends />
								</aside>
							</div>
						);
				}	
			
		}