const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGODB_URI,
  { useNewUrlParser: true },
);

module.exports = mongoose;
