import nodemailer from 'nodemailer';

type MailTypes = {
  email: '';
  subject: '';
  message: '';
};
const mailHelper = async (options: MailTypes) => {
  const transporter = nodemailer.createTransport({
    host: '',
    port: '',
    auth: {
      user: '',
      pass: '',
    },
  });

  const message = {
    from: '',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default mailHelper;
