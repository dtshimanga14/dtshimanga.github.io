	import React from 'react';
	import { Link, NavLink, Redirect } from 'react-router-dom';
	
		export default class Nav extends React.Component {
			constructor(){
				super();
			}
			render (){
				return (
					
				<div className="row" id="head_nav">
						<div> 
							<nav className="col-lg-12 col-md-12 col-sm-12"id="main_nav">
								<ol id="listnav">
									<li><a href=""><img src="icon\home.jpg" height="20px" weight="20px"/></a></li>
									<li id="lessons"><a href="/cardmaker"><img src="icon\lecons.jpg" height="20px" weight="20px" alt="Mes leçons"/></a></li>
									<li><a href=""><img src="icon\evaluation.jpg" height="20px" weight="20px" alt="Notifications"/></a></li>
									<li><a href=""><img src="icon\succes.jpg" height="20px" weight="20px"/></a></li>
									<li id="parcButt"><img src="icon\user.jpg" height="20px" weight="20px"/></li>
									<li><img src="icon\etablissement.jpg" height="20px" weight="20px"/></li>
									<li>
										<ol><img src="icon\preparation.jpg" height="20px" weight="20px"/>
											<li id="preButt"><img src="icon\cours.jpg" height="20px" weight="20px"/></li>
											<li><img src="icon\evaluation.jpg" height="20px" weight="20px" alt="Evaluation"/></li>
										</ol>
									</li>
									<li id="aproButt"><NavLink to="/about"><img src="icon\apropos.jpg" height="20px" weight="20px"/></NavLink></li>
									<li><a href="login.html"><img src="icon\logout.jpg" height="20px" weight="20px"/></a></li>
								</ol>
							</nav>
						</div>
				</div>
				);
			}
		}