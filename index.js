var express = require("express");
var app     = express();
var path    = require("path");
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*
	var options = {
		method: 'POST',
		url: 'https://qa01-m.barclaycardus.com/mobileservice/authenticate/v3',
		qs:
		{userID: 'user',
		password:  'pass',
		version: '3.1',
		appVersion: '6.14.0',
		osVersion: '1',
		platform: 'Android'},
		headers:
		{
		'postman-token': 'adf20ba8-220b-a5ef-b00f-ee180ebfd193',
		'cache-control': 'no-cahce',
		accept: 'application/json',
		'bcususer-agent': 'iphone/android',
		guid: '123456789'
		}
		};

*/

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/views/login.html'));
});

app.post('/login', function(req, res){
  //  var user = req.body['username'];
  //  var pass = req.body['password'];
   // console.log( user);
	request({
            		method: 'POST',
            		url: 'https://qa01-m.barclaycardus.com/mobileservice/authenticate/v3',
            		qs:
            		{userID: req.body['username'],
            		password:  req.body['password'],
            		version: '3.1',
            		appVersion: '6.14.0',
            		osVersion: '1',
            		platform: 'Android'},
            		headers:
            		{
            		'postman-token': 'adf20ba8-220b-a5ef-b00f-ee180ebfd193',
            		'cache-control': 'no-cahce',
            		accept: 'application/json',
            		'bcususer-agent': 'iphone/android',
            		guid: '123456789'
            		}
            		} , function(err,response,body) {
                            if (err) res.sendFile(path.join(__dirname+'/views/login.html'));;
                             var obj = JSON.parse(body);
	                         console.log(obj.statusInfo.statusDescription);
	                         if (obj.statusInfo.statusDescription == 'SUCCESS') {
	                         res.sendFile(path.join(__dirname+'/views/success.html'));
	                         } else {
	                         res.sendFile(path.join(__dirname+'/views/login.html'));
	                         }


	})

			});



app.listen(3000);

console.log("Running at Port 3000");