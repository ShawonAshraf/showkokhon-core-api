const Movie = require('../models/movie');

const idMap = [
  'Bashundhara Shopping Mall, Panthapath',
  'Shimanto Shambhar, Dhanmondi 2',
];

// const codeMap = {
//   ss: 'Shimanto Shambhar, Dhanmondi 2',
//   cp: 'Bashundhara Shopping Mall, Panthapath',
// };

const fetchAllSchedule = async () => {
  const schedules = await Movie.find({});
  return schedules;
};

// const fetchScheduleByCinemaId = async id =>
//   // TODO: to be implemented after scraper api fix
//   ({});
// const fetchStarCineplexScheduleByLocation = async code =>
//   // TODO: to be done after api fix
//   ({});

module.exports = {
  fetchAllSchedule,
  // fetchScheduleByCinemaId,
};
