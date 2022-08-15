import { gql  } from '@apollo/client'



export const ADD_CONTENT_MANUSCRIT = gql`
	mutation onUpdateManuscrit ($manuscritId : String!,  $Content : String){
	  onUpdateManuscrit(
		manuscritId : $manuscritId, Content : $Content
	  ) {
		tittle
		teacherId
		promotionId
		Content
	  }
	}
`;

export const ADD_MANUSCRIT = gql`
	mutation onMakeManuscrit ($tittle : String!, $teacherId : String!, $Content : String, $promotionId : String!){
	  onMakeManuscrit(
		tittle : $tittle, teacherId : $teacherId,
		Content : $Content, promotionId : $promotionId
	  ) {
		tittle
		teacherId
		promotionId
	  }
	}
`;

export const ADD_PROMOTION_MUT = gql`
	mutation addPromotionToSchool(
			$schoolId: String,$promotionName: String,
			$promotionLevel : String,$orientationName :String,$scheduleId : String,
			$prevouisPromotion : String ){
	  addPromotionToSchool(schoolId: $schoolId,promotionName: $promotionName,
						promotionLevel: $promotionLevel,
						orientationName :$orientationName,
						scheduleId : $scheduleId
						prevouisPromotion : $prevouisPromotion
			){
			_id
			schoolId
			promotionName
			promotionLevel
			prevouisPromotion
			scheduleId
			pupils {
			  _id
			  personals {
				username
				middlename
				firstname
				picture
				description
			  }
			  lastSeenOnline
			  performance
		}
	  }
	}
	`;
export const ONSHARE = gql`
	mutation onShare($postId : String!, $userId : String!){
	  onShare(postId : $postId, userId : $userId)
	}
	`;
export const SAVE_ANSWERS = gql`
	mutation onSubmitAnswersToQuestions($ownerId :String,$questId :String,$assessId :String,$answerId :String){
	  onSubmitAnswersToQuestions(ownerId :$ownerId,questId :$questId,assessId :$assessId,answerId :$answerId){
		starttime
		endtime
		ownerId
		assessId
		answersCorrect{
		  answerIdSubmit
		  questIdResponded
		  submitedtime
		}
	  }
	}
	`;

export const CORRECT_ASSESS = gql`
	mutation onBulkCorrection($assessId: String) {
		  onBulkCorrection(assessId: $assessId) {
			_id
			Id
			header
			fields
			promotionId
			courseId {
			  _id
			  createdDate
			  lastUpdate
			  name
			}
			teacherId {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			description
			startDay
			endDay
			duration
			corrected
		  }
		}
	`;

export const ACCEPT_PUPIL_MUT = gql`
	mutation addPupilToPromotion($pupilId: String,$promotionId: String){
	  addPupilToPromotion(pupilId: $pupilId, promotionId: $promotionId) {
		_id
		schoolId
		promotionName
		promotionLevel
		scheduleId
		pupils {
		  _id
		  personals {
			username
			middlename
			firstname
			picture
			description
		  }
		  lastSeenOnline
		  performance
		}
	  }
	}
	`;
			
export const PUT_NOTE_MUT = gql`
	mutation addCertificatNote($cote: Int, $topic: String, $CertificatId: String, $courseIdNote: String){
		  addCertificatNote(cote: $cote, topic: $topic, CertificatId: $CertificatId, courseIdNote: $courseIdNote) {
			courses {
			  courseId
			  courseName
			  ponderation
			  notes {
				idAssess
				topic
				cote
				date
			  }
			}
		  }
		}
	`;

export const ADD_COURSE_TO_PRO_MUT = gql`
	mutation addCoursesForTeacherToPrmotion($name: String, $teacherId: String,$promotionId: String,$ponderation: Int, ){
	  addCoursesForTeacherToPrmotion(name: $name, teacherId: $teacherId, promotionId: $promotionId, ponderation: $ponderation) {
		_id
		createdDate
		lastUpdate
		teacherId {
		  _id
		  personals {
			username
		  }
		}
		name
		promotionId
		ponderation
}
	}
	`;
export const REMOVE_COURSES = gql`
	mutation removeCoursesForTeacherToPrmotion($id: String,$promotionId: String){
	  removeCoursesForTeacherToPrmotion (id: $id,promotionId:$promotionId){
		_id
		createdDate
		lastUpdate
		teacherId {
		  _id
		  personals {
			username
		  }
		}
		name
		promotionId
		ponderation
	  }
	}
	`;	


export const PAY_BILL = gql`
	mutation onPayBills($emittor : String,$destinator : String ,$payer : String ,$cost : Int,$promotionId : String){
		  onPayBills(emittor :$emittor, destinator :$destinator , payer :$payer ,cost : $cost,promotionId :$promotionId){
			destinator
			emittor
			date
			cost
		  }
		}
	`;

