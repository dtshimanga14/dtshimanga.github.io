
import React from 'react';
import { Link } from 'react-router-dom';
import AddFieldsModalWindows from './AddFieldsModalWindows.js';

	
	export default class Subscription extends React.Component {
				constructor(props){
					super(props);
				}
				render(){
					let subscriptions = [{
							fieldName : "database analysis",
							description : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
							certifiesAuthories : []
						},{
							fieldName : "network technologies",
							description : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
							certifiesAuthories : []
						},{
							fieldName : "systeme administration",
							description : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
							certifiesAuthories : []
						},{
							fieldName : "biology genetic",
							description : "is possible to write selectors in CSS that match an element based on its language. For example, in HTML [HTML4]p. 282, the language is determined by a combination of the lang attribute, the META element, and possibly by information from the protocol (such as HTTP headers). XML uses an attribute called xml:lang, and there may be other document langua e-specific methods for determining the language.",
							certifiesAuthories : []
						},
					];
					let subFields = [
						{
							fields : "Database Analysis",
							ca : "Some certifies authorities M.I.T, University Of Stanford",
							howManyShare :23,
							howManyBookMarked :23,
						},{
							fields : "Network technologies",
							ca : "Cisco System Inc",
							howManyShare :45,
							howManyBookMarked :65,
						},{
							fields : "API GraphQL",
							ca : "Facebook Inc",
							howManyShare :65,
							howManyBookMarked :11,
						},{
							fields : "Database Analysis",
							ca : "Some certifies authorities M.I.T, University Of Stanford",
							howManyShare :44,
							howManyBookMarked :24,
						},
					];
					return (<div>
								<AddFieldsModalWindows/>
							<div className="subcribed-fields">
							{subFields.map((elt) => (<div className="one-field">
														<div className="header-field">{elt.fields}</div>
															<div  className="ca-field">
																<Link to="/cv" >{elt.ca}</Link>
															</div>
															<div>
																<button className="btn subscribeed-field-btn">
																	<i className="fa fa-share-alt"/>
																	<div className="fields-icon-layer" >{elt.howManyShare}</div>
																</button>
																<button className="btn subscribeed-field-btn">
																	<i className="fa fa-bookmark"/>
																	<div className="fields-icon-layer" >{elt.howManyBookMarked}</div>
																</button>
																<button className="btn subscribeed-field-btn">
																	<i className="fa fa-file-text"/>
																	<div className="fields-icon-layer" >{elt.howManyBookMarked}</div>
																</button>
																<button className="btn subscribed-field-btn">
																	<i className="fa fa-chain-broken"/>
																	Unfollow
																</button>
														</div>
													</div>)
							)}
							</div>
							<div className="subscription-frame">
								<div className="fileds-header">subscriptions fields</div>
								{subscriptions.map((elt) => 
									(<div className="fileds-subscribes">
										<div className="fields-name">{elt.fieldName}</div>
										<div className="fileds-description">{elt.description}</div>
										<div className="fileds-ca">{elt.certifiesAuthories}</div>
										<div className="fields-frame-btn">
											<span className="number-follows">Total 45K follows</span>
											<button className="btn fileds-btn">
												<i className="fa fa-share-alt"/>
												Suggest to friends
											</button>
											<button className="btn fileds-btn">
												<i className="fa fa-link"/>
												Follow
											</button>
										</div>
									</div>)
								)}
							</div>
					</div>);
				}	
			
		}