import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import { Query, Mutation } from "react-apollo";
import moment from 'moment';

import Loading from './Loading.js';
import BarHk from './BarHk.js';


import { withScriptjs,withGoogleMap,GoogleMap, Marker } from "react-google-maps";

/* import './css/School.css'; */

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import { GET_SCHOOL } from './queries.js';
import { SUBSCRIBE_MUT } from './mutations.js';




const MyMapComponent = withScriptjs(withGoogleMap((props) => {
	
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);
  
  return (<GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
			<Marker position={{ lat, lng }} />
			<Marker position={{ lat : -33.270, lng : 140.600}} />
		  </GoogleMap>)
  }
));


const SchoolHk = () => {
	
	let userId = localStorage.getItem('user-token');
    const [promotionId, setPromotionId] = useState("");
	let schoolList = ["","","","","","","",""];
	
	const { loading, error, data, fetchMore } = useQuery(GET_SCHOOL);
	 
	const [ submitRequestersToSchool ] = useMutation(SUBSCRIBE_MUT,{ 
				variables: { promotionId, userId  }
			});
  
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  
  let { getSchool } = data;
  
	return(
		<div className="school-main-frame">
		<BarHk />
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
										<input type="checkbox" value={cursus._id} onChange={(e) => setPromotionId(e.target.value)}/>
										<Link to={`/inner/myclass/${cursus._id}`}>{cursus.promotionName}</Link>
									</span>
								))}
								
								<button className="btn" onClick={submitRequestersToSchool({ variables: { promotionId, userId}})}> 
									Send request
								</button>
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
	</div>
	)
};

export default SchoolHk;

