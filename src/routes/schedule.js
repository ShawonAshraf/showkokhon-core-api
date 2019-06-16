const express = require('express');

const {
  fetchAllSchedule,
} = require('./../util/fetcher');

// init router
const scheduleRouter = express.Router();

// get all schedule
scheduleRouter.get('/all', async (req, res) => {
  const schedules = await fetchAllSchedule();
  res.send(schedules);
});

module.exports = scheduleRouter;
