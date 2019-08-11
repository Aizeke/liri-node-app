// ======== Require Packages ==============
require("dotenv").config();

var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var fs = require('fs');
var inquirer = require("inquirer");
// ======== Variables To Use ==============

var start = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Want a Movie or a Song? or other",
                choices: ["Movie?", "Song?", "Do What It Says"],
                name: 'answer'
            }
        ])
        .then(function (inquirerRes) {
            if (inquirerRes.answer === "Movie?") {
                getMovie();
            } else if (inquirerRes.answer === "Song?") {
                getSong();
            } else {
                doWhatItSays();
            }
        })
}

var runAgain = function () {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to search for a new entry?",
            name: "answer"
        }
    ])
        .then(function (res) {
            if (res.answer) {
                start();
            } else {
                process.exit(200)
            }
        })
}

var doWhatItSays = function () {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) return console.error(err);

        var randtxt = data.split(',');

        var answer = randtxt[1];

        if (randtxt[0] === 'movie-this') {

            axios.get('http://www.omdbapi.com/?t=' + answer + '&apikey=1de8dab0')
                .then(function (OMDBres) {
                    var movie = OMDBres.data;
                    console.log(`${movie.Title}\n${movie.Released}\n${movie.imdbRating}\n${movie.Country}\n${movie.Language}\n${movie.Plot}\n${movie.Actors}\n`);
                    runAgain();
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

                })
        } else {

            spotify.search({ type: 'track', query: answer, limit: 1 })
                .then(function (spotifyRes) {
                    var song = spotifyRes.tracks.items[0];

                    console.log(`Artist: ${song.album.artists[0].name}\nSong: ${song.name}\nOpen in Spotify: ${song.album.external_urls.spotify}\nAlbum: ${song.album.name}\n`);

                    runAgain();
                })
                .catch(function (err) {
                    if (err) throw err;
                });
        }
    })
}

var getMovie = function () {

    inquirer.prompt([
        {
            type: "input",
            message: "What movie would you like to search for??",
            name: "movieS"
        }
    ])
        .then(function (res) {

            if (res.movieS === '') {
                res.movieS = 'Mr.Nobody'
            }

            axios.get('http://www.omdbapi.com/?t=' + res.movieS + '&apikey=1de8dab0')
                .then(function (OMDBres) {
                    var movie = OMDBres.data;
                    console.log(`${movie.Title}\n${movie.Released}\n${movie.imdbRating}\n${movie.Country}\n${movie.Language}\n${movie.Plot}\n${movie.Actors}\n`);
                    runAgain();
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

                })
        })
}

var getSong = function () {
    inquirer.prompt([
        {
            type: "input",
            message: "What song would you like to search for??",
            name: "songS"
        }
    ])
        .then(function (res) {

            var spotify = new Spotify(keys.Spotify);

            if (res.songS === '') {
                res.songS = "The Sign";
            }

            spotify.search({ type: 'track', query: res.songS, limit: 1 })
                .then(function (spotifyRes) {
                    var song = spotifyRes.tracks.items[0];

                    console.log(`Artist: ${song.album.artists[0].name}\nSong: ${song.name}\nOpen in Spotify: ${song.album.external_urls.spotify}\nAlbum: ${song.album.name}\n`);

                    runAgain();
                })
                .catch(function (err) {
                    if (err) throw err;
                });
        })
}

start();