const dummy = require('./dummy');
const Movie = require('../src/models/movie');

const { movies } = dummy;

const populate = (done) => {
  movies.forEach((movie) => {
    const entry = new Movie(movie);
    entry.save()
      .then(() => entry)
      .catch(e => e);
  });

  done();
};

module.exports = {
  populate,
};
