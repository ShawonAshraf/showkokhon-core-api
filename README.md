# showkokhon-core-api
[![Build Status](https://travis-ci.com/ShawonAshraf/showkokhon-core-api.svg?branch=master)](https://travis-ci.com/ShawonAshraf/showkokhon-core-api) [![DeepScan grade](https://deepscan.io/api/teams/4763/projects/6517/branches/54712/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4763&pid=6517&bid=54712) [![CodeFactor](https://www.codefactor.io/repository/github/shawonashraf/showkokhon-scraper-api/badge)](https://www.codefactor.io/repository/github/shawonashraf/showkokhon-scraper-api)

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
This API will automatically call ping the scraper service every 30 minutes to update the database.
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

### GET /schedule/nowplaying
Fetches names of movies now playing

_Example Response_:
```json
{
  "nowPlaying": [
    "Men in Black: International",
    "Avengers: Endgame",
    "Spider-Man: Far from Home",
    "Kidnap",
    "Annabelle Comes Home",
    "Aladdin",
    "Toy Story 4",
    "Godzilla: King of the Monsters",
    "PASSWORD",
    "Anna"
  ]
}
```

### GET /schedule/byname
Fetches schedule by moviename

_Example_:
Use the `name` query.

```bash
# request url
http://localhost:3000/core/v1/schedule/byname?name=Anna
```

```json
[
    {
        "schedule": [
            {
                "date": "Sunday, July 14, 2019",
                "playingAt": [
                    {
                        "cinemaId": 1,
                        "locationName": "On Theatre THRILL",
                        "showTimes": [
                            "11:40 am",
                            "7:30 pm"
                        ]
                    }
                ]
            }
        ],
        "_id": "5d2a36f60e5a1b6d9631618b",
        "name": "Anna",
        "mediaType": "2D",
        "imageUrl": "https://image.blockbusterbd.net/00322_main_image_20062019131910.jpg",
        "__v": 0
    }
]
```

## License
MIT
