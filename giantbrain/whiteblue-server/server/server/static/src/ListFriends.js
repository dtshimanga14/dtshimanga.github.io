import React from 'react';
import Friend from './Friend.js';

export default class ListFriends extends React.Component {
		
				render(){

					const data = [{
						username : "Kerry ",
						middlename : "Watson",
						firstname : "Dowson",
						Image : ""
					},
								 {
						username : "Forseman",
						middlename : "Charles",
						firstname : "willington",
						Image : ""
					},
								 {
						username : "Joyn",
						middlename : "Forbes",
						firstname : "Easton",
						Image : ""
					},
								  {
						username : "John",
						middlename : "Ivans",
						firstname : "Carrick",
						Image : ""
					},
								 {
						username : "Forseman",
						middlename : "Charles",
						firstname : "willington",
						Image : ""
					},
								 {
						username : "Joyn",
						middlename : "Forbes",
						firstname : "Easton",
						Image : ""
					},
								  {
						username : "John",
						middlename : "Ivans",
						firstname : "Carrick",
						Image : ""
					}];

					const friends = data.map((friend)=>{
						<Friend identity={friend}/>	
					});

					return (
						<div className="col-lg-2" id="advertise_sp">
							<aside id="advertise_sc">
									{friends}
							</aside>
						</div>
					);
				}	
			
		}