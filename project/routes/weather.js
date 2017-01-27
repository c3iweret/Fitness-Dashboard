var express = require('express');
var router = express.Router();
request = require('request-json');
var client = request.createClient('http://api.openweathermap.org/');

const Weather = require('../models/weather');

const toronto = '6167865';
const apiKey = 'e8bd5a431cc26c375eb35363b1497967';
const hour = 3600000;

//use for pages that require login
var requirelogin = function requirelogin(req, res, next){
    if(!req.user){
      res.render('home', {
        Message: 'Please log in',
        partials: {
            content: 'login'
        }
   });
    }
    else{
      next();
    }
};

/* GET users listing. */
router.post('/getCurrentWeather', requirelogin, function(req, res, next) {
    Weather.findOne({_id: toronto}, (err, weather) => {
        var time = new Date(weather.cacheTime);
        var now = new Date();

        if (!weather || !weather.current || now - time > hour) {
            if (!weather) {
                weather = new Weather();
            }
            client.get(`/data/2.5/weather?id=${toronto}&appid=${apiKey}&units=metric`, (err, response, body) => {
                weather._id = toronto;
                weather.current = body;
                weather.cacheTime = new Date();

                weather.save();
                res.send(body);
            });
        }
        else {
            res.send(weather.current);
        }
    });
});

router.post('/getForecast', function(req, res, next) {
    Weather.findOne({_id: toronto}, (err, weather) => {
        var time = new Date(weather.cacheTime);
        var now = new Date();

        if (!weather || !weather.forecast || now - time > hour) {
            if (!weather) {
                weather = new Weather();
            }
            client.get(`/data/2.5/forecast?id=${toronto}&appid=${apiKey}&units=metric`, (err, response, body) => {
                weather._id = toronto;
                weather.forecast = body;
                weather.cacheTime = new Date();

                weather.save();
                res.send(body);
            });
        }
        else {
            res.send(weather.forecast);
        }
    });
});

module.exports = router;
