// This is our reference to the server
var socket = null;

// Wire up event handlers
$(document).ready(function() {
	
	// By default, we'll connect to your own server:
	var url = "http://" + window.location.host;

	// But you can connect to someone else's Kattegat server
	// eg, by setting url to "http://130.102.251.100:3000"
	// (or whatever the external address of the machine is)
	socket = io.connect(url);
	
	// Listen to events from the server
	// (which in turn might been sent from another user)
	socket.on("hello", onHello);
	socket.on("say", onSay);
	socket.on("join", onJoin);
	socket.on("leave", onLeave);
	socket.on("list", onList);
	socket.on("data", onData);
	socket.on("rooms", onRooms);

	// Listen to events from the user clicking
	// (event handlers are further down in the file...)
	$("#broadcastButton").on("click", broadcast);
	$("#roomJoinButton").on("click", join);
	$("#roomLeaveButton").on("click", leave);
	$("#roomListButton").on("click", list);
	$("#listRoomsButton").on("click", listRooms);
	$("#roomMessageButton").on("click", roomMessage);
	$("#dataGetButton").on("click", dataGet);
	$("#dataPutButton").on("click", dataPut);
})

/*
*
* -------------------------------------
*   LISTEN FOR EVENTS FROM THE SERVER
* -------------------------------------
*
*/
// Demo: Listen for a welcome message from server
//	This happens when we first connect, and tells us our unique id
function onHello(data) {
	console.log("Received greeting from server. Our id is: " + data.id);
}

// Demo: Listen for data from other clients
//	Uses the event handler for 'say', which is wired up above
function onSay(data) {
	// 'data' contains whatever was sent out from another client
	// Eg, in our messaging example, we could get the name
	// of the person: var name = data.name

	// ... or in this case we'll just print it out to the console
	console.log("Received say: " + JSON.stringify(data));
}

// Demo: Listen for when another client leaves
function onLeave(data) {
	console.log("Left: " + JSON.stringify(data));
}

// Demo: Listen for when another client joins
function onJoin(data) {
	console.log("Joined: " + JSON.stringify(data));
}

// Demo: Received list (see 'list' function further down)
//	List contains connected clients and associated data
function onList(data) {
	console.log("Received list response:");
	console.dir(data);
}

// Demo: Recieving requested data (see the data section at the bottom)
function onData(data) {
	console.log("Received data request response:");
	console.dir(data);
}

function onRooms(data) {
	console.log("Received list of rooms:");
	console.dir(data);
}

/*
 *
 * ------------------------------
 *    SEND EVENTS TO THE SERVER
 *  -----------------------------
 *
 */
// Demo: Sends a broadcast to all connected clients
//	(that is, everyone who is visiting the same app)
// 	Note: The server never sends data back to the client that sent the data
function broadcast(e) {
	e.preventDefault(); // Stop the form from submitting

	// You can send whatever object you want,
	// here we're sending one with 'name' and 'message' fields
	var data = {
		name: $("input[name='name']", e.target.parentElement).val(),
		message: $("input[name='msg']", e.target.parentElement).val()
	}
	

	// Use the command "say" to broadcast,
	// and hand it whatever simple object we want
	// to send
	socket.emit("say", data);
}	

// Demo: Joins a particular 'room'. This allows us to be more 
//	specific about what messages we send or tune in to.
function join(e) {
	e.preventDefault(); // Stop the form from submitting

	// We have to provide a 'room' field
	var data = {
		room: $("input[name='room']", e.target.parentElement).val(),
	}
	socket.emit("join", data);
}


// Demo: Leaves a particular 'room'.
function leave(e) {
	e.preventDefault(); // Stop the form from submitting

	// We have to provide a 'room' field
	var data = {
		room: $("input[name='room']", e.target.parentElement).val(),
	}
	socket.emit("leave", data);
}

// Demo: Get a list of who is in a particular room
//	The list response (see 'onList' earlier) also contains any data
//	that has been associated with the client. Use 'put' to set data
function list(e) {
	e.preventDefault(); // Stop the form from submitting
	
	// We have to provide a 'room' field
	var data = {
		room: $("input[name='room']", e.target.parentElement).val()
	}
	
	socket.emit("list", data);
	// The server will respond with a 'list' event
	// -- this is handled further up in the code
}
// Demo: Send data to everyone in a room
function roomMessage(e) {
	e.preventDefault(); // Stop the form from submitting

	// We have to provide a 'room' field, but can
	// include any other fields - here we're adding 'message'
	var data = {
		room: $("input[name='room']", e.target.parentElement).val(),
		message: $("input[name='msg']", e.target.parentElement).val()
	}
	
	// Note we're using 'say' as we do with a broadcast
	// the difference is now there is the 'room' field
	// which restricts who gets the data
	socket.emit("say", data);
}

function listRooms(e) {
	e.preventDefault(); // Stop the form from submitting
	socket.emit("rooms", {});

	// We get the data back via the 'rooms' event (see top of file)
}
/*
*
* ---------------------
*   ASSOCIATING DATA
* ---------------------
*
*/

// Demo: Associating data with a client
//  Data is in key-value pairs
function dataPut(e) {
	e.preventDefault(); // Stop the form from submitting

	// Assemble an object to set
	// We must use the fields 'name' and 'value'
	var data = {
		name: $("input[name='name']", e.target.parentElement).val(),
		value: $("input[name='value']", e.target.parentElement).val()
	}
	socket.emit("put", data);
}

function dataGet(e) {
	e.preventDefault(); // Stop the form from submitting

	// The key we want to fetch.
	// 	We must use the field 'name'
	var data = {
		name: $("input[name='name']", e.target.parentElement).val(),
	}
	socket.emit("get", data);
	// The server will respond with a 'data' event
	// -- this is handled further up in the code
}