	import React from 'react';
	import ReactDOM from 'react-dom';
	import { BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
	/*import { ApolloClient } from 'apollo-client';
	import { HttpLink } from 'apollo-link-http';
	import { InMemoryCache } from 'apollo-cache-inmemory';
	import { ApolloProvider } from 'react-apollo'; */
	import { createHttpLink } from 'apollo-link-http';
	import { getMainDefinition } from 'apollo-utilities';
	import { ApolloLink, split } from 'apollo-link';
	import { WebSocketLink } from 'apollo-link-ws';
	import { setContext } from 'apollo-link-context';
	import { ApolloProvider,InMemoryCache,ApolloClient,HttpLink } from '@apollo/client'
	
	
	import CertificatsHk from './CertificatsHk.js';
	import SchoolHk from './SchoolHk.js';
	import CvHk from './CvHk.js';
	import SubscriberHk from './SubscriberHk.js';
	import FoldersViewHk from './FoldersViewHk.js';
	import AssessViewHk from './AssessViewHk.js';
	import EditorHk from './EditorHk.js';
	import CorrectedHk from './CorrectedHk.js';
	import LibrariesHk from './LibrariesHk.js';
	import LiveHk from './LiveHk.js';
	import CoursesHk from './CoursesHk.js';
	import BillsHk from './BillsHk.js';
	import HistoriesHk from './HistoriesHk.js';
	import MyTeachersHk from './MyTeachersHk.js';
	import MyClassmateHk from './MyClassmateHk.js';
	import AssessmentHk from './AssessmentHk.js';
	import SchoolDashBoardHk from './SchoolDashBoardHk.js';

	import Wb from './Wb.js';
	import Login from './Login.js';
	import Subscriber from './Subscriber.js';
	import SchoolSubscriber from './SchoolSubscriber.js';
	import NewFrame from './NewFrame.js';
	
	const httpLink = new HttpLink({
	  uri: 'http://localhost:8000/graphql',
	}); 

	const wsLink = new WebSocketLink({
	  uri: `ws://localhost:8000/graphql`,
	  options: {
		reconnect: true,
	  },
	});
	
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
	 
	const authLink = setContext((_, { headers }) => {
	  // get the authentication token from local storage if it exists
	  const token = localStorage.getItem('user-token');
	  // return the headers to the context so httpLink can read them : authLink.concat(link)
	  return {
		headers: {
		  ...headers,
		  authorization: token ? `${token}` : "",
		}
	  }
	});
	/*const link = createHttpLink({
	  uri: 'http://localhost:8000/graphql',
	  credentials: 'include'
	});*/
	const cache = new InMemoryCache();

	const client = new ApolloClient({
	  link : authLink.concat(link),
	  cache,
	});

	
	ReactDOM.render(
	  <ApolloProvider client={client}>
		  <div className="container">
			<Router>
			  <Route exact path="/" component={NewFrame} />
			  <Route path="/subscriber/"  exact component={SubscriberHk}/>
			  <Route path="/schooler" component={SchoolSubscriber} />
			  <Route path="/certificat" exact component={CertificatsHk}/>
			  <Route path="/schools" exact component={SchoolHk}/>
			  <Route path="/cv" exact component={CvHk}/>
			  <Route path="/folders" exact component={FoldersViewHk}/>
			  <Route path="/assess" exact component={AssessViewHk}/>
			  <Route path="/editor" exact component={EditorHk}/>
			  <Route path="/corrected" exact component={CorrectedHk}/>
			  <Route path="/libraries" exact component={LibrariesHk}/>
			  <Route path="/live" exact component={LiveHk}/>
			  <Route path="/course" exact component={CoursesHk}/>
			  <Route path="/billing" exact component={BillsHk}/>
			  <Route path="/histories" exact component={HistoriesHk}/>
			  <Route path="/myclass" exact component={MyClassmateHk}/>
			  <Route path="/assessment" exact component={AssessmentHk}/>
			  <Route path="/dashboard" exact component={SchoolDashBoardHk}/>
			</Router>
		  </div>
	  </ApolloProvider>,
	  document.getElementById('contents'),
	);

	if(module.hot){
		module.hot.accept();
	}

