// ======== Require Packages ==============
require("dotenv").config();

var fs = require('fs');
var keys = require("./keys.js");
var axios = require('axios');
var Spotify = require('node-spotify-api');
// var inquirer = require("inquirer");

// ======== Variables To Use ==============

var spotify = new Spotify(keys.Spotify);
console.log(spotify);
var command = process.argv[2];
var answer = process.argv.slice(3).join(' ');

var spotifyThis = function () {
    if (answer === '') answer = 'The Sign';

    spotify.search({type: 'track', query: answer})
    .then(function(spotifyResp) {
        console.log(spotifyResp);
    })
    .catch(function(err){
        console.log(err);
    });
}

var movieThis = function () {

    if (answer === '') {
        answer = 'Mr. Nobody';
    }

    axios.get('http://www.omdbapi.com/?t=' + answer + '&apikey=1de8dab0')
        .then(function (OMDBResponse) {
            var data = OMDBResponse.data;

            var text = 'Movie Title: ' + data.Title + '\n' +
                'Released: ' + data.Released + '\n' +
                'imdbRating: ' + data.imdbRating + '\n' +
                data.Ratings[1].Source + ': ' + data.Ratings[1].Value + '\n' +
                'Country Produced: ' + data.Country + '\n' +
                'Language: ' + data.Language + '\n' +
                'Plot: ' + data.Plot + '\n' +
                'Actors: ' + data.Actors + '\n\n';

            fs.appendFile('./log.txt', text, function (err) {
                if (err) return console.error(err);

                console.log('Appending to log');
            })
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

var doSomethingElse = function () {

    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) return console.error(err);

        var randtxt = data.split(',');

        if(randtxt[0] === 'movie-this'){
            answer = randtxt[1];
            movieThis();
        } else {
            answer === randtxt[1];
            spotifyThis();
        }
    })
}

switch (command) {
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doSomethingElse();
        break;
    default:
        console.log('Please input correct command!');
}