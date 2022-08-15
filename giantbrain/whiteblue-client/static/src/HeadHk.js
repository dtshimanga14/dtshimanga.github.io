import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';
	
import { GET_ASSESS } from './queries.js';
import MainMenuHk from './MainMenuHk.js';
import NotifiyerHk from './NotifiyerHk.js';
import Loading from './Loading.js';
import Assessmenu from './Assessmenu.js';


const HeadHk = ({ avatar, toggleKids, profil,logout,
					toggleAddPromotion, showSubscriptionModalWindows,
					toggleSchooler }) => {

	  let ownerId = localStorage.getItem('user-token');
	  
	  const [showResults, setShowResults] = useState(false);
	  const [showAssess, setShowAssess] = useState(false);
	  const [showMainMenu, setShowMainMenu] = useState(false);
	  const [notificationCount, setNotificationCount] = useState(0);
	  const [toggleNotifies, setToggleNotifies] = useState(false);//showMessages
	  
	  const hideNotifies = ()=>{
		 setToggleNotifies(!toggleNotifies);
	  };
	  const openMenu = ()=>{
		 setShowMainMenu(!showMainMenu);
		 setShowMainMenu(!showMainMenu);
	  };
	  
	  const { loading, error, data } = useQuery(GET_ASSESS,{ variables: { ownerId }});
		
		if (loading) return (<Loading />);
		if (error) return `Error! ${error.message}`;
		
		let { getAssess } = data;
		
	  return (<div className="row">
				<header className="col-lg-12 page-header" >
					<img className="profil" 
						 src={avatar !== '' ? `http://localhost:8000/image/${avatar}` : "./photos/defaults/user.jpg"}
					 />
					<span className="great-tittle-ff">Whiteblue </span>
					<div className="header-names">
						{profil.username} {' '} {profil.middlename}
					</div>
					<div>
						{(showResults) ? (<div>Results</div>) : null}
					</div>
					<div>
						{(showAssess) ? 
						(<Assessmenu 
							hideMenuAssess={()=> setShowAssess(!showAssess)} assessTab={getAssess} 
						/>) : null}
					</div>
					<div>
						{(showMainMenu) ? (
						<MainMenuHk 
							logout={logout}
							toggleOpenMenu={openMenu}
							toggleAddPromoFrame={toggleAddPromotion} 
							showSubscriptionModalWindows={showSubscriptionModalWindows}
						/>
						) :null}
					</div>
					<div>
						{(toggleNotifies) ? (<NotifiyerHk hideMenuMessages={hideNotifies}/>) : null}
					</div>
					<div>
					</div>
					<div className="row" id="head-nav">
						<div> 
							<ol className="listnav">
								<button className="btn gears-btn btn-bottom-border" onClick={()=> setShowAssess(!showAssess)}>
										<i className="fa fa-gears"/>
										<div className="bell-layer" >getAssess length</div>
								</button>
								<button className="btn btn-bottom-border" onClick={toggleSchooler}>
									<i className="fa fa-home"/><span className="text-button">Create Institut</span>
								</button>
								<button className="btn btn-bottom-border" onClick={toggleKids}>
									<i className="fa fa-folder-open-o"/><span className="text-button">My Kids</span>
								</button>
								<button className="btn bell-btn btn-bottom-border" onClick={hideNotifies}>
										<i className="fa fa-bell-o"/>
										<div className="bell-layer" >{notificationCount}</div>
								</button>
								<Link to="#" className="icon-menu">
									<button className="btn" onClick={()=> setShowMainMenu(!showMainMenu)}>
										{showMainMenu ? (<i className="fa fa-caret-up"/>) : (<i className="fa fa-caret-down"/>)}
									</button>
								</Link>
							</ol>
						</div>
					</div>
				</header>
			</div>)
	}
	
	export default HeadHk; 