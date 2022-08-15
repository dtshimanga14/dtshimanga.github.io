	import React from 'react';
	import ReactDOM from 'react-dom';
	
		export default class Loading extends React.Component {
			constructor(props){
				super(props);
			}
			render(){
				
				return (<div className="wb-spinner"><i className="fa fa-circle-o-notch fa-spin"></i></div>);
			}
		}
