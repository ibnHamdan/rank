var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'ibnHamdan',
    api_key: 'q2e4.SendGrid'
  }
}

var client = nodemailer.createTransport(sgTransport(options));

var email = {
  from: 'ibnHamdan@msn.com',
  to: 'ibnHamdan@msn.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(err);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});