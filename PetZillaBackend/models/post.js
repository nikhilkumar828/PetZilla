
//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const PostlistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    imgSrc: {
        type: String
    }
});

//Create a model using mongoose.model and export it
const PostList = module.exports = mongoose.model('PostList', PostlistSchema );


//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
	PostList.find(callback);
}

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
	newList.save(callback);
}


//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.deleteListById = (id, callback) => {
	let query = {_id: id};
	PostList.remove(query, callback);
}

