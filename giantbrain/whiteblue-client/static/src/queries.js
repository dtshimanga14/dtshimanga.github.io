import { gql  } from '@apollo/client';



export const GET_MY_MANUSCRIT_BYID = gql`
	query getMyManuscritById($manuscritId : String) {
	   getMyManuscritById(manuscritId: $manuscritId) {
			tittle 
			teacherId {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			approvedBy {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			promotionId
			Content
	  }
	}
	`;


export const GET_MY_MANUSCRITS = gql`
	query getMyManuscrits($teacherId : String) {
	   getMyManuscrits(teacherId: $teacherId) {
			_id 
			tittle 
			promotionId
	  }
	}
	`;


export const GET_PROMOTION_COURSE = gql`
	query getCourseList($promotionId : String) {
	   getCourseList(promotionId: $promotionId) {
			_id 
			tittle 
			teacherId 
			promotionId
	  }
	}
	`;

export const GET_MANUSCRIT = gql`
	query getManuscrit($manuscritId : String) {
	   getManuscrit(manuscritId: $manuscritId) {
		tittle
        Content
	  }
	}
	`;	


export const PROMOTIONS_SCHOOL = gql`
	query getPromotionBySchool($schoolId : String) {
	   getPromotionBySchool(schoolId: $schoolId) {
		_id
		promotionName
	  }
	}
	`;	

export const GET_COMMENTS = gql`
	query comments($postId : String) {
	  comments(postId: $postId) {
		text
		when
		id
		ownerId
		user{
		  avatar
		}
	  }
	}
	`;	

export const GET_ASSESS_Q = gql`
	query ($assessId: String){
		getAnAssess(assessId: $assessId) {
				Id
				_id
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
				questionList {
				  questId
				  text
				  type
				  GAV
				  assertions {
					text
					answerId
				  }
				  correctAnswer
				}
			  } 
			}
			`;


export const GET_ASSESSES_TO_CORRECT = gql`
	query onGetAssessToCorrect($promotionId: String, $teacherId: String){
	  onGetAssessToCorrect(promotionId: $promotionId,teacherId: $teacherId) {
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
		description
		startDay
		endDay
		duration
		done
		corrected
		count
	  }
	}`;	
												
export const GET_MYCLASSMATE = gql`
		query ($promotionId: String!){
		  getRequesters(promotionId: $promotionId){
			promotionId
			requesters {
			  ownerId {
				_id
				personals {
				  username
				  middlename
				  firstname
				  picture
				}
				certificats
			  }
			  status
			  submitdate
			}
		  }
		  getPromotions (promotionId: $promotionId) {
			schoolId
			promotionName
			promotionLevel
			scheduleId
			pupils {
			  _id
			  avatar
			  personals {
				username
				middlename
				firstname
				picture
				description
			  }
			  certificats
			  lastSeenOnline
			  performance
			}
		  }
		  getCoreCoursesForTeacher(promotionId: $promotionId){
				_id
				name
			}
	}
	`;
						

export const GET_CURRENT_PROMOTION = gql`
	query getCurrentPromotionTeachers{
	  getCurrentPromotionTeachers {
		_id
		isId
		personals {
		  middlename
		  username
		  picture
		  password
		}
		lastSeenOnline
	  }			
	}`;	


export const GET_LOGS = gql`
	query getLogs ($ownerId: String, $currentDate: String){
	  getLogs(ownerId: $ownerId, currentDate: $currentDate) {
		ownerId
		currentDate
		pages {		
		  id
		  links
		  linkName
		  getInOn
		  getOutOn
		}
	  }
	}
	`;
								
	
export const GET_COURSES_TEACHERS = gql`
	query getCourseByTeachers($promotionId : String!){
	  getCourseByTeachers(promotionId: $promotionId) {
		_id
		lastUpdate
		teacherId {
		  _id
		  avatar
		  personals {
			username
			middlename
			firstname
			picture
		  }
		  lastSeenOnline
		  certificats
		}
		name
	  }
	}
	`;

	
export const GET_PROMOTION_BY_SCHOOL = gql`
			query getPromotionBySchool($schoolId : String,$pupilId : String,$promotionId : String){
			  getPromotionBySchool(schoolId: $schoolId) {
				_id
				createAt 
				lastUpdate 
				schoolId 
				promotionName 
			  }
			  getBills ( pupilId : $pupilId, promotionId : $promotionId ){
				destinator
				emittor
				payer {
				  _id
				  personals{
					username
					middlename
				  }
				}
				date
				cost
				promotionId
			  }
			}
			`;	
			
