//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use("/css", express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/css')));
app.use("/css", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use("/js", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const nation = req.body.country;
    const imperial_countries = ["United States", "Myanmar", "Indonesia"];
    var unit = "imperial";
    if (imperial_countries.indexOf(nation) === -1) {
      unit = "metric";
    }
    const apiKey = "1d14461d7e7fe98213a4494bb0f13774";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const adj_temp = Math.round(parseFloat(JSON.stringify(temp)));
        var degree_sign = "";
        if (unit === "metric") {
          degree_sign = "C";
        }
        else {
          degree_sign = "F";
        }
        const weatherDescription = weatherData.weather[0].description;

        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        const feels_like = weatherData.main.feels_like;
        const adj_feels = Math.round(parseFloat(JSON.stringify(feels_like)));

        const humidity = weatherData.main.humidity;

        const wind_speed = weatherData.wind.speed;
        var wind_unit = "mph";

        if (unit === "metric") {
          wind_unit = "m/s";
        }

        var title = "<h1 class='city_name'>" + query + "</h1>";

        var city_data = "";
        city_data += "<p>Current Temperature: " + adj_temp + "&#176" + degree_sign + "</p> ";
        city_data += "<p>Current Weather: " + weatherDescription + "</p> ";
        city_data += "<p>Feels Like " + adj_feels + "&#176" + degree_sign + "</p> ";
        city_data += "<p>Humidity: " + humidity + "%</p> ";
        city_data += "<p style='text-transform: none;'>Wind Speed: " + wind_speed + " " + wind_unit + "</p>";
        city_data += "<img src=" + imageURL +">";
        city_data += "<form action='/'> <button type='submit'>Select a new city!</button></form>";
        res.write(css_styles);
        res.write("<div style='position: absolute; top: 8%; left: 50%; transform: translate(-50%, -50%);'>" + title + "</div>");
        res.write("<div style='position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; padding: 5px;'>" + city_data + "</div>");
        // res.write("<p>The weather is currently " + weatherDescription + "</p>");
        // res.write("<h1>The temperature in " + query + " is " + adj_temp + "&#176" + degree_sign + "</h1>");
        // res.write("<img src=" + imageURL +">");
        // res.write("<form action='/'> <button type='submit'>Select a new city!</button></form>");
        // res.write("</div>");
        res.send();
      });
    });
});


app.listen(3000, function() {
  console.log("Server is running on Port 3000.");
});

var css_styles = "<style> ";
var body = "body {background-color: #189AB4; color: snow; display: table; text-align: center; font-family: sans-serif; text-align: center} ";
var h1 = "h1 {font-size:4rem; font-weight: bold; margin-top: 10%;} ";
var p = "p {font-size: 1rem; font-weight:600; margin: 20px; line-height: 1.5; margin-bottom: 5%; text-transform: capitalize;} ";
var button = "button {size: 32px; background-color: #836b62; border-radius: 20px; color:white} border: none; padding: 15px 32px; text-align: center; text-decoration:none; font-size:16px;} ";
// var div = "div {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; padding: 5px;} ";
// var img = "img {width:550px; height:100px;}";
css_styles += body + h1 + p + button + "</style>";
