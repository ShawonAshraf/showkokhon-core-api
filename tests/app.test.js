const request = require('supertest');
const expect = require('expect');

const app = require('../src/app');

const { populate } = require('./seed');

// pre hook
before(populate);

describe('GET /', () => {
  it('server should message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        const { msg, sentAt } = res.body;

        expect(msg).toBe('Showkokohon-Core-API');
        done();
      })
      .catch(e => done(e));
  });
});

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

