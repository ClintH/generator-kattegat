// Wire up event handlers
	$(document).ready(function() {
		$("#insertButton").on("click", insert);
		$("#insertTest").on("click", insertTest);
		$("#updateButton").on("click", update);

		$("#findAllButton").on("click", findAll);
		$("#findSubstringButton").on("click", findSubstring);
		$("#findExactButton").on("click", findExact);
		$("#findLogicButton").on("click", findLogic);
		$("#removeAllButton").on("click", removeAll);
		$("#removeButton").on("click", remove);
	})

	/* -------------------------
	* 	INSERTING + UPDATING STUFF
	*  -------------------------
	*/
	
	// Demo: Inserts a bunch of test data
	function insertTest(e) {
		var test = [
			{name: "Alice", age: 24, colour: "Blue"},
			{name: "Jane", age: 19, colour: "Blue"},
			{name: "Boris", age: 19, colour: "Green"},
			{name: "Igor", age: 43, colour: "Yellow"},
			{name: "Baldrick", age: 50, colour: "Red"},
		]
		for (var i=0;i<test.length; i++) {
			$.post("/store/insert", test[i], function(data, status, xhr) {
				console.log("Inserted: " + JSON.stringify(data));
			})
		}
	}

	// Demo: Saves a document (really just a plain object) on the server
	function insert(e) {
		e.preventDefault(); // Stop form from submitting the normal way

		var documentToInsert = {
			name: $("form[name='insertForm'] input[name='name']").val(),
			age: parseInt($("form[name='insertForm'] input[name='age']").val()),
			colour: $("form[name='insertForm'] select[name='colour']").val(),
			created: new Date()
		}
		$.post("/store/insert", documentToInsert, function(data, status, xhr) {
			console.log("Insert result:");
			console.dir(data);

		})
	}
	// Demo: Updates an existing document
	function update(e) {
		e.preventDefault(); // Stop form from submitting the normal way

		// First we need to make some kind of query (in the same we we find things)
		// which matches the documents that need to be updated
		var documentToUpdate = {
			name: $("input[name='nameOld']", e.target.parentElement.parentElement).val()
		}

		// And then we need to set what should be updated
		// 	Note that in this example, we use $set to update particular fields
		var updateWith = {
			name:  $("input[name='nameNew']", e.target.parentElement.parentElement).val()
		}

		// And now glue these two things together so they get sent off as one object
		var data = {
			query: documentToUpdate,
			update: updateWith
		}

		$.post("/store/update", data, function(data, status, xhr) {
			console.log("Update result:");
			console.dir(data);

		})
		
	}

	/* ---------------
	* 	FINDING STUFF
	*  ---------------
	*/
	// Demo: Returns all stored documents on the server
	function findAll() {
		// An empty object: {} is used to signify we want everything
		performFind({});
	}

	// Demo: Finds documents based on substring search
	function findSubstring(e) {
		e.preventDefault(); // Stop form from submitting the normal way

		// Get the value of the input box inside the parent's parent of the button
		var q = $("input[name='q']", e.target.parentElement).val();

		// Starting and ending with '/' tells Kattegat that it's a substring (regex) search
		// this means that it will match any text that contains the contents of q.
		var find = {
			name: "/" + q +"/"
		}
		performFind(find);
	}

	// Demo: Finds documents with an exact value
	function findExact(e) {
		e.preventDefault(); // Stop form from submitting the normal way

		// Get selected colour
		var q = $("select[name='q']", e.target.parentElement).val();

		var find = {
			colour: q
		}
		performFind(find);
	}

	// Demo: Finds documents with an exact value
	function findLogic(e) {
		e.preventDefault(); // Stop form from submitting the normal way

		// Get age that user typed in
		var q = parseInt($("input[name='q']", e.target.parentElement).val());
		var find = {
			age: { "$gt": q}
		}
		performFind(find);
	}

	// Demo: This takes a constructed 'find' object and hands it over to the server 
	function performFind(find) {
		// Sends the find request to the server.
		// Read more about find syntax here: https://github.com/louischatriot/nedb#finding-documents
		$.post("/store/find", find, function(data, status, xhr) {
			console.log("Find result:");
			for (var i=0;i<data.length;i++) {
				var doc = data[i];
				console.log(i +". " + JSON.stringify(doc));

			}
		})
	}

 /* ---------------
	* 	REMOVING STUFF
	*  ---------------
	*/

	function removeAll(e) {
		e.preventDefault(); // Stop form from submitting the normal way
		
		// As with the find all demo, we can remove everything by matching everything
		performRemove({});
	}

	function remove(e) {
		e.preventDefault(); // Stop form from submitting the normal way

		// Get the value of the input box which has the same parent as the button (e.target)
		var q = $("input[name='q']", e.target.parentElement).val();

		// Starting and ending with '/' tells Kattegat that it's a substring (regex) search
		// this means that it will match any text that contains the contents of q.
		var find = {
			name: q
		}
		//console.dir(find);
		performRemove(find);
	}

	// Demo: This takes a constructed 'thingsToRemove' object and sends it to the server. All things matching the query will be removed
	function performRemove(thingsToRemove) {
		// Sends the remove request to the server.
		// 	Note that the syntax for matching is the same as to find

		// Since the remove command has options, we have to wrap the query into another object:
		var data = {
			query: thingsToRemove,
			options: { multi: true} // Setting to 'true' means we'll delete more than one thing if it matches our query
		}
		$.post("/store/remove", data, function(data, status, xhr) {
			console.log("Remove result:");
			console.dir(data);
		})
	}
