const express = require('express');

const DBStatus = require('../models/db-status');

const statusRouter = express.Router();

statusRouter.get('/db', async (req, res) => {
  try {
    const dbStatus = await DBStatus.find({});

    let code = 200;
    if (dbStatus.length === 0) {
      code = 404;
    }

    // eslint-disable-next-line camelcase
    const { last_updated } = dbStatus[0];
    res.status(code).send({ last_updated });
  } catch (e) {
    res.status(e.response.status).send(e);
  }
});

statusRouter.get('/service', (req, res) => {
  try {
    res.status(200).send({ status: 'OK' });
  } catch (e) {
    res.status(e.response.status).send({ e });
  }
});

module.exports = statusRouter;
