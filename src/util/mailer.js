const mailer = require('nodemailer');

// use only in production!

const sendStatusReportEmail = async (status) => {
  const transporter = mailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_TO,
    subject: `Showkokhon DB Update ${new Date()}`,
    text: status,
  };


  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = {
  sendStatusReportEmail,
};
