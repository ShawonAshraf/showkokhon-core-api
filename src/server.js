const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(morgan('combined'));
// cors
app.use(cors());

// root route
app.get('/core/v1/', (req, res) => {
  res.status(200).send({
    msg: 'Showkokohon-Core-API',
    sentAt: Date(),
  });
});

app.listen(port, () => console.log(`server runnung @ ${port}`));
