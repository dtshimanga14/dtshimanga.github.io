	const v_requester = {
		promotionId : "",
		requesters : [],
	};
	const responder = {
		responders : [],
	};
	const assessmentShape = {
			Id : "",
			header: "", 
			fields: "", 
			promotionId: "", 
			courseId: "", 
			teacherId: "", 
			description: "", 
			startDay : new Date(),
			endDay : new Date(),
			duration : 60,
			questionList: []
		};
	
	const notifiTempl = {
		owner : "",
		notifications : []
	};
	 const notificationMessage ={
		 owner : "",
		 NotifId : "",
		 destinator :"",
		 time : new Date(),
		 status : "no",
		 message : "",
		 answer :"no",
	 };
	 const userShape = {
		isId : 0,
		personals : {
			username : "",
			password : "",
			middlename : "",
			firstname : "",
			picture : "",
			birthday : new Date(),
			gender : "",
			maritalStatus : "",
			Email : "",
			nationality : "",
			phoneNumber : "",
			country : "",
			town : "",
			quarter : "",
			street : "",
			number : "",
			description : "",
		},
		accountType : "",
		tutors : [],
		friends : ["5dd5a21099f69611cc23b4d8"],
		askRelationship : [],
		lastSeenOnline : new Date(),
		library : [],
		articles :[],
		certificats : [],
		classes :[],
		fields :[],
		pupils :[],
		schedules :[],
		books :[],
		kids :[],
		notifications : {},
		promotions : [],

	};
	
	const schoolShape = {
		fonder : "",
		name : "",
		logo : "",
		address : [{
			country : "",
			state : "",
			town : "",
			township : "",
			street : "",
			number : "",
			reference : "",
		}],
		contact : [{
			phone : "",
			email : "",
		}],
		location : [{
			latitude : 0,
			longitude : 0,
			altitude : 0,
		}],
		classes : [
			{
				id : "",
				courseScheduleId : "",
				courses : [{
					id : "",
					name : "",
					teacher : "",
					assistant : "",
				}],
				previousPromotion : "",
				nextPromotion : "",
				year : "",
			},
		]
	};
	const chatShape = {
		firstOwner : "",
		secondOwner : "",
		messages : [{
			digitalSign : "",
			text : "say hello to your newly friend",
			when : new Date(),
			id : "",
		}],
	}; 
	
	const postShape = {
		ownerId : "",
		publicAt : new Date(),
		filename : "",
		totalComments : 0,
		totalLike : 0,
		comments : [],
		sharebility : false,
		certifiedBy : "",
		likes : [],
		sharers : [],
	};
const books = {
	  picture : "",
	  tittle : "",
	  subTittle : "",
	  author : "",
	  editor : "",
	  filename : "",
	  publishDay : "",
	}
const addressShape = {
				identity :{
					username : "",
					middlename : "",
					firstname : "",
				},
				contact :{
					country : "",
					town : "",
					quarter : "",
					street : "",
					number : 0,
					picture : ""
				},

};
	const cvShape = {
				identity :"",
				studies : [{
							startedYear : 0,
							endedYear : 0,
							school : "",
							degree : "",
							field : ""
						},
					],
			description : "",
			professionnalsExperiences : [
				{
					workAs : "",
					at : "",
					duration : ""
				}
			],
			assets : [{something : ""}]

};
	const certificatShape ={
							id : '',
							emitter : {
								university : '',
								option : '',
								orientation : '',
								faculty : '',
								level : '',
								year : '',
								logo : '',
								signBy : "",
							},
							courses : [{
								tittle : '',
								durationCourse : 0,
								durationPracticeWork : 0,
								ponderation : 0,
								cote : 0,
								lastUpdate : ''
							}],
							total : 0,
							mention : '',
							editDate : new Date(),
						};
	const bookStoreShape = {
		_id : "",
		 schoolId : "",
		 promotionId : "",
		 books : []
	};					
	const promotionShape = {
		schoolId : "",
		createAt : new Date(),
		promotionName : "",
		promotionLevel : "",
		orientationName : "",
		scheduleId : "",
		pupils : [],
		courses : [],
		lastUpdate : new Date(),
	};
	const Paragraph = {
						type :"text",
						content : "",
						};
	const sectionCourse = {	
					sectionId : "",
					tittle : "",
					paragraphs : [],
				};
			
	const courseShapeTwo = {
			header : "",
			fields : "",
			description : "",
			authors : "",
			approvor : "",
			section : [],
		};
	const courseShape = {  
		createdDate : new Date(), 
		lastUpdate : new Date(),
		teacherId : "", 
		promotionId : "", 
		name : "",
		ponderation : 1,
		sections : [],
		approvedBy : [],
        likers : [ ],
        dislikers : [ ]
	};
	
	const sessionQL = {
					  courseId : "",
					  courseName : "",
					  startHour : "",
					  endHour : "",
					  dayOfWeek : "",
					  startDay : "",
					  endingDay : "",
					};
	const scheduler = {
					creator: "",
					promotionId : "",
					sessions : []
				}
	const History = {
		ownerId : "",
		currentDate : "",
		pages : []
	};
export {userShape, assessmentShape,chatShape,postShape, schoolShape,courseShapeTwo,sectionCourse,Paragraph,
		certificatShape,cvShape,promotionShape,v_requester,scheduler,sessionQL,
		bookStoreShape,courseShape,notifiTempl,notificationMessage,History };