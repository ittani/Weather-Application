const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  const city = req.body.cityName;
  const keyAPI = "bfe3abec8a6b4eeb7fc1693f5c78cf3e";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyAPI}&units=${unit}`;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const dis = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      console.log(dis);
      res.send(`
        <h2>Weather description: ${dis}</h2>
        <h1>The temperature in ${city} is ${temp} degrees Celsius.</h1>
        <img src="${imgURL}" alt="Weather Icon">
      `);
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
