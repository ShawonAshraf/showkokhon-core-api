const mongoose = require('mongoose');

const schemaProperties = {
  type: String,
  required: true,
  minlength: 1,
};


const MovieSchema = new mongoose.Schema({
  name: schemaProperties,
  schedules: [
    {
      data: schemaProperties,
      playingAt: [
        {
          name: schemaProperties,
          showTimes: [schemaProperties],
        },
      ],
    },
  ],
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
