import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
import './css/Chat.css';

export class Container extends React.Component {
  constructor(props){
	super(props);	
  }
  render() {
    return (<div >
				{this.props.children}
			</div>);
  }
}