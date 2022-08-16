import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import {  mongodb, ObjectId} from 'mongodb';

const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
const fs = require("fs");
const url = require("url");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(cors({ origin:'*', optionSuccessStatus:200 }));
	
	
  const prepare = (o) => {
    o._id = o._id.toString()
    return o
  };
  const toObjectId = (_id) => {
      return  ObjectId(_id)
  };

var mongoURI = "mongodb://localhost:27017/giantbrain";

var questions = [];

const dumps1 = {
	professor : {
	  id : 1,
	  fullname : "Anthony Sander",
	  course : "Modern programming practices",
	  university : "Maharishi International University",
	  picture : "./images/hawai"
	},
	feedbacks : [
	   {
		 id : 1,
		 content : "In mathematics and computer science, an algorithm alɡərɪthm (audio speaker iconlisten)) is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation.[1] Algorithms are used as specifications for performing calculations and data processing. By making use of artificial intelligence",
		 thumbsUp : 2,
		 isThumbsUp : true,
		 date : "20210721",
		 rating : 3
	   },
	   {
		  id : 2,
		  content : "In contrast, a heuristic is an approach to problem solving that may not be fully specified or may not guarantee correct or optimal results, especially in problem domains where there is no well-defined correct or optimal result",
		  thumbsUp : 23,
		  isThumbsUp : true,
		  date : "20220401",
		  rating : 4
		},
		{
		  id : 1,
		  content : "In mathematics and computer science, an algorithm (/ˈælɡərɪðəm/ (audio speaker iconlisten)) is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation.[1] Algorithms are used as specifications for performing calculations and data processing. By making use of artificial intelligence",
		  thumbsUp : 2,
		  isThumbsUp : true,
		  date : "20211221",
		  rating : 1
		},
		
  ]};

  var dumps2 = [
    {
        id : 1,
        fullname : "Peter James",
        university :  "Maharishi International University",
        course :  "Modern Web Application"
    },
    {
        id : 1,
        fullname : "Paul coroza",
        university :  "Maharishi International University",
        course :  "Algorithms"
    },
    {
        id : 2,
        fullname : "Anthony sander",
        university :  "Maharishi International University",
        course :  "Modern Programming Practices"
    },
    
    {
        id : 3,
        fullname : "Ankthuya",
        university :  "Maharishi International University",
        course :  "Fundamentals Programming Practices"
    },
];




	app.get("/api/feebacks/:id", (req, res) => {
	  return res.json(dumps1);
	})
	.get("/api/suggestions/:pattern", (req, res) => {
		const pattern = req.params.pattern;
		const data = dumps2.filter(d => d.fullname.match(pattern));
		return res.json(data);
	  })
	.post("/api/login",(req, res) => {
	  let credential = req.body;
	  res.json({ TOKEN : "test token" })
	})
	.get("/api/survey", async (req, res) => {
		// // Establish and verify connection
		// const database = await client.db("giantbrain");
		// const surveyQuestions = database.collection('surveyQuestions');
		// questions = (await surveyQuestions.find({}).toArray()).map(prepare);
		MongoClient.connect("mongodb://localhost:27017/giantbrain", 
		{native_parser:true}, 
			(err, db) => {
			db.collection('surveyQuestions',(err,collection) => {
				collection.find().toArray((err, items) => {
					if(err) throw err;    
					questions = items;

				});
			});
			});
		console.log(questions);
	  	res.json(questions);
	})
	.post("/api/signup",(req, res) => {
	  let credential = req.body;navigator
	})
	.post("/api/rate",(req, res) => {
	  let submittedSurvey = req.body;
	  console.log(submittedSurvey);
	});


const start = async () => {
  try {
	
	const httpServer = createServer(app);
	  httpServer.listen({ port: 8000 }, () => {
	  console.log('rate my professor server test on http://localhost:8000/');
	});
	
  }catch(e){
	console.log(e)
  }
}
start();



