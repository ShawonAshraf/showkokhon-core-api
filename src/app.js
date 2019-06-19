const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const schedule = require('./routes/schedule');
const admin = require('./routes/admin');

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
app.use('/admin', admin);

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


app.listen(port, async () => {
  console.log(`server running @ ${port}`);
});

module.exports = app;
