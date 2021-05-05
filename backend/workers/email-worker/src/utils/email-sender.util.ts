import * as nodemailer from 'nodemailer';

const createTransporter = () => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'microservice.app.demo@gmail.com',
    pass: '4/PH(Hyg6!},#VkJ',
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: 'MS Demo App <microservice.app.demo@gmail.com>',
    to,
    subject,
    text,
  });
  console.log(`Message was sent to: <${info.accepted}>. Response: ${info.response.split(' ')[2]}.`);
};

export const notifyAboutNewComment = async (to: string) => {
  const text =
    `
    Recently someone has left a new comment under the topic you are following.\n 
    Take a look at that new one quickly!
    `;
  await sendEmail(to, 'See a new comment', text);
};
