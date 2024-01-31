const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const apiKey = "bd2c9448d3498956216f0ba0f481833d";
    const query = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const city = weatherData.name
            const speed = weatherData.wind.speed
            const humidity = weatherData.main.humidity
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            

            res.write("<style>body {background-image: url('https://wallpapers.com/images/hd/weather-background-jhebw9hr68asyosw.jpg');background-repeat: no-repeat;background-attachment: fixed;background-size: 100% 100%;} h1{color: white;font-size: xx-large;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; margin: 5px;padding: 5px;margin-top: 10px;} p,h3,h2{color:white;font-size:large;font-family:Cambria,Cochin,Georgia,Times,'TimesNewRoman',serif;margin:5px;padding:5px;}</style>")
            res.write("<h1>Weather Master</h1><p>Get current weather condition of your city! </p><br><br>")
            res.write("<h1>The temperature in " + city + " is " + temp + " degree Celcius.</h1>")
            res.write("<p><h3>" + description + "</p></h3>")
            res.write("<p><b>Wind speed:</b> " + speed + " m/s</p><br>")
            res.write("<p><b>Humidity:</b> " + humidity + " %</p>")
            res.write("<img src = " + imageURL + ">")

            res.send()

        })
    })
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}/`);
})




