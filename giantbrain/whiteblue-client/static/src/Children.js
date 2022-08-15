import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

	export default class Children extends React.Component {
			
			constructor(props){
				super(props);
			}
			render (){ 
				return (<div className="children-frame">
							children
							<div className="children">
								<div >
									Child
								</div>
							</div>
							<div className="children-viewer">
								Viewer
							</div>
						</div>);
				}
	}