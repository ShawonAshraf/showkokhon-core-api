const expect = require('expect');

const { encodeImageToBase64 } = require('../src/util/image-encoder');

// eslint-disable-next-line no-undef
describe('image-encoder', () => {
  // eslint-disable-next-line no-undef
  it('should return empty string on a malformed/invalid url', (done) => {
    encodeImageToBase64('ugabuga')
      .then((data) => {
        expect(data).toEqual('');
        done();
      })
      .catch(e => done(e));
  });
});
