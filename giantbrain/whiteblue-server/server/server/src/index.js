import express from 'express';
import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { PubSub } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';
import { mongodb,MongoClient, ObjectId} from 'mongodb';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { userShape,chatShape,postShape,promotionShape,assessmentShape,Paragraph,History,
		schoolShape,certificatShape,cvShape,courseShape,courseShapeTwo,sectionCourse,
		notificationMessage,notifiTempl,v_requester,scheduler,sessionQL,dateQL} from "./userShape";
   
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const http = require("http");
const fs = require("fs");
const url = require("url");
const formidable = require('formidable');
	
const MONGO_URL = 'mongodb://localhost:27017/whiteblue';
const MESSAGE_CREATED = 'MESSAGE_CREATED';
const CHAT_STREAM = 'CHAT_STREAM';
const COURSE_LIKER = 'COURSE_LIKER';

const pubsub = new PubSub();
const files = [];
const prepare = (o) => {
    o._id = o._id.toString()
    return o
};
const toObjectId = (_id) => {
    return  ObjectId(_id)
};


	const app = express();
	// Middlewares
	
	// DB
	const mongoURI = 'mongodb://localhost:27017/whiteblue';

	

	// Middlewares 
	/* app.use(express.json());
	app.set("view engine", "ejs"); */


	// connection
	const conn = mongoose.createConnection(mongoURI, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
	});

	// init gfs
	let gfs;
	conn.once("open", () => {
	  // init stream
	  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads"
	  });
	});

	// Storage
	const storage = new GridFsStorage({
	  url: mongoURI,
	  file: (req, file) => {
		return new Promise((resolve, reject) => {
		  crypto.randomBytes(16, (err, buf) => {
			if (err) {
			  return reject(err);
			}
			const filename = buf.toString("hex") + path.extname(file.originalname);
			const fileInfo = {
			  filename: filename,
			  bucketName: "uploads"
			};
			resolve(fileInfo);
		  });
		});
	  }
	});

	const upload = multer({
	  storage
	});

	// get / page
	/*  app.get("/", (req, res) => {
	  if(!gfs) {
		console.log("some error occured, check connection to db");
		res.send("some error occured, check connection to db");
		process.exit(0);
	  }
	  gfs.find().toArray((err, files) => {
		// check if files
		if (!files || files.length === 0) {
		  return res.render("index", {
			files: false
		  });
		} else {
		  const f = files
			.map(file => {
			  if (
				file.contentType === "image/png" ||
				file.contentType === "image/jpeg"
			  ) {
				file.isImage = true;
			  } else {
				file.isImage = false;
			  }
			  return file;
			})
			.sort((a, b) => {
			  return (
				new Date(b["uploadDate"]).getTime() -
				new Date(a["uploadDate"]).getTime()
			  );
			});

		 return res.render("index", {
			files: f
		  });
		}

		// return res.json(files);
	  });
	}); */

	app.post("/upload", upload.single("file"), (req, res) => {
	  console.log("File was uploaded.");
	  res.json({file : req.file})
	});

	app.get("/files", (req, res) => {
	  gfs.find().toArray((err, files) => {
		// check if files
		if (!files || files.length === 0) {
		  return res.status(404).json({
			err: "no files exist"
		  });
		}

		return res.json(files);
	  });
	});

	app.get("/files/:filename", (req, res) => {
	  gfs.find(
		{
		  filename: req.params.filename
		},
		(err, file) => {
		  if (!file) {
			return res.status(404).json({
			  err: "no files exist"
			});
		  }

		  return res.json(file);
		}
	  );
	});

	app.get("/image/:filename", (req, res) => {
	  const file = gfs
		.find({
		  filename: req.params.filename
		})
		.toArray((err, files) => {
		  if (!files || files.length === 0) {
			return res.status(404).json({
			  err: "no files exist"
			});
		  }
		  gfs.openDownloadStreamByName(req.params.filename).pipe(res);
		});
	});

	// files/del/:id
	// Delete chunks from the db
	app.post("/files/del/:id", (req, res) => {
	  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
		if (err) return res.status(404).json({ err: err.message });
		res.redirect("/");
	  });
	});

const typeDefs = gql`
	type Uploaded{
        length : Int
        chunkSize : Int
        uploadDate : String
        md5 : String
        filename : String
        contentType : String
	}
 type File {
	_id : ID!
	path : String!
    filename: String!
    mimetype: String!
    encoding: String!
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
		filename : String
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
		  payer : User
		  promotionId : String
		  devise : String
		  cost : Int
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
	type Page{
		id : String
		links : String
		linkName : String
		getInOn : String
		getOutOn : String
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
  type Session{
	  courseId : String
	  courseName : String
	  startingtime : String
	  endingtime : String
	  dayOfWeek : String
	  startDay : String
	  endingDay : String
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
			_id : String
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
	  }
	  type MessageSUB {
		id: String
		content: String
	  }
	  type Assertion{
		text : String
		answerId : String
	  }
  type Scheduler {
	  promotionId : String
	  sessions : [Session]
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
	type Logs{
		ownerId : String
		currentDate : String
		pages : [Page]
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
   type Book{
	  picture : String
	  tittle : String
	  subTittle : String
	  author : String
	  editor : String
	  path : String
	  publishDay : String
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
		
      }
  type Messages {
    id: String
    content: String
  }
	type Query {
		getOnePost ( filename : String ) : Post
		getUploaded : [Uploaded]
		files : [String]
		uploads: [File]
		messages: [Message]
		getLogs( ownerId : String,currentDate : String ) : Logs
		getScheduler (promotionId: String,creator: String,currentDate : String): Scheduler
		getOnesBills ( pupilId : String, promotionId : String ) : Pupil
		getBills ( pupilId : String, promotionId : String ) : [Bill]
		getArticlesBookMarked(bookRefs : [String]) : [CoreCourses]
		getSuggestedCourse : [CoreCourses]
		getAssess (ownerId : String ): [Assessment]
		getMyCorrected (ownerId : String,promotionId : String  ): [AssessmentCorrected]
		getAnAssess(assessId : String) : Assessment
		getCorrectedAssess(assessId : String, ownerId : String) : AssessmentCorrected
		gallSchool :[Institut]
		gallNotification : [notificationsTempl]
		getNotification (id : String) : notificationsTempl
        getRequesters (promotionId : String): Requesters
        posts (index : String,limit : Int): ConnectionPost
        suggestionsFriends (endCursor : String="",startCursor: String="",id : String): ConnectionUser
        chats (firstOwner: String, secondOwner: String): Chat
		users (id : String): User
		friends (friendsTab : [String]) : [User]
		suggestions (friendsTab : [String]) : [User]
		schedules (id : Int): Schedule
		libraries (promotionId: String): [Bookstore]
		schools(id : String) : Institut
		getCertificat (id: String ) : Certificat
		getMyCertificats (ownerId: String): [Certificat]
		getCertificatShrink (id: String ) : Int
		getCourses (promotionId : String ) : [CoreCourses]
		getCoreCourses (courseId : String,ownerId : String ) : CoreCourses
		getCoreCoursesForTeacher (teacherId: String="",promotionId: String) : [CoreCourses]
		getCourseByTeachers (promotionId: String) : [CoreCourses]
		getTeachers  (promotionId: String ): Promotion
		getPromotions (promotionId: String ) : Promotion
		getPromotionBySchool (schoolId: String ): [Promotion]
		getPromotionsTab (promotionIdTab: [String]): [Promotion]
		pupils : [User]
		getCurrentPromotionTeachers (promotionId: String ) : [User]
	    generateCertificat (id: String,promotionId: String ) : Certificat,
		getSchool : [Institut]
		onCorrectRespondersToQuestion (ownerId : String,assessId : String) : Int
		onRespondersTest (assessId : String ) : [Responders]
		onGetAssessToCorrect (promotionId : String, teacherId : String ) : [Assessment]
		getFriendsNoCertificats (certificatId: String ) : [User]
      }
	  type Mutation{
		onPayBills (emittor : String, destinator : String,payer : String,cost : Int, promotionId : String,devise : String) : [Bill]
		plugToCertificatUsers (certificatId: String, userId : String ) : [User]
		uploadFile(file: Upload!): String
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
  type Subscription {
    messageCreated: Messages
	courseLikers : Boolean
    messages  : Message
  }
`;

