import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
import { withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps"

/* import './css/School.css'; */

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap 
		defaultZoom={8} 
		defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
))
	export default class School extends React.Component {
			
			constructor(props){
				super(props);
				this.state = {
					promotionId : "",
				};
				this.handlerOnChnangePromotion = this.handlerOnChnangePromotion.bind(this);
			}
			handlerOnChnangePromotion(e){
				let promotionId = e.target.value;
				this.setState({ promotionId });
			}
			render (){ 
				let schoolList = ["","","","","","","",""];
				const GET_SCHOOL = gql`{
								  getSchool{
									_id
									fonder
									name
									logo
									address {
									  country
									  state
									  town
									  township
									  street
									  number
									  reference
									}
									location {
									  latitude
									  longitude
									  altitude
									}
									promotions {
									  _id
									  promotionName
									  promotionLevel
									}
								  }
								}
						`;	  
				
			const SUBSCRIBE_MUT = gql`
			mutation submitRequestersToSchool($promotionId:String!,$userId : String!) {
			  submitRequestersToSchool(promotionId: $promotionId, userId: $userId) {
				_id
				promotionId
				requesters {
				  ownerId {
					personals {
					  username
					  middlename
					  firstname
					}
				  }
				}
			  }
			}`;
			let userId = "5d2e260f6809370b4408af6f";
		return (
			<Query query={GET_SCHOOL}>
				{({ data :{ getSchool },loading, error})=>{
					if (loading || !getSchool) {
						return (<Loading />);
					  }
					  return (<div className="school-main-frame">
								<div className="schools-map">
									<MyMapComponent 
										googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAikV10fnEWg5Uoham_h9Uxsps0xwAdgD8"
										loadingElement={<div style={{ height : `100%`}}/>}
										containerElement={<div style={{ height : `400px`}}/>}
										mapElement={<div style={{ height : `100%`}}/>}
									/>
								</div>
								<div className="filter-bar-schools">
									Option Orientation Departement Country State
								</div>
								<div className="map-school-frame">
									{getSchool.map((school) =>
										(<div className="school-frame">
												<div className="gallery-school">
													<img src="./map2.PNG"/>
												</div>
												<div className="details-school">
													<div className="header-school">{school.name}</div>
													<div className="address-school">
														{school.address.country},
														{school.address.state} town, 
														{school.address.town} town,
														{school.address.township} city,
														{school.address.street} street,
														{school.address.number} number,
														reference : {school.address.reference}
													</div>
													<div className="cursus-offer">
														<span className="header-cursus-offer">Cursus offer</span>
														{school.promotions.map((cursus) =>(
															<span className="asset-cursus-offer">
																<input type="checkbox" value={cursus._id} onChange={this.handlerOnChnangePromotion}/>
																<Link to={`/inner/myclass/${cursus._id}`}>{cursus.promotionName}</Link>
															</span>
														))}
														<Mutation mutation={SUBSCRIBE_MUT}>
															{(submitRequestersToSchool, { data })=>{
																return (<button className="btn" onClick={
																	submitRequestersToSchool({ variables: { 
																				promotionId: this.state.promotionId, 
																				userId: this.props.userId,
																			}
																	})
																}> 
																			Send request
																		</button>)
															}}
														</Mutation>
														<div className="more-detail">More details</div>
													</div>
												</div>
										</div>)
									)}
								</div>
								<div className="pagination">
									<a href="#" onClick={()=> alert("previous")}><i className="fa fa-chevron-left"/></a>
									{schoolList.map(
										(d,index)=>(<a href="#" onClick={()=> alert(index)}>{index}</a>)
									)}
									<a href="#" onClick={()=> alert("next")}><i className="fa fa-chevron-right"/></a>
								</div> 
							</div>);}}
					</Query>);
					}
			}