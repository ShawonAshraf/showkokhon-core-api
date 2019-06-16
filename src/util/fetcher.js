const { ObjectId } = require('mongodb');

const Movie = require('../models/movie');

const locations = [
  'Bashundhara Shopping Mall, Panthapath',
  'Shimanto Shambhar, Dhanmondi 2',
];

const fetchAllSchedule = async () => {
  const schedules = await Movie.find({});
  return schedules;
};

module.exports = {
  fetchAllSchedule,
};
