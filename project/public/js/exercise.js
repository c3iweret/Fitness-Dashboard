var dateOffset;
var date;

$(document).ready(function(){
	dateOffset = 0;
	date = GetDate(0);
	LoadExerciseEntries(0);
	LoadExercises();
});

//Sends a post request to create an exerciseEntry
function CreateExerciseEntry(){

	var exercise = $("#exercise-select").val();
	var reps = $("#exercise-reps").val();
	var sets = $("#exercise-sets").val();
	var note = $("#exercise-note").val();

	$("#exercise-select").val("");
	$("#exercise-reps").val("");
	$("#exercise-sets").val("");
	$("#exercise-note").val("");

	$.ajax({
	 	url: "/exercise/log/add",
	 	method: "POST",
	 	data: {
		  	exercise: exercise,
		  	reps: reps,
		  	sets: sets,
		  	year: date.year,
		  	month: date.month,
		  	day: date.day,
		  	note: note

	  	},
	  	success: function(data){
	  		console.log("Created exercise entry, now refreshing list");
	  		LoadExerciseEntries(0);
	  	},
	  	error: function(err){
	  		console.log("Error: " + JSON.stringify(err));
	  	}
	});

}

//Sends a get request to load all the exercise entries for a given day
function LoadExerciseEntries(dayNumber){
	
	dateOffset += dayNumber;
	date = GetDate(dateOffset);

	$.get({
	 	url: "/exercise/logs",
	 	data: {
		  	day: date.day,
		  	month: date.month,
		  	year: date.year
	  	},
	  	success: function( data ) {
		  	console.log("Data: " + data);
		  	$("#date").text(date.month + "/" + date.day + "/" + date.year);
		  	$("#entry-parent").html(data);
		},
	});

}



function CreateExercise(){

	var name = $("#exercise-name-create").val();
	$("#exercise-name-create").val("");
	$.ajax({
	 	url: "/exercise/add",
	 	method: "POST",
	 	data: {
		  	name: name,
		  	date: date
	  	},
	  	success: function(data){
	  		LoadExercises();
	  	}
	});	
}

function LoadExercises(){
	$.get({
	 	url: "/exercise/getExercises",
	  	success: function( data ) {
		  	$("#exercise-select").html(data);
		},
	});

}

function GetDate(dateOffset){
	var d = new Date.today().addDays(dateOffset);
	var day = d.getDate();
	var month = d.getUTCMonth() + 1;
	var year = d.getUTCFullYear();


	console.log(".js:" +JSON.stringify(d));

	date = {};
	date.day = day;
	date.month = month;
	date.year = year;
	console.log("date:" + JSON.stringify(date));
	return date;
}

function DeleteExercise(id){


	$.ajax({
	 	url: "/exercise/remove",
	 	method: "POST",
	 	data: {
		  	id: id
	  	},
	  	success: function(data){
	  		console.log("Deleted exercise, now refreshing list");
	  		LoadExerciseEntries(0);
	  	},
	  	error: function(err){
	  		console.log("Error: " + JSON.stringify(err));
	  	}
	});

}

function DeleteEntry(id){


	$.ajax({
	 	url: "/exercise/log/remove",
	 	method: "POST",
	 	data: {
		  	id: id
	  	},
	  	success: function(data){
	  		console.log("Deleted exercise entry, now refreshing list");
	  		LoadExerciseEntries(0);
	  	},
	  	error: function(err){
	  		console.log("Error: " + JSON.stringify(err));
	  	}
	});
}