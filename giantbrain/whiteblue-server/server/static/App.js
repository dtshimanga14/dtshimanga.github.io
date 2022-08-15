import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'whatwg-fetch';
import Nav from './Nav.js';
import Footer from './Footer.js';
import Head from './Head.js';
import StreamPosts from './StreamPosts.js';

class Wb extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			{ className: 'container', id: 'main_id' },
			React.createElement(Head, null),
			React.createElement(Nav, null),
			React.createElement(StreamPosts, { data: this.state.data }),
			React.createElement(Footer, null)
		);
	}
}

var contentNode = document.getElementById('contents');
ReactDOM.render(React.createElement(Wb, null), contentNode);