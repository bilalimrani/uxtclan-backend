var express = require('express');
const nodemailer = require('nodemailer');
var app = express();

let testAccount = nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', async function (req, res) {
  // ejs render automatically looks in the views folder
  let info = transporter.sendMail({
    from: 'bimrani816@gmail.com', // sender address
    to: 'bimrani816@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
  res.render('index');
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});
