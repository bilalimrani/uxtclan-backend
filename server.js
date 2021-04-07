var express = require('express');
const nodemailer = require('nodemailer');
var app = express();

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <bimrani816@gmail.com>', // sender address
    to: 'bimrani816@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
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
  //   let info = transporter.sendMail({
  //     from: 'Andris <andris@kreata.ee>', // sender address
  //     to: 'bimrani816@gmail.com', // list of receivers
  //     subject: 'Hello ✔', // Subject line
  //     text: 'Hello world?', // plain text body
  //     html: '<b>Hello world?</b>', // html body
  //   });
  res.send();
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});
