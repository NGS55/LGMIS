import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

const from = process.env.EMAIL_FROM || "Example <no-reply@example.com>";

export async function sendEmail(to: string, subject: string, html: string) {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({ to, from, subject, html });
    return;
  }
  // Fallback to SMTP (e.g., mailhog in dev)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT) || 1025,
    secure: false,
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined
  });
  await transporter.sendMail({ from, to, subject, html });
}
