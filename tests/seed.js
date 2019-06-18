const dummy = require('./dummy');
const Movie = require('../src/models/movie');

const movies = dummy.movies;

const populate = (done) => {
  movies.forEach((movie) => {
    const entry = new Movie(movie);
    entry.save()
      .then(() => entry)
      .catch(e => done(e));
  });

  done();
};

module.exports = {
  populate,
};
