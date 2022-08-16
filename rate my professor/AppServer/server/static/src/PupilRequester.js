import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Route, Link, } from 'react-router-dom';

	export default class PupilRequester extends React.Component {
			
			constructor(props){
				super(props);
			}

			render (){
				let requesters = {
						  _id: "5d41c792515a06f2ae4fe313",
						  promotionId : "5d132bca5145a7c8ea634de4",
						  requesters: [
							{
							  ownerId: {
								_id: "5cdf094ac1beac0fcc851fe6",
								personals: {
								  username: "Donna",
								  middlename: "Paulsen",
								  firstname: "Dark",
								  picture: "./profil/sharon1.jpg"
								},
								certificats: [
								  "5d1fe35ecd27aea96d204331"
								]
							  },
							  submitdate: "Wed Jul 31 2019 18:53:38 GMT+0200 (GMT+02:00)",
							  Status: "PENDING"
							}
						  ]
						};
					return (
								<div className= "pupil-requester-zone">
									<div className= "pupil-requester-header">
										 Pupils subscriptions requests
									</div><hr/>
									<div className= "assesses">
										{requesters.requesters.map((requester) =>
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
												{requester.certificats.map(certificat =>(
													<div>
													<Link to={`quotation/${certificat}`}>
														<span className="assess-course">
															<i className="fa fa-folder-o"/>view certificats
														</span>
													</Link>
														<span className="assess-release-hour">{requester.submitdate}</span>
														<span className="assess-release-hour">request status : {requester.Status}</span>
													</div>	
												))}
												</div>
												<div className="button-frame">
													<button className="btn">Subscribe</button>
													<button className="btn">Delete</button>
												</div>
												<hr/>
											</div>))}
									</div>
								</div>
						);
					}
			}