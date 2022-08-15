	import React from 'react';
	import ReactDOM from 'react-dom';
	import { Link } from 'react-router-dom';
	import moment from 'moment';

	import HiddenEye from './HiddenEye.js';

	import './css/CertDispatcher.css';



	export default class CertDispatcher extends React.Component {
		constructor(props){
			super(props);
		}
		render(){
			return (<div className= "cert-dispatcher">
						<div>
						{
							this.props.viewer.map((user) => (<div>
								<div className="friend-cert-dispatcher">
									<img className="cert-friend-image" src={user.personals.picture}/>
									<div className="cert-friends-share">
										<Link to="/cv">
											<a href="#" title={user.personals.username}>
												{user.personals.username} {" "}{user.personals.middlename}
											</a>
										</Link>
										<span className="bookmarked-date">
											{moment(user.lastSeen).fromNow()}
										</span>
									</div>
									<HiddenEye />
								</div>
							</div>)
							)
						}
						</div>
						<div className="icon-plus-user">
							<i   className="fa fa-user-plus"/>
						</div>
					</div>);
			}	
		}