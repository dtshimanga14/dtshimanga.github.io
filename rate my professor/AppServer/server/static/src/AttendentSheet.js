	
import React from 'react';
import { Link } from 'react-router-dom';
import Presence from './Presence.js';

export default class AttendentSheet extends React.Component {
		constructor(props){
			super(props);
		}
		render(){
			let pupils = [{
					fullName : "Hart Green JO",
					profil : "",
					totalPresent : 180,
					totalAbsent : 180,
					leaders : "",
					doing : "",
					results : 65,
				},{
					fullName : "Hart Green JO",
					profil : "",
					totalPresent : 180,
					totalAbsent : 180,
					leaders : "",
					doing : "",
					results : 65,
				},{
					fullName : "Hart Green JO",
					profil : "",
					totalPresent : 180,
					totalAbsent : 180,
					leaders : "",
					doing : "",
					results : 65,
				},{
					fullName : "Hart Green JO",
					profil : "",
					totalPresent : 180,
					totalAbsent : 180,
					leaders : "",
					doing : "",
					results : 65,
				},
			];
			let subFields = [
				{
					Option : "Computer Science",
					orientation : "Database Analyst",
					level :"first",
					totalPupil :23,
					femalePupil : 13,
					malePupil : 10,
				},{
					Option : "Computer Science",
					orientation : "Database Analyst",
					level :"first",
					totalPupil :23,
					femalePupil : 13,
					malePupil : 10,
				},{
					Option : "Computer Science",
					orientation : "Database Analyst",
					level :"first",
					totalPupil :23,
					femalePupil : 13,
					malePupil : 10,
				},{
					Option : "Computer Science",
					orientation : "Database Analyst",
					level :"first",
					totalPupil :23,
					femalePupil : 13,
					malePupil : 10,
				},
			];
					return (<div>
								<div className="subcribed-fields">
									{subFields.map((elt) => (<div className="one-field">
																<div className="header-field">{elt.Option}</div>
																<div  className="ca-field">
																	<Link to="#" >{elt.orientation}</Link>
																</div>
																<span>
																	<button className="btn subscribeed-field-btn">
																		<i className="fa fa-user"/>
																		<div className="fields-icon-layer" >{elt.totalPupil}</div>
																	</button>
																	<button className="btn subscribeed-field-btn">
																		<i className="fa fa-female"/>
																		<div className="fields-icon-layer" >{elt.femalePupil}</div>
																	</button>
																	<button className="btn subscribeed-field-btn">
																		<i className="fa fa-male"/>
																		<div className="fields-icon-layer" >{elt.malePupil}</div>
																	</button>
																</span>
															</div>)
									)}
								</div>
								<div className="subscription-frame">
									<div className="fileds-header">Attendent Sheet Marker</div>
									<div>
										{pupils.map(elt => <Presence {...elt}/>)}
									</div>	
								</div>	
							</div>)
		}
	}