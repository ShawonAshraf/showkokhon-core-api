const request = require('supertest');
const expect = require('expect');

const app = require('../src/app');

const {
  populate,
  count,
  generateFakeAdminData,
} = require('./seed');

// pre hook
// eslint-disable-next-line no-undef
before(populate);

// eslint-disable-next-line no-undef
describe('GET /', () => {
  it('server should message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        const { msg, sentAt } = res.body;

        expect(msg).toBe('Showkokohon-Core-API');
        expect(sentAt).toExist();
        done();
      })
      .catch(e => done(e));
  });
});

// eslint-disable-next-line no-undef
describe('POST /admin', () => {
  it('should reject fake user', (done) => {
    const fake = generateFakeAdminData();

    request(app)
      .post('/admin/populate')
      .send(fake)
      .expect(404)
      .expect(() => {
        done();
      })
      .catch(e => done(e));
  });
});

// eslint-disable-next-line no-undef
describe('GET /core/v1', () => {
  it('should return api version v1', (done) => {
    request(app)
      .get('/core/v1/')
      .expect(200)
      .expect((res) => {
        const { version } = res.body;
        expect(version).toBe('v1');
        done();
      })
      .catch(e => done(e));
  });
});

// eslint-disable-next-line no-undef
describe('GET /core/v1/schedule/', () => {
  // eslint-disable-next-line no-undef
  it('should fetch all movies', (done) => {
    request(app)
      .get('/core/v1/schedule/all')
      .expect(200)
      .expect((res) => {
        const items = res.body;
        expect(items.length).toBeLessThanOrEqualTo(count() + 1);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should get star cineplex schedule by cinemaId', (done) => {
    request(app)
      .get('/core/v1/schedule/cinema/0')
      .expect(200)
      .expect((res) => {
        const { schedule } = res.body[0];
        const { cinemaId } = schedule[0].playingAt[0];

        expect(cinemaId).toEqual(0);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should get blockbuster cinemas schedule by cinemaId', (done) => {
    request(app)
      .get('/core/v1/schedule/cinema/1')
      .expect(200)
      .expect((res) => {
        const { schedule } = res.body[0];
        const { cinemaId } = schedule[0].playingAt[0];

        expect(cinemaId).toEqual(1);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should get schedule by locationId', (done) => {
    request(app)
      .get('/core/v1/schedule/cinema/0/location/0')
      .expect(200)
      .expect((res) => {
        const { schedule } = res.body[0];
        const { locationName } = schedule[0].playingAt[0];

        expect(locationName).toBe('Bashundhara Shopping Mall, Panthapath');
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should get now playing movie names', (done) => {
    request(app)
      .get('/core/v1/schedule/nowplaying')
      .expect(200)
      .expect((res) => {
        const { nowPlaying } = res.body;
        expect(nowPlaying.length).toBeLessThanOrEqualTo(count() + 1);
        done();
      })
      .catch(e => done(e));
  });
  // eslint-disable-next-line no-undef
  it('should get schedule by movie name', (done) => {
    request(app)
      .get('/core/v1/schedule/byname?name=Anna')
      .expect(200)
      .expect((res) => {
        const { body } = res;
        expect(body[0].name).toEqual('Anna');
        done();
      })
      .catch(e => done(e));
  });
});
