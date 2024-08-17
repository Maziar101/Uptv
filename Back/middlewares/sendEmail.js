import { MailerSend, EmailParams, Recipient } from "mailersend";

const randomNum = Math.random()*5;

export const mailerSend = new MailerSend({
  apiKey: process.env.EMAIL_KEY,
});

const recipients = new Recipient('maziarzamani85@gmail.com','Maziar');

export const emailParams = new EmailParams()
  .setFrom(process.env.EMAIL_DOMAIN)
  .setFromName("Your Name")
  .setRecipients(recipients)
  .setSubject("Verify Your Account")
  .setHtml(`Your Code : <br/> ${randomNum}`)
  .setText(`Your Code : ${randomNum}`);
