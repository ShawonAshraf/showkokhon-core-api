const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const schedule = require('./routes/schedule');
const { populateDb } = require('./util/populator');

require('./config/config');
require('./db/db');


const port = process.env.PORT || 4000;

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

app.listen(port, async () => {
  const status = await populateDb(true);
  console.log(`server running @ ${port}`);
  console.log(status);
});
