// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//Posts
const bucketlist = require('./PetZillaBackend/controllers/ourMediaPosts');



// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// [SH] Require Passport
var passport = require('passport');

// [SH] Bring in the data model
require('./PetZillaBackend/models/users');

// Connect mongoose to our database
const config = require('./PetZillaBackend/config/database');
// [SH] Bring in the Passport config after model is defined
const configAuth = require('./PetZillaBackend/config/passport');

//Initialize our app variable
const app = express();

//Connect mongoose to our database
mongoose.connect(config.database,{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


//Declaring Port
const port = 5000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use("/images", express.static(path.join("./PetZillaBackend/images")));
app.use("/rescueImages", express.static(path.join("./PetZillaBackend/rescueImages")));

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));


//Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/ourmedia',bucketlist);

//Login
var routesApi = require('./PetZillaBackend/routes/authRoutes');
app.use('/auth', routesApi);

//RescueController
const rescueCtrl = require('./PetZillaBackend/controllers/rescueController');
app.use('/rescue', rescueCtrl);


app.get('/', (req,res) => {
    res.send("Invalid page");
})

//Listen to port 3000
app.listen(process.env.PORT || port, () => {
    console.log(`Starting the server at port ${port}`);
});

