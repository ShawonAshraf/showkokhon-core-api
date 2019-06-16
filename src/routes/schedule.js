const express = require('express');

const {
  fetchAllSchedule,
  fetchScheduleByCinemaId,
} = require('./../util/fetcher');

// init router
const scheduleRouter = express.Router();

// get all schedule
scheduleRouter.get('/all', async (req, res) => {
  const schedules = await fetchAllSchedule();
  res.send(schedules);
});

// get schedule by cinema id
// 0 for star cineplex
// 1 for blockbuster
scheduleRouter.get('/cinema/:id', async (req, res) => {
  const { id } = req.params;
  const schedules = await fetchScheduleByCinemaId(id);
  res.send(schedules);
});

module.exports = scheduleRouter;
