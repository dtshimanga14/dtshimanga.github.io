	import React from 'react';
	import propTypes from 'prop-types';
	import { Link } from 'react-router-dom';
	import gql from "graphql-tag";
	import { Query, Mutation } from "react-apollo";
	import moment from 'moment';
	import Loading from './Loading.js';

	import Results from './Results.js';
	import Notes from './Notes.js';
	import Classes from './Classes.js';
	import Certificats from './Certificats.js';
	import Assessmenu from './Assessmenu.js';
	import Notifications from './Notifications.js';
	import Mainmenu from './Mainmenu.js';
	import Adminmenu from './Adminmenu.js';
	
	import './css/Head.css';

		export default class Head extends React.Component {
			constructor(props){
				super(props);
				this.state = {
					showNotes : false,
					showClasses : false,
					showAssess : false,
					showMessages : false,
					showCertificat : false,
					openMenuState : false,
					adminMenuState : false,
					openMenuStateButton : true,
					notificationCount : 14
				};
				this.hideMessages = this.hideMessages.bind(this);
				this.hideClasses = this.hideClasses.bind(this);
				this.hideResults = this.hideResults.bind(this);
				this.hideNotes = this.hideNotes.bind(this);
				this.hideAssess = this.hideAssess.bind(this);
				this.hideCertificat = this.hideCertificat.bind(this);
				this.viewClasses = this.viewClasses.bind(this);
				this.viewMessages = this.viewMessages.bind(this);
				this.viewNotes = this.viewNotes.bind(this);
				this.viewAssess = this.viewAssess.bind(this);
				this.viewAssess = this.viewAssess.bind(this);
				this.viewCertificat = this.viewCertificat.bind(this);
				this.openMenu = this.openMenu.bind(this);
				this.adminMenu = this.adminMenu.bind(this);
			}
			openMenu(){
				this.setState({
					openMenuStateButton : !this.state.openMenuStateButton,
					openMenuState : !this.state.openMenuState,
				});
			}

			adminMenu(){
				this.setState({
					adminMenuState : !this.state.adminMenuState,
				});
			}
			hideMessages(){
				this.setState({showMessages : !this.state.showMessages});
			}
			hideClasses(){
				this.setState({showClasses : !this.state.showClasses});
			}
			hideResults(){	
				this.setState({showResults : !this.state.showResults});
			}
			hideNotes(){
				this.setState({showNotes : !this.state.showNotes});
			}
			hideAssess(){
				this.setState({showAssess : !this.state.showAssess});
			}
			hideCertificat(e){
				e.preventDefault();
				this.setState({showCertificat : !this.state.showCertificat});
			}
			viewClasses(e){
				e.preventDefault();
				this.setState({showClasses : !this.state.showClasses});
			}
			viewMessages(e){
				e.preventDefault();
				this.setState({showMessages : !this.state.showMessages});
			}
			viewNotes(e){
				e.preventDefault();
				this.setState({showNotes : !this.state.showNotes});
			}
			viewAssess(e){
				e.preventDefault();
				this.setState({showAssess : !this.state.showAssess});
			}
			viewCertificat(e){
				e.preventDefault();
				this.setState({showCertificat : !this.state.showCertificat});
			}
			render (){
				const GET_ASSESS = gql`query getAssess ($ownerId : String){
						  getAssess (ownerId : $ownerId){
							_id
							Id
							header
							fields
							promotionId
							teacherId {
							  personals {
								username
								middlename
								firstname
							  }
							}
							description
							startDay
							endDay
							done
							duration
							questionList {
							  questId
							  text
							  GAV
							  assertions {
								text
								answerId
							  }
							}
						  }
						}
						`;
						let ownerId = this.props.id;
				return (<Query query={GET_ASSESS} variables={{ ownerId }}>
									{({ data :{ getAssess },loading, error})=>{
										if (loading||!getAssess) {
											return (<Loading />);
										  }
				return (
					<div className="row">
						<header className="col-lg-12 page-header" >
							<img className="profil" 
								 src={this.props.profil.picture !== '' ? this.props.profil.picture : "./photos/defaults/user.jpg"}
							 />
							<span className="great-tittle-ff">Whiteblue </span>
							<div className="header-names">
								{this.props.profil.username} {' '} {this.props.profil.middlename}
							</div>
							<div>
								{(this.state.showResults) ? (<Results />) : null}
							</div>
							<div>
								{(this.state.showAssess) ? (<Assessmenu 
																hideMenuAssess={this.hideAssess}
																assessTab={getAssess}
																owner={ownerId}
															/>) : null}
							</div>
							<div>
								{(this.state.showNotes) ? (<Notes hideMenuNotes={this.hideNotes}/>) : null}
							</div>
							<div>
								{(this.state.showMessages) ? (<Notifications 
																	hideMenuMessages={this.hideMessages}
																	owner={this.props.id}
															/>) : null}
							</div>
							<div>
								{(this.state.showClasses) ? (<Classes hideMenuClasses={this.hideClasses}/>) : null}
							</div>
							<div>
								{(this.state.openMenuState) ?
								 (<Mainmenu 
									logout={this.props.logStatusProps}
									toggleOpenMenu={this.openMenu}
									toggleAddPromoFrame={this.props.toggleAddPromotion}
									showSubscriptionModalWindows={this.props.showSubscriptionModalWindows}
								/>) :null}
							</div>
				            <div className="row" id="head-nav">
								<div> 
										<ol className="listnav">
											<Link to="/inner/assessment"  className="gears-btn" onClick={this.viewAssess}>
												<button className="btn btn-bottom-border">
					                      				<i className="fa fa-gears"/>
														<div className="bell-layer" >{getAssess.length}</div>
				                      			</button>
											</Link>
				                      		<Link to="/inner/home">
				                      			<button className="btn btn-bottom-border">
				                      				<i className="fa fa-home"/><span className="text-button">Home</span>
				                      			</button>
				                      		</Link>
				                      		<Link to="/inner/capebook" onClick={this.viewNotes}>
				                      			<button className="btn btn-bottom-border">
				                      				<i className="fa fa-folder-open-o"/><span className="text-button">My Folders</span>
				                      			</button>
				                      		</Link>
				                      		<Link to="/chats"  className="bell-btn btn-bottom-border" >
				                      			<button className="btn" onClick={this.viewMessages}>
					                      				<i className="fa fa-bell-o"/>
														<div className="bell-layer" >{this.state.notificationCount}</div>
				                      			</button>
				                      		</Link>
				                      		<Link to="#" className="icon-menu">
				                      			<button className="btn" onClick={this.openMenu}>
				                      				{this.state.openMenuStateButton ? (<i className="fa fa-caret-down"/>) : (<i className="fa fa-caret-up"/>)}
				                      			</button>
				                      		</Link>
										</ol>
								</div>
							</div>
						</header>
					</div>
					);}}
				</Query>);
			}
		}