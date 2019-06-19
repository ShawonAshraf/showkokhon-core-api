const cron = require('node-cron');

const { populateDb } = require('./populator');
const {sendStatusReportEmail } = require('./mailer');


if (process.env.NODE_ENV !== 'test') {
  cron.schedule('0 */2 * * *', async () => {
    console.log(`CronJob @ ${new Date()}`);

    try {
      const res = await populateDb();
      console.log(res);

      // end email
      const info = await sendStatusReportEmail();
      console.log(info);
    } catch (e) {
      console.log(e);
    }
  });
}
