var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const randomString = require('randomstring');
const sendMailToUser = require('../config/mail');
var nodemailer = require('nodemailer');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }



  // Make sure this account doesn't already exist
  User.findOne({ email: req.body.email }, function (err, user) {
 
    // Make sure user doesn't already exist
    if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
 
    // Create and save the user
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.code = randomString.generate(5);
    user.setPassword(req.body.password);

    user.save(async function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
 
        // Create a verification token for this user
        var token = user.generateJwt();
 
        
            // Send the email
            var transporter = nodemailer.createTransport({
              service: 'gmail',
                auth: {
                      user: 'petzilla0@gmail.com',
                      pass: 'petZilla@007'
                  }
             });
            let host = req.headers.host;
            let url = `http://localhost:4200/login/confirmation/?userId=${user.email}&code=${user.code}`;
            var mailOptions = { from: 'petZilla0@gmail.com', to: user.email, subject: 'Account Verification ', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n' + url + '\nRegards,\nPetZilla.', };
            console.log(mailOptions.text);
            let info = await transporter.sendMail(mailOptions, function (err) {
              console.log('sending');
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
    });
  });


//   user.save(function(err) {
//     var token;
//     token = user.generateJwt();
//     res.status(200);
//     res.json({
//       "token" : token
//     });
//   });
// });

}

module.exports.confirmMail = function(req, res) {

  const mailId = req.body.userMail;
  const code = req.body.code;

  User.findOne({ email: mailId }, function (err, user) {
    if(user){
      if(user.code === code){
        user.code = '';
        user.isVerified = true;
        res.status(200);
        res.json({
          "msg" : 'Verified Succesfully',
          status : user.isVerified
        });
      }
      else{
        res.status(501);
        res.json({
          "msg" : 'Code Error',
          status : user.isVerified
        });
      }
    } else {
      res.status(501);
        res.json({
          "msg" : 'No user with specified ID',
          status : false
        });
    }
  });

  
};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "user" : {
          name: user.name,
          id: user.id,
          role: user.role
        }
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};