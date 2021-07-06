//import the express module
var express = require('express');
var fs = require('fs')

//store the express in a variable 
var app = express();

//route the GET request to the specified path, "/token". 
//This sends the items to mask string information to the path  
app.get('/token', function(req, res){
        fs.readFile('maskInput.txt', 'utf8', (err,data) => {
            if (err) {
                return console.log(err);
            }
            console.log("Got input file data -> " + data);

            //avoid the cors access origin default error by setting the response headers as such
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');        
            res.end(data);
        });
        
    });
//This piece of code creates the server  
//and listens to the request at port 8888
//we are also generating a message once the 
//server is created
var server = app.listen(8888, function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log("App listening at http://%s:%s", host, port);
    });