"use strict";
var app = require("./app");
var http = require("http");
var httpServer = http.createServer(app);
global.port = 3502;
httpServer.listen(global.port);
