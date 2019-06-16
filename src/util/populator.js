const axios = require('axios');

const Movie = require('../models/movie');

const populateDb = async (force) => {
  const currentTime = new Date();

  if (force || ((currentTime.getHours() === 23 && currentTime.getMinutes() === 0)
    || (currentTime.getHours() === 17 && currentTime.getMinutes() === 0)
    || (currentTime.getHours() === 11 && currentTime.getMinutes() === 0))) {
    // fetch from scraper and push
    try {
      // clear db
      await Movie.remove({});

      const response = await axios.get(process.env.API_END);
      const schedules = response.data.movies;

      schedules.forEach((element) => {
        const entry = new Movie(element);
        entry.save().then(movie => movie, err => err);
      });

      return { status: 'Scraped and Updated Database' };
    } catch (e) {
      return { error: e };
    }
  } else {
    return { status: 'Database already updated.' };
  }
};

module.exports = {
  populateDb,
};
