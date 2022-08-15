import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import Loading from './Loading.js';
import Section from './Section.js';
import 'whatwg-fetch';

	export default class Article extends React.Component {
			
		constructor(props){
			super(props);
			this.state = {
				articles : "",
				approvorState : false,
			};
			this.handlerApproval = this.handlerApproval.bind(this);
		}
		handlerApproval(){
			this.setState({
				approvorState : !this.state.approvorState
			});
		}
		render (){
			let article = this.props.content;
			return (
				<div className="article-post-frame">
					<div className="article-main-header">
								<div>
									<img className="article-profil" src={article.authors.picture}/>
									<span className="article-tittle">{article.header}</span>
								</div>
								<div>
									<span>
										<span className="article-authors-writer">Written by</span>
										<Link to="/cv" className="article-approval-authors">
											 {article.authors.username} {article.authors.middlename}
										</Link>
									</span>
									{this.state.approvorState ? (
										<span className="article-approve">
											<span className="article-authors-writer">Approved by</span> 
												<Link to="/cv" className="article-approval-authors" onClick={this.viewCertificat}>
													{article.approvor.username} {article.approvor.middlename}
												</Link>
											<span className="cotation-icon"><i className="fa fa-ellipsis" /></span> 
										</span>):
										<button className="btn article-approval-btn" onClick={()=> this.handlerApproval()}>
											Approve <i className="fa fa-check" />
										</button>
									}
								</div>
					</div><hr />
					<div>
						{article.portions.map(portion => < Section portion={portion}/>)}
					</div><hr />
					<div className="group-btn-wit">
						<button className="btn">
							<i className="fa fa-thumbs-o-up"/>
						</button>
						<button className="btn">
							<i className="fa fa-thumbs-down"/>
						</button>
						<button className="btn">
							<i className="fa fa-share"/><span className="text-button">Share</span>
						</button>
						<button className="btn">
							<span className="text-button">
								<i className="fa fa-bookmark"/>
							</span>
						</button>
						<button className="btn">
							<i className="fa fa-file-o"/><span className="text-button">Read</span>
						</button>
						<span >100 ,34 ,342 ,231 </span>
					 </div>
				</div>
			);
		}
	}