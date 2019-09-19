const { requestBase64 } = require('base64-img');

// wrap the callback in a promise
const base64EncodingFromURL = url => new Promise((resolve, reject) => {
  requestBase64(url, (err, res, body) => {
    if (err) {
      return reject(err);
    }
    return resolve(body);
  });
});

// just return the base64 data
const encodeImageToBase64 = async (url) => {
  const data = await base64EncodingFromURL(url);
  return data;
};
module.exports = {
  encodeImageToBase64,
};
