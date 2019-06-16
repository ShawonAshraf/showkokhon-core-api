const Movie = require('../models/movie');

const locations = [
  'Bashundhara Shopping Mall, Panthapath',
  'Shimanto Shambhar, Dhanmondi 2',
];

const fetchAllSchedule = async () => {
  const docs = await Movie.find({});
  return docs;
};

const fetchScheduleByCinemaId = async (cinemaId) => {
  const id = parseInt(cinemaId, 0);
  const docs = await Movie.find({ 'schedule.playingAt.cinemaId': id });
  console.log(docs);
  return docs;
};

const fetchStarCineplexScheduleByLocationId = async (locationId) => {
  const location = locations[locationId];
  console.log(location);
  const docs = await Movie.find({ 'schedule.playingAt.locationName': location });
  return docs;
};

module.exports = {
  fetchAllSchedule,
  fetchScheduleByCinemaId,
  fetchStarCineplexScheduleByLocationId,
};
