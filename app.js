//order is IMPORTANT HERE!!!
//http has to come before the socket.io with the .listen(server)
var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var chart = require("chart.js");
const request = require('request');
const http = require('https');

const mysql = require("mysql");
const config = require("./config.js");
var currentPrice, lastUpdate;
var chartData, chartLabels;

app.get('/', function(req, res) {
	res.render('index.ejs');
});


function getAllTokenInfo() {
	//This will call each Token info in turn;
	//for now needs to have access tokens added to code, should use oath in the end
	getTokenInfo("us.api.battle.net","/data/wow/token/?namespace=dynamic-us&locale=en_US&access_token="); //us
	getTokenInfo("eu.api.battle.net","/data/wow/token/?namespace=dynamic-eu&locale=en_GB&access_token="); //eu
	getTokenInfo("kr.api.battle.net","/data/wow/token/?namespace=dynamic-kr&locale=ko_KR&access_token="); //kr
	getTokenInfo("tw.api.battle.net","/data/wow/token/?namespace=dynamic-tw&locale=zh_TW&access_token="); //tw
	//getTokenInfo("",""); //China probably isnt happening now.. wont let me log in
}

function getTokenInfo(url, path) {
	var options = {
	  "method": "GET",
	  "hostname": url,//"us.api.battle.net",
	  "port": null,
	  "path": path,//"/data/wow/token/?namespace=dynamic-us&locale=en_US&access_token=",
	  "headers": {
		"cache-control": "no-cache",
		"postman-token": ""// if used from postman needs the token
	  }
	};
	
	var req = http.request(options, function (res) {
	  var chunks = [];
	
	  res.on("data", function (chunk) {
		chunks.push(chunk);
	  });
	
	  res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
		body = JSON.parse(body);
		if(body._links.self.href == "https://us.api.battle.net/data/wow/token/?namespace=dynamic-us"){
			parseTokenInfo(body,"Token_Data_US");
		}
		else if(body._links.self.href == "https://kr.api.battle.net/data/wow/token/?namespace=dynamic-kr") {
			parseTokenInfo(body,"Token_Data_KR");
		}
		else if(body._links.self.href == "https://eu.api.battle.net/data/wow/token/?namespace=dynamic-eu"){
			parseTokenInfo(body,"Token_Data_EU");
		}
		
		else if(body._links.self.href == "https://tw.api.battle.net/data/wow/token/?namespace=dynamic-tw") {
			parseTokenInfo(body, "Token_Data_TW");
		}
	  });
	});
	req.end();	
}
function parseTokenInfo(data, table_name) {
	//now will take a second param of table_name which will be added as a parameter to the sql strings
		currentPrice = data.price;
		lastUpdate = data.last_updated;
		//lastUpdate = new Date(dateFix).toISOString().replace(/T/, ' ').replace(/\..+/, '');
		currentPrice = currentPrice / 10000;

		console.log('test price: ' + currentPrice.toLocaleString() + " test date: " + lastUpdate + " table name: " + table_name);
		
		let con = mysql.createConnection(config);
		
		con.connect(function(err) {
			if(err)  {
				return console.error(err.message);
			}
			else{
				console.log("connected");
				let sql = 'Call storeToken(' + currentPrice + ',' + lastUpdate + ',\'' + table_name + '\')';
				con.query(sql, function(err, result) {
					if(err) {
						return console.error(err.message);
					}
					else{
						console.log(result[0]);
					}
					con.end();
				});
			}
		});
}
function getAllDataAndEmit(socket) {
	getDataAndEmit(socket);
}
function getDataAndEmit(socket) {
	let con = mysql.createConnection(config);
	let sql = 'CALL retrieveTest()';
	con.connect(function(err) {
		if(err) {
			return console.error(err.message);
		}
		else{
			console.log("2nd connection");
			con.query(sql, function(err, result) {
				if(err) {
					return console.error(err.message);
				}
				else {
					var chartArr = [];
					chartArr.push(JSON.stringify(result[0]));
					chartArr.push(JSON.stringify(result[1]));
					chartArr.push(JSON.stringify(result[2]));
					chartArr.push(JSON.stringify(result[3]));
					socket.emit('token_info', chartArr);				
				}
				con.end();
			});
		}
	});
}

io.sockets.on('connection', function(socket, price, date) {
	getAllDataAndEmit(socket);
	setInterval(function() {
		getAllDataAndEmit(socket);
	}, 910000);	
});

getAllTokenInfo();
setInterval(getAllTokenInfo, 900000);

server.listen(9292);