import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Route, Link, } from 'react-router-dom';

	export default class TeacherRequester extends React.Component {
			
			constructor(props){
				super(props);
			}

			render (){
				let requesters =[{ 
					_id : "5cdf0b2849d4a51120f2a845",  
					personals : {
						username : "Louis",  
						middlename : "Litt", 
						firstname : "Michel", 
						picture : "./profil/nd.jpg", 
						Email : "clerck@whiteblue.com", 
						birthday : "2019-06-15T20:41:23.465+0000", 
						gender : "Female", 
						maritalStatus : "Single", 
						nationality : "", 
						phoneNumber : "", 
						country : "", 
						town : "", 
						quarter : "", 
						street : "", 
						number : "2341",
					},  
					certificats : [
						{   _id : "5d2a3fde6ebebd9c9d8ec0d9", 
							emitter : "", 
							year : "2019-07-13T20:32:29.185+0000", 
						}, 
					], 
					classes : [
						{
							from : "Fullstack web software developpement", 
							at : "Javascript College", 
							duration : "2019-06-22T11:10:38.159+0000", 
							reference : "5cdf129ecd42aa0218d6b30c"
						}
					],  
				},{ 
					_id : "5cdf0b2849d4a51120f2a845",  
					personals : {
						username : "Louis",  
						middlename : "Litt", 
						firstname : "Michel", 
						picture : "./profil/nd.jpg", 
						Email : "clerck@whiteblue.com", 
						birthday : "2019-06-15T20:41:23.465+0000", 
						gender : "Female", 
						maritalStatus : "Single", 
						nationality : "", 
						phoneNumber : "", 
						country : "", 
						town : "", 
						quarter : "", 
						street : "", 
						number : "2341",
					},  
					certificats : [
						{   _id : "5d2a3fde6ebebd9c9d8ec0d9", 
							emitter : "", 
							year : "2019-07-13T20:32:29.185+0000", 
						}, 
					], 
					classes : [
						{
							from : "Fullstack web software developpement", 
							at : "Javascript College", 
							duration : "2019-06-22T11:10:38.159+0000", 
							reference : "5cdf129ecd42aa0218d6b30c"
						}
					],  
				},{ 
					_id : "5cdf0b2849d4a51120f2a845",  
					personals : {
						username : "Louis",  
						middlename : "Litt", 
						firstname : "Michel", 
						picture : "./profil/nd.jpg", 
						Email : "clerck@whiteblue.com", 
						birthday : "2019-06-15T20:41:23.465+0000", 
						gender : "Female", 
						maritalStatus : "Single", 
						nationality : "", 
						phoneNumber : "", 
						country : "", 
						town : "", 
						quarter : "", 
						street : "", 
						number : "2341",
					},  
					certificats : [
						{   _id : "5d2a3fde6ebebd9c9d8ec0d9", 
							emitter : "", 
							year : "2019-07-13T20:32:29.185+0000", 
						}, 
					], 
					classes : [
						{
							from : "Fullstack web software developpement", 
							at : "Javascript College", 
							duration : "2019-06-22T11:10:38.159+0000", 
							reference : "5cdf129ecd42aa0218d6b30c"
						}
					],  
				},{ 
					_id : "5cdf0b2849d4a51120f2a845",  
					personals : {
						username : "Louis",  
						middlename : "Litt", 
						firstname : "Michel", 
						picture : "./profil/nd.jpg", 
						Email : "clerck@whiteblue.com", 
						birthday : "2019-06-15T20:41:23.465+0000", 
						gender : "Female", 
						maritalStatus : "Single", 
						nationality : "", 
						phoneNumber : "", 
						country : "", 
						town : "", 
						quarter : "", 
						street : "", 
						number : "2341",
					},  
					certificats : [
						{   _id : "5d2a3fde6ebebd9c9d8ec0d9", 
							emitter : "", 
							year : "2019-07-13T20:32:29.185+0000", 
						}, 
					], 
					classes : [
						{
							from : "Fullstack web software developpement", 
							at : "Javascript College", 
							duration : "2019-06-22T11:10:38.159+0000", 
							reference : "5cdf129ecd42aa0218d6b30c"
						}
					],  
				},];
					return (
								<div className= "pupil-requester-zone">
									<div className= "pupil-requester-header">
										 Pupils subscriptions requests
									</div><hr/>
									<div className= "assesses">
										{requesters.map((requester) =>
											(<div className="assess_menu" onClick={()=> alert('hello requester')}>
												<img src={requester.personals.picture}  className="user-avatar-pr"/>
												<Link to={`cv/${requester._id}`}>
													<span className="assess-topic">
														<i className="fa fa-hand-o-right"/>
														{requester.personals.username}{" "}
														{requester.personals.middlename}{" "}
														{requester.personals.firstname}
													</span>
												</Link>
												<div>
												{requester.classes.map(classe =>(
													<div>
													<Link to={`quotation/${requester.certificats[0]._id}`}>
														<span className="assess-course">
															<i className="fa fa-folder-o"/>{classe.from}
														</span>
													</Link>
														<span className="assess-release-hour"> since 2 Years</span>
													</div>	
												))}
												</div>
												<div className="button-frame">
													<button className="btn">Subscribe</button>
													<button className="btn">Cancel</button>
												</div>
												<hr/>
											</div>))}
									</div>
								</div>
						);
					}
			}