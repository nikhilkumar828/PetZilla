
//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const RescuePostSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: String,
    imgSrc: {
        type: String
    },
    author: {
        type: String,
        require: true
    },
    followers: { 
        type: Number,
        default: 0
    },
    follwedIDs: {
        type: Array
    },
    createdDate: {
        type: Date
    },
    documents: {
        type: Array
    },
    mobileNo: {
        type: Number
    },
    authorId: {
        type: String
    },
});

//Create a model using mongoose.model and export it
const PostList = module.exports = mongoose.model('RescuePost', RescuePostSchema );


//BucketList.find() returns all the lists
module.exports.getAllLists = (callback , pageSize , page ) => {
    PostList.find(callback).skip(pageSize * (page - 1)).limit(pageSize);
}

//Posts count
module.exports.postsCount = () => {
   return PostList.count();
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

//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.followPostById = (postId, userId, callback) => {
	let query = {_id: postId};
	PostList.findByIdAndUpdate(query, { $inc: { followers: 1 } , $push: { follwedIDs : userId} }, callback);
}

//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.unFollowPostById = (postId, userId, callback) => {
	let query = {_id: postId};
	PostList.findByIdAndUpdate(query, { $inc: { followers: -1 } ,  $pull: { follwedIDs : userId} }, callback);
}
