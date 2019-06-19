const mailer = require('nodemailer');

// use only in production!

const sendStatusReportEmail = async () => {
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
    text: `Database was updated by cron job @ ${new Date()}`,
  };


  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = {
  sendStatusReportEmail,
};
