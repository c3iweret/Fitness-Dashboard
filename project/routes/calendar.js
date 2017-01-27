var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Event = require('../models/calendar');

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

/* GET users listing. */
router.get('/', requirelogin, (req, res) => {
    
   res.render('index', {
        title: 'Calendar',
        user: req.user,
        partials: {
            content: 'calendar'
        }
   });
});

// router.get('/events', requirelogin, function(req, res) {
   
// 	res.locals.day = req.query.day;
// 	res.locals.month = req.query.month;
// 	res.locals.year = req.query.year;
  

// 	User.find({username: req.user.username}).lean().exec(function(err, user){
		
// 		if(err || !user){
// 			console.log("Error: \n" + JSON.stringify(err, null, 4));
// 			res.status(500).send("No user found");
// 			throw err;
// 		}

// 		res.locals.user = user;	


// 		Event.find({user: res.locals.user._id, day: res.locals.day, month: res.locals.month, year: res.locals.year}).lean().exec(function(err, entries){

// 			if(err || !entries){
// 				console.log("Error: \n" + JSON.stringify(err, null, 4));
// 				res.status(500).send("No entry found");
// 				throw err;
// 			}

// 			res.render("calEntry",
// 			{
//                 entries: entries 
// 			});
// 		});
// 	}); 
// });

// //Adds a new exercise to the users database
// router.post('/add', requirelogin, function(req, res) {

// 	console.log(JSON.stringify(req.body));

// 	if(!req.user){
// 		res.status(500).send("No user found");
// 		throw err;
// 	}

// 	res.locals.name = req.body.name;
// 	res.locals.day = req.body.day;
// 	res.locals.month = req.body.month;
// 	res.locals.year = req.body.year;

// 	User.find({username: req.user.username}).lean().exec(function(err, user){

// 		if(err || !user){
// 			console.log("Error: \n" + JSON.stringify(err, null, 4));
// 			res.status(500).send("No user found");
// 			throw err;
// 		}
// 		var eventEntry = new Event({name: res.locals.name, day: res.locals.day, month: res.locals.month, year: res.locals.year, 
// 			from_time: req.body.start, to_time: req.body.end, User: user._id});

// 		eventEntry.save(function(err){
// 			if(err || !user){
// 				console.log("Error: \n" + JSON.stringify(err, null, 4));
// 				res.status(500).send("Save failed");
// 			}
// 			else{
//                 res.end("success");
//                 console.log("success");
//             }
// 		});

// 	});
  	
// });


module.exports = router;
