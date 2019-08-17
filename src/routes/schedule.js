const express = require('express');

const {
  fetchAllSchedule,
  fetchScheduleByCinemaId,
  fetchStarCineplexScheduleByLocationId,
  fetchNowPlayingMovieInfo,
  fetchScheduleByMovieName,
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

    if (schedule) {
      res.status(200).send(schedule);
    } else {
      res.status(404).send(schedule);
    }
  } catch (e) {
    res.status(500).send({ error: e });
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

    if (schedule) {
      res.status(200).send(schedule);
    } else {
      res.status(404).send(schedule);
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// get now playing movie names
scheduleRouter.get('/nowplaying', async (req, res) => {
  try {
    const nowPlaying = await fetchNowPlayingMovieInfo();
    if (nowPlaying) {
      res.status(200).send({ nowPlaying });
    } else {
      res.status(404).send({ nowPlaying });
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// get schedule by movie name
scheduleRouter.get('/byname', async (req, res) => {
  try {
    const { name } = req.query;
    const schedule = await fetchScheduleByMovieName(name);

    if (schedule) {
      res.status(200).send(schedule);
    } else {
      res.status(404).send(schedule);
    }
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = scheduleRouter;
