
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
    },
    author: {
        type: String,
        require: true
    },
    likes: { 
        type: Number,
        default: 0
    },
    likedUserIDs: {
        type: Array
    },
    createdDate: {
        type: Date
    }
});

//Create a model using mongoose.model and export it
const PostList = module.exports = mongoose.model('PostList', PostlistSchema );


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
module.exports.likePostById = (postId, userId, callback) => {
	let query = {_id: postId};
	PostList.findByIdAndUpdate(query, { $inc: { likes: 1 } , $push: { likedUserIDs : userId} }, callback);
}

//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.disLikePostById = (postId, userId, callback) => {
	let query = {_id: postId};
	PostList.findByIdAndUpdate(query, { $inc: { likes: -1 } ,  $pull: { likedUserIDs : userId} }, callback);
}
