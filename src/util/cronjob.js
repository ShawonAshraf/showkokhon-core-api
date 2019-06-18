const cron = require('node-cron');

const { populateDb } = require('./populator');

cron.schedule('0 */4 * * *', async () => {
  console.log(`CronJob @ ${new Date()}`);

  try {
    const res = await populateDb();
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});
