import {MongoClient, ObjectId} from 'mongodb';
import express from 'express';
import fs from 'fs';
import moment from 'moment';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import { ApolloServer, gql } from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import session from 'cookie-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {typeDefs,typeDefs2} from "./schema";
import uuid from 'uuid';
import { userShape,chatShape,postShape,promotionShape,assessmentShape,Paragraph,History,
		schoolShape,certificatShape,cvShape,courseShape,courseShapeTwo,sectionCourse,
		notificationMessage,notifiTempl,v_requester,scheduler,sessionQL,dateQL} 
   from "./dataShape/userShape";

import * as loaders from './loaders.js';
import Courses from './courses.js';
import cert from './certificats.js';
import upload from './upload.js';


import { createServer } from 'http';
import { PubSub } from 'apollo-server';


const pubsub = new PubSub();
const MESSAGE_CREATED = 'MESSAGE_CREATED';


const prepare = (o) => {
    o._id = o._id.toString()
    return o
};
const toObjectId = (_id) => {
    return  ObjectId(_id)
}

const app = express();
const Cr = Courses.courses,
	Ct = cert.certificats;
app.use(cors());

const homePath = '/graphiql';
const URL = 'http://localhost';
const PORT = 3001;
const MONGO_URL = 'mongodb://localhost:27017/whiteblue';



