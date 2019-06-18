const expect = require('expect');

const {
  locations,
  fetchAllSchedule,
  fetchScheduleByCinemaId,
  fetchStarCineplexScheduleByLocationId,
} = require('../src/util/fetcher');

const {
  populate,
  count
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
    fetchStarCineplexScheduleByLocationId(1)
      .then((docs) => {
        const { schedule } = docs[0];
        const { locationName } = schedule[0].playingAt[0];

        expect(locationName).toBe(locations[1]);
        done();
      })
      .catch(e => done(e));
  });
});
