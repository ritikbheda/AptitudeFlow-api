import sgMail from '@sendgrid/mail';
require('dotenv').config();

export const sendConfirmationEmail = async (
  email: string,
  token: string,
  role: string
) => {
  sgMail.setApiKey(process.env.SENDGRID_EMAIL_API_KEY!);

  const msg = {
    to: 'farmfood1758@gmail.com',
    from: 'ritikbheda13@gmail.com',
    templateId: process.env.SENDGRID_CONFIRM_EMAIL_TEMP!, // make ENV token and so role == 'company'? EMAIL_COMPANY_TEMPLATE : EMAIL_USER_TEMPLATE
    dynamic_template_data: { token },
  };
  sgMail
    .send(msg)
    .then(() => {
      // console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};
