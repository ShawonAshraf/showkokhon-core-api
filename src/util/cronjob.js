const cron = require('node-cron');

const { populateDb } = require('./populator');

// production usage only
if (process.env.NODE_ENV === 'prod') {
  cron.schedule('* */4 * * *', async () => {
    // eslint-disable-next-line no-console
    console.log(`CronJob @ ${new Date()}`);

    try {
      const res = await populateDb();
      // eslint-disable-next-line no-console
      console.log(res);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });
}
