import React, { Component } from "react";
import { gql, graphql, withApollo } from "react-apollo";
import { authToken } from "./net_interface"

const GET_MESSAGES_QUERY = gql`query {
    messages
}`;

const ON_NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription onNewMessage($userId: Int!) {
        newMessage(userId: $userId)
    }
`;

const MUTATE_MESSAGE = gql`
    mutation AddMessage($message: String!, $broadcast: Boolean!) {
        addMessage(message: $message, broadcast: $broadcast)
    }
`;

//@withApollo - react-scripts do not yet support decorators - https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators
class MessageSubscription extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
    this.mutationMessage = "Hello Apollo GraphQL Subscriptions";
    this.broadcast = false;
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.data.loading) {

      this.setState({
        messageList: [...nextProps.data.messages]
      });

      if (this.subscription) {
        if (nextProps.data.messages !== this.props.data.messages) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.unsubscribe();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }

      this.unsubscribe = nextProps.data.subscribeToMore({
        document: ON_NEW_MESSAGE_SUBSCRIPTION,
        variables: {
          userId: authToken
        },
        // this is where the magic happens.
        updateQuery: this.updateQuery,
        onError: (err) => console.error(err),
      });
    }
  };

  componentWillUnmount = () => {
    // The subscribeToMore subscription is stopped automatically when its dependent query is stopped,
    // so we don’t need to unsubscribe manually. 
    // this.onUnsubscribe();
  };

  updateQuery = (prev, {subscriptionData}) => {
    const newMessage = subscriptionData.data.newMessage;
    return this.onNewMessage(newMessage);
  };

  onNewMessage = (message) => {
    let messages = [...this.state.messageList, message];
    this.setState({
      messageList: messages
    });
    return messages;
  };

  updateMutationMessage = (event) => {
    this.mutationMessage = event.target.value;
  };

  updateBroadcastFlag = (event) => {
    this.broadcast = event.target.checked;
  };

  onMutationSubmit = () => {
     this.props.client.mutate({
       operationName: "AddMessage",
       mutation: MUTATE_MESSAGE,
       variables: { message: this.mutationMessage, broadcast: this.broadcast }
     });
  };

  onUnsubscribe = () => {
    this.unsubscribe();
  };

  render() {
    const {loading} = this.props.data;
    return (<div>
				<div className="chat-box">
					<div>
						{ loading ? (<p>Loading…</p>) : (
						  <ul> { this.state.messageList.map(entry => JSON.parse(entry)).map(entry => (
							<li key={entry.id}>{entry.message}</li>)) }
						  </ul>
						 )}
					</div>
				</div>
				<div className="editor-box">
					<input type="text" className="input-chat" onChange={this.updateMutationMessage.bind(this)} defaultValue={this.mutationMessage}/>
					<input type="button" onClick={this.onMutationSubmit.bind(this)} value="Mutate"/> 
				</div>
			</div>
		);
  }
}

export default graphql(
  GET_MESSAGES_QUERY
)(withApollo(MessageSubscription))
