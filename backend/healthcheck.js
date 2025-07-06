var http = require("http");
require('dotenv').config();

var options = {
	host: "localhost",
	port: process.env.BACKEND_PORT,
	path: '/health',
	timeout: 2000,
};
var request = http.request(options, (res) => {
	console.log(`STATUS: ${res.statusCode}`);
	if (res.statusCode == 200) {
		process.exit(0);
	} else {
		process.exit(1);
	}
});
request.on("error", function (err) {
	console.error("ERROR");
	process.exit(1);
});
request.end();