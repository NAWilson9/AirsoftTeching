/**
 * Created by Nick on 3/3/2015.
 *
 * Need to add error handling!
 */
//Link dependencies
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); //used for node file system interaction.

//Create server
var server = express();

//Server Setup
server.use(bodyParser.json());
server.use(express.static('../ClientSide/'));

//Start server
server.listen(1337, function() {
    console.log('AirsoftTeching server running on port ' + 1337);
});

/*
AJAX Calls
 */

//Get's the main page
server.get('/getHomePage', function(req, res) {
    var responseHTML =  fs.readFileSync('./Pages/HomePage.html', 'utf8');
    res.send(responseHTML);
});

server.get('/getBatteryPage', function(req, res) {
    var responseHTML =  fs.readFileSync('./Pages/BatteryPage.html', 'utf8');
    res.send(responseHTML);
});

server.get('/getCalculatorPage', function(req, res) {
    var responseHTML =  fs.readFileSync('./Pages/CalculatorPage.html', 'utf8');
    res.send(responseHTML);
});

server.get('/getSubmitYourDataPage', function(reg, res) {
    var responseHTML = fs.readFileSync('./Pages/SubmitYourDataPage.html', 'utf8');
    res.send(responseHTML);
});