import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_CHAT = gql`
  mutation addChat($firstOwner: String!,
					$secondOwner: String!,
					$digitalSign: String!,
					$text: String!,
	){
  chats(input: {
				firstOwner: $firstOwner,
				secondOwner: $secondOwner,
				digitalSign: $digitalSign,
				text: $text
	}){
    _id
    firstOwner
    secondOwner
    messages{
      text
      when
    }
  }
}
`;

export const FormChat = ({firstOwner,secondOwner,value}) => {
  let input;

  return (
    <Mutation mutation={ADD_CHAT}>
      {(chats, { data }) => (
		<div>
			<form onSubmit={ e => {
				e.preventDefault();
				chats({ variables: { firstOwner: firstOwner,
									secondOwner: secondOwner,
									digitalSign: firstOwner,
									text: value 
								}
					});
			}}>
				<input type="text" value="" />
			</form>
		</div>
      )}
    </Mutation>
  );
};

