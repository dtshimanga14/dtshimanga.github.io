	import React from 'react';
	import ReactDOM from 'react-dom';
	import 'whatwg-fetch';
	import gql from "graphql-tag";
	import { Query, Mutation, Subscription } from "react-apollo";
	import { BrowserRouter as Router, Route, Link,
		NavLink, Redirect,hashHistory } from 'react-router-dom';
	import Subscribe from './Subscribe.js';
	import uuid from 'uuid';
	import moment from 'moment';
	
	import { setToken } from './token.js';
	

/* const GET_MESSAGES = gql`
  query chats($firstOwner: String!, $secondOwner: String!){
	  chats(firstOwner: $firstOwner, secondOwner: $secondOwner) {
		firstOwner
		secondOwner
		messages {
		  id
		  digitalSign
		  when
		  text
		}
	  }
}
`;	

const MESSAGE_CREATED = gql`
	subscription{
	   messages {
		id
		digitalSign
		when
		text
	  }
	}`;


	let firstOwner = "5dd137d95390a5064468978f";
	let secondOwner = "5dd137d95390a5064468978"; */
	/* 
const App2 = () => (
  <Query query={GET_MESSAGES} variables={{ firstOwner,secondOwner }}>
    {({ data, loading, subscribeToMore }) => {
      if (!data) {
        return null;
      }
	  
      if (loading) {
        return <span>Loading ...</span>;
      }
		console.log(data.chats);
      return (
        <Messages
          messages={data.chats.messages}
          subscribeToMore={subscribeToMore}
        />
      );
    }}
  </Query>
);

class Messages extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: async (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return await Object.assign({},prev.chats,{
				messages: [
				...prev.chats.messages,
				subscriptionData.data.messages,
			  ]});
			},
		  });
  }

  render() {
    return (
      <ul>
        {this.props.messages.map(message => (
          <li key={message.id}>{message.text} {message.id}</li>
        ))}
      </ul>
    );
  }
}
 */

	export default class Login extends React.Component {
			constructor(props){
				super(props);
				this.state = {
					fields : {
						username : "",
						password : "",
					},
					currOverView : 0,
					isLogin : false,
				};
				this.handlerOnChange = this.handlerOnChange.bind(this);
				this.alternateOverView = this.alternateOverView.bind(this);
				this.handlerOnCheckPassword = this.handlerOnCheckPassword.bind(this);
				this.onLogin = this.onLogin.bind(this);
				this.trueLogin = this.trueLogin.bind(this);
			}
			onLogin(){
			}
			handlerOnCheckPassword(){
				let pwInput = document.getElementById("Pw");
				if(pwInput.getAttribute('type')=='text'){
					pwInput.setAttribute('type','password');
				}else{
					pwInput.setAttribute('type','text');
				}
			}
			alternateOverView(){
				let { currOverView } = this.state;
				if(currOverView == 3){
					this.setState({
						currOverView : 0
					});
				}else{
					let { currOverView } = this.state;
					let newOV = currOverView+1;
					this.setState({
						currOverView : newOV
					});
				}
			}
			componentDidMount(){
				this.forceInterval = setInterval(()=>this.alternateOverView(),3000)
			}
			componentWillUnmount(){
				clearInterval(this.forceInterval)
			}
			trueLogin(data){
				localStorage.setItem("userId",data.login._id);
			}
			handlerOnChange(event){
				const { fields } = this.state;
				fields[event.target.name] = event.target.value;
				this.setState({ fields });
				localStorage.setItem("userId","5dd83eddb770581478f9b277");
				localStorage.setItem("promotionId","5dda49065232b51c88da601e");
				localStorage.setItem("courseId","5dda52595232b51c88da6023");
				localStorage.setItem("schoolId","5dd5a21099f69611cc23b4d9");
				
				let currentLinkId = "5dc3290f644e5c04e0f63aca";
				localStorage.setItem("currentLinkId",currentLinkId);
			}
			render (){
				
				let { currOverView } = this.state;
				let overviews = [{
					text : "The easiest platform For getting Knowledge",
				},{
					text : "Get smartly access to more than one millions of content accordingly to your interesting fields",
				},{
					text : "The best process learning management tools",
				},{
					text : "The best process learning management tools",
				}];
				const GET_CHAT_SUBS = gql`
				  subscription chatStream {
					  chatStream {
						secondOwner
						firstOwner
						messages {
						  text
						  digitalSign
						  when
						}
					  }
					}
				`;	
				const LOGIN = gql`
					mutation login($username: String!, $password: String!){
					  login( username : $username,password:$password){
							_id
							isConnected
							personals {
							  firstname
							  middlename
							  username
							  picture
							  password
							}
						  }
						}
					`;
				let chatStream = {
						secondOwner :"aagfhgjhj",
						firstOwner :"",
						messages : [{
						  text :"",
						  digitalSign :"",
						  when :"", 
						}]
					  };
							let { isLogin } = this.state;
							let Logins = isLogin == false ? (<div className="login-page">
									<div className="row">
										<div className="col-md-12">
											<h1 className="">Whiteblue </h1>
										</div>
									</div>
									<div className="row" >
										<div className="col-md-5">
											<div className="overview-login">
												{overviews[currOverView].text}
											</div>
										</div>
										<div className="col-md-offset-2 col-md-5">
											<div className=" panel panel-default">
												<div className="panel-body">
														<form method="post" className="form-horizontal col-md-12">
															<div className="row login-inner">
																<div className="col-md-12">
																	<div className="form-group row">
																		<label className="" Htmlfor="username">Username</label>
																		<input className="form-control" placeholder="Nom d'utilisateur" 
																				value={this.state.fields.username}  
																				onChange={this.handlerOnChange}
																				name="username"
																		/>
																	</div>
																	<div className="form-group row">
																		<label className=""  Htmlfor="password">Password</label>
																		<input className="form-control" placeholder="Mot de passe" 
																				value={this.state.fields.password} 
																				onChange={this.handlerOnChange}
																				type="password"
																				name="password"
																				id="Pw"
																		/>
																	</div>
																	<div className="row checkbox">
																		<input onChange={this.handlerOnCheckPassword}
																				type="checkbox"
																				name="checkPassword"
																		/>
																		<label className=""  Htmlfor="view">view Password</label>
																	</div>
																	<div className="row">
																		<Mutation mutation={LOGIN} >
																			{(login, { data })=>{
																				return (<Link  className="col-md-5" to="/inner/home">
																						<button type="button" className="btn  btn-default" onClick={(e) => {
																							  this.trueLogin(data);
																							  login({ variables: { 
																											username: this.state.fields.username, 
																											password : this.state.fields.password 
																								}})
																							}}>
																							Log In
																						</button>
																					</Link>)
																			}}
																		</Mutation>
																		<Link  className="col-md-offset-2 col-md-5" to="/subscriber">
																			<button type="button" className="btn  btn-default"> Subscribe </button>
																		</Link>
																	</div>
																	<div  className="row">
																		<Link to="/subscriber">User</Link>
																		<Link to="/schooler">School</Link>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>) : <Redirect to="/inner/home"/>
						return (<div>{Logins}</div>)}
		}
		
		