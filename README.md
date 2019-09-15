# showkokhon-core-api
[![Build Status](https://travis-ci.com/ShawonAshraf/showkokhon-core-api.svg?branch=master)](https://travis-ci.com/ShawonAshraf/showkokhon-core-api) [![DeepScan grade](https://deepscan.io/api/teams/4763/projects/6517/branches/54712/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4763&pid=6517&bid=54712) [![CodeFactor](https://www.codefactor.io/repository/github/shawonashraf/showkokhon-core-api/badge)](https://www.codefactor.io/repository/github/shawonashraf/showkokhon-core-api)

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

# or,
yarn run watch
```

- Navigate to `http://localhost:3000/core/v1/` which is the API root.
- Use the client of your choice to make requests.

### CronJob
This API will automatically call ping the scraper service every `4 hours` to update the database.
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
        {
            "_id": {
                "name": "Panther",
                "imageUrl": "https://image.blockbusterbd.net/00436_main_image_06092019102208.png"
            }
        },
        {
            "_id": {
                "name": "Angel Has Fallen",
                "imageUrl": "https://image.blockbusterbd.net/00438_main_image_05092019151316.png"
            }
        },
        {
            "_id": {
                "name": "Abotar",
                "imageUrl": "https://image.blockbusterbd.net/00439_main_image_10092019141007.png"
            }
        },
        {
            "_id": {
                "name": "Fast & Furious Presents: Hobbs & Shaw",
                "imageUrl": "https://image.blockbusterbd.net/00395_main_image_02042019140315.png"
            }
        },
        {
            "_id": {
                "name": "Crawl",
                "imageUrl": "https://image.blockbusterbd.net/00419_main_image_08082019205155.jpg"
            }
        },
        {
            "_id": {
                "name": "Dora and the Lost City of Gold",
                "imageUrl": "https://image.blockbusterbd.net/00418_main_image_08082019205313.jpg"
            }
        },
        {
            "_id": {
                "name": "The Lion King",
                "imageUrl": "https://image.blockbusterbd.net/00423_main_image_25072019172336.png"
            }
        },
        {
            "_id": {
                "name": "Once Upon a Time in Hollywood",
                "imageUrl": ""
            }
        },
        {
            "_id": {
                "name": "Mayaboti",
                "imageUrl": "https://image.blockbusterbd.net/00440_main_image_12092019173732.png"
            }
        },
        {
            "_id": {
                "name": "It Chapter Two",
                "imageUrl": "https://image.blockbusterbd.net/00437_main_image_05092019151356.png"
            }
        },
        {
            "_id": {
                "name": "Spider-Man: Far from Home",
                "imageUrl": "https://image.blockbusterbd.net/00416_main_image_04072019225805.png"
            }
        }
    ]
}
```

### GET /schedule/byname
Fetches schedule by moviename

_Example_:
Use the `name` query. Encode name while sending requests from a client. => `encodeURIComponent(name)`.

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

### GET /schedule/byid
Fetches schedule by movie id

```bash
# request url
http://localhost:3000/core/v1/schedule/byid?id=5d70124e58fd4c2d0251de82
```

```json
[
  {
    "schedule": [
      {
        "date": "Thursday, September 5, 2019",
        "playingAt": [
          {
            "cinemaId": 1,
            "locationName": "On Theatre THRILL",
            "showTimes": [
              "6:10 pm",
              "8:10 pm"
            ]
          },
          {
            "cinemaId": 1,
            "locationName": "On Theatre MONTAGE",
            "showTimes": [
              "12:00 pm"
            ]
          }
        ]
      }
    ],
    "_id": "5d70124e58fd4c2d0251de82",
    "name": "Crawl",
    "mediaType": "2D",
    "imageUrl": "https://image.blockbusterbd.net/00419_main_image_08082019205155.jpg",
    "__v": 0
  }
]
```

### GET /status/db
Returns the last time the database was updated.

```json
{
  "last_updated": "2019-09-04T19:36:28.865Z"
}
```

### GET /status/service
Service status.

```json
{
  "status": "OK"
}
```

### POST /admin/populate
Force populate the database.

_Request Body for dev env_
```json
{
	"email": "someuser@showkokhon.com",
	"pass": "dev"
}
```
_Response_
```json
{
  "status": "Scraped and Updated Database",
  "sent_at": "2019-08-28T08:42:45.541Z"
}
```

## License
MIT
