
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import { GET_USER } from './queries.js';

import CertificatsHk from './CertificatsHk.js';

import HomeHk from './HomeHk.js';
import HeadHk from './HeadHk.js';
import AdminmenuHk from './AdminmenuHk.js';
import SubscriberMW from './SubscriberMW.js';
import WitHk from './WitHk.js';
import FriendHk from './FriendHk.js';
import PosterHk from './PosterHk.js';
import ChatHk from './ChatHk.js';
import SuggestedsHk from './SuggestedsHk.js';
import SubscriberHk from './SubscriberHk.js';
import PubsHk from './PubsHk.js';

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';

let witsState = [{
					header : "Bitcoin: A Peer-to-Peer Electronic Cash System",
					fields : "Cryptomoney",
					content : "We propose a solution to the double-spending problem using a peer-to-peer network version of electronic cash who would allow online payments",
					authors : {
						username : "Satoshi",
						middlename : "Nakamoto",
						firstname : "",
						picture : ""
					},
					approvor : {
						username : "James",
						middlename : "Crock",
					},
					portions : [
						{	
							tittle : "Abstract",
							paragraphs : [{
								type :"text",
								content : "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effortbasis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.",
								},
							],
						},
					],
				},];

const WbHooks = ({ id, setToken }) => {
  const client = useApolloClient();
  
  const [subscriberModWin, setSubscriberModWin] = useState(true);//subscriptionModalWindowsStatus
  const [addPromotionModWin, setAddPromotionModWin] = useState(false);//toggleAddPromotionState
  const [posterToggle, setPosterToggle] = useState(false);
  const [kids, setKids] = useState(false);
  const [schooler, setSchooler] = useState(false);
  
  const { loading, error, data } = useQuery(GET_USER,{ variables: { id }});
  
  const logout =()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  };
  const toggleAddPromotion = () => {
	 setAddPromotionModWin(!addPromotionModWin);
  };
  const showSubscriptionModalWindows = () => {
	setSubscriberModWin(!subscriberModWin);
  };
	
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  
	//let { users } = data;
	let users = {
		isId : 0,
		personals : {
			username : "daniel",
			password : "d4n13l",
			middlename : "kassampu",
			firstname : "tshimanga",
			picture : "url",
			birthday : new Date(),
			gender : "M",
			maritalStatus : "married",
			Email : "daniel@gmail.com",
			nationality : "congolese",
			phoneNumber : "+1 641 819 2627",
			country : "congo-Kinshsa",
			town : "kinshasa",
			quarter : "kindele",
			street : "kabongo",
			number : "",
			description : "",
		},
		accountType : "",
		tutors : [],
		friends : ["5dd5a21099f69611cc23b4d8"],
		askRelationship : [],
		lastSeenOnline : new Date(),
		library : [],
		articles :[],
		certificats : [],
		classes :[],
		fields :[],
		pupils :[],
		schedules :[],
		books :[],
		kids :[],
		notifications : {},
		promotions : [],

	};

	localStorage.setItem(users.avatar,'user-tkn');
	localStorage.setItem(users.schoolBelongToOwner,'ownSchool-tkn');
	console.log(users.schoolBelongToOwner);
	
  return (<div className="row">
			<div className="col-md-12">
				<div className="row">
					<HeadHk 
						profil={users.personals}
						avatar={users.avatar}
						id={id}
						logout={logout}
						showSubscriptionModalWindows={showSubscriptionModalWindows}
						toggleAddPromotion = {toggleAddPromotion}
						toggleKids = {()=> setKids(!kids)}
						toggleSchooler={()=> setSchooler(!schooler)} 
					/>  
				</div>
				{subscriberModWin ? null : 
						<SubscriberMW 
							showSubscriptionModalWindows={showSubscriptionModalWindows}
				/>}
				<div className="row">
					<div className="col-md-2">
						<AdminmenuHk articles={witsState} profil={users}/>
					</div>
					<div  className="col-md-8">
					{posterToggle ? (<PosterHk setPosterToggle={() =>setPosterToggle(!posterToggle)}/>) : null}
						<div  className="row">
							<div  className="col-md-7">
								<WitHk togglePosterProps={() => setPosterToggle(!posterToggle)}/>
								<SuggestedsHk />
								<HomeHk 
									kid={kids} toggleKids={()=> setKids(!kids)}
									schooler={schooler} toggleSchooler={()=> setSchooler(!schooler)} 
								/>
							</div>
							<div  className="col-md-5">
								<PubsHk />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
}


export default WbHooks;