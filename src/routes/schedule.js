const express = require('express');

// init router
const scheduleRouter = express.Router();

// get all schedule
scheduleRouter.get('/all', (req, res) => {
  // send all schedule
  res.status(200).send({

  });
});

module.exports = scheduleRouter;
