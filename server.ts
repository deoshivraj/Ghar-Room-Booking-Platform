import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3001);
const recipient = process.env.CONTACT_EMAIL || 'ghardharamkot@gmail.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.use(express.json({ limit: '20kb' }));

app.post('/api/contact', async (request, response) => {
  const { name, email, phone, dates, message } = request.body as Record<string, unknown>;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof dates !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !message.trim()
  ) {
    response.status(400).json({ error: 'Please provide all required contact details.' });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: email.trim().toLowerCase(),
      subject: `Stay inquiry from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim().toLowerCase()}`,
        `Phone: ${phone.trim()}`,
        `Travel dates: ${dates.trim() || 'Not specified'}`,
        '',
        'Message:',
        message.trim(),
      ].join('\n'),
    });

    response.json({ success: true });
  } catch (error) {
    console.error('Unable to send contact email:', error);
    response.status(502).json({ error: 'The message could not be sent right now.' });
  }
});

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(currentDirectory, 'dist')));

app.listen(port, () => {
  console.log(`Contact server listening on port ${port}`);
});
