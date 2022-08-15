
import {MongoClient, ObjectId} from 'mongodb'

	const MONGO_URL = 'mongodb://localhost:27017/whiteblue';
	const db  = async () =>{
					return (await MongoClient.connect(MONGO_URL));
	};


  export  const resolvers = {
      Query: {
        posts: async (root, { index ,limit }) => {
			const Posts = db.collection('posts');
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
					const Chats = db.collection('chats');
          return (await Chats.findOne({ firstOwner : firstOwner,secondOwner : secondOwner}))
        },
        users: async () => {
			const Users = db.collection('users');
          return (await Users.findOne({}))
        },
        friends: async () => {
			const Users = db.collection('users');
          return (await Users.find({}).toArray()).map(prepare)
        },
        schedules: async () => {
				const Schedule = db.collection('schedule');
          return (await Schedule.findOne({}))
        },
		libraries : async () => {
			const Bookstores = db.collection('bookstores');
          return (await Bookstores.find({}).toArray()).map(prepare)
        },
      },
	  Mutation : {
		  chats : async (root, {input}) => {
				let updateStatus = (await Chats.update(
								{firstOwner : input.firstOwner,secondOwner : input.secondOwner},
								{$push : {
									messages : {
										digitalSign : input.digitalSign,
										text : input.text,
										when : new Date(),
									},
								}},{ upsert : true, multi : true }));
				return (await Chats.findOne({firstOwner : input.firstOwner,secondOwner : input.secondOwner}))
			},
	  },
	  Subscription : {
		  like : async (root,id) => {
					const Posts = db.collection('posts');
					let updatePost = (await Posts.update({_id : ObjectId(id)},{$inc : {totalLike : 1}}));
					return (await Posts.find({_id : ObjectId(id)}).toArray()).map(prepare);
		  },
	  },
      Bookstore : {
        isIdSchool : async () => {
		const Schools = db.collection('schools');
          return (await Schools.findOne({}))
        },
        isIdPromotion: async () => {
			const Promotions = db.collection('promotions');
          return (await Promotions.findOne({}))
        },
	  },
      User: {
        friends: async () => {
			const Users = db.collection('users');
          return (await Users.find({}).toArray()).map(prepare)
        },
        posts: async () => {
			const Posts = db.collection('posts');
          return (await Posts.find({}).toArray()).map(prepare)
        },
		children: async () => {
			const Users = db.collection('users');
          return (await Users.find({}).toArray()).map(prepare)
        },
		memberOf: async () => {
			const Promotions = db.collection('promotions');
          return (await Promotions.find({}).toArray()).map(prepare)
        },
		bookstore: async () => {
			const Bookstores = db.collection('bookstores');
          return (await Bookstores.find({}).toArray()).map(prepare)
        },
		askRelationship: async () => {
			const Users = db.collection('users');
          return (await Users.find({}).toArray()).map(prepare)
        },
	  },
    }