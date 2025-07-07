// // src/services/emailService.ts

// export const sendEmail = async (to: string, subject: string, message: string) => {
//   console.log(`Email sent to ${to}: [${subject}] ${message}`);
//   return Promise.resolve(); // explicitly return a resolved Promise
// };

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_PASS!,
  },
});

// Send Real Email (to Admin)
export const sendRealEmail = async (to: string, subject: string, message: string) => {
  const info = await transporter.sendMail({
    from: '"License App" <no-reply@licenseapp.com>',
    to,
    subject,
    text: message,
  });

  console.log(`Real Email sent to ${to}: ${info.messageId}`);
};

// Mock Email (to Customer)
export const sendMockEmail = async (to: string, subject: string, message: string) => {
  console.log(`Mock Email to ${to}: [${subject}] ${message}`);
  return Promise.resolve();
};