export const DELETE_BOOKMARKS_MUT = gql`
			mutation deleteBookMarkedToUser($userId: String!, $bookId: String!,){
			  deleteBookMarkedToUser(userId: $userId, bookId: $bookId) {
				_id
				books{
				  id
				  BookMarkDay
				  filename
				  picture
				  tittle
				  subTittle
				  author
				  editor
				  publishDay
				}
			  }
			}
			`;
export const ADD_BOOKS_MUT = gql`
	mutation addBookMarkedToUser ($userId: String!, $picture: String!, $tittle: String!, $subTittle: String!,
									$author: String!, $editor: String!,
									$publishDay: String!, $filename: String!,){
	  addBookMarkedToUser(userId: $userId, picture: $picture, tittle: $tittle,
								  subTittle: $subTittle, author: $author, editor: $editor, 
								  publishDay: $publishDay, 
								  filename: $filename
							) {
		_id
		books {
		  id
		  BookMarkDay
		  picture
		  tittle
		  filename
		  subTittle
		  author
		  editor
		  publishDay
		}
	  }
	}
	`;


export const SAVE_RESPONDERS = gql`
	mutation onOpenAssessment ($ownerId: String, $assessId : String){
		  onOpenAssessment(ownerId: $ownerId, assessId: $assessId){
			_id
			starttime
			endtime
			ownerId
			assessId
			answersCorrect {
			  answerIdSubmit
			  questIdResponded
			  submitedtime
			}
		  }
		}
	`;

export const SAVE_ASSESS = gql`
	mutation addAssess($Id : String,$header: String,$fields: String, $promotionId: String,$courseId: String, 
			$teacherId: String,$description: String,$startDay : String,$endDay : String,$duration : Int,
					){
		addAssess(Id : $Id,header: $header,fields: $fields,promotionId: $promotionId, courseId: $courseId,teacherId : $teacherId,
				description: $description,startDay : $startDay,endDay : $endDay,duration : $duration, 
	  ){
		Id
		header
		fields
	 }
}
`;					
export const ADD_ASSERTIONS = gql`
	mutation addAssertionToQuestion($assessId: String,$questId: String,$text: String,$answerId: String){
	  addAssertionToQuestion (assessId: $assessId,questId: $questId,text: $text,answerId:$answerId){
		_id
		questionList{
		  questId
		  text
		  GAV
		  assertions{
			text
			answerId
		  }
		}
	  }
	}
	`;				
	
export const ADD_CORRECT_ANSWERS = gql`
	mutation addCorrectAnswerToQuestion($questId: String,$assessId: String, $answerId: String) {
	  addCorrectAnswerToQuestion(questId: $questId,assessId: $assessId, answerId: $answerId) {
		_id
		Id
		header
		fields
		promotionId
		courseId{
		  _id
		  name
		}
		teacherId
		description
		startDay
		endDay
		duration
		questionList{
		  questId
		  text
		  GAV
		  type
		  correctAnswer
		  assertions{
			text
			answerId
		  }
		}
	  }
	}
	`;
				
export const SAVE_SECTION = gql`
  mutation addSectionToCourse($id: String,$sectionId: String, $tittle: String) {
	addSectionToCourse(id :$id,sectionId :$sectionId,tittle :$tittle) {
		_id
		sections {
		  sectionId
		  tittle
		  paragraphs {
			type
			content
		  }
		}
	  }
	}
`; 
export const SAVE_QUESTION = gql`
			mutation addQuestionToAssess ($text: String,$type: Boolean,$assessId: String,$questId: String,$GAV: Int){
			  addQuestionToAssess(
				text: $text,
				type: $type,
				questId: $questId,
				assessId: $assessId,
				GAV: $GAV) {
				questionList{
				  questId
				  text
				  type
				  GAV
				  assertions{
					text
					answerId
				  }
				  correctAnswer
				}
			  }
			}
			`;


export const SAVE_PARAGRAPH = gql`
	mutation addParagraphToSection(
			$id: String,$sectionId: String, 
			$type: String,$content: String
			) {
		  addParagraphToSection(id: $id, sectionId: $sectionId,
				type: $type,content: $content) {
			_id
			sections {
			  sectionId
			  tittle
			  paragraphs {
				type
				content
			  }
			}
		  }
		}
	`;
							
export const LOGIN = gql`
  mutation onLogin($username: String!, $password: String!) {
    onLogin(username: $username, password: $password) {
		_id
		avatar
		personals {
		  username
		  middlename
		  firstname
		  password
		  picture
		  birthday
		  gender
		  maritalStatus
		  Email
		  nationality
		  phoneNumber
		  country
		  town
		  quarter
		  street
		  number
		  description
		}
		classes {
		  from
		  at
		  duration
		  reference
		}
	  }
  }
`
			
