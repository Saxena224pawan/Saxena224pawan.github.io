const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();
const app = express();

const buildPath = path.join(__dirname,  'build');
app.use(express.json());
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/send', (req, res) => {
  try {
    
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});
    const mailOptions = {
      from: req.body.email, // sender address
      to: 'pawan.saxena.portfolio@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      html: req.body.message // plain text body
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting me.'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong. Try again later'
    });
  }
});
const port = process.env.PORT || 3000;
app.listen(port);
