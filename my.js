$(function(){

	var options = {
		server: '192.168.1.59',
		port: 8001
	};

	$.deck('.slide');

	if (window.name != 'notes')
	{
		var newWin = window.open('notes.html', 'notes');

		var len = $.deck('getSlides').length;

		$(document).bind('deck.change', function(e, from, to) {
			var msg = $.deck('getSlide', to).find('.notes').html();
			if (to < len - 1) {
				var next = $.deck('getSlide', to+1).find('h2').html();
			}
			newWin.postMessage(JSON.stringify({msg:msg, next:next}), '*');
		});
		//return;
		Modernizr.load({
			load: 'http://'+options.server + (options.port ? ':'+options.port : '') + '/socket.io/socket.io.js',
			callback: function(){
				var socket = io.connect(options.server, {port: options.port});
				socket.on('next', function(){
					$.deck('next');
				});
				socket.on('prev', function(){
					$.deck('prev');
				});

				$('#rc-next').click(function(){
					socket.emit('next');
				});
				$('#rc-prev').click(function(){
					socket.emit('prev');
				});
			}
		});
	}
	else
	{
		$(window).bind('message', function(e) {
			var data=JSON.parse(e.originalEvent.data);
			$('#notes').html(data.msg);
			$('#next').html(data.next);
		});
	}


});