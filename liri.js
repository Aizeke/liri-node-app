// ======== Require Packages ==============
var axios = require('axios');
var Spotify = require('node-spotify-api');


var inquirer = require("inquirer");

// ======== Variables To Use ==============

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What Movie?',
            name: 'movie'
        },
        {
            type: 'input',
            message: 'Song?',
            name: 'song'
        }
    ])
    .then(function(inquirerRes){
        if(inquirerRes.input) {

        }
    })

// ========================================

var spotify = new Spotify({
    id: '2a1b73c735ae4abc9b91093c8d6cd474',
    secret: '89ad0141e0c14b59bfe878269f11ce91'
})


axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=1de8dab0')
    .then(function (OMDBres) {
        console.log(OMDBres.data);






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

console.log('============ SPOTIFY Search ===================')

// spotify.search({
//     type: 'track',
//     query: 'All the Small Things',
//     limit: 5
// }, function (err, data) {
//     if (err) {
//         return console.log('Error Occured: ' + err);
//     }

//     console.log(data);

//     console.log(data.items);
// })