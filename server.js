var express = require('express');
const nodemailer = require('nodemailer');
var cors = require('cors');
var app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

function sendMail(to, subject, message) {
  var smtpConfig = {
    service: 'Gmail',
    auth: {
      user: 'bimrani816@gmail.com',
      pass: 'rana7441634',
    },
  };
  var transporter = nodemailer.createTransport(smtpConfig);
}
var message = '<p>This is HTML content</p>';
sendMail('bimrani816@gmail.com', 'Welcome to ExpertPHP.in', message);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.post('/hireus', cors(), async function (req, res) {
  const message = req.params.description;
  console.log(req.params);
  var mailOptions = {
    from: `"Bilal Imrani" <${req.body.email}>`, // sender address
    to: 'bimrani816@gmail.com', // list of receivers
    subject: 'Hire Us', // Subject line
    text: message, // plaintext body
    html: `<p>${message}</p>`, // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return;
      res.send({ status: 400 });
    } else {
      return;
      res.send({ status: 200 });
    }
  });

  res.send({ status: 200 });
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});
