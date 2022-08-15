import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from './Loading.js';
import Folders from './Folders.js';
import Assess from './Assess.js';
import MyClasses from './MyClasses.js';
import MyCertificatsHk from './MyCertificatsHk.js';
import MyTeachers from './MyTeachers.js';
import Library from './Library.js';
import Bills from './Bills.js';
import SubscribeButton from './SubscribeButton.js';

import { GET_PROFIL } from './queries.js';

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/client'

const AdminmenuHk = ({ articles, profil }) => {
	
	const promotionId = ["5dda49065232b51c88da601e"];
    const client = useApolloClient();
    const { loading, error, data } = useQuery(GET_PROFIL,{ 
			variables: { promotionIdTab : promotionId }
		});
		
	
    if (loading) return (<div>'Loading...'</div>);
    if (error) return `Error! ${error.message}`;
	
	let { getPromotionsTab } = data;
  
	return (<div className="admin-menu-frame">
				<div className="admin-menu-head">
					<i className="fa fa-bank"/>MANAGEMENT
				</div><hr/>
				<Link to="/folders">
					<button className="btn admin-btn-size">
						<span className="article-caret">
							<i className="fa fa-folder-o"/>
						</span>
						<span className="text-button">Folders </span>
					</button>
				</Link>
				<Link to="/assess">
					<button className="btn admin-btn-size">
						<span className="article-caret">
							<i className="fa fa-folder-o"/>
						</span>
						<span className="text-button">Assess</span>
					</button>
				</Link>
				<Link to="/myclass">
					<button className="btn admin-btn-size">
						<span className="icon-position-admin">
							<i className="fa fa-group"/>
						</span>
						<span className="text-button">My Collegues</span>
					</button>
				</Link>
				<MyCertificatsHk certificatsIds={profil.certificats}/> 
				<Link to="/histories">
					<button className="btn admin-btn-size">
						<span className="icon-position-admin">
							<i className="fa fa-road"/>
							<div className="bell-layer" >2</div>
						</span>
						<span className="text-button">Activities</span>
					</button>
				</Link>
				<Link to="/billing">
					<button className="btn admin-btn-size">
						<span className="icon-position-admin">
							<i className="fa fa-money"/>
						</span>
						<span className="text-button">Bills</span>
					</button>
				</Link>
				<Link to="/libraries">
					<button className="btn admin-btn-size">
						<span className="article-caret">
							<i className="fa fa-book"/>
						</span>
						<span className="text-button">Libraries</span>
					</button>
				</Link>
				<Link to="/editor">
					<button className="btn admin-btn-size">
						<span className="article-caret">
							<i className="fa fa-file-text"/>
						</span>
						<span className="text-button">Editor</span>
					</button>
				</Link>
				<Link to="/dashboard">
					<button className="btn admin-btn-size">
						<span className="article-caret">
							<i className="fa fa-dashboard"/>
						</span>
						<span className="text-button">Dashboard</span>
					</button>
				</Link>
				<Link to="/tags">
					<button className="btn admin-btn-size">
						<span className="icon-position-admin">
							<i className="fa fa-bookmark"/>
							<div className="bell-layer" >2</div>
						</span>
						<span className="text-button">BookMarks</span>
					</button>
				</Link>
				<SubscribeButton />
		</div>)
}; 


export default AdminmenuHk;