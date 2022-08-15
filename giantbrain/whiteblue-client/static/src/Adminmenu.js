
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';

import PartTab from './PartTab.js';
import BookMarked from './BookMarked.js';
import Bills from './Bills.js';
import Folders from './Folders.js';
import MyClasses from './MyClasses.js';
import MyCertificats from './MyCertificats.js';
import MyTeachers from './MyTeachers.js';
import Navigator from './Navigator.js';
import Assess from './Assess.js';
import Library from './Library.js';
import SubscribeButton from './SubscribeButton.js';

export default class Adminmenu extends React.Component {
		constructor(props){
			super(props);
		}
		render(){
		const GET_PROFIL = gql`
							query ($promotionIdTab: [String]){
							  getPromotionsTab(promotionIdTab: $promotionIdTab) {
								_id
								schoolId
								promotionName
								promotionLevel
								scheduleId
							  }
							}
							`;
		const promotionId = localStorage.getItem("promotionId");
		const promotionIdTab = [promotionId];
		
				
			return (
			<Query query={GET_PROFIL} variables={{ promotionIdTab }}>
				{({ data :{ getPromotionsTab },loading, error})=>{
					if (loading || !getPromotionsTab) {
						return (<Loading />);
					  }
					 return (
						<div className="admin-menu-frame">
							<div className="admin-menu-head">
								<i className="fa fa-bank"/>ACCOUNT MANAGEMENT
							</div><hr/>
							<Folders store={this.props.articles}/> 
							<Assess store={this.props.articles}/> 
							<MyClasses childrenClasses={getPromotionsTab}/>
							<MyCertificats certificatsIds={this.props.profil.certificats}/> 
							<MyTeachers childrenTeachers={getPromotionsTab}/> 
							<Library childrenLibraries={getPromotionsTab}/>
							<Navigator childrenClasses={getPromotionsTab}/>
							<Bills />
							<Link to="/inner/coursesmaker">
								<button className="btn admin-btn-size">
									<span className="article-caret">
										<i className="fa fa-file-text"/>
									</span>
									<span className="text-button">Editor</span>
								</button>
							</Link>
							<Link to="/inner/article">
								<button className="btn admin-btn-size">
									<span className="icon-position-admin">
										<i className="fa fa-bookmark"/>
										<div className="bell-layer" >2</div>
									</span>
									<span className="text-button">BookMarks</span>
								</button>
							</Link>
							<SubscribeButton />
					</div>)}}
			</Query>);
		}	
	}