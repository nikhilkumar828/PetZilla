//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const multer = require("multer");

const postlist = require('../models/rescuePosts');


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });


//GET HTTP method to /postlist
router.get('/',(req,res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = postlist.find().sort({createdDate : -1});
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
      .then(documents => {
        fetchedPosts = documents;
        return postlist.count();
      })
      .then(count => {
        res.status(200).json({
          success:true,
          message: "Posts fetched successfully!",
          lists: fetchedPosts,
          maxPosts: count
        });
      })
      .catch( err => {
        res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
      });


});


//POST HTTP method to /postlist

router.post('/',
            multer({ storage: storage }).single('image'),
            (req,res,next) => {
                const url = req.protocol + "://" + req.get("host");
    let newPost = new postlist({
        description: req.body.description,
        imgSrc: url + "/rescueImages/" + req.file.filename,
        author: req.body.author,
        createdDate: new Date(),
        mobileNo: parseInt(req.body.mobileNo),
        authorId: req.body.mailId
    });
    postlist.addList(newPost,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Added successfully."});

    });
});

//DELETE HTTP method to /postlist. Here, we pass in a param which is the object id.

router.delete('/:id', (req,res,next)=> {
  //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
  //Call the model method deleteListById
  postlist.deleteListById(id,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    })
});

router.put('/follow/:id', (req,res,next)=> {
    //access the parameter which is the id of the item to be deleted
      let id = req.params.id;
      let boolean = req.body.value;
      const userId = req.body.userId;
    //Call the model method deleteListById
    if(boolean){
        postlist.likePostById(id,userId,(err,list) => {
            if(err) {
                res.json({success:false, message: `Failed to like the post. Error: ${err}`});
            }
            else if(list) {
                res.json({success:true, message: "Liked successfully"});
            }
            else
                res.json({success:false});
        })

    }
    else {
        postlist.disLikePostById(id,userId,(err,list) => {
            if(err) {
                res.json({success:false, message: `Failed to dislike the post. Error: ${err}`});
            }
            else if(list) {
                res.json({success:true, message: "Disliked successfully"});
            }
            else
                res.json({success:false});
        })

    }
    
  });

module.exports = router;