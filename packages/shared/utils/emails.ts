import { config } from 'dotenv';

config({ path: '.env' });

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendErrorEmail = async (subject: string, text: string) => {
  try {
    const msg = {
      to: process.env.EMAIL_ADDRESS,
      from: process.env.EMAIL_ADDRESS,
      subject,
      text
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
