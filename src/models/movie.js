const mongoose = require('mongoose');

// generated from https://transform.now.sh/json-to-mongoose
const MovieSchema = new mongoose.Schema({
  name: {
    type: 'String',
  },
  mediaType: {
    type: 'String',
  },
  imageUrl: {
    type: 'String',
  },
  imageData: {
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
