const express = require('express');

const { populateDb } = require('../util/populator');

const admin = express.Router();

// force for a population incase the cronjob fails
// keep it secure with some passphrase

admin.post('/populate', async (req, res) => {
  const { email, pass } = req.body;

  if (email === process.env.ADMIN_EMAIL_ADDRESS &&
    pass === process.env.ADMIN_PASS
  ) {
    const status = await populateDb();
    res.send(status);
  } else {
    res.status(404).send({
      error: 'Unauthorized',
    });
  }
});

module.exports = admin;