export const SHAREPOST_MUT = gql`
	mutation makeShareblePost($idPost: String!, $sharebility: Boolean!, ){
	  mutateSharebilityPost( idPost : $idPost,sharebility:$sharebility,){
			_id
			sharebility
		  }
		}
		`;
		
export const LIKEORDISLIKE_MUT = gql`
	mutation addLikePost($idPost: String!, $userId: String!, ){
		addLikePost(idPost: $idPost, userId: $userId){
			likes
		  }
		}
	`;

export const COMMENT_MUT = gql`
	mutation commentsPost($idPost: String!, $idUser: String!, $commentText: String!, ){
	  addCommentsPost( idPost : $idPost,idUser:$idUser,commentText : $commentText,){
		_id
		idPost
		publicAt
		Picture
		totalComments
		totalLike
		sharebility
	  }
	}
	`;

export const CHATS_MUT = gql`
	mutation chats($firstOwner: String!, $secondOwner: String!,$digitalSign: String!,$text: String!, ){
	  addChats( firstOwner : $firstOwner,secondOwner:$secondOwner,
			 digitalSign : $digitalSign,text : $text){
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

export const PLUG_USERS_CERTIFICAT_MUT = gql`
			mutation plugToCertificatUsers($certificatId: String, $userId : String ){
			  plugToCertificatUsers( certificatId: $certificatId, userId : $userId){
				_id
				personals {
				  username
				  middlename
				  firstname
				}
			  }
			}
			`;
			
			
export const MUT_QL = gql`
	mutation messagesMut {
	  messagesMut {
		content
		id
	  }
	}
	`;

export const ADD_FRIENDS = gql`
	mutation friendshipQuery($answerer: String!,$asker:String!) {
	  friendshipQuery(answerer: $answerer, asker: $asker) {
		pageInfoUsers {
		  hasPreviousCursor
		  hasNextCursor
		  startCursor
		  endCursor
		}
		suggestions {
		  _id
		  avatar
		  isId
		  personals {
			username
			middlename
			firstname
			password
			picture
		  }
		  accountType
		  library
		}
	  }
	}`;
	
	

export const ACCEPT_FRIENDS = gql`
	mutation acceptFriendShip($answerer: String!,$asker: String!,$NotifId:String!) {
	  acceptFriendShip(answerer: $answerer,asker: $asker,NotifId:$NotifId) {
		owner
		notifications{
		  NotifId
		  owner
		  message
		  time
		  status
		  answer
		}
	  }
	}`;
	
	
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;


export const CREATE_USER = gql`
	mutation addUser($username: String!, $password: String!, $middlename: String, 
		$firstname: String, $accountType: String!, $gender: String!) {
		addUser(input:{
		username : $username,
		password : $password,
		middlename : $middlename,
		firstname : $firstname,
		accountType : $accountType,
		gender : $gender
	  }){
		  isId
		 }
	}
	`;
	
export const CREATE_KID = gql`
	mutation addKid($username: String!, $password: String!, $middlename: String,
			$firstname: String, $accountType: String!, $gender: String!, $parentId : String!) {
		addKid(username : $username,
			password : $password,
			middlename : $middlename,
			firstname : $firstname,
			accountType : $accountType,
			gender : $gender,
			parentId : $parentId){
		  isId
		 }
	}
	`;
export const MESSAGE_UPLOADED = gql`
	mutation times($id : String!) {
	  times(id : $id){
		id
		content
	  }
	}`; 
export const SUBSCRIBE_MUT = gql`
	mutation submitRequestersToSchool($promotionId:String!,$userId : String!) {
	  submitRequestersToSchool(promotionId: $promotionId, userId: $userId) {
		promotionId
		requesters {
		  ownerId {
			personals {
			  username
			  middlename
			  firstname
			}
		  }
		}
	  }
	}`;
	
	export const ADD_SCHOOL = gql`
		mutation addInstitut($ownerId : String!, 
				$country : String! , $state: String! , $town : String! , $township : String! , 
				$street : String! , $number : String! , $reference : String!,
				$latitude : Float!, $longitude : Float!, $schoolName : String!){
		  addInstitut(ownerId : $ownerId  , country : $country , state : $state , 
				town : $town , township : $township , 
				street : $street , number : $number , reference : $reference,
				latitude : $latitude, longitude : $longitude, schoolName : $schoolName
			){
				fonder
				name
				logo
				address {
				  country
				}
				contact {
				  email
				}
				location {
				  latitude
				}
				promotions {
				  _id
				}
				libraries {
				  _id
				}
			  }
			}
			`;

