# showkokhon-core-api
[![Build Status](https://travis-ci.com/ShawonAshraf/showkokhon-core-api.svg?branch=master)](https://travis-ci.com/ShawonAshraf/showkokhon-core-api)

Core API for ShowKokhon Service.

## Running locally
- Start your local `mongodb` server. If you want, you can use cloud hosted `mongodb` instances as
well. Just add a `config.json` file in `src/config` with the following properties and replace the
`MONGODB_URI` with the hosted instance URI you want to use.

```json
{
  "test": {
    "MONGODB_URI": "mongodb://localhost:27017/ShowKokhonTest",
    "API_END": "http://localhost:8080/scraper/v1/schedule/all"
  },
  "development": {
    "MONGODB_URI": "mongodb://localhost:27017/ShowKokhonDev",
    "API_END": "http://localhost:8080/scraper/v1/schedule/all"
  }
}
```
- For `API_END`, refer to [showkokhon-scraper-api](https://github.com/ShawonAshraf/showkokhon-scraper-api)
- Clone the repo
- `cd` into the dir
- Then:

```bash
yarn install
yarn start

#or,
yarn run watch
```

- Navigate to `http://localhost:3000/core/v1/` which is the API root.
- Use the client of your choice to make requests.

### CronJob
This API will automatically call ping the scraper service every 2 hours to update the database.
If you're running the `scraper service ` somewhere other than your local machine, make sure to
update that either in `config.json` (which is a bad things since the file is under version control) or (the best way)
pass the API endpoint as an env variable.

## API

### GET /schedule/all
Fetches all schedule from the database.

### GET /schedule/:cinemaId
Fetches schedule by `cinemaId`.

_Params_
- 0 for Star Cineplex.
- 1 for Blockbuster Cinemas.

### GET /schedule/:cinemaId/location/:locationId
Fetches schedule for cinema branches as well.

_Params_
- `cinemaId` as mentioned above.
- `locationId` 0 for Bashundhara City, 1 for Shimanto Shambhar.

## License
MIT