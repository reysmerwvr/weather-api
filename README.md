# Weather-API application

This is the API for weather app.

## Requirements

  - Node.js >= 8.0.0
  - npm >= 3.0.0

## Version

1.0.0

## Installation

Download zip file and extract it [latest pre-built release](https://github.com/reysmerwvr/weather-api). Or clone the repository and cd into it.

Weather-API uses a number of open source projects to work properly:

* [Adonis] - Node.js web framework
* [OpenWeatherMap] - Open Weather Map
* [Axios] - Axios
* [Lodash] - Lodash

Install the dependencies and start the server.

```sh
cd weather-api
npm install
cp .env.example .env
```

If you don't have `.env` file you can use the example one. Just rename `.env.example` to `.env`. Enter your configuration here.

## Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Seeds

Run the following command to run startup seeds.

```js
adonis seed
```

## Run

Run the following command to start the HTTP Server.

```js
adonis serve --dev
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does 
its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Adonis]: <https://adonisjs.com/>
   [OpenWeatherMap]: <https://openweathermap.org/>
   [Axios]: <https://github.com/axios/axios/>
   [Lodash]: <https://lodash.com//>
