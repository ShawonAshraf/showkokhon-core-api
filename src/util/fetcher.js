const { ObjectId } = require('mongodb');

const Movie = require('../models/movie');

const locations = [
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

const fetchScheduleByCinemaId = async (id) => {
  const schedules = [];

  const schedulesIds = await Movie.find({}, { cinemaId: id });

  for (let i = 0; i < schedulesIds.length; i += 1) {
    const objId = new ObjectId(schedulesIds[i]._id);

    const schedule = await Movie.find({ _id: objId });
    schedules.push(schedule[0]);
  }

  return schedules;
};
// const fetchStarCineplexScheduleByLocation = async code =>
//   // TODO: to be done after api fix
//   ({});

module.exports = {
  fetchAllSchedule,
  fetchScheduleByCinemaId,
};
