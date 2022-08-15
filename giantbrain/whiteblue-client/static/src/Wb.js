import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { BrowserRouter as Router, Switch, 
			Route, Link, NavLink,
	Redirect } from 'react-router-dom';


import Head from './Head.js';
import AttendentSheet from './AttendentSheet.js';
import Assessment from './Assessment.js';
import Article from './Article.js';
import BillsFrame from './BillsFrame.js';
import Cv from './Cv.js';
import Live from './Live.js';
import Coursesmarker from './Coursesmarker.js';
import FoldersView from './FoldersView.js';
import AssessView from './AssessView.js';
import Home from './Home.js';
import Histories from './Histories.js';
import Classmate from './Classmate.js';
import MyClassmate from './MyClassmate.js';
import Results from './Results.js';
import Notes from './Notes.js';
import Classes from './Classes.js';
import Courses from './Courses.js';
import Corrected from './Corrected.js';
import Teachers from './Teachers.js';
import Schedule from './Schedule.js';
import BookStore from './BookStore.js';
import Certificats from './Certificats.js';
import Quotation from './Quotation.js';
import Children from './Children.js';
import Assessmenu from './Assessmenu.js';
import Notifications from './Notifications.js';
import School from './School.js';
import Sheets from './Sheets.js';
import Mainmenu from './Mainmenu.js';
import Adminmenu from './Adminmenu.js';
import Subscription from './Subscription.js';
import SubscriptionModalWindows from './SubscriptionModalWindows.js';
import AddPromotionModalWindows from './AddPromotionModalWindows.js';


export default class Wb extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				subscriptionModalWindowsStatus : true,
				toggleAddPromotionState : false,
			};
			this.toggleAddPromotion = this.toggleAddPromotion.bind(this);
			this.showSubscriptionModalWindows = this.showSubscriptionModalWindows.bind(this);
		}
		toggleAddPromotion(){
			this.setState(prevState => {
					return {
						toggleAddPromotionState : !prevState.toggleAddPromotionState
					}
				});
		}
			
		showSubscriptionModalWindows(){
			this.setState(prevState => {
				return {
					subscriptionModalWindowsStatus : !prevState.subscriptionModalWindowsStatus
				};
			});
		}
		render(){
			const SUBS_COMPONENT = gql`
					mutation onLog($id : String,$ownerId: String,$links: String,$linkName: String,$currentDate: String){
					  onLog (ownerId: $ownerId,links: $links,id : $id,linkName: $linkName,currentDate: $currentDate){
						ownerId
						currentDate
						pages {
						  id
						}
					  }
					}`;
			const UNSUBS_COMPONENT = gql`
					mutation onLogLeavePage($ownerId: String,$currentDate: String,$currentLink : String){
					  onLogLeavePage (ownerId: $ownerId,currentDate: $currentDate,currentLink : $currentLink){
						ownerId
						currentDate
						pages {
						  id
						  links
						  getInOn
						  getOutOn
						}
					  }
					}`;
			const GET_DATA_OF_USER = gql`query users($id: String!){
										users (id: $id){
											_id
											avatar
											isId
											isConnected
											personals {
											  firstname
											  middlename
											  username
											  picture
											  password
											}
											lastSeenOnline
											friends {
											  _id
											  isConnected
											  personals {
												username
												middlename
												firstname
												password
												picture
											  }
											  lastSeenOnline
											} 
											library
											pupils{
												names
												userId
												certificatId
											}
											classes{
												from
												at
												duration
												reference
											}
											bookmarked
											fields
											schedules
											certificats
											articles
											promotions {
											  promotionId
											  subscribeDate
											}
										  }
										}`;
					//let timeMessage = moment().format('HH:mm:ss');
					let id = localStorage.getItem("user-token");
				return (
						  <Query query={GET_DATA_OF_USER} variables={{ id }}>
							{({ data: { users }, loading }) => {
							  if (loading || !users) {
								return <div>Loading ...</div>;
							  }
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
									let { location } = this.props;
								  return (
										<Switch location={location}>
											<div className="row">
												<div className="col-md-12">
													<div className="row">
														<Head 
															profil={users.personals}
															avatar={users.avatar}
															id={id}
															showSubscriptionModalWindows={this.showSubscriptionModalWindows}
															toggleAddPromotion = {this.toggleAddPromotion}
														/>  
													</div>
													{this.state.subscriptionModalWindowsStatus ? null : 
															<SubscriptionModalWindows 
																showSubscriptionModalWindows={this.showSubscriptionModalWindows}
													/>}
													<div className="row">
														<div className="col-md-2">
															<Adminmenu articles={witsState} profil={users}/>
														</div>
														<div className="col-md-8">
															<Route path="/inner/home" exact strict render ={
															  ()=> {
																	return (<Home ownerId={users._id}/>)
																  }
															}/>
															<Route path="/inner/schools"  exact strict render ={
															  ()=> {
																	return (<School userId={users._id}/>)
																  }
															}/>
															<Route path="/inner/books/:promotionId" exact component={BookStore}/>
															<Route path="/inner/cv/:id" exact component={Cv}/>
															<Route path="/inner/teachers/:promotionId" exact component={Teachers}/>
															<Route path="/inner/teachers/cv/:id" exact component={Cv}/>
															<Route path="/inner/myclass/:promotionId" exact component={MyClassmate}/>
															<Route path="/inner/myclass/cv/:id" exact component={Cv}/>
															<Route path="/inner/histories" exact component={Histories}/>
															<Route path="/inner/bills" exact component={BillsFrame}/>
															<Route path="/inner/bills/cv/:id" exact component={Cv}/>
															<Route path="/inner/certificat/:id" exact component={Certificats}/>
															<Route path="/inner/myclass/quotation/:id" exact component={Quotation}/>
															<Route path="/inner/assessment/:id" exact component={Assessment}/>
															<Route path="/inner/corrected/:id" exact component={Corrected}/>
															<Route path="/inner/Course/:id" exact component={Courses}/>
															<Route path="/inner/live" exact component={Live}/>
															<Route path="/inner/mycorrected" exact component={AssessView}/>
															<Route path="/inner/schedule" exact strict render={
																  ()=> {
																	return ( <Schedule />)
																  }
															 }/>
															<Route path="/inner/coursesmaker" exact strict render={
																  ()=> {
																	return ( <Coursesmarker teacherId={id}/>) 
																  }
															 }/>

															<Route path="/inner/children" exact strict render={
																  ()=> {
																	return ( <Children />)
																  }
															 }/>
															<Route path="/inner/sheets" exact strict render={
																  ()=> {
																	return ( <AttendentSheet />)
																  }
															 }/>
															<Route path="/inner/classmate" exact strict render ={
															  ()=> {
																	return (<Classmate />)
																  }
															}/>
															<Route path="/inner/folders" exact strict render={
																			({match}) => {
																			  return (<FoldersView />)
																			}
															}/>
															<Route path="/inner/article" exact strict render={
																			({match}) => {
																			  return (<Article bookMarkedTab={users.bookmarked}/>)
																			}
															}/>
															<Route path="/inner/subscriber" exact strict render ={
															  ()=> {
																	return (<Subscription />)
																  }
															}/>
														</div>
													</div>
												</div>
											</div>
										</Switch>
								  );
								}}
							  </Query>
							);
		}
}	

