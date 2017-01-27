var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Exercise = require('../models/exercise').Exercise;
var ExerciseEntry = require('../models/exercise').ExerciseEntry;
var User = require('../models/user');


//use for pages that require login
var requirelogin = function requirelogin(req, res, next){
    if(!req.user){
      res.render('home', {
        Message: 'Please log in',
        partials: {
            content: 'login'
        }
   });
    }
    else{
      next();
    }
};

router.get('/', requirelogin, function(req, res, next){

	var date;

	if(!req.query.date){
		var d = new Date();
		var month = d.getUTCMonth() + 1; //months from 1-12
		var day = d.getUTCDate();
		var year = d.getUTCFullYear();
		var date = {};
		d.day = day;
		d.month = month;
		d.year = year;

	}
	else{
		date = req.query.date;
	}

	res.render("index",
		{
			user: req.user,
			date: date,
			partials: {
				content: "exercise"
			}
		});

  
});

router.get('/logs', function(req, res, next) {

	res.locals.day = req.query.day;
	res.locals.month = req.query.month;
	res.locals.year = req.query.year;

	User.find({_id: req.user._id}).lean().exec(function(err, user){
		
		if(err || !user){
			console.log("Error: \n" + JSON.stringify(err, null, 4));
			res.status(500).send("No user found");
			throw err;
		}

		res.locals.user = user;	


		ExerciseEntry.find({user: res.locals.user._id, day: res.locals.day, month: res.locals.month, year: res.locals.year}).lean().exec(function(err, entries){

			if(err || !entries){
				console.log("Error: \n" + JSON.stringify(err, null, 4));
				res.status(500).send("No entry found");
				throw err;
			}

			res.render("exerciseEntry",
			{
				entries: entries 
			});
		});
	});


  
});

//Adds a new exercise to the users database
router.post('/log/add', function(req, res, next) {

	console.log(JSON.stringify(req.body));

	if(!req.user){
		res.status(500).send("No user found");
		throw err;
	}

	res.locals.name = req.body.exercise;
	res.locals.note = req.body.note;
	res.locals.day = req.body.day;
	res.locals.month = req.body.month;
	res.locals.year = req.body.year;

	User.find({_id: req.user._id}).lean().exec(function(err, user){

		if(err || !user){
			console.log("Error: \n" + JSON.stringify(err, null, 4));
			res.status(500).send("No user found");
			throw err;
		}

		var exerciseEntry = new ExerciseEntry({exercise: res.locals.name, day: res.locals.day, month: res.locals.month, year: res.locals.year, 
			repetitions: req.body.reps, sets: req.body.sets, note: req.body.note, User: user._id});

		exerciseEntry.save(function(err){
			if(err || !user){
				console.log("Error: \n" + JSON.stringify(err, null, 4));
				res.status(500).send("Save failed");
			}
			else{
				res.end("Success");
			}
		});
	});
  	
});

//Adds a new exercise to the users database
router.post('/log/remove', function(req, res, next) {

	console.log(JSON.stringify(req.body));

	if(!req.user){
		res.status(500).send("No user found");
		throw err;
	}

	ExerciseEntry.find({ _id: req.body.id }).remove( function(err){

		if(err){
			res.status(500).send("Error deleting exercise entry");
			throw err
		}
		res.end("Suceces");
	} );
  	
});

//Gets the list of exercises the user has created
router.get('/getExercises', function(req, res, next) {


	User.find({username: req.user._id}).lean().exec(function(err, user){

		if(err || !user){
			res.status(500).send("No user found");
			return;
		}

		res.locals.user = user;	

		Exercise.find({user: req.user._id}).lean().exec(function(err, exercises){

			if(err || !exercises){
				console.log("No exercises found");
				res.status(500).send("No exercises found");
				return;
			}

			res.render("exerciseOption", {exercises: exercises});
	    });

	});

  
});


//Adds a new exercise to the users database
router.post('/add', function(req, res, next) {

	if(!req.user){
		res.end("No user available, failed");
		return;
	}

	console.log("User: " + JSON.stringify(req.user));
	res.locals.name = req.body.name;

	User.find({_id: req.user._id}).lean().exec(function(err, user){

		var exercise = new Exercise({name: req.body.name, user: req.user._id});
		console.log("User: " + req.user._id);

		exercise.save(function(err){
			if(err || !user)
				res.status(500).send("No user found");
			else
				res.end("Success");
		});
	});
  	
});

//Removes
router.post('/remove', function(req, res, next) {

	if(!req.user){
		res.end("No user available, failed");
		return;
	}

	res.locals.name = req.body.name;

	User.find({_id: req.user._id}).lean().exec(function(err, user){

		var exercise = new Exercise({name: req.body.name, user: req.user._id});
		res.locals.name = req.body.name;

		exercise.save(function(err){
			if(err || !user)
				res.status(500).send("No user found");
			else
				res.end("Success");
		});
	});
  	
});

module.exports = router;


/** Returns date ni mm/dd/yy format
Credit to: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
*/
function GetDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = ""+mm+dd+yyyy;
	return today;
}