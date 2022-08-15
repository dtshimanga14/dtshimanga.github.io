import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

export default class Chapter extends React.Component {
						     		
		constructor(props){
				super(props);
		}
		render(){
			let mapSubSections = this.props.key
					return (<span>
								{mapSubSections}
                       	 </span>)
		}
	}