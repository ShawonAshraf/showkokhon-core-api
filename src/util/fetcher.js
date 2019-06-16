const Movie = require('../models/movie');

const idMap = [
  'Bashundhara Shopping Mall, Panthapath',
  'Shimanto Shambhar, Dhanmondi 2',
];

const fetchAllSchedule = async () => {
  const schedules = await Movie.find({});
  return schedules;
};

const fetchScheduleByCinemaId = async (id) => {
  const location = idMap[id];
  const schedules = await Movie.find({ name: location });

  return schedules;
};

module.exports = {
  fetchAllSchedule,
  fetchScheduleByCinemaId,
};
