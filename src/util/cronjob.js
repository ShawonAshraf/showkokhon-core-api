const cron = require('node-cron');

const { populateDb } = require('./populator');
const { sendStatusReportEmail } = require('./mailer');

// production usage only

if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'development') {
  cron.schedule('0 */4 * * *', async () => {
    console.log(`CronJob @ ${new Date()}`);

    try {
      const res = await populateDb();
      console.log(res);

      // end email
      const info = await sendStatusReportEmail(res);
      console.log(info);
    } catch (e) {
      console.log(e);
      await sendStatusReportEmail(e);
    }
  });
}
