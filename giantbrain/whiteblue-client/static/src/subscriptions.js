import { gql  } from '@apollo/client'

export const MESSAGE_CREATED = gql`
  subscription messageCreated {
	  messageCreated {
		content
		id
	  }
	}
`;

export const CHAT_SUB = gql`
  subscription onChat ($secondOwner : String, $firstOwner : String ){
	  onChat(secondOwner : $secondOwner, firstOwner : $firstOwner ) {
		secondOwner
		firstOwner
		messages {
			id
			digitalSign
			when
			text
		}
	  }
	}
	`;
	
export const COMMENT_POST = gql`
  subscription onComment($postId : String){
	  onComment (postId : $postId){
		id
		when
		ownerId
		text
		user {
		  avatar
		}
	  }
	}
	`;	
	

