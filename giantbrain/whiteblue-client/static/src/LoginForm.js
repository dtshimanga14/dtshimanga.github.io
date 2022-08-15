import React, { useState, useEffect,Component } from 'react'
import { useMutation, useSubscription,useQuery } from '@apollo/client'
import gql from "graphql-tag";
import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';


import { GET_USER, MY_QL } from './queries.js';
import { SHAREPOST_MUT, LIKEORDISLIKE_MUT, COMMENT_MUT, LOGIN,MUT_QL } from './mutations.js';
import { MESSAGE_CREATED } from './subscriptions.js';



/* class Comments extends Component {
  componentDidMount() {
    this.props.subscribeToNewComments();
  }
  render(){
  return (<div>
			{this.props.data.messagesQL.map((message)=>(<h4>New comment:{message.id}</h4>))}
			<button onClick={this.props.messagesMut}>mut</button>
		</div>);
  }
} */


/* const  CommentsPage = () => {
  const { loading, error, subscribeToMore, data } = useQuery(MY_QL);
  const [ messagesMut,result ] = useMutation(MUT_QL,{
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  });
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
  return (<Comments 
			messagesMut={() => messagesMut()}
			data={data}
			subscribeToNewComments={() =>
				subscribeToMore({
				  document: MESSAGE_CREATED,
				  updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev;
					const next = [...prev.messagesQL, subscriptionData.data.messageCreated]; 
					console.log(next);
					return next;
				  }
				})
			}
		/>);
}; */

const LoginForm = ({ setToken,setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [count, setcount] = useState(0)

  const [ onLogin,result ] = useMutation(LOGIN,{
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  });

   useEffect(() => {
    if ( result.data ) {
      console.log('-->', result.data.onLogin._id);
      const token = result.data.onLogin._id;
      setToken(token)
      localStorage.setItem('user-token', token);
	  localStorage.setItem(result.data.onLogin.avatar,'avatar-tkn');
    }
  }, [result.data])  // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    onLogin({
      variables: { username, password }
    })
  };
const handlerOnCheckPassword = () => {
	let pwInput = document.getElementById("Pw");
	if(pwInput.getAttribute('type')=='text'){
		pwInput.setAttribute('type','password');
	}else{
		pwInput.setAttribute('type','text');
	}
};
 
  return (<div className="login-page">
	<div className="row">
		<div className="col-md-12">
			<h1 className="">Whiteblue </h1>
		</div>
	</div>
	<div className="row" >
		<div className="col-md-offset-2 col-md-5">
			<div className=" panel panel-default">
				<div className="panel-body">
						<form  className="form-horizontal col-md-12" onSubmit={submit}>
							<div className="row login-inner">
								<div className="col-md-12">
									<div className="form-group row">
										<label className="" Htmlfor="username">Username</label>
										<input className="form-control" placeholder="username" 
											name="username"
											value={username}
											onChange={({ target }) => setUsername(target.value)}
										  />
									</div>
									<div className="form-group row">
										<label className=""  Htmlfor="password">Password</label>
										<input className="form-control" placeholder="Mot de passe"
											type='password'
											name="password"
											value={password}
											onChange={({ target }) => setPassword(target.value)}
											id="Pw"
										  />
									</div>
									<div className="row checkbox">
										<input onChange={()=>handlerOnCheckPassword()}
												type="checkbox"
												name="checkPassword"
										/>
										<label className=""  Htmlfor="view">view Password</label>
									</div>
									<div className="row">
										<button type='submit'  className="btn  btn-default">Log In</button>
										<Link  className="col-md-offset-2 col-md-5" to="/subscriber">
											<button type="button" className="btn  btn-default"> Subscribe </button>
										</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>)
}




export default LoginForm