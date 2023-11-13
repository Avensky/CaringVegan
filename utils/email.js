const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
module.exports = class Email {
  constructor(name, email, url) {
    this.to = email;
    this.firstName = name.split(" ")[0];
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
    console.log("EMAIL_HOST", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT", process.env.EMAIL_PORT);
    console.log("EMAIL_USERNAME", process.env.EMAIL_USERNAME);
    console.log("EMAIL_PASSWORD", process.env.EMAIL_PASSWORD);
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    console.log("dirname", __dirname);
    console.log("template", template);
    console.log("subject", subject);
    console.log("render", `${__dirname}/../views/email/${template}.pug`);
    console.log("url", this.url);

    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      name: this.name,
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
    await this.send("welcome", "Welcome to the Family!");
  }

  async sendReceipt() {
    await this.send("receipt", "Thank you for your purchase!");
  }

  async sendResetComfirmation() {
    await this.send("resetComfirmation", "Password was changed!");
  }

  async sendPasswordReset() {
    console.log("sendPasswordReset");
    await this.send(
      "passwordReset",
      "Your password reset token is only valid for 10 minutes"
    );
  }
};
