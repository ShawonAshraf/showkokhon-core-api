const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const schedule = require('./routes/schedule');
const { populateDb } = require('./util/populator');

require('./config/config');
require('./db/db');


// cron job
require('./util/cronjob');

const port = process.env.PORT || 3000;

const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(morgan('combined'));
// cors
app.use(cors());

// routers
app.use('/core/v1/schedule', schedule);

// index
app.get('/', (req, res) => {
  res.status(200).send({
    msg: 'Showkokohon-Core-API',
    sentAt: Date(),
  });
});

// root route
app.get('/core/v1/', (req, res) => {
  res.status(200).send({
    msg: 'Showkokohon-Core-API',
    version: 'v1',
    sentAt: Date(),
  });
});

// populator
// fetches from scraper and populates db beforehand
app.get('/core/v1/populate', async (req, res) => {
  try {
    const status = await populateDb();
    res.send(status);
  } catch (e) {
    res.send({ error: e });
  }
});

app.listen(port, async () => {
  console.log(`server running @ ${port}`);
});
