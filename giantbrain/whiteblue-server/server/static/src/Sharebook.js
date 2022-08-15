import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

	export default class Sharebook extends React.Component {
			
		constructor(props){
			super(props);
		}
		render (){ 


					return (<div>
								<div className="friend_plholder">
									<img className="friend" src="" />
									<span className="text-align lower-case">  Jack</span>
									<span className="text-align lower-case"> Ryan</span>
									<span></span>
								</div>
							</div>);
					}
			}