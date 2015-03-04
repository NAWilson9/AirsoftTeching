/**
 * Created by Nick on 3/3/2015.
 *
 * Need to add error handling!
 */
//Link dependencies
var express = require('express');
var bodyParser = require('body-parser');

//Create server
var server = express();

//Server Setup
server.use(bodyParser.json());
server.use(express.static('../ClientSide/'));

//Start server
server.listen(1337, function() {
    console.log('AirsoftTeching server running on port ' + 1337);
});

//AJAX Calls



