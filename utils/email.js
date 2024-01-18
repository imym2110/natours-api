const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Yash Maniar <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      //SENDGRID
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  send(template, subject) {
    // send actual mail
    // 1) Render HTML
    res.render('')

    //2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html:html,
      text: options.message,
    };

    //3) Create a transport and send email
  }

  sendWelcome() {
    this.send('welcome', 'welcome to natours');
  }
};

const sendEmail = async (options) => {
  //2) Define the email option

  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};
