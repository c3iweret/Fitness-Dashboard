$(document).ready(function(){
    LoadEvents(0);
	$("button#create-event").on('click', (function() {
        $("form#create-event").toggleClass("hidden");
    }));
    //$("button#create").on('click', CreateEvent());
});

//Sends a get request to load all the events for a given day
function LoadEvents(dayNumber){
	
	console.log("Loading events");
	var date = GetDate();
	date.day += dayNumber;

	$.get({
	 	url: "/calendar/events",
	 	data: {
		  	day: date.day,
		  	month: date.month,
		  	year: date.year
	  	},
	  	success: function( data ) {
		  	console.log("Data: " + data);
		  	$("#date").text(date.month + "/" + date.day + "/" + date.year);
		  	$("#all-events").html(data);
		},
	});

}

//Sends a post request to create an event
function CreateEvent(){

	var event = $("#eventname").val();
	var start = $("#starttime").val();
	var end = $("#endtime").val();

	$("#eventname").val("");
	$("#starttime").val("");
	$("#endtime").val("");

	var date = GetDate();

	$.ajax({
	 	url: "/calendar/add",
	 	method: "POST",
	 	data: {
		  	name: event,
		  	start: start,
		  	end: end,
		  	year: date.year,
		  	month: date.month,
		  	day: date.day

	  	},
	  	success: function(){
	  		console.log("Created event, now refreshing list");
	  		LoadEvents(0);
	  	},
	  	error: function(err){
	  		console.log("Error: " + JSON.stringify(err));
	  	}
	});

}

function GetDate(){
	var date = $("#date").text();
	var day = parseInt(date.substring(3, 5));
	var month = date.substring(0, 2);
	var year = date.substring(6, 11);

	date = {};
	date.day = day;
	date.month = month;
	date.year = year;
	return date;
}
