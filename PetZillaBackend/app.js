// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//Posts
const bucketlist = require('./controllers/ourMediaPosts');



// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// [SH] Require Passport
var passport = require('passport');

// [SH] Bring in the data model
require('./models/users');

// Connect mongoose to our database
const config = require('./config/database');
// [SH] Bring in the Passport config after model is defined
const configAuth = require('./config/passport');

//Initialize our app variable
const app = express();

//Connect mongoose to our database
mongoose.connect(config.database);
mongoose.connect(configAuth.database);


//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));


//Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/ourmedia',bucketlist);

//Login
var routesApi = require('./routes/authRoutes');
app.use('/auth', routesApi);

app.get('/', (req,res) => {
    res.send("Invalid page");
})

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});

