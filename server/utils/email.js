const nodemailer  = require('nodemailer');
const pug         = require('pug');
const htmlToText  = require('html-to-text');
const keys        = require('../config/keys')

module.exports    = class Email {
  constructor(user, email, url) {
    this.to = email;
    //this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Team UriZa86 <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: keys.sengridUsername,
          pass: keys.sengridPassword
        }
      });
    }
    // console.log('newTransport')
    // console.log('EMAIL_HOST',keys.emailHost)
    // console.log('EMAIL_PORT',keys.emailPort)
    // console.log('EMAIL_USERNAME',keys.emailUsername)
    // console.log('EMAIL_PASSWORD',keys.emailPassword)
    return nodemailer.createTransport({
      host: keys.emailHost,
      port: keys.emailPort,
      auth: {
        user: keys.emailUsername,
        pass: keys.emailPassword
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // console.log('dirname',__dirname)
    // console.log('template',template)
    // console.log('subject',subject)
    // console.log('render',`${__dirname}/../views/email/${template}.pug`)
    // console.log('url',this.url)
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      //firstName: this.firstName,
      url: this.url,
      subject
    });

    
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    //console.log('mailOptions',mailOptions)
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
    //console.log('newTransport sendMail')
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Family!');
  }

  async sendReceipt() {
    await this.send('receipt', 'Thank you for your purchase!');
  }

  async sendResetComfirmation() {
    await this.send('resetComfirmation', 'Password was changed!');
  }

  async sendPasswordReset() {
    // console.log('sendPasswordReset')
    await this.send('passwordReset','Your password reset token is only valid for 10 minutes');
  }
};
