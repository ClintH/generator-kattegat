/**
* A small set of helper functions for Kattegat apps
**/
window.kattegat = {
notify: function(msg, isError) {
	if (typeof isError == 'undefined') isError = false;
	var cls = "toast";
	if (isError) cls += " error";
	if (isError) {
		console.log("ERR: " + msg);
	} else {
		console.log("LOG: " + msg);
	}

	$('<div class="' + cls + '">' + msg + '</div>')
		.appendTo("body")
		.transition({opacity:1.0})
		.transition({opacity:0.0, delay: 3000}, function() {
			$(this).remove();
		});
},
notifyError:function(msg) {
	this.notify(msg, true);
}
}