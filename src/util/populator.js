const axios = require('axios');

const Movie = require('../models/movie');

const populateDb = async () => {
  const currentTime = new Date();
  // fetch from scraper and push
  try {
    const response = await axios.get(process.env.API_END);

    if (response.status === 200) {
      // clear db
      await Movie.remove({});

      const schedules = response.data.movies;

      schedules.forEach((element) => {
        const entry = new Movie(element);
        entry.save().then(movie => movie, err => err);
      });

      return {
        status: 'Scraped and Updated Database',
        sent_at: currentTime,
      };
    }

    // in case scraper fails!
    return {
      status: 'Scraper Service Error',
      sent_at: currentTime,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

module.exports = {
  populateDb,
};
