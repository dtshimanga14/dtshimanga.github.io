	import React, { useState, useEffect } from 'react';
	import { useQuery, useApolloClient } from '@apollo/client'
	
	
	import WbHooks from './WbHooks.js';
	import LoginForm from './LoginForm.js';


	const NewFrame = () => {
	  const initTkn = localStorage.getItem('user-token')||null;
	  //const initTkn = localStorage.getItem('user-token')||"d2029049c436ee05f874";
	  //const [token, setToken] = useState(initTkn);
	  const [token, setToken] = useState(null);
	  const [errorMessage, setErrorMessage] = useState(null);
	
	  const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
		  setErrorMessage(null)
		}, 5000);
	  };
  
	  
	  return (<LoginForm setToken={setToken} setError={notify}/>)
	}
	
	export default NewFrame; 