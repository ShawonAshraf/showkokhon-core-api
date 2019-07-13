const expect = require('expect');

const {
  locations,
  fetchAllSchedule,
  fetchScheduleByCinemaId,
  fetchStarCineplexScheduleByLocationId,
  fetchNowPlayingMovieInfo,
} = require('../src/util/fetcher');

const {
  count,
} = require('./seed');


describe('fetcher.js', () => {
  it('should fetch all schedule', (done) => {
    fetchAllSchedule()
      .then((docs) => {
        expect(docs.length).toBeLessThanOrEqualTo(count() + 1);
        done();
      })
      .catch(e => done(e));
  });

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

  it('should return a lits of now playing movie names', (done) => {
    fetchNowPlayingMovieInfo()
      .then((nowPlaying) => {
        expect(nowPlaying.length).toBeLessThanOrEqualTo(count() + 1);
        done();
      })
      .catch(e => done(e));
  });
});
