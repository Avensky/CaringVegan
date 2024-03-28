const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
module.exports = class Email {
  constructor(email, url) {
    this.to = email;
    this.url = url;
    this.from = `Team CaringVegan <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENGRID_USERNAME,
          pass: process.env.SENGRID_PASSWORD,
        },
      });
    }
    console.log("newTransport");
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      // name: this.name,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // console.log("mailOptions", mailOptions);

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
    console.log("newTransport sendMail");
  }

  async sendWelcome() {
    await this.send(
      "Welcome",
      "  Thank you for joining! Clink link to verify account."
    );
  }

  async sendReceipt() {
    await this.send("receipt", "Thank you for your purchase!");
  }

  async sendResetComfirmation() {
    await this.send("passwordUpdate", "Password update sucessful!");
  }

  async sendPasswordReset() {
    console.log("sendPasswordReset");
    await this.send(
      "passwordReset",
      "Password reset link will remain active for 10 minutes"
    );
  }
};
