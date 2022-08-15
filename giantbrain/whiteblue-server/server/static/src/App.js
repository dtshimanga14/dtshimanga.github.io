	import React from 'react';
	import ReactDOM from 'react-dom';
	import { BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
	import { ApolloProvider } from 'react-apollo';
	import { ApolloClient } from 'apollo-client';
	import { HttpLink } from 'apollo-link-http';
	import { createUploadLink } from 'apollo-upload-client';
	import { onError } from "apollo-link-error";
	import { InMemoryCache } from 'apollo-cache-inmemory';
	import { getMainDefinition } from 'apollo-utilities';
	import { ApolloLink, split } from 'apollo-link';
	import { WebSocketLink } from 'apollo-link-ws';
	
	

	import Wb from './Wb.js';
	import Login from './Login.js';
	import Subscriber from './Subscriber.js';
	import SchoolSubscriber from './SchoolSubscriber.js'
	
	const httpLink = new HttpLink({
	  uri: 'http://localhost:8000/graphql',
	}); 

	const wsLink = new WebSocketLink({
	  uri: `ws://localhost:8000/graphql`,
	  options: {
		reconnect: true,
	  },
	});
	/* const httpLink = createUploadLink({
		  uri : 'http://localhost:8000/graphql'
	  }); */
	const terminatingLink = split(
	  ({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return (
		  kind === 'OperationDefinition' && operation === 'subscription'
		);
	  },
	  wsLink,
	  httpLink
	);

	const link = ApolloLink.from([terminatingLink]);

	const cache = new InMemoryCache();

	const client = new ApolloClient({
	  link,
	  cache
	});

	ReactDOM.render(
	  <ApolloProvider client={client}>
		  <div className="container">
			<Router>
			  <Route exact path="/" component={Login} />
			  <Route path="/subscriber" component={Subscriber} />
			  <Route path="/schooler" component={SchoolSubscriber} />
			  <Route path="/inner" component={Wb} />
			</Router>
		  </div>
	  </ApolloProvider>,
	  document.getElementById('contents'),
	);

	if(module.hot){
		module.hot.accept();
	}
	
