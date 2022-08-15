var db = new Mongo().getDB("whiteblue");
db.chats.insert({
	firstOwner : "5cc0c2ca6176aed2cf4cae92",
	secondOwner : "5cc0a974b584a165f4372ef2",
	messages : [],
});

db.chats.update({
	firstOwner : "5cc0c2ca6176aed2cf4cae92",
	secondOwner : "5cc0a974b584a165f4372ef2",
},{$set : {
	messages : [{
		digitalSign : "5cc0c2ca6176aed2cf4cae92",
		text : "Hello sister, how are you?",
		when : new Date(),
	}],
}},{ upsert : true, multi : true });

db.chats.update({
	firstOwner : "5cc0c2ca6176aed2cf4cae92",
	secondOwner : "5cc0a974b584a165f4372ef2",
},{$push : {
	messages : {
		digitalSign : "5cc0a974b584a165f4372ef2",
		text : "Hi bro, i'am fine and you? it's been a while",
		when : new Date(),
	},
}},{ upsert : true, multi : true });