const start = async () => {
	try {
		const db = await MongoClient.connect(MONGO_URL);
		const Posts = db.collection('posts');
		const Chats = db.collection('chats');
		const Users = db.collection('users');
		const Promotion = db.collection('promotion');
		const Bookstores = db.collection('bookstores');
		const Schools = db.collection('schools');
		const Schedule = db.collection('schedule');
		const Certificat = db.collection('certificats');
		const Course = db.collection('courses');
		const Requester = db.collection('requesters');
		const Notification = db.collection('notifications');
		const Responder = db.collection('responders');
		const Assessments = db.collection('assessments');
		const Histories = db.collection('histories');
		const Test = db.collection('test');
		const Bill = db.collection('bills');
		const Photo = db.collection('photos');
		
		
		const resolvers = {
			Query: {
			  getOnePost : async (root,{filename}) => {
					return (await Posts.findOne({ filename }));
			  },
			  getUploaded : async () => {
					return await gfs.find().toArray();
			  },
			  messages: () => [
				  { digitalSign : "5dd83eddb770581478f9b277",
					text : "5dd137d95390a5064468978f" ,
					 when : new Date(),id : 1 },
				  { digitalSign : "5dd83eddb770581478f9b277",
					text : "5dd137d95390a5064468978f" ,
					 when : new Date(),id : 2 }
				],
				files : () => files 
				,
				posts: async (root, { index ,limit }) => {
					let postsdata = (await Posts.find({}).toArray()).map(prepare);
					let searchCurrentPosition = postsdata.findIndex((post) => (post._id === index));
					let newPostsData = postsdata.slice(searchCurrentPosition+1,searchCurrentPosition+limit);
					
				  return {
					  pageInfoPost : {
						  hasPreviousCursor : false,
						  hasNextCursor : true,
						  startCursor : newPostsData[0]._id,
						  endCursor : newPostsData[newPostsData.length-1]._id,
					  },
					  posts : newPostsData,
				  }
				},
				chats: async (root, { firstOwner,secondOwner }) => {
					
				  return (await Chats.findOne({ firstOwner : firstOwner,secondOwner : secondOwner}))
				},
				users: async (root, {id}) => {
					let oneUser = (await Users.find({_id : ObjectId(id)}).toArray()).map(prepare);
					let newFriends = (await Users.find({ _id : { $in : oneUser[0].friends.map(toObjectId)||[] }}).toArray()).map(prepare);
					return Object.assign({},oneUser[0],{
						friends : newFriends
					});
				},
				gallSchool :async (root, { id }) => {
				  return (await Schools.find({}).toArray()).map(prepare);
				},
				gallNotification:async (root, { id }) => {
				  return (await Notification.find({}).toArray()).map(prepare);
				},
				getAssess : async (root, { ownerId }) => {
					let userAssessment = (await Assessments.find({ }).toArray()).map(prepare);
				  return userAssessment.map(async (assess)=>{
						let searchResponder = (await Responder.findOne({ ownerId : ownerId, assessId : assess._id }));
						let done = searchResponder ? true : false;
					  return Object.assign({},assess,{ 
									done,
									teacherId : Users.findOne({_id : ObjectId(assess.teacherId)})
								});
				  });
				},
				getMyCorrected : async (root, { ownerId,promotionId }) => {
					let userAssessment = (await Assessments.find({ corrected : true, promotionId }).toArray()).map(prepare);
				  return userAssessment.map(async (assess)=>{
						let searchResponder = (await Responder.findOne({ ownerId : ownerId, assessId : assess._id }));
						let  starttime = searchResponder ? searchResponder.starttime : "";
						let endtime = searchResponder ? searchResponder.endtime : "";
						let done = searchResponder ? true : false;
						let cote =  searchResponder ? searchResponder.cote : 0;
						let course = await Course.findOne({ _id : ObjectId(assess.courseId) });
						let teacher = await Users.findOne({ _id : ObjectId(assess.teacherId) });
						let newTeacher = Object.assign({},teacher,{ _id : assess.teacherId });
						let newCourse = Object.assign({},course,{ _id : assess.courseId });
					  return Object.assign({},assess,{ courseId : newCourse ,
													done ,starttime,endtime , cote,
													teacherId : newTeacher });
				  });
				},
				getNotification :async (root, { id }) => {
				  return (await Notification.findOne({ owner : id}))
				},
				suggestionsFriends : async (root, { endCursor ,startCursor,id }) => {
					let oneUser = (await Users.find({_id : ObjectId(id)}).toArray()).map(prepare);
					let friendsUser = oneUser[0].friends.map(toObjectId)||[];
					
					let suggFriends = (await Users.find({
									  _id : {
										$nin : friendsUser
										}
									}).toArray()).map(prepare);
									
					let searchCurrentUser = suggFriends.findIndex((user) => (user._id === endCursor));
					let newUserData = suggFriends.slice(searchCurrentUser+1,searchCurrentUser+4);
					
				  return {
					  pageInfoUsers : {
						  hasPreviousCursor : false,
						  hasNextCursor : true,
						  startCursor : newUserData[0]._id,
						  endCursor : newUserData[newUserData.length-1]._id,
					  },
					  suggestions : newUserData,
				  }
				},
				suggestions : async (root, {friendsTab}) => {
					let mapObjectIdFriendsTab = await friendsTab.map(toObjectId);
				  return (await Users.find({
					  _id : {
						$nin : mapObjectIdFriendsTab
						}
					}).toArray()).map(prepare);	
				},
				friends: async (root, {friendsTab}) => {
					let mapObjectIdFriendsTab = await friendsTab.map(toObjectId);
				  return (await Users.find({
					  _id : {
						$in : mapObjectIdFriendsTab
						}
					}).toArray()).map(prepare)
				},
				getPromotionBySchool : async (root,{schoolId}) => {
					return (await Promotion.find({ schoolId }).toArray()).map(prepare);
				},
				schedules: async () => {
				  return (await Schedule.findOne({}))
				},
				libraries : async (root,{promotionId}) => {
				  return (await Bookstores.find({ promotionId : promotionId }).toArray()).map(prepare)
				},
				schools : async (root, {id}) => {
				  let SngSchool = (await Schools.find({_id : ObjectId(id)}).toArray()).map(prepare);
				  return SngSchool[0];
				},
				getSuggestedCourse : async () => {
				  let Courses = (await Course.find({}).toArray());
				  if(Courses){
					  return Courses.map(async (o)=>  {
							let approvals = (await Users.find({_id : {$in : o.approvedBy.map(toObjectId)}}).toArray()).map(prepare);
							let currentUser = await Users.findOne({_id : ObjectId(o.teacherId)});
							return Object.assign({},o,{
									_id : o._id.toString(),
									teacherId :  Object.assign({},currentUser,{ _id : o.teacherId }),
									approvedBy : approvals
							})
						}
					  );;
				  }else{
					  return [courseShape]
				  }
				  
				},
				getCourses : async (root, {promotionId}) => {
				  let Courses = (await Course.find({ promotionId }).toArray());
				  return Courses.map(async (Course)=>{
					  let currentUser = await Users.findOne({_id : ObjectId(Course.teacherId)});
					  return Object.assign({},Course,{_id : Course._id.toString(),
								teacherId :  Object.assign({},currentUser,{ _id : Course.teacherId }),
								approvedBy : (await Users.find({_id : {$in : Course.approvedBy.map(toObjectId)}}).toArray()).map(prepare)
						});
				  })
				},
				generateCertificat : async (root, {id,promotionId}) => {
					let remakeCourses = new Promise((resolve,reject)=> {
											resolve(Course.find({promotionId : promotionId,}).toArray())
										}).then((res)=> (res.map(prepare)))
										.then((res)=> {
											return res.map((r) => {
												let {_id,name,ponderation} = r;
												return {
													courseId :  _id,
													courseName : name,
													ponderation,
													notes : [],
													lastupdate : new Date(),
												};
											 });
										  }
										);
					return {
							owner : id,
							emitter : "",
							year : new Date(),
							courses : remakeCourses,
							viewer : [],
						};
				},
				getCertificat : async (root, {id}) => {
					  let certificat = (await Certificat.find({_id : ObjectId(id)}).toArray()).map(prepare);
					  let viewerUser = certificat[0].viewer.map(toObjectId);
					  let newViewerUser = (await Users.find({
						  _id : ObjectId(certificat[0].owner)
						}).toArray()).map(prepare);
						
					  let newOwner = (await Users.find({
						_id : {
						   $in : viewerUser
						 }
					  }).toArray()).map(prepare);
				  return Object.assign({},certificat[0],{ 
							owner : newViewerUser[0],
							viewer : newOwner
						});
				},
				getFriendsNoCertificats  : async (root, {certificatId}) => {
					  let certificat = (await Certificat.findOne({ _id : ObjectId(certificatId) }));
					  let newOwnersTab = (await Users.find({ _id : {$nin : certificat.viewer.map(toObjectId)} }).toArray()).map(prepare);
						return newOwnersTab;
				},
				getMyCertificats : async (root, {ownerId}) => {
					  let certificat = (await Certificat.find({ owner : ownerId }).toArray()).map(prepare);
						return certificat;
				},
				getCertificatShrink : async (root, {id}) => {
					  let certificat = (await Certificat.find({_id : ObjectId(id)}).toArray()).map(prepare);
					  let countCourse = certificat[0].courses.length;
					  let reduceNote = certificat[0].courses.map(
						(note) =>{
							let count = note.notes.length;
							let sumNote = note.notes.reduce(
								(accumulator,currentValue,currentIndex,array) =>{
									return ((accumulator+(currentValue.cote)/count)/(20*countCourse))*100
								},0
							);
							return Math.round(sumNote);
						}).reduce(
								(accumulator,currentValue,currentIndex,array) =>{
									return (accumulator+currentValue)
								},0
							);
				  return reduceNote;
				},
				getCurrentPromotionTeachers : async (root,{promotionId}) => {
					return (await Users.find({}).toArray()).map(prepare)
				},
				getTeachers : async (root,{promotionId}) => {
					
				  let getPromotion =  (await Promotion.find({
												_id : ObjectId(promotionId)
										}).toArray()
									).map(prepare);
									
					let teachersMap = getPromotion[0].teachers.map(teacher => ObjectId(teacher.teacherId));
					let teachers =(await Users.find({
									  _id : {
										$in : teachersMap
										}
								  }).toArray()).map(prepare);
					return Object.assign({},getPromotion[0],{teachers:teachers})
				},
				getPromotionsTab : async (root,{promotionIdTab}) => {
					 
					let mapObjectIdpromotionIdTab = await promotionIdTab.map(toObjectId);
						return (await Promotion.find({
							  _id : {
								$in : mapObjectIdpromotionIdTab
								}
							}).toArray()).map(prepare);
				},
				getCourseByTeachers : async (root,{promotionId}) => {
							let coreCourses = (await Course.find({ promotionId }).toArray())
												.map(async(o) => {
														let approvers = (await Users.find({_id : {$in : o.approvedBy.map(toObjectId)}})
																			.toArray()).map(prepare);
														let teacherEntire = await Users.findOne({_id : ObjectId(o.teacherId)});
												return Object.assign({},o,{
													_id : o._id.toString(),
													teacherId : Object.assign({},teacherEntire,{ _id : o.teacherId}),
													approvedBy : approvers
												});
											});
							return coreCourses
				},
				getCoreCourses : async (root,{courseId,ownerId}) => {
							let currDay = moment().format('YYYY-MM-DD');
							let dailyHistory = (await Histories.findOne({ ownerId, currentDate :currDay }));
							if(dailyHistory){
								let newHistory = (await Histories.update({ownerId,currentDate : currDay},{
										  $push : { pages : { id : uuidv4(), links :`/inner/Course/${courseId}`,
														linkName : "Course",
														getInOn : new Date(), 
														getOutOn : new Date()}}
									  },{ upsert : true }))
							}else{
									let newHistory = (await Histories.insert(Object.assign({},History,{
									ownerId : ownerId,currentDate : currDay, pages : [{ id : uuidv4(),
									links :`/inner/Course/${courseId}`,
									linkName : "Course",getInOn : new Date(),getOutOn : new Date()}]
								})))
							}
							let coreCourses = (await Course.findOne({ _id : ObjectId(courseId) }));
							let teacherUser = (await Users.findOne({ _id : ObjectId(coreCourses.teacherId) }));
							let approvers = (await Users.find({_id : {$in : coreCourses.approvedBy.map(toObjectId)}}).toArray()).map(prepare)
							return Object.assign({},coreCourses,{ 
											_id : courseId,
											teacherId : Object.assign({},teacherUser,{ _id : coreCourses.teacherId }),
											approvedBy : approvers
										});
				},
				getRequesters : async (root,{promotionId}) => {
							let requesters = (await Requester.findOne({promotionId : promotionId}));
							let rmRequesters = requesters.requesters.map(async(requester)=> {
									let userRequester = (await Users.findOne({_id : ObjectId(requester.ownerId)}));
									let newUserRequester = Object.assign({},userRequester,{ _id : requester.ownerId });
								return Object.assign({},requester,{ ownerId : newUserRequester });				
							});
							return Object.assign({},requesters,{requesters : rmRequesters});
				},
				getCoreCoursesForTeacher : async (root,{teacherId,promotionId}) => {
							let coreCourses = (await Course.find({
									promotionId : promotionId
								}).toArray()).map(prepare);
							return coreCourses;
				},
				getPromotions : async (root,{promotionId}) => {
					
				  let getPromotion =  (await Promotion.find({
												_id : ObjectId(promotionId)
										}).toArray()
									).map(prepare);
									
					let collegues = getPromotion[0].pupils.map(collegue => ObjectId(collegue.pupilId));
					
					let pupils =(await Users.find({
						  _id : {
							$in : collegues
							}
					  }).toArray()).map(prepare);
					 
						
					  let pupilsWithPerformance = pupils.map((pupil)=> {
						  let id = pupil.certificats[0];
						  let newReduceNote = new Promise((resolve,reject)=> {
							  resolve(Certificat.find({_id : ObjectId(id)}).toArray())
						  }).then((res)=> {
							  if(typeof res[0] !== 'undefined'){
								  let countCourse = res[0].courses.length;
								  let reduceNote = res[0].courses.map(
									(note) =>{
										let count = note.notes.length;
										let sumNote = note.notes.reduce(
											(accumulator,currentValue,currentIndex,array) =>{
												return ((accumulator+(currentValue.cote)/count)/(20*countCourse))*100
											},0
										);
										return Math.round(sumNote);
									}).reduce(
											(accumulator,currentValue,currentIndex,array) =>{
												return (accumulator+currentValue)
											},0
										);
								  return reduceNote;
							 }else{
								  return 0;
							 }
						  });
						return Object.assign({},pupil,{ performance : newReduceNote,});
					});
					return Object.assign({},getPromotion[0],
							{
								pupils:pupilsWithPerformance,
							});
				},
				getSchool : async () => {
				  let schoolTabs = (await Schools.find({}).limit(2).toArray()).map((school) => {
					  let newId = school._id.toString();
					  let getClasses = new Promise((resolve,reject)=> {
							  resolve(Promotion.find({schoolId:newId}).toArray())
						  }).then(res => res.map(prepare));
						  
					  return Object.assign({},school,{
						  _id : newId,
						  promotions : getClasses
					  });
				  });
				  return schoolTabs;
				},
				getAnAssess : async (root, {assessId}) => {
					let assess = (await Assessments.findOne({_id : ObjectId(assessId)}));
					let teacherId = (await Users.findOne({_id : ObjectId(assess.teacherId)}));
					let courseId = (await Course.findOne({_id : ObjectId(assess.courseId)}));
						return Object.assign({},assess ,
									{ 	_id : assessId,
										teacherId : Object.assign({},teacherId,{ _id : assess.teacherId }),
									  courseId : Object.assign({},courseId,{ _id : assess.courseId })
									 }
						);
					},
				getCorrectedAssess : async (root, {assessId,ownerId}) => {
					let myAnswers = (await Responder.findOne({assessId,ownerId}));
					let assess = await Assessments.findOne({_id : ObjectId(assessId)});
					let coreCourse = (await Course.findOne({ _id : ObjectId(assess.courseId) }));
					let newQuestionList = assess.questionList.map((quest)=>{
						let singleQuest = myAnswers.answersCorrect.find((answ) => answ.questIdResponded == quest.questId);
						return Object.assign({},quest,{ answer : singleQuest.answerIdSubmit,
														courseId : coreCourse
												});
					});
					let teacherUser = (await Users.findOne({ _id : ObjectId(assess.teacherId) }))
					let cote = myAnswers ?  myAnswers.cote : 0;
					return Object.assign({},assess,{ _id : assessId,
								questionList : newQuestionList ,
								cote,
								teacherId : Object.assign({},teacherUser,{ _id : assess.teacherId })
					});
				},
				getArticlesBookMarked: async (root,{bookRefs}) => {
					return (await Course.find({_id : {$in : bookRefs.map(toObjectId)}}).toArray());
				},
				onCorrectRespondersToQuestion : async (root, {assessId,ownerId}) => {
					let assess = (await Assessments.findOne({_id : ObjectId(assessId)}));
					let myAnswers = (await Responder.findOne({assessId,ownerId}));
					return myAnswers.answersCorrect.map(async(answer)=>{
						let currQuest = await assess.questionList.find(
							(quest)=>(quest.questId === answer.questIdResponded )
						);
						return currQuest.correctAnswer === answer.answerIdSubmit ? currQuest.GAV : 0
					}).reduce((a,b)=>(a+b));
				},
				onGetAssessToCorrect : async (root, { promotionId,teacherId }) => {
					let assessTab = (await Assessments.find({ promotionId, teacherId }).toArray()).map(prepare)
					let newAssessTab = assessTab.map(async(assess)=>{
						let newCount = Responder.find({ assessId :  assess._id }).count();
						let course = (await Course.findOne({_id : ObjectId(assess.courseId)}));
							return Object.assign({},assess,{
								_id : assess._id,
								count : newCount,
								courseId : Object.assign({},course,{_id : assess.courseId })
							});
					});
					return newAssessTab;
				},
				onRespondersTest : async (root, { assessId }) => {
					return (await Responder.find({ assessId }).toArray())
				},
				getOnesBills : async (root, { pupilId,promotionId }) => {
					return (await Bill.findOne({ pupilId,promotionId }));
				},
				getBills : async (root, { pupilId, promotionId }) => {
					let bills = (await Bill.find({ destinator : pupilId, promotionId }).toArray());
					let renewBills = bills.map(async(bill)=>{
						let payer = (await Users.findOne({_id : ObjectId(bill.payer)}));
						let newPayer = Object.assign({},payer,{ _id : bill.payer });
						let newBill = Object.assign({},bill,{ payer : newPayer });
						return newBill
						});
					return renewBills;
				},
				getScheduler : async (root,{ promotionId,creator,currentDate}) => {
					let currSchedule = (await Schedule.findOne({ promotionId,creator }));
					let currSection = currSchedule.sessions.filter(
													(session)=> moment(currentDate).isSameOrBefore(moment(session.endingDay))
													&& session.dayOfWeek == moment(currentDate).format('ddd'));
					return Object.assign({},currSchedule,{ sessions : currSection,
					})
				},
				getLogs : async (root,{ ownerId,currentDate }) => {
					return (await Histories.findOne({ ownerId,currentDate }));
				},
			},
	  Mutation : {
			 uploadFile : async(root, { file }) =>  {
			  const { createReadStream, filename, mimetype }= await file;
			  console.log(filename);
			  console.log(mimetype);
			  await Photo.insert({ createReadStream, filename, mimetype })
			  // await new Promise((res,err) => {
				 // createReadStream()
				  // .pipe(createWriteStream(path.join(__dirname,"./images",filename)))
				  // .on("close", res);
			  // });
			  files.push(filename);
			  return filename
			  // 1. Validate file metadata.

			  // 2. Stream file contents into cloud storage:
			  // https://nodejs.org/api/stream.html

			  // 3. Record the file upload in your DB.
			  // const id = await recordFile( … )

			},
		onPayBills: async (root,{ emittor ,promotionId, destinator ,payer ,cost, devise }) => {
			 let operBills = (await Bill.insert({ emittor ,promotionId, destinator , payer , cost, date : new Date()}));
			 let bills = (await Bill.find({ destinator }).toArray()).map(prepare);
			return bills;
			
		},
		plugToCertificatUsers : async (root,{ certificatId,userId }) => {
			 let updater = (await Certificat.update({ _id : ObjectId(certificatId) },{
						  $push : { viewer :  userId }
					  },{ upsert : true }));
			  let certificat = (await Certificat.findOne({ _id : ObjectId(certificatId) }));
			  let newOwnersTab = (await Users.find({ _id : {$nin : certificat.viewer.map(toObjectId)} }).toArray()).map(prepare);
				return newOwnersTab;
			
		},
		onLogLeavePage : async (root,{ ownerId,currentDate,currentLink }) => {
			  let logs = (await Histories.findOne({ ownerId,currentDate }));
			  let currentLog = await logs.pages.find((page) =>page.id == currentLink);
			  let newOneLog = Object.assign({},currentLog,{
				  getOutOn : new Date()
			  });
			  let newLogs = Object.assign({},logs,{ pages : [
								...logs.pages.filter((page) =>page.id !== currentLink),
								newOneLog
							]});
			let statusRemove = (await Histories.remove({ownerId,currentDate}));
			let status = (await Histories.insert(newLogs));
			
			  return  currentLog;
			
		}, 
		onLog : async (root,{ id,ownerId,currentDate,links,linkName }) => {
			let dailyHistory = (await Histories.findOne({ ownerId,currentDate }));
			if(dailyHistory){
				let newHistory = (await Histories.update({ownerId,currentDate},{
						  $push : { pages : { id, links,linkName,getInOn : new Date(),getOutOn : new Date()}}
					  },{ upsert : true }))
			}else{
				let newHistory = (await Histories.insert(Object.assign({},History,{
				ownerId,currentDate, pages : [{ id, links,linkName,getInOn : new Date(),getOutOn : new Date()}]
			})))
			}
			  return (await Histories.findOne({ ownerId,currentDate }));
			
		}, 
		onCreateLog : async (root,{ ownerId,currentDate }) => {
			let newObject = Object.assign({},History,{
				ownerId,
				currentDate
			});
			  let status = (await Histories.insert(newObject));
			  return (await Histories.findOne({ ownerId,currentDate }));
			
		}, 
		  onAddSessionToScheduler : async (root, { promotionId,creator, 
					courseId, startingtime, endingtime, 
					dayOfWeek, endingdate, startingdate,}) => {
						let course = await Course.findOne({_id : ObjectId(courseId)});
			let statusQry = (await Schedule.update({ promotionId,creator },
										{$push : { sessions : { 
													  courseId ,
													  startingtime,
													  endingtime,
													  dayOfWeek ,
													  courseName : course.name,
													  startDay : startingdate,
													  endingDay : endingdate,
										}}}));
			return (await Schedule.findOne({ promotionId,creator }));
		},
		onCreateScheduler : async (root, { promotionId,creator , }) => {
			let statusQry = await Schedule.insert(Object.assign({},scheduler,{ promotionId,creator }))
			return (await Schedule.findOne({ promotionId,creator }));
		},
		onBulkCorrection : async (root, { assessId }) => {
			let assess = (await Assessments.findOne({_id : ObjectId(assessId)}));
			let papers = (await Responder.find({ assessId }).toArray());
			let papersCorrected = await papers.map(async(paper)=> {
				let cert = (await Certificat.findOne({ owner : paper.ownerId, promotionId :  assess.promotionId }));
				let cote = await paper.answersCorrect.map(async(answer)=>{
						let currQuest = await assess.questionList.find(
							(quest)=>(quest.questId === answer.questIdResponded )
						);
						return currQuest.correctAnswer === answer.answerIdSubmit ? currQuest.GAV : 0
					}).reduce((a,b)=>(a+b));
				let xI = await cert.courses.findIndex( course => course.courseId === assess.courseId );
				let targetObject = cert.courses.find( course => course.courseId === assess.courseId);
				let newArray = cert.courses.filter( course => course.courseId !== assess.courseId);
				let newCourses = [Object.assign({},targetObject,{ 
										notes : [...targetObject.notes,{
														idAssess : assessId,cote,
														topic : assess.header, date : new Date()
												}] 
									}),...newArray];
				let updatedStatus = (await Certificat.update({ owner : paper.ownerId, promotionId :  assess.promotionId },
										{$set : { courses : newCourses }}));
				let updatedStatusTwo = (await Responder.update({ owner : paper.ownerId, promotionId :  assess.promotionId },
										{$set : { cote : cote }}));
				return (await Certificat.findOne({ owner : paper.ownerId, promotionId :  assess.promotionId }));
			});
			let statusQuery = (await Assessments.update({_id : ObjectId(assessId)},
										{ $set : { corrected : true }},
										{ multi : true })
								);
			let refreshAssess = (await Assessments.findOne({_id : ObjectId(assessId)}));
			return Object.assign({},refreshAssess,{
						teacherId : Users.findOne({_id : ObjectId(assess.teacherId)}),
						courseId : Course.findOne({_id : ObjectId(assess.courseId)}), 
					})
		},
		 addCourseBookMarkers : async (root, {userId,courseId}) => {
				let reqStatus = await Users.update({_id : ObjectId(userId)},{
					$addToSet : { bookmarked : courseId }
				});
				return (await Users.findOne({_id : ObjectId(userId)}));
			}, 
		 addCourseLikers : async (root, {userId,courseId}) => {
				let reqStatus = await Course.update({_id : ObjectId(courseId)},{
					$addToSet : { likers : userId }
				});
				pubsub.publish(COURSE_LIKER, { courseLikers : true });
				return true;
			},  
		 addCourseDislikers : async (root, {userId,courseId}) => {
				let reqStatus = await Course.update({_id : ObjectId(userId)},{
					$addToSet : { dislikers : userId }
				});
				return true;
			},
		 addParagraphToSection : async (root,{id,sectionId,type,content}) => {
			 
					let courses = (await Course.findOne({ _id : ObjectId(id)}));
					let currX = courses.sections.findIndex((Section)=>  Section.sectionId === sectionId);
					let changeParagraphs= courses.sections[currX].paragraphs.concat({type,content});
					let newSectionChanged = Object.assign({},courses.sections[currX],{
												  paragraphs : changeParagraphs
											  });
					let newSectionsTab = [...courses.sections.slice(0,currX),
										  newSectionChanged,
										  ...courses.sections.slice(currX+1,courses.sections.length)
										];
					let newCourse = Object.assign({},courses,{ sections : newSectionsTab });
					
					let removeCourses = (await Course.remove({ _id : ObjectId(id)}));
					let insertCourses = (await Course.insert(newCourse));
					return (await Course.findOne({ _id : ObjectId(id)}));
					
        },
		 addSectionToCourse : async (root,{id,sectionId,tittle}) => {
			 
					let Status = (await Course.update({ _id : ObjectId(id)},
																{$addToSet : { sections : {
																		sectionId : sectionId, 
																		tittle : tittle, 
																        paragraphs : []
																	}}}));
					let courses = (await Course.findOne({ _id : ObjectId(id)}));
					return courses;
        },
		 submitRequestersToSchool : async (root,{promotionId,userId}) => {
			 
					let Status = (await Requester.update({ promotionId : promotionId},
																{$addToSet : { requesters : {
																		ownerId : userId, 
																		status : "PENDING", 
																		submitdate : new Date()
																	}}}));
					let requesters = (await Requester.findOne({promotionId : promotionId}));
					let rmRequesters = requesters.requesters.map((requester)=> {
							let userRequester = Users.findOne({_id : ObjectId(requester.ownerId)});
						return Object.assign({},requester,{ ownerId : userRequester });				
					});
					return Object.assign({},requesters,{requesters : rmRequesters});
        },
		 logout : async (root, {token}) => {
				let exitUser = await Users.update({_id : ObjectId(token)},{$set : {isConnected : false,}});
				return false;
			},
		 login : async (root, {username,password}) => {
				let newUser = (await Users.update({
										"personals.username" : username,
										"personals.password" : password
								},
								{$set : {isConnected : true, lastSeenOnline : new Date()}})
							);
			  return new Promise((resolve,reject)=> {
				 resolve(Users.findOne({"personals.username" : username,"personals.password" : password})
				  ).then((res) => Object.assign({},res[0], {_id : res[0]._id.toString()}));
			 });
		},
		onOpenAssessment : async (root, {ownerId,assessId}) => {
			let insertAssessFrame = (await Responder.insert({
					starttime : new Date(),
					endtime : new Date(),
					ownerId,
					assessId,
					answersCorrect :[],
				}));
			return (Responder.findOne({ownerId,assessId}));
		},
		onSubmitAnswersToQuestions : async (root, {questId,assessId,answerId,ownerId}) => {
			let responder = (await Responder.update({ownerId,assessId},
								{$addToSet : { answersCorrect :{ answerIdSubmit : answerId,
																 questIdResponded : questId,
																 submitedtime : new Date()
																}}}));
			return (await Responder.findOne({ownerId,assessId}));
		},
		addCorrectAnswerToQuestion : async (root, {questId,assessId,answerId}) => {
				let currAssess = (await Assessments.findOne({Id : assessId }));
				let questX = currAssess.questionList.findIndex(currQ => currQ.questId === questId);
				let newQuest = Object.assign({},currAssess.questionList[questX],{
					correctAnswer : answerId
				});
			let newAssess = Object.assign({},currAssess,{
				questionList : [...currAssess.questionList.slice(0,questX),
								newQuest,
								...currAssess.questionList.slice(questX+1,currAssess.questionList.length)
				]
			});
			let removeAssess = (await Assessments.remove({Id : assessId }));
				let insertAssess = (await Assessments.insert(newAssess));
			return (await Assessments.findOne({Id : assessId }));
		},
		addAssertionToQuestion : async (root, {text,assessId,questId,answerId}) => {
				let currAssess = (await Assessments.findOne({Id : assessId}));
				let questX = currAssess.questionList.findIndex(currQ => currQ.questId === questId);
				let newQuest = Object.assign({},currAssess.questionList[questX],{
					assertions : currAssess.questionList[questX].assertions.concat({text,answerId})
				});
			let newAssess = Object.assign({},currAssess,{
				questionList : [...currAssess.questionList.slice(0,questX),
								newQuest,
								...currAssess.questionList.slice(questX+1,currAssess.questionList.length)
				]
			});
				let removeAssess = (await Assessments.remove({Id : assessId}));
				let insertAssess = (await Assessments.insert(newAssess));
			return (await Assessments.findOne({Id : assessId}));
		},
		addQuestionToAssess : async (root, {text,type,assessId,GAV,questId}) => {
				let Status = (await Assessments.update({Id : assessId},
								{$addToSet : { questionList :{ 
													questId ,
													text ,
													type,
													GAV ,
													assertions : [{text :"No true assertions",answerId :uuid.v4() }],
													correctAnswer : "",
												}}}));
				let aments = (await Assessments.find({Id : assessId}).toArray()).map(prepare);
				return aments[0];
			},
		
		addAssess : async (root, {Id,header,fields,promotionId,courseId ,teacherId,description ,startDay ,endDay ,duration }) => {
				let newAssess = Object.assign({},assessmentShape,{
									Id : Id,
									header: header, 
									fields: fields, 
									promotionId: promotionId, 
									courseId: courseId, 
									teacherId: teacherId, 
									description: description, 
									endDay : endDay,
									duration : duration
							});
				let insertUser = await Assessments.insert(newAssess);
				let aments = (await Assessments.find({
										Id : Id
							}).toArray()).map(prepare);
				return aments;
			},
		addInstitut : async (root, {input}) => {
				let newUser = Object.assign({},userShape,{
								isId : uuid.v4(),
								personals : {
									username : input.username,
									password : input.password,
									middlename : input.middlename,
									firstname : input.firstname,
									picture : "",
								},
								accountType : "administrator",
							});
				let insertUser = await Users.insert(newUser);
				let administrator = (await Users.find({
							"personals.username" : input.username,
							"personals.password" : input.password,
						}).toArray()).map(prepare);
				let newSchool = Object.assign({},schoolShape,{ 
									fonder : administrator[0]._id, 
									name : input.schoolName, 
									address : [
										{
											country : input.country, 
											state : input.StateCountry, 
											town : input.town, 
											township : input.township, 
											street : input.street, 
											number : input.number, 
											reference : input.reference
										}
									], 
									location : [
										{
											latitude : input.latitude, 
											longitude : input.longitude, 
											altitude : input.altitude
										}
									]
								});
				let newSchoolStatus = (await Schools.insert(newSchool));
				let getNewSchool = (await Schools.find({
									fonder : administrator[0]._id, 
									name : input.schoolName,
						}).toArray()).map(prepare);
				return getNewSchool[0];
			},
		addCertificatNote : async (root, { CertificatId,courseIdNote,cote,topic }) => {
			  let certificat = (await Certificat.find({_id : ObjectId(CertificatId)}).toArray()).map(prepare);
			  let viewerUser = certificat[0].viewer.map(toObjectId);
			
			  let index = certificat[0].courses.findIndex((course) => course.courseId === courseIdNote);
			  
		       certificat[0].courses[index].notes.unshift({
							idAssess : uuid.v4(),
							cote : cote,
							topic : topic,
							date : new Date(),
						});
				let Status = (await Certificat.update({_id : ObjectId(CertificatId)},
										{
											$set : { courses : certificat[0].courses}
										}));
				let newCertificat = (await Certificat.find({_id : ObjectId(CertificatId)}).toArray()).map(prepare);
			return newCertificat[0];
      },
		unSubscribePupilToPromotion  : async (root,{pupilId,promotionId}) => {
				let Promo= (await Promotion.update({
										_id : ObjectId(promotionId),
									},{$pull : { 
											pupils : {
												_id: pupilId,
											}
										}
									}));
				let newPromotion = (await Promotion.find({_id: promotionId,}).toArray()).map(prepare);
				return newPromotion[0];
        },
		removeCoursesForTeacherToPrmotion  : async (root,{id,promotionId}) => {
					let statusQuery = (await Course.remove({_id : ObjectId(id)}));
					let coreCourses = (await Course.find({promotionId : promotionId}).toArray()).map(prepare);
					let coreCoursesWithTeachers = coreCourses.map((courseWithTeacher)=> {
						
						let teacher = new Promise((resolve,reject)=> {
							  resolve(Users.find({_id : ObjectId(courseWithTeacher.teacherId)}).toArray())
						  }).then((res)=> {
								return res[0];
						  });
						return Object.assign({},courseWithTeacher,{teacherId : teacher});
					});
				
			return coreCoursesWithTeachers;
        },
		 addCoursesForTeacherToPrmotion : async (root,{teacherId,promotionId,name ,ponderation}) => {
					let newCoreCourses = Object.assign(
										{},
										courseShape,
										{   teacherId : teacherId, 
											promotionId : promotionId, 
											name : name,
											ponderation : ponderation,
										}
									);
					let statusQuery = (await Course.insert(newCoreCourses));
					let coreCourses = (await Course.find({promotionId : promotionId}).toArray()).map(prepare);
					let coreCoursesWithTeachers = coreCourses.map((courseWithTeacher)=> {
						
						let teacher = new Promise((resolve,reject)=> {
							  resolve(Users.find({_id : ObjectId(courseWithTeacher.teacherId)}).toArray())
						  }).then((res)=> {
								return res[0];
						  });
						return Object.assign({},courseWithTeacher,{teacherId : teacher});
					});
				
			return coreCoursesWithTeachers;
        },
		 addCertificatsToUser : async (root,{userId,certificatId}) => {
			 let updateStatus = (await Users.update(
								{_id : ObjectId(userId)},
								{$push : {
									certificats : certificatId,
								}},{ upsert : true, multi : true }));
				let oneUsers = (await Users.find({_id : ObjectId(userId)}).toArray()).map(prepare);
			return oneUsers[0];
		 },
		 addPromotionToSchool : async (root,{schoolId,promotionName,promotionLevel,scheduleId}) => {
			let newPromotion = Object.assign({},promotionShape,{
												promotionName : promotionName,
												schoolId : schoolId,
												promotionLevel : promotionLevel,
												scheduleId : scheduleId,
											});
				let insertPromotion = (await Promotion.insert(newPromotion));
				let currentPromotion = (await Promotion.find({
										promotionName : promotionName,
										schoolId : schoolId,
										promotionLevel : promotionLevel,
										scheduleId : scheduleId,
									}).toArray()).map(prepare);
				let createRequesters = (await Requester.insert(Object.assign({},v_requester,{
												promotionId : currentPromotion[0]._id
											})));
				return currentPromotion[0];
		 }, 
		 addNotify : async (root, {sender,receiver}) => { 
				let updateStatus = (await Notification.update(
								{owner : receiver},
								{$push : {
									notifications : {
										NotifId : uuid.v4(),
										owner : sender,
										time : new Date(),
										status : "no",
										message : "want to keep touch with",
										answer :"no",
									},
								}},{ upsert : true, multi : true }));
			return true;
		},
		friendshipQuery : async (root, {asker,answerer}) => { 
				let updateStatus = (await Notification.update(
								{owner : answerer},
								{$push : {
									notifications : {
										NotifId : uuidv4(),
										owner : asker,
										time : new Date(),
										status : "no",
										message : "want to keep touch with",
										answer :"no",
									},
								}},{ upsert : true, multi : true }));
								
				let oneUser = (await Users.find({_id : ObjectId(asker)}).toArray()).map(prepare);
				let friendsUser = oneUser[0].friends.map(toObjectId);
				let suggFriends = (await Users.find({
								  _id : {
									$nin : friendsUser
									}
								}).toArray()).map(prepare);
								
				let searchCurrentUser = suggFriends.findIndex((user) => (user._id === answerer));
				let newUserData = suggFriends.slice(searchCurrentUser+1,searchCurrentUser+4);
				
			  return {
				  pageInfoUsers : {
					  hasPreviousCursor : false,
					  hasNextCursor : true,
					  startCursor : newUserData[0]._id,
					  endCursor : newUserData[newUserData.length-1]._id,
				  },
				  suggestions : newUserData,
			  }
		},
		acceptFriendShip : async (root, {answerer,asker,NotifId}) => {
				let updateStatus = (await Users.update(
								{_id : ObjectId(answerer)},
								{$push : {
									friends : asker,
								}},{ upsert : true, multi : true }));
				let createLinkChat = Object.assign({},chatShape,{
								firstOwner : answerer,
								secondOwner : asker,
								messages : [{
									digitalSign : answerer,
									text : "Say hello to your new friend",
									when : new Date(),
									id : uuidv4(),
								}],
							});
				let insertUser = (await Chats.insert(createLinkChat));
				let usFriend = (await Notification.update(
								{owner : asker},
								{$push : {
									notifications : {
										NotifId : uuid.v4(),
										owner : answerer,
										time : new Date(),
										status : "yes",
										message : "you're now connected with",
										answer :"yes",
									},
								}},{ upsert : true, multi : true }));
				
				let usOnwer = (await Notification.update(
								{owner : answerer},
								{$pull : {
									notifications : {
										NotifId : NotifId
									},
								}},{ upsert : true, multi : true }));
				let newNotif = (await Notification.findOne({owner : answerer}));
			return newNotif;				
			},
		 addTeacherToPromotion : async (root, {teacherId,promotionId}) => {
				let updateStatus = (await Promotion.update(
								{_id : ObjectId(promotionId)},
								{$push : {
									teachers : {
										teacherId :teacherId,
										locateCourseDate : new Date(),
										courseName : "",
										courseId : "",
									},
								}},{ upsert : true, multi : true }));
								
			let getPromotion =  (await Promotion.find({}).toArray()).map(prepare);
			let collegues = getPromotion[0].pupils.map(collegue => ObjectId(collegue.pupilId));
			let pupils =(await Users.find({
				  _id : {
					$in : collegues
					}
			  }).toArray()).map(prepare);
			return Object.assign({},getPromotion[0],{pupils:pupils})
		},
		addPupilToPromotion : async (root, {pupilId,promotionId}) => {
				let remakeCourses = await new Promise((resolve,reject)=> {
									resolve(Course.find({promotionId : promotionId,}).toArray())
								}).then((res)=> (res.map(prepare)))
								.then((res)=> {
									return res.map((r) => {
										let {_id,name,ponderation} = r;
										return {
											courseId :  _id,
											courseName : name,
											ponderation,
											notes : [],
											lastupdate : new Date(),
										};
									 });
								  }
								);
				let updateStatus = (await Promotion.update(
								{_id : ObjectId(promotionId)},
								{$push : {
									pupils : {
										pupilId :pupilId,
										subscribeDate : new Date(),
										parentship : [],
										bills : [],
										certificatId : "",
									},
								}},{ upsert : true, multi : true }));
			
				let statusReq1 = (await Certificat.insert({
					owner : pupilId,emitter : "",
					year : new Date(),
					courses : remakeCourses,
					viewer : [],
					promotionId : promotionId 
				}));
				let certInserted = (await Certificat.find({
					owner : pupilId,
				}).toArray()).map(prepare);				
				let statusReq3 = (await Users.update({
										 _id : ObjectId(pupilId)
									},{
										$addToSet : {
											certificats : certInserted[0]._id
										}
									}));
				
			let getPromotion =  (await Promotion.find({}).toArray()).map(prepare);
			let collegues = getPromotion[0].pupils.map(collegue => ObjectId(collegue.pupilId));
			let pupils =(await Users.find({
				  _id : {
					$in : collegues
					}
			  }).toArray()).map(prepare);
			return Object.assign({},getPromotion[0],{pupils:pupils})
		},
		 addClasseToSchool : async (root, {Id,country,state,town,township,street,number,reference}) => {
				let updateStatus = (await Schools.update(
								{_id : ObjectId(Id)},
								{$push : {
									address : {
										country :country,
										state:state,
										town:town,
										township:township,
										street:street,
										number:number,
										reference:reference,
									},
								}},{ upsert : true, multi : true }));
				let school = (await Schools.find({_id : ObjectId(Id)}).toArray()).map(prepare);
			return school[0];
		},
		 addClasseToSchool : async (root, {Id,courseScheduleId, previousPromotion,nextPromotion,books,year}) => {
				let updateStatus = (await Schools.update(
								{_id : ObjectId(Id)},
								{$push : {
									classes : {
										id : uuid.v4(),
										courseScheduleId : courseScheduleId,
										courses : [],
										previousPromotion : previousPromotion,
										nextPromotion : nextPromotion,
										books : books,
										year : year
									},
								}},{ upsert : true, multi : true }));
				let school = (await Schools.find({_id : ObjectId(Id)}).toArray()).map(prepare);
			return school[0];
		},
		 deleteBookMarkedToUser : async (root, {userId,bookId}) => {
				let updateStatus = (await Users.update(
								{_id : ObjectId(userId)},
								{$pull : {
									books : {
										id : bookId,
									},
								}},{ upsert : true, multi : true }));
				let oneUsers = (await Users.find({_id : ObjectId(userId)}).toArray()).map(prepare);
			return oneUsers[0];
		},
		 addBookMarkedToUser : async (root, {userId,picture,tittle, subTittle,author,editor,path,publishDay}) => {
				let updateStatus = (await Users.update(
								{_id : ObjectId(userId)},
								{$push : {
									books : {
										picture : picture,
										tittle : tittle,
										subTittle : subTittle,
										author : author,
										editor : editor,
										path : path,
										publishDay : publishDay,
										BookMarkDay : new Date(),
										id : uuid.v4(),
									},
								}},{ upsert : true, multi : true }));
				let oneUsers = (await Users.find({_id : ObjectId(userId)}).toArray()).map(prepare);
			return oneUsers[0];
		},
		addFriendsToUser : async (root, {userId,friendId}) => {
				let updateStatus = (await Users.update(
								{_id : ObjectId(userId)},
								{$push : {
									friends : friendId,
								}},{ upsert : true, multi : true }));
				let createLinkChat = Object.assign({},chatShape,{
								firstOwner : userId,
								secondOwner : friendId,
								messages : [{
									digitalSign : userId,
									text : "hello friend",
									when : new Date(),
									id : uuid.v4(),
								}],
							});
				let insertUser = (await Chats.insert(createLinkChat));
				let oneUser = (await Users.find({_id : ObjectId(userId)}).toArray()).map(prepare);
				let friendsUser = oneUser[0].friends.map(toObjectId);
				
				let suggFriends = (await Users.find({
								  _id : {
									$nin : friendsUser
									}
								}).toArray()).map(prepare);
								
				let searchCurrentUser = suggFriends.findIndex((user) => (user._id === userId));
				let newUserData = suggFriends.slice(searchCurrentUser+1,searchCurrentUser+4);
				
			  return {
				  pageInfoUsers : {
					  hasPreviousCursor : false,
					  hasNextCursor : true,
					  startCursor : newUserData[0]._id,
					  endCursor : newUserData[newUserData.length-1]._id,
				  },
				  suggestions : newUserData,
			  }
			},
		  addLibrary : async (root, {userId,libraryId}) => {
				let updateStatus = (await Users.update(
								{_id : ObjectId(userId)},
								{$push : {
									library : libraryId,
								}},{ upsert : true, multi : true }));
				let oneUsers = (await Users.find({_id : ObjectId(userId)}).toArray()).map(prepare);
			return oneUsers[0];
		},
		  addLikePost : async (root, {idPost,userId}) => {
				let updateStatus = (await Posts.update(
								{_id : ObjectId(idPost)},
								{$push : {
									likes : userId,
								}},{ upsert : true, multi : true }));
				let onePost = (await Posts.find({_id : ObjectId(idPost)}).toArray()).map(prepare);
			return onePost[0];
		},
		  addDislikePost : async (root, {idPost,userId}) => {
				let updateStatus = (await Posts.update(
								{_id : ObjectId(idPost)},
								{$push : {
									likes : userId,
								}},{ upsert : true, multi : true }));
				let onePost = (await Posts.find({_id : ObjectId(idPost)}).toArray()).map(prepare);
			return onePost[0];
		},
		  mutateSharebilityPost : async (root, {idPost, sharebility}) => {
				let updateStatus = (await Posts.update(
								{_id : ObjectId(idPost)},
								{$set : {
									sharebility : sharebility,
								}},{ upsert : true, multi : true }));
				let onePost = (await Posts.find({_id : ObjectId(idPost)}).toArray()).map(prepare);
			return onePost[0];
		},
		  addChats : async (root, {firstOwner, secondOwner,digitalSign,text,}) => {
				let  messages = { digitalSign ,text ,
								  when : new Date(),id : uuidv4()};
				let updateStatus = (await Chats.update(
										{firstOwner : firstOwner,secondOwner : secondOwner},
										{$push : { messages }},
										{ upsert : true, multi : true }));
				let newChat = (await Chats.findOne({firstOwner : firstOwner,secondOwner : secondOwner}));
				return newChat
			},
		addCommentsPost : async (root, {idPost, idUser, commentText}) => {
				let updateStatus = (await Posts.update(
								{_id : ObjectId(idPost)},
								{$push : {
									comments : {
										ownerId : idUser,
										text : commentText,
										when : new Date(),
										id : uuid.v4(),
									},
								}},{ upsert : true, multi : true }));
				let onePost = (await Posts.find({_id : ObjectId(idPost)}).toArray()).map(prepare);
				return onePost[0];
				
		},
		posts : async (root, {ownerId,pathImage}) => {
				let newPost = Object.assign({},postShape,{
								ownerId : ownerId,
								publicAt : new Date(),
								Picture : pathImage,
							});
				let insertPost = (await Posts.insert(newPost));
				return (await Posts.find({}).toArray()).map(prepare);
			},
		addUser : async (root, {input}) => {
				let newUser = Object.assign({},userShape,{
								isId : uuid.v4(),
								personals : {
									username : input.username,
									password : input.password,
									middlename : input.middlename,
									firstname : input.firstname,
									picture : "",
								},
								accountType : input.accountType,
							});
				let insertUser = (await Users.insert(newUser));
				let currentUser = (await Users.find({
							"personals.username" : input.username,
							"personals.password" : input.password,
						}).toArray()).map(prepare);
				let insertUserNotif = (await Notification.insert(Object.assign({},notifiTempl,{
					owner : currentUser[0]._id
				})));
				return currentUser
			},
	  },
		  Subscription: {
			courseLikers : {
			  subscribe: () => pubsub.asyncIterator(COURSE_LIKER),
			},
			messageCreated: {
			  subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
			},
			messages : {
			  subscribe: () => pubsub.asyncIterator(CHAT_STREAM),
			},
		  },
		};

		const server = new ApolloServer({
		  typeDefs,
		  resolvers,
		});
		
		
		
		/* app.get('/',(req,res)=> {
		  res.sendFile(__dirname + '/hello.html');
		 
		}); */
		/* var storage = multer.diskStorage({
			destination: (req, file, cb)=>  { 
				cb(null, './uploads'); 
			},
			filename: (req, file, cb)=> { 
				cb(null , file.fieldname + '-' + Date.now()+ '.' +file.originalname.split('.')[1]);
			}
		}); */
	
		/* app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
			try {
				res.send(req.files);
			} catch(error) {
				  console.log(error);
				   res.send(400);
			}
		}); */
		
		/* var storage = multer.diskStorage({
		  destination: function (req, file, cb) {
			cb(null, 'uploads')
		  },
		  filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now())
		  }
		})
  */	
		/* var upload = multer({ storage: storage })
		app.post('/uploadfile', upload.single('filetoupload'), (req, res, next) => {
		  const file = req.file
		  if (!file) {
			const error = new Error('Please upload a file')
			error.httpStatusCode = 400
			return next(error)
		  }
			res.send(file)
		});
		 */


		/* app.post('/inner/books/fileupload',(req,res)=>{
			var form = new formidable.IncomingForm();
			form.parse(req, (err, fields, files)=>{
			  var oldpath = files.filetoupload.path;
			  var newpath = 'C:/Users/Administrateur/Documents/whiteblue/whiteblue-server/server/src/books/' + files.filetoupload.name;
			  fs.rename(oldpath, newpath, (err)=>{
				if (err) throw err;
				res.write('File uploaded and moved!');
				res.redirect('/');
			  });
			 });
			 res.status(200);
			 res.redirect('/');
		}); */
		app.use(express.static('static'));
		
		server.applyMiddleware({ app, path: '/graphql' });

		const httpServer = createServer(app);
		server.installSubscriptionHandlers(httpServer);

		 httpServer.listen({ port: 8000 }, () => {
		  console.log('Apollo Server on http://localhost:8000/graphql');
		});
		
		let id = 2;

		setInterval(() => {
		  pubsub.publish(MESSAGE_CREATED, {
			messageCreated: { id, content: new Date().toString() },
		  });id++;
		}, 1000);
		setInterval(() => {
		  pubsub.publish(CHAT_STREAM, {
			messages : { digitalSign : "81478f9b277",text : "5064468978f" ,when : new Date(),id : id+1 },
		  });
		  id++;
		}, 1000);
	}catch(e){
		console.log(e)
	}
}
start();



