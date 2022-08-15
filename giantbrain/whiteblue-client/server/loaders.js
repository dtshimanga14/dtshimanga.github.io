
import {MongoClient, ObjectId} from 'mongodb';

let url = 'mongodb://localhost:27017';
let urldb = 'mongodb://localhost:27017/whiteblue';
// Database Name
let dbName = 'whiteblue';

export const getAccess = (name,pwd,res) => {
	
		MongoClient.connect(url, function(err, client) {
				const db = client.db(dbName);
				db.collection('users').find({'personals.username' : name,'personals.password' : pwd})
					.toArray(function(err, store) {
						client.close();
						res.json(store[0]);
						console.log('Result of find:', store[0]);
					});
			});
};

export const getAccessQL = (name,pwd) => {
		let user;
		MongoClient.connect(url, function(err, client) {
				const db = client.db(dbName);
				db.collection('users').find({'personals.username' : name,'personals.password' : pwd})
					.toArray(function(err, store) {
						client.close();
						user = store[0];
					});
			});
		return user;
};

export const getPostsQLPromises = (source, tabFilterPosts) => {
	return new Promise ((resolve,reject) => {
			return MongoClient.connect(url,{ useNewUrlParser : true }, function(err, client) {
					 client.db(dbName).collection('posts')
						.find({ ownerId : {$in : tabFilterPosts }})
							.toArray(function(err, store) {
										client.close();
										console.log('Result of find:', source);
										return store;
									});
				});
	});
};
// export const getPostsQL2 = async () {
// 	let posts = await getPostsQLPromises();
// 	return posts;
// };

export const getTestQL = () => {
	 						MongoClient.connect(url,{ useNewUrlParser : true }, function(err, client) {
			 					const db = client.db(dbName);
			 					let fb = db.collection('tests').find({ text : 'hello world'},{ text : 1})
			 										.toArray(function(err, store) {
						 									client.close();
						 									console.log('Result of find:', store);
					 									return store;
				 								});
		 						return fb;
	 				});
	 		};
export const getChatsQL = (tabFilterChats,inverseTabFilterChats) => {

		return MongoClient.connect(url,{ useNewUrlParser : true }, function(err, client) {
					client.db(dbName).collection('chats').find({ $or : [tabFilterChats,inverseTabFilterChats]})
										.toArray(function(err, store) {
												client.close();
												console.log('Result of find:', store);
											});
						});
};

export const getPostsQL = (tabFilterPosts) => {
		 MongoClient.connect(url,{ useNewUrlParser : true }, function(err, client) {
				return client.db(dbName).collection('posts')
								.find({ ownerId : {$in : tabFilterPosts }})
									.toArray(function(err, store) {
										client.close();
										console.log('Result of find:', store);
										return store;
									});
						});

};
export const getPosts = (res,tabFilterPosts) => {

		MongoClient.connect(url, function(err, client) {
				const db = client.db(dbName);
				db.collection('posts').find({ ownerId : {$in : tabFilterPosts }})
					.toArray(function(err, store) {
						client.close();
						console.log('Result of find:', store);
						res.json(store);
					});
			});
};

export const getFriends = (res,tabFilterFriends) => {

		MongoClient.connect(url, function(err, client) {
				const db = client.db(dbName);
				db.collection('users').find({isId : {$in : tabFilterFriends }})
					.toArray(function(err, store) {
						client.close();
						console.log('Result of find:', store[0]);
						res.json(store);
					});
			});
};


export const getChats = (res,tabFilterChats,inverseTabFilterChats) => {

		MongoClient.connect(url, function(err, client) {
			const db = client.db(dbName);
			db.collection('chats').find({
				$or : [tabFilterChats,inverseTabFilterChats]
			}).toArray(function(err, store) {
				console.log('Result of find:', store);
				res.json(store[0]);
				client.close();
			});
		});
};

export const getChertificats = (res,objctId) => {

		MongoClient.connect(url, function(err, client) {
					const db = client.db(dbName);
					db.collection('certificats').find({$or : [objctId]}).toArray(function(err, store) {
						console.log('Result of find:', store);
						res.json(store);
						client.close();
					});
				});
};
