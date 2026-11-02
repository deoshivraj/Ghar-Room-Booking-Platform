import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const recipient = process.env.CONTACT_EMAIL || 'ghardharamkot@gmail.com';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, phone, dates, message } = request.body ?? {};
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
    return response.status(400).json({ error: 'Please provide all required contact details.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

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

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Unable to send contact email:', error);
    return response.status(502).json({ error: 'The message could not be sent right now.' });
  }
}
