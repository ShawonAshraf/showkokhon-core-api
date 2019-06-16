const express = require('express');

const {
  fetchAllSchedule,
  fetchScheduleByCinemaId,
  fetchStarCineplexScheduleByLocationId,
} = require('./../util/fetcher');

// init router
const scheduleRouter = express.Router();

// get all schedule
scheduleRouter.get('/all', async (req, res) => {
  try {
    const schedule = await fetchAllSchedule();
    res.send(schedule);
  } catch (e) {
    res.send({ error: e });
  }
});

// get schedule by cinema id
// 0 for star cineplex
// 1 for blockbuster
scheduleRouter.get('/cinema/:cinemaId', async (req, res) => {
  try {
    const { cinemaId } = req.params;
    const schedule = await fetchScheduleByCinemaId(cinemaId);

    res.send(schedule);
  } catch (e) {
    res.send({ error: e });
  }
});

// get schedule by location from star cineplex
// 0 for bcity
// 1 for shimanto shmabhar
scheduleRouter.get('/cinema/:cinemaId/location/:locationId', async (req, res) => {
  try {
    const { cinemaId, locationId } = req.params;

    if (cinemaId === 1) {
      const schedule = fetchScheduleByCinemaId(cinemaId);
      res.send(schedule);
    }
    const schedule = await fetchStarCineplexScheduleByLocationId(locationId);

    res.send(schedule);
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = scheduleRouter;
