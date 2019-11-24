var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'cutebunny828@gmail.com',
         pass: 'Bunny@007'
     }
 });

 var sendMailToUser = function (firstName, to, subject, message) {

  const mailOptions = {
    from: 'cutebunny828@gmail.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: `Hello ${firstName} <br><br> ${message}`// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      return err;
    else
      return info;
 });
};


module.exports = sendMailToUser;
