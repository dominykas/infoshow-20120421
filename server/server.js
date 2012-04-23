var io = require('socket.io').listen(8001);

io.sockets.on('connection', function (socket) {
	console.log('connected!');
	socket.on('next', function(){
		console.log("Broadcast: next");
		socket.broadcast.emit('next');
	});
	socket.on('prev', function(){
		console.log("Broadcast: prev");
		socket.broadcast.emit('prev');
	});
});