let express = require('express');
let morgan = require('morgan');

const port = process.env.PORT || 3000;

let app = express();

app.listen(port, () => console.log(`server runnung @ ${port}`));
