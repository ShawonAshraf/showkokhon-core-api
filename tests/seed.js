const dummy = require('./dummy');
const Movie = require('../src/models/movie');

const { movies } = dummy;

const populate = (done) => {
  Movie.remove({})
    .then(() => {
      movies.forEach((movie) => {
        const entry = new Movie(movie);
        entry.save()
          .then(() => entry)
          .catch(e => e);
      });

      done();
    })
    .catch(e => done(e));
};

const count = () => movies.length;

const generateFakeAdminData = () => {
  const fake = {
    name: '',
    pass: '',
  };

  return fake;
};

module.exports = {
  populate,
  count,
  generateFakeAdminData,
};
