// Wire up event handlers
$(document).ready(function() {
	$("#subscribeButton").on("click", subscribe);
	$("#fetchButton").on("click", fetchData);

	// By default, we'll connect to your own server:
	var url = "http://" + window.location.host;

	// But you can connect to someone else's Kattegat server
	// eg, by setting url to "http://130.102.251.100:3000"
	// (or whatever the external address of the machine is)
	socket = io.connect(url);
	socket.on("spreadsheet", onSpreadsheet);
})

/*
*
* -------------------------------------
*   LISTEN FOR EVENTS FROM THE SERVER
* -------------------------------------
*
*/
function onSpreadsheet(data) {
	// This is called when ever new data is inserted into the spreadsheet
	console.dir(data);
}

/* -------------------------
* 	INSERTING + UPDATING STUFF
*  -------------------------
*/

function fetchData(e) {
	e.preventDefault(); // Stop form from submitting the normal way

	// Get key from user input
	var key =$("input[name='key']", e.target.parentElement).val();
	
	console.log("Fetching");
	$.get("/gspreadsheet/" + key)
	.done(function(o) {
		console.log("Done");
		console.dir(o);
	})
	.fail(function(e) {
		if (e.status == 404) {
			console.log("Subscription doesn't exist yet");
		} else {
			console.log("Fail");
			console.dir(e);
		}
		
	})
}


// Demo: Subscribes to a spreadsheet
function subscribe(e) {
	e.preventDefault(); // Stop form from submitting the normal way

	// Get key from user input
	var key =$("input[name='key']", e.target.parentElement).val();
	
	// Subscribe to data updates
	socket.emit("join", {room: key});

	// Subscribe to spreadsheet with Kattegat
	console.log("Subscribing to: " + key);
	$.post("/gspreadsheet", {key:key}, function(data, status, xhr) {
		console.log("Subscribe result:");
		console.dir(data);
	})
}


