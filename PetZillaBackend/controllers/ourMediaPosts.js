//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const postlist = require('../models/post');

//GET HTTP method to /postlist
router.get('/',(req,res) => {
    postlist.getAllLists((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();
    }
    });
});


//POST HTTP method to /postlist

router.post('/', (req,res,next) => {
    let newPost = new postlist({
        title: req.body.title,
        description: req.body.description,
        imgSrc: req.body.src
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

module.exports = router;