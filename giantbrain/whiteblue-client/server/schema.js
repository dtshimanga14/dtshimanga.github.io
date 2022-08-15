
import {gql} from 'apollo-server-express';


export const typeDefs2 = gql`
  type Query {
    messages: [Message!]!
  }

  type Subscription {
    messageCreated: Message
  }

  type Message {
    id: String
    content: String
  }
`;

export const typeDefs = [`
	type File{
		filename : String!
		mimetype : String!
		encoding : String!
	}
	type Messages {
		id: String
		content: String
	  }
	 type PageInfo{
		 hasPreviousCursor : Boolean
		 hasNextCursor : Boolean
		 startCursor : String
		 endCursor : String
	 }
     type Post {
        _id: String
        idPost: Int
        ownerId: String
        publicAt: String
        Picture: String
        totalComments: Int
        totalLike: Int
        comments: [Comment]
		sharebility : Boolean
		certifiedBy : String
		likes : [String]
      }
	  type ConnectionUser {
		pageInfoUsers : PageInfo
		suggestions : [User]
	  }
	  type ConnectionPost {
		pageInfoPost : PageInfo
		posts : [Post]
	  }
      type Comment {
        ownerId: String
        text: String
        when: String
		id : String
      }
	  type Message {
        digitalSign: String
        text: String
        when: String
		id : String
      }
	  type Chat {
        _id: String
        firstOwner: String
        secondOwner: String
		messages :[Message]
      }
	  
	 type Personal {
        username : String
        middlename : String
        firstname : String
        password : String
        picture : String
		birthday : String
		gender : String
		maritalStatus : String
		Email : String
		nationality : String
		phoneNumber : String
		country : String
		town : String
		quarter : String
		street : String
		number : String
		picture : String
		description : String
      }
	  type Geolocation{
			latitude : Int
			altitude : Int
			longitude : Int
	  } 
	  type School{
		isIdSchool : Int
		name : String
		geolocation : Geolocation
		logo : String
	  }
	  type PromotionEx{
		isIdPromotion : Int
		idSchool : School
		level : String
		option : String
		orientation : String
		yearStarted : String
		yearEnded : String
	  }
	  type Bill{
		  emittor : String
		  destinator : String
		  payer : String
		  sum : Int
		  date : String
	  }
	  type Pupil{
			pupilId : String
			bills : [Bill]
			promotionId : String
		}
	  type Teacher{
			teacherId : String
			locateCourseDate : String
			courseName : String
			courseId : String
		}
		type PupilRequester {
			ownerId : User 
			submitdate : String
			status : String
		}
		type Requesters{
			_id : String 
			promotionId : String
			requesters : [PupilRequester]
		}
	   type Promotion{
        _id: String
		createAt : String
		lastUpdate : String
		schoolId : String
		promotionName : String
		promotionLevel : String
		scheduleId : String
		pupils : [User]
		courses : [User]
	  }
	  type PromotionBrief{
        promotionId: String
	  }
		type Book{
			  picture : String
			  tittle : String
			  subTittle : String
			  author : String
			  editor : String
			  path : String
			  publishDay : String
		  }
	 type Bookstore{
		 _id : String
		 isIdBookstore : Int
		 isIdSchool : School
		 isIdPromotion : PromotionEx
		 promotionId : String
		 books : [Book]
	 }
	 type PromotionInfo{
      promotionId : Int
      unversityId : Int
    }
	type Courses{
		tittle : String
		courseId : Int
		ownerId : Int
	  }
	type Days{
      hour : String
      day : String
	  courses : [Courses]
    }
	type Schedule {
		promotionInfo : PromotionInfo
		days : [Days]
	 }
	 type BookMarked{
		picture : String
		tittle : String
		subTittle : String
		author : String
		editor : String
		path : String
		publishDay : String
		BookMarkDay : String
		id : String
	 }
	 type Study{
		 from : String
	     at : String
		 duration : String
		 reference : String
	 }
	 type Promo{
      promotionId : String
      subscribeDate : String
    }
	type Child{
		names : String
		userId : String
		certificatId : String
	}
	type Notification {
		 NotifId : String
		 owner : String
		 time : String
		 status : String
		 message : String
		 answer :String
	}
	type notificationsTempl{
		owner : String
		notifications : [Notification]
		
	}
     type User {
        _id: String
        isId: String
        personals : Personal
        accountType : String
		posts : [Post]
		isConnected : Boolean
		tutors : [Child]
        children : [User]
		memberOf : [PromotionEx]
        friends:  [User]
		bookstore : [Bookstore]
        askRelationship: [User]
        lastSeenOnline : String
		library : [String]
		classes : [Study]
		fields :[String]
		articles : [String]
		pupils : [Child]
		schedules : [String]
		certificats : [String]
		performance : Int
		books : [BookMarked]
		promotions :[Promo]
		parentship : [User]
		bookmarked : [String]
		kids : [String]
      }
	  type Notification {
		 NotifId : String
		 owner : String
		 time : String
		 status : String
		 message : String
		 answer :String
	}
	type notificationsTempl{
		owner : String
		notifications : [Notification]
		
	}
	  type Contact{
			phone : String
			email : String
		}
		type Location{
			latitude : Int
			longitude : Int
			altitude : Int
		}
		type Course{
					id : String
					name : String
					teacher : String
					assistant : String
				}
		type Classe{
				id : String
				courseScheduleId : String
				courses : [Course],
				previousPromotion : String
				nextPromotion : String
				books : String
				year : String
			}
		type Address{
			country : String
			state : String
			town : String
			township : String
			street : String
			number : String
			reference : String
		}
	  type Institut{
		_id : String
		fonder : String
		name : String
		logo : String
		address : [Address]
		contact : [Contact]
		location : [Location]
		promotions : [Promotion]
		libraries :[Bookstore]
	}
		type Certificat{
			owner:  User
			emitter : String
			year : String
			courses : [Course]
			viewer : [User]
		}
		type CertificatShrink{
			reduceNote : Int
		}
		type Note{
			idAssess: String
			cote: String
			topic : String
			date : String
		}
		type Course{
			courseName : String
			courseId : String
			notes : [Note]
			lastupdate : String
			ponderation : String
		}
	  input SetMessageInput{
		  firstOwner : String
		  secondOwner : String
		  digitalSign: String
		  text: String
	  }
	  input SetUserInput{
		  username : String
		  password : String
		  middlename : String
		  firstname : String
		  accountType : String
		  genre : String
	  }
	  type MessageSUB {
		id: String
		content: String
	  }
	  type Assertion{
		text : String
		answerId : String
	  }
	  type Question {
			questId : String
			text : String
			type : String
			GAV : Int
			assertions : [Assertion]
			correctAnswer : String
		}
	  input SetQuestionInput {
			questId : String
			text : String
			type : String
			GAV : Int
		}
	  input SetAssessmentInput {
		header : String
		fields : String
		promotionId : String
		courseId : String
		teacherId : String
		description : String
		startDay : String
		endDay : String
		duration : Int
	  }
	  type Assessment {
		_id : String
		Id : String
		header : String
		fields : String
		promotionId : String
		courseId : CoreCourses
		teacherId : User
		description : String
		startDay : String
		endDay : String
		duration : Int
		done : Boolean
		questionList : [Question]
		corrected : Boolean
		count : Int
	  }
	  type Corrected{
		  questId : String
		  text : String
		  type : String
		  GAV : Int
		  assertions : [Assertion]
		  correctAnswer : String
		  answer : String
	  }
	  type AssessmentCorrected {
		_id : String
		Id : String
		header : String
		fields : String
		promotionId : String
		courseId : CoreCourses
		teacherId : User
		description : String
		startDay : String
		endDay : String
		duration : Int
		done : Boolean
		questionList : [Corrected]
		starttime : String
		endtime : String
		cote : Int
	  }
	  type Corrector{
		  answerIdSubmit : String
		  questIdResponded : String
		  submitedtime : String
	  }
	  type Responders{
		_id : String
		starttime : String
		endtime : String
		ownerId : String
		assessId : String
		answersCorrect :[Corrector]
	  }
	  type Session{
		  courseId : String
		  courseName : String
		  startingtime : String
		  endingtime : String
		  dayOfWeek : String
		  startDay : String
		  endingDay : String
	  }
	  type Scheduler {
		  promotionId : String
		  sessions : [Session]
	  }
	  type InlineStyleRange {
	  offset: Int
	  length: Int
	  style: String
	}
	input InlineStyleRangeInput {
	  offset: Int
	  length: Int
	  style: String
	}
	type EntityRange {
	  offset: Int
	  length: Int
	  key: Int
	}
	input EntityRangeInput {
	  offset: Int
	  length: Int
	  key: Int
	}
	type Data {
	  id: String
	}
	input DataInput {
	  id: String
	}
	type Block {
	  key: String
	  text: String
	  type: String
	  depth: Int
	  inlineStyleRanges: [InlineStyleRange]
	  entityRanges: [EntityRange]
	  data: Data
	}
	input BlockInput {
	  key: String
	  text: String
	  type: String
	  depth: Int
	  inlineStyleRanges: [InlineStyleRangeInput]
	  entityRanges: [EntityRangeInput]
	  data: DataInput
	}
	type LinkData {
	  type: String
	  href: String
	  target: String
	}
	type EmbedData {
	  type: String
	  url: String
	  html: String
	}
	union EntityData = LinkData | EmbedData
	input EntityDataInput {
	  type: String!
	  url: String
	  html: String
	  href: String
	  target: String
	}
	enum EntityType {
	  LINK
	  TOKEN
	  PHOTO
	  IMAGE
	  EMBED
	}
	enum EntityMutability {
	  MUTABLE
	  IMMUTABLE
	  SEGMENTED
	}
	type Entity {
	  type: EntityType
	  mutability: EntityMutability
	  data: EntityData
	}
	input EntityInput {
	  type: EntityType
	  mutability: EntityMutability
	  data: EntityDataInput
	}
	input ContentStateInput {
	  blocks: [BlockInput]
	  entityMap: [EntityInput]
	}
	type ContentState {
	  blocks: [Block]
	  entityMap: [Entity]
	}
	type AutoCertificat {
		_id : String    
		name : String 
		ponderation : Int
		assess : [String]
	}
	type Paragraph {
		type :String
		content : String
	}
	type Sections {	
		sectionId : String
		tittle : String
		paragraphs : [Paragraph]
	}
	type CoreCourses{ 
		_id : String  
		createdDate : String  
		lastUpdate : String  
		teacherId : User  
		approvedBy : [User] 
		promotionId : String  
		name : String
		summary : String
		ponderation : Int
		sections : [Sections]
		likers : [String]
		dislikers : [String]
	}
	type CourseTwo {
			header : String
			fields : String
			description : String
			authors : String
			approvor : String
			section : [Sections]
		}
	input SetInstitutInput{
		username : String
		firstname : String
		middlename : String
		password : String
		email : String
		schoolName : String
		country : String
		StateCountry : String
		town : String
		township : String
		street : String
		number : String
		reference : String
		latitude : Int
		longitude : Int 
		altitude : Int
	}
	type Page{
		id : String
		links : String
		linkName : String
		getInOn : String
		getOutOn : String
	}
	type Logs{
		ownerId : String
		currentDate : String
		pages : [Page]
	}
	type Query {
		messages: [Messages!]!
		getLogs( ownerId : String,currentDate : String ) : Logs
		getScheduler (promotionId: String,creator: String,currentDate : String): Scheduler
		getOnesBills ( pupilId : String, promotionId : String ) : Pupil
		getArticlesBookMarked(bookRefs : [String]) : [CoreCourses]
		getSuggestedCourse : [CoreCourses]
		newGetCourses (id: String ) : ContentState
		getAssess (ownerId : String ): [Assessment]
		getMyCorrected (ownerId : String,promotionId : String  ): [AssessmentCorrected]
		getAnAssess(id : String) : Assessment
		getCorrectedAssess(assessId : String, ownerId : String) : AssessmentCorrected
		gallSchool :[Institut]
		gallNotification : [notificationsTempl]
		getNotification (id : String) : notificationsTempl
        getRequesters (promotionId : String): Requesters
        posts (index : String,limit : Int): ConnectionPost
        suggestionsFriends (next : String,previous: String,id : String): ConnectionUser
        chats (firstOwner: String, secondOwner: String): Chat
		users (id : String): User
		friends (friendsTab : [String]) : [User]
		suggestions (friendsTab : [String]) : [User]
		schedules (id : Int): Schedule
		libraries (promotionId: String): [Bookstore]
		schools(id : String) : Institut
		getCertificat (id: String ) : Certificat
		getCertificatShrink (id: String ) : Int
		getCourses (promotionId : String ) : [CoreCourses]
		getCoreCourses (courseId : String,ownerId : String ) : CoreCourses
		getCoreCoursesForTeacher (teacherId: String="",promotionId: String) : [CoreCourses]
		getTeachers  (promotionId: String ): Promotion
		getPromotions (promotionId: String ) : Promotion
		getPromotionsTab (promotionIdTab: [String]): [Promotion]
		pupils : [User]
	    generateCertificat (id: String,promotionId: String ) : Certificat,
		getSchool : [Institut]
		onCorrectRespondersToQuestion (ownerId : String,assessId : String) : Int
		onRespondersTest (assessId : String ) : [Responders]
		onGetAssessToCorrect (promotionId : String, teacherId : String ) : [Assessment]
      }
	 type Mutation{
		onLogLeavePage (ownerId : String,currentLink : String,currentDate : String): Logs
		onLog (id : String,ownerId : String,links : String,linkName : String,currentDate : String) : Logs 
		onCreateLog (ownerId : String,currentDate : String) : Logs 
		onAddSessionToScheduler (promotionId: String,creator: String, 
					courseId: String, 
					startingtime: String, endingtime: String, 
					dayOfWeek: String, endingdate: String, startingdate: String, ) : Scheduler
		 onCreateScheduler ( promotionId : String, creator : String) : Scheduler
		 onBulkCorrection (assessId : String) : Assessment
		 addCourseBookMarkers (userId:String,courseId:String): User
		 onOpenAssessment (ownerId : String,assessId : String) : Responders
		 onSubmitAnswersToQuestions (ownerId : String,assessId : String,questId : String,answerId : String) : Responders
		 addCourseLikers (userId:String,courseId:String): Boolean
		 addCourseDislikers (userId:String,courseId:String): Boolean
		 addParagraphToSection (id:String,sectionId:String,type:String,content:String): CoreCourses
		 addSectionToCourse(id : String,sectionId :String,tittle : String) : CoreCourses
		 addAssertionToQuestion (assessId : String,questId : String,text : String,answerId: String) : Assessment
		 addQuestionToAssess (text : String,type : Boolean,assessId : String,questId : String,GAV : Int) : Assessment 
		 addCorrectAnswerToQuestion (assessId : String,questId : String,answerId : String) : Assessment
		 addAssess (Id : String, header : String,fields : String,promotionId : String,courseId : String,teacherId : String,description : String,startDay : String,endDay : String,duration : Int) : [Assessment]
		 acceptFriendShip (answerer: String,asker: String,NotifId: String): notificationsTempl
		 friendshipQuery (asker: String,answerer: String): ConnectionUser
		 addNotify(sender:String!,receiver:String!): Boolean
		 submitRequestersToSchool (promotionId: String!,userId: String!) : Requesters
		 logout (token : String ): Boolean
		 login (username : String!,password : String! ): User
		 addInstitut(input : SetInstitutInput!) : Institut
		 subscribeSchool (CertificatId: String, courseIdNote: String,cote : Int,topic : String) : Institut
		 addCertificatNote (CertificatId: String, courseIdNote: String,cote : Int,topic : String) : Certificat
		 unSubscribePupilToPromotion (pupilId: String,promotionId: String ) : Promotion
		 addCoursesForTeacherToPrmotion (teacherId: String,promotionId: String,name : String,ponderation : Int=1) : [CoreCourses]
		 removeCoursesForTeacherToPrmotion (id: String, promotionId: String,) : [CoreCourses]
		 addChats(firstOwner: String!, secondOwner: String!,digitalSign: String!,text: String!) : Chat
		 addAddressToSchool(country : String,state : String,town : String,township : String,street : String,number : String,reference : String) : Institut
		 addClasseToSchool(courseScheduleId : String!, previousPromotion : String,nextPromotion : String,books : String,year : String) : Institut
		 addUser(input : SetUserInput!) : [User]
		 addKid(parentId: String, username: String, 
			middlename : String, firstname : String, password : String, 
			genre : String, accountType : String) : [User]
		 posts (ownerId : String!,pathImage : String!) : [Post]
		 addCommentsPost (idPost: String!, idUser: String!, commentText: String!) : Post
		 mutateSharebilityPost( idPost : String!,sharebility:Boolean!):Post
		 addLikePost(idPost : String!,userId : String!):Post
		 addDislikePost(idPost : String!,userId : String!):Post
		 addLibrary (userId : String!,libraryId : String!) : User
		 addFriendsToUser(userId : String!,friendId : String!) : ConnectionUser
		 addFieldsToUser(userId : String!,fieldId : String!) : User
		 addCertificatsToUser(userId : String!,certificatId : String!) : User
		 addsSchedulesToUser(userId : String!,scheduleId : String!) : User
		 addClassesToUser(userId : String!,ClasseId : String!) : User
		 addArticlesToUser(userId : String!,ArticleId : String!) : User
		 addPupilToPromotion(pupilId : String,promotionId : String) : Promotion
		 addPromotionToSchool(schoolId : String,promotionName : String,promotionLevel : String,scheduleId : String,orientationName : String) : Promotion
		 addTeacherToPromotion(teacherId : String!,promotionId : String!) : Promotion
		 addBookMarkedToUser(userId : String!,picture : String!,tittle : String!, subTittle : String!,author : String!,editor : String!,path : String!,publishDay : String!) : User
		 deleteBookMarkedToUser(userId : String!,bookId : String!) : User
	 }
	 type Subscription{
		getNewsMessage(input : SetMessageInput!) : Chat
		messageCreated: Messages
	 }
      schema {
        query: Query
		mutation : Mutation
		subscription : Subscription
      }
    `];