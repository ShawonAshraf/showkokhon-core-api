const mongoose = require('mongoose');

const DBStatusSchema = new mongoose.Schema({
  last_updated: {
    type: String,
  },
});

const DBStatus = mongoose.model('DBStatus', DBStatusSchema);
module.exports = DBStatus;
