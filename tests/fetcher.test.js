const expect = require('expect');

const {
  locations,
  fetchAllSchedule,
  fetchScheduleByCinemaId,
  fetchStarCineplexScheduleByLocationId,
  fetchNowPlayingMovieInfo,
  fetchScheduleByMovieName,
} = require('../src/util/fetcher');

const {
  count,
} = require('./seed');

// eslint-disable-next-line no-undef
describe('fetcher.js', () => {
  // eslint-disable-next-line no-undef
  it('should fetch all schedule', (done) => {
    fetchAllSchedule()
      .then((docs) => {
        expect(docs.length).toBeLessThanOrEqualTo(count() + 1);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should return schedule by cinemaId', (done) => {
    fetchScheduleByCinemaId(0)
      .then((docs) => {
        const { schedule } = docs[0];
        const { cinemaId } = schedule[0].playingAt[0];

        expect(cinemaId).toEqual(0);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should return star cineplex schedule by location id', (done) => {
    fetchStarCineplexScheduleByLocationId(0)
      .then((docs) => {
        const { schedule } = docs[0];
        const { locationName } = schedule[0].playingAt[0];

        expect(locationName).toBe(locations[0]);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should return a lists of now playing movie objects', (done) => {
    fetchNowPlayingMovieInfo()
      .then((nowPlaying) => {
        expect(nowPlaying.length).toBeLessThanOrEqualTo(count() + 1);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should return schedule by movie name', (done) => {
    fetchScheduleByMovieName('Anna')
      .then((schedule) => {
        expect(schedule).toExist();
        done();
      })
      .catch(e => done(e));
  });
});
