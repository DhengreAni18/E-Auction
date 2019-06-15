var fireBase = require('./Sfirebase');
var SERVER_PORT = 9090;
var moment = require("moment");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('transports', ['websocket']);

server.listen(SERVER_PORT);

console.log("Server Running");



io.on('connect', (socket) => {
        console.log("Client Connected");


        socket.on('getAuctions', (data) => {

                        var usersRef = fireBase.fireBaseConnection.database().ref('Products').orderByChild("edate");
                
                        var data = {};
                        data.time_stamp = moment().unix();
                        data.auctions = [];
                
                        var i = 0;
                
                        usersRef.on("value", function (snapshot) {
                
                                var adata = snapshot.val();
                
                                for (i in adata) {
                                        data.auctions.push(adata[i]);
                                }

                                console.log(data);

                                socket.emit('auctionData',data);

                        });
                });
});