# WeatherX

A Weather web app that uses the OpenWeatherMap API and NodeJS to get a city's current weather forecast. The app uses the city's location to determine what units to assign for the weather properties (°C or °F, mph or m/s). Add your own API key from the OpenWeatherMap website to use the app

## Requirements

NodeJS (version 8 or later) and NPM from [Node](http://nodejs.org/) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.14.8 ("or some version")
v12.18.4 ("or some version")
```

Also, you will need your own API key from [OpenWeatherMap](https://openweathermap.org/). To get one, create a free account on the website. Once you sign in, click on your username to get a dropdown menu and click on My API Keys. You should have a default API key or you could generate one. Copy that API key and go into the app.js file. On line 29 of app.js, paste your API key inside the quotes and now the server can call the OpenWeatherMap API.

## Usage

Run this command to open the server:

```sh
$ node app.js
Server is running on Port 3000
```

After the server is running message is shown, go to [http://localhost:3000](http://localhost:3000/) and you can use the app.


