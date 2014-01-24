// Generated on <%= (new Date).toISOString().split('T')[0] %>
// This code runs when the page is loaded
// (NOTE: by default, page reloading happens automatically when you edit the source files)
console.log("Loaded the <%= pageName %> page script!");


$(document).ready(function() {
	// Stuff here runs when the page is ready for action.
	// This is when we wire-up events, like the following.
	
	// Here, we wire up the 'click' event for the selector
	// #clickMe (which corresponds to an element with id 'clickMe')
	// to a function named 'clickHandler' (which we define later)
	$("#clickMe").on("click", clickHandler);

	// p.s. all these statements beginning with $ is jQuery
	// Learn more: http://www.codecademy.com/tracks/jquery
})

// This is a function we've called 'clickHandler'
//
// It won't run unless it gets called. In this case
// it gets called by the event handling (above)
function clickHandler() {
	alert("Yep, you clicked the button on page <%= pageName %>!");		
}