export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL)

    const Posts = db.collection('posts');
    const Chats = db.collection('chats');
    const Users = db.collection('users');
    const Promotions = db.collection('promotions');
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
    const resolvers = {
      Query: {
		  messages: () => [
			  { id: 0, content: 'Hello!' },
			  { id: 1, content: 'Bye!' },
			],
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
			let newFriends = (await Users.find({ _id : { $in : oneUser[0].friends.map(toObjectId) }}).toArray()).map(prepare);
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
				let cote =  searchResponder ? searchResponder.cote : 0
			  return Object.assign({},assess,{ courseId : Course.findOne({ _id : ObjectId(assess.courseId) }),
											done ,starttime,endtime , cote,
											teacherId : Users.findOne({ _id : ObjectId(assess.teacherId) }) });
		  });
        },
		getNotification :async (root, { id }) => {
          return (await Notification.findOne({ owner : id}))
        },
		suggestionsFriends : async (root, { next ,previous,id }) => {
			let oneUser = (await Users.find({_id : ObjectId(id)}).toArray()).map(prepare);
			let friendsUser = oneUser[0].friends.map(toObjectId);
			
			let suggFriends = (await Users.find({
							  _id : {
								$nin : friendsUser
								}
							}).toArray()).map(prepare);
							
			let searchCurrentUser = suggFriends.findIndex((user) => (user._id === next));
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
          let Courses = (await Course.find({}).toArray()).map(
			(o)=>  {
				let approvals = Users.find({_id : {$in : o.approvedBy.map(toObjectId)}}).toArray();
				return Object.assign({},o,{_id : o._id.toString(),
						teacherId :  Users.findOne({_id : ObjectId(o.teacherId)}),
						approvedBy : approvals
				})
			}
		  );
		  return Courses;
        },
		getCourses : async (root, {promotionId}) => {
          let Courses = (await Course.find({ promotionId }).toArray());
		  return Courses.map((Course)=>{
			  return Object.assign({},Course,{_id : Course._id.toString(),
						teacherId :  Users.findOne({_id : ObjectId(Course.teacherId)}),
						approvedBy : Users.find({_id : {$in : Course.approvedBy.map(toObjectId)}}).toArray()
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
		
		getCoreCourses : async (root,{courseId,ownerId}) => {
					let currDay = moment().format('YYYY-MM-DD');
					let dailyHistory = (await Histories.findOne({ ownerId, currentDate :currDay }));
					if(dailyHistory){
						let newHistory = (await Histories.update({ownerId,currentDate : currDay},{
								  $push : { pages : { id : uuid.v4(), links :`/inner/Course/${courseId}`,
												linkName : "Course",
												getInOn : new Date(),
												getOutOn : new Date()}}
							  },{ upsert : true }))
					}else{
							let newHistory = (await Histories.insert(Object.assign({},History,{
							ownerId : ownerId,currentDate : currDay, pages : [{ id : uuid.v4(),
							links :`/inner/Course/${courseId}`,
							linkName : "Course",getInOn : new Date(),getOutOn : new Date()}]
						})))
					}
					let coreCourses = (await Course.findOne({ _id : ObjectId(courseId) }));
					return Object.assign({},coreCourses,{ 
									teacherId : Users.findOne({ _id : ObjectId(coreCourses.teacherId) }),
									approvedBy : Users.find({_id : {$in : coreCourses.approvedBy.map(toObjectId)}}).toArray()
								});
        },
		getRequesters : async (root,{promotionId}) => {
					let requesters = (await Requester.findOne({promotionId : promotionId}));
					let rmRequesters = requesters.requesters.map((requester)=> {
							let userRequester = Users.findOne({_id : ObjectId(requester.ownerId)});
						return Object.assign({},requester,{ ownerId : userRequester });				
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
		getAnAssess : async (root, {id}) => {
			let assess = (await Assessments.findOne({_id : ObjectId(id)}))
				return Object.assign({},assess ,
							{ teacherId : Users.findOne({_id : ObjectId(assess.teacherId)}),
							  courseId : Course.findOne({_id : ObjectId(assess.courseId)})
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
			let cote = myAnswers ?  myAnswers.cote : 0;
			return Object.assign({},assess,{ questionList : newQuestionList ,
						cote,
						teacherId : Users.findOne({ _id : ObjectId(assess.teacherId) })
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
			let newAssessTab = assessTab.map((assess)=>{
				let newCount = Responder.find({ assessId :  assess._id }).count()
					return Object.assign({},assess,{
						count : newCount,
						courseId : Course.findOne({_id : ObjectId(assess.courseId)})
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
				let reqStatus = await Course.update({_id : ObjectId(userId)},{
					$addToSet : { likers : userId }
				});
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
			return (await Responder.findOne({ownerId,assessId}))
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
										NotifId : uuid.v4(),
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
									text : "hello friend",
									when : new Date(),
									id : uuid.v4(),
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
				let updateStatus = (await Chats.update(
								{firstOwner : firstOwner,secondOwner : secondOwner},
								{$push : {
									messages : {
										digitalSign : digitalSign,
										text : text,
										when : new Date(),
										id : uuid.v4(),
									},
								}},{ upsert : true, multi : true }));
				return (await Chats.findOne({firstOwner : firstOwner,secondOwner : secondOwner}))
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
		addKid : async (root, { parentId, username, middlename, firstname, password, genre, accountType }) => {
				let newUser = Object.assign({},userShape,{
								isId : uuid.v4(),
								personals : {
									username ,password ,
									middlename ,firstname ,
									picture : "", genre
								},
								accountType : input.accountType,
							});
				let insertUser = (await Users.insert(newUser));
				let newParent = 
				let currentUser = (await Users.find({
							"personals.username" : input.username,
							"personals.password" : input.password,
						}).toArray()).map(prepare);
				let insertUserNotif = (await Notification.insert(Object.assign({},notifiTempl,{
					owner : currentUser[0]._id
				})));
				return currentUser
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
									genre : input.genre,
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
		messageCreated: {
		  subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
		},
	  },
      Bookstore : {
        isIdSchool : async () => {
          return (await Schools.findOne({}))
        },
        isIdPromotion: async () => {
          return (await Promotions.findOne({}))
        },
	  },
      PromotionEx : {
        idSchool : async () => {
          return (await Schools.findOne({}))
        },
	  },
      Post: {
        ownerId: async () => {
          return (await Users.findOne({}))
        },
	  },
      User: {
        friends: async () => {
          return (await Users.find({}).toArray()).map(prepare)
        },
        posts: async () => {
          return (await Posts.find({}).toArray()).map(prepare)
        },
		children: async () => {
          return (await Users.find({}).toArray()).map(prepare)
        },
		memberOf: async () => {
          return (await Promotions.find({}).toArray()).map(prepare)
        },
		bookstore: async () => {
          return (await Bookstores.find({}).toArray()).map(prepare)
        },
		askRelationship: async () => {
          return (await Users.find({}).toArray()).map(prepare)
        },
	  },
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });



	

    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
	app.use(cookieParser())
	   .use(session({secret : 'tTh51m5591'}))
	   .use(express.static('static'));
	
	app.post("/upload", upload);
    app.use(homePath, graphiqlExpress({endpointURL: '/graphql'}));
    app.get('/api/courses',(req,res)=>{
		res.json(Cr);
	}).get('/api/certificats/:certificatId',(req,res)=>{

		let certId = req.params.certificatId;
		let objctId = {'id' : 1};
		loaders.getChertificats(res,objctId);


	}).listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}${homePath}`)
    });

  } catch (e) {
    console.log(e)
  }

}