export const GET_COURSE_FULL = gql`
	query getCoreCourses ($courseId: String, $ownerId: String){
	  getCoreCourses(courseId: $courseId ,ownerId : $ownerId){
			_id
			createdDate
			lastUpdate
			promotionId
			name
			summary
			teacherId {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			approvedBy {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			sections {
			  sectionId
			  tittle
			  paragraphs {
				type
				content
			  }
			}
			ponderation
			likers
			dislikers
		  }
	}
`;

export const GET_BOOKSTORES = gql`
query ($promotionId: String!, $id: String){
	users (id: $id) {
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
  libraries(promotionId: $promotionId){
	  _id
	books {
	  picture
	  tittle
	  subTittle
	  author 
	  editor
	  filename
	  publishDay
	}
  }
}`;	
export const GET_COURSES = gql`
	query getCourses ($promotionId: String,$courseId: String) {
	  getCourses (promotionId: $promotionId){
		_id
		createdDate
		lastUpdate
		promotionId
		name
		summary
		ponderation
	  }
	  getCoreCourses(courseId: $courseId){
		_id
		createdDate
		lastUpdate
		promotionId
		name
		summary
		ponderation
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

export const GET_CORRECTED = gql`
	query getMyCorrected ($ownerId: String,$promotionId : String ){
	  getMyCorrected(ownerId: $ownerId, promotionId : $promotionId ) {
		_id
		header
		fields
		promotionId
		courseId {
		  _id
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
		starttime
		endtime
		duration
		done
		questionList {
		  questId
		  text
		  type
		  GAV
		  correctAnswer
		}
	  }
	}
`;
						
						
export const GET_USER = gql`
  query users($id: String){
	users (id: $id){
		_id
		avatar
		isId
		isConnected
		personals {
		  firstname
		  middlename
		  username
		  picture
		  password
		}
		lastSeenOnline 
		library
		schoolBelongToOwner
	  }
	}
`;

export const GET_ASSESS = gql`
	query getAssess ($ownerId : String){
	  getAssess (ownerId : $ownerId){
		_id
		Id
		header
		fields
		promotionId
		teacherId {
		  personals {
			username
			middlename
			firstname
		  }
		}
		description
		startDay
		endDay
		done
		duration
		questionList {
		  questId
		  text
		  GAV
		  assertions {
			text
			answerId
		  }
		}
	  }
	}
	`;
	
export const GET_SUGGESTED_COURSES = gql`
		query {
		   getSuggestedCourse {
			 _id
			 createdDate
			 lastUpdate
			 name
			 summary
			teacherId {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			approvedBy {
			  _id
			  personals {
				username
				middlename
				firstname
			  }
			}
			likers
			dislikers
		   }
		}`;	
		

export const GET_POSTS = gql`query ($id : String, $ownerId : String, $startCursor : String, $endCursor : String){
			  users (id: $id){
				_id
				isId
				avatar
				isConnected
				personals {
				  firstname
				  middlename
				  username
				  picture
				  password
				}
				lastSeenOnline
				tutors{
					_id
				  avatar
				  isConnected
				  personals {
					username
					middlename
					firstname
					password
					picture
				  }
				  lastSeenOnline
				}
				kids{
					_id
				  avatar
				  isConnected
				  personals {
					username
					middlename
					firstname
					password
					picture
				  }
				  lastSeenOnline
				}
				friends {
				  _id
				  avatar
				  isConnected
				  personals {
					username
					middlename
					firstname
					password
					picture
				  }
				  lastSeenOnline
				} 
				library
				bookmarked
				schoolBelongToOwner
			  }
			   getPosts(ownerId: $ownerId, startCursor: $startCursor, endCursor: $endCursor) {
				pageInfoPost {
				  hasPreviousCursor
				  hasNextCursor
				  startCursor
				  endCursor
				}
				posts {
				  _id
				  ownerId 
				  Picture
				  filename
				  descriptor
				  publicAt
				  totalLike
				  totalComments
				  sharebility
				  certifiedBy
				  likes
				}
			  }
			}`;
			
export const GET_MESSAGES = gql`
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


export const GET_PROFIL = gql`
	query ($promotionIdTab: [String]){
	  getPromotionsTab(promotionIdTab: $promotionIdTab) {
		_id
		schoolId
		promotionName
		promotionLevel
		scheduleId
	  }
	}
	`;
	
export const GET_MY_CLOSERS_FRIENDS = gql`
	query getFriendsNoCertificats ($certificatId : String) {
	  getFriendsNoCertificats(certificatId: $certificatId) {
		_id
		personals {
		  username
		  middlename
		  firstname
		}
	  }
	}`;
	
	
export const GET_CERTIFICAT = gql`
	query ($certificatId: String){
	  getCertificat(id: $certificatId) {
		owner {
		  _id
		  personals {
			username
			middlename
			firstname
		  }
		}
		emitter
		courses {
		  courseName
		  courseId
		  notes {
			idAssess
			cote
			topic
			date
		  }
		  lastupdate
		  ponderation
		}
		year
		viewer {
		  _id
		  personals {
			username
			middlename
			firstname
			picture
		  }
		  lastSeenOnline
		}
	  }
	}`;	
	
export const GET_MESSAGES_TWO = gql`
	query messagesQL{
	  messagesQL{
		id
		content
	  }
	}`;	

export const GET_MY_CERTIFICAT = gql`
	query getMyCertificats($ownerId: String){
	  getMyCertificats (ownerId : $ownerId){
		_id
		year
	  }
	}`;	
	
export const MY_QL = gql`
	query messagesQL{
	  messagesQL{
		id
		content
	  }
	}`;	
	
export const GET_SUGGESTED = gql`
	query($id:String, $endCursor :String, $startCursor:String){
	  suggestionsFriends(endCursor: $endCursor, startCursor: $startCursor, id: $id) {
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
export const GET_NOTIFICATIONS = gql`
	query getNotification ($id : String!){
	  getNotification(id: $id) {
		owner
		notifications {
		  NotifId
		  owner
		  user {
			personals{
			  firstname
			  username
			  middlename
			}
			avatar
		  }
		  mutualFriends
		  message
		  time
		  status
		  answer
		}
	  }
	}`;	
	
export const GET_SCHOOL = gql`
	query getSchool {
	  getSchool{
		_id
		fonder
		name
		logo
		address {
		  country
		  state
		  town
		  township
		  street
		  number
		  reference
		}
		location {
		  latitude
		  longitude
		  altitude
		}
		promotions {
		  _id
		  promotionName
		  promotionLevel
		}
	  }
	}
`;

export const GET_SCHOOL_ONE = gql`
	query getSchoolOne ($fonder: String, $schoolId : String){
	  getPromotionBySchool(schoolId: $schoolId ) {
		_id
		createAt
		lastUpdate
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
			gender
		  }
		}
		courses {
		  _id
		}
	  }
	  getSchoolOne(fonder: $fonder){
		_id
		fonder
		name
		logo
		contact {
		  phone
		  email
		}
		address {
		  country
		  state
		  town
		  township
		  street
		  number
		  reference
		}
		location {
		  latitude
		  longitude
		  altitude
		}
		promotions {
		  _id
		  promotionName
		  promotionLevel
		}
	  }
	}
`;
export const GET_USER_CV = gql`
	query users ($id: String!){
	  users(id: $id) {
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
	`;
	
	
	
export const GET_COURSE = gql`
	query getCourses ($promotionId: String){
	  getCourses(promotionId: $promotionId) {
		_id
		tittle
		createdDate
		lastUpdate
		teacherId {
		  _id
		  personals {
			username
			middlename
			firstname
		  }
		}
		approvedBy {
		  _id
		  personals {
			username
			middlename
			firstname
		  }
		}
		promotionId
	  }
	}
`;
	
	
export const GET_MY_CORRECTED = gql`
	query getCorrectedAssess ($assessId: String, $ownerId: String){
	  getCorrectedAssess(assessId: $assessId, ownerId: $ownerId) {
		_id
		Id
		header
		fields
		promotionId
		courseId {
		  _id
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
		questionList {
		  questId
		  text
		  type
		  GAV
		  correctAnswer
		  answer
		  assertions {
			text
			answerId
		  }
		}
	  }
	}
		`;