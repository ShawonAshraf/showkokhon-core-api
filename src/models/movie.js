const mongoose = require('mongoose');

const schemaProperties = {
  type: String,
  required: true,
  minlength: 1,
};

// generated from https://transform.now.sh/json-to-mongoose
const MovieSchema = new mongoose.Schema({
  name: {
    type: 'String',
  },
  schedule: {
    type: [
      'Mixed',
    ],
  },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
