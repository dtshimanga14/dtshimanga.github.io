import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import Loading from './Loading.js';
import 'whatwg-fetch';
import gql from 'graphql-tag';
import { Mutation,Query } from 'react-apollo';

	export default class Article extends React.Component {
			
		constructor(props){
			super(props);
			this.state = {
				articles : "",
				menuBookMarked : false,
			};
			this.handlerBookMarkedMenu = this.handlerBookMarkedMenu.bind(this);
		}
		handlerBookMarkedMenu(){
			this.setState(prev => {
				return {
					menuBookMarked : !prev.menuBookMarked
				}
			});
		}
		render (){
			const GET_COURSES = gql`
				query getCoreCourses ($id: String,$bookRefs: [String]) {
				  getCoreCourses(id: $id){
					_id
					createdDate
					lastUpdate
					promotionId
					name
					summary
					ponderation
					sections {
					  sectionId
					  tittle
					  paragraphs {
						type
						content
					  }
					}
				  }
				  getArticlesBookMarked(bookRefs: $bookRefs){
					_id
					createdDate
					lastUpdate
					promotionId
					name
					summary
					ponderation
					likers
					dislikers
				  }
				}
			`;
			let id = "5dda52595232b51c88da6023";
			let bookRefs = this.props.bookMarkedTab;
		let currentArticle = 0;
			return (
			<Query query={GET_COURSES} variables={{ id,bookRefs }}>
				{({ data :{ getCoreCourses,getArticlesBookMarked },loading, error})=>{
					if (loading || !getCoreCourses) {
						return <div>Loading ...</div>;
					  }
					  return (<div>
						<div className="yardstick-filter-book-frame">
							<button className="btn" onClick={this.handlerBookMarkedMenu}>
								<i className="fa fa-filter"/>
								<span className="">Filter critors</span>
							</button>
						</div> 
						{this.state.menuBookMarked ?(<div className= "pupil-requester-zone">
							<div className= "pupil-requester-header">
								 Pupils subscriptions requests
							</div><hr/>
							<div className= "assesses">
								<div className="assess_menu" onClick={()=> alert('hello requester')}>
									<img src=""  className="user-avatar-pr"/>
									<Link to="">
										<span className="assess-topic">
											<i className="fa fa-hand-o-right"/>
										</span>
									</Link>
									<div>
									{getArticlesBookMarked.map((article)=>
										(<div>
											<Link to="">
												<span className="assess-course">
													<i className="fa fa-folder-o"/>view certificats
												</span>
											</Link>
											<span className="assess-release-hour">requester</span>
											<span className="assess-release-hour">request status : requester</span>
										</div>))}
									</div>
									<hr/>
								</div>
							</div>
						</div>):null}
						<div className="panel-manager">
							<button className="btn">
									<i className="fa fa-folder-o"/>
									<i className="fa fa-folder"/>
								<span className="article-caret">something</span>
							</button>
							<button className="btn">
									<i className="fa fa-file-text-o"/>
									<i className="fa fa-file-text"/>
							</button>
						</div>
						<div className="bookmarked-article">
							<div className="current-article">Article bookmarked</div>
							<div className="core-article">
								{getCoreCourses[currentArticle].sections.map((signet,key) =>(
									<div>
										<a href={`#${key}`}>{signet.tittle}</a>
									</div>
								))}
							</div>
						</div>
						<div className="more-article">
							<div className="current-article">Git hub
							</div>
						</div>
						<div className="article-frame">
							<div className="sefl-article-main-header">{getCoreCourses[currentArticle].name}</div>
							<div>
							{
								getCoreCourses[currentArticle].sections.map((portion,key) => (
									<div>
										<div className="portion-header" id={`${key}`}>{portion.tittle}</div>
										<div>{
											portion.paragraphs.map((paragraph) => {
												if(paragraph.type == 'text'){
													return (<p className="paragraph-article">{paragraph.content}</p>);
												}else if(paragraph.type == 'list'){
													return (<ol>
																{paragraph.list.map(l => <li>{l}</li>)}
															</ol>);
												}else if(paragraph.type == 'image'){
													return (<img src={paragraph.source}/>);
												}else if(paragraph.type == 'equation'){
													return (<div>{paragraph.equation}</div>);
												}else{
													return (<div/>);
												}
											})
										}
										</div>
									</div>
								))
							}
							</div>
						</div>
				</div>
			)}}
			</Query>);
		}
	}