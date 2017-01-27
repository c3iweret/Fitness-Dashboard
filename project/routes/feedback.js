var express = require('express');
var router = express.Router();
var Feedback = require('../models/feedback');


///use for pages that require login
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

/* GET feedback page. */
router.get('/', requirelogin, function(req, res) {

	res.render('index', 
	{
		title: 'Feedback',
		partials: {
			content: "feedback"
		},
		user: req.user,
	});

});

router.post('/submit', function(req, res) {

	var name = req.body.firstname + req.body.lastname;
	var email = req.body.email;
	var comment = req.body.comment;

	var feedback = new Feedback({name: name, email: email, comment: comment});

	feedback.save(function(err){
			if(err){
				console.log("Error: \n" + JSON.stringify(err, null, 4));
				res.status(500).send("Feedback save failed");
			}
			else{
				res.redirect("/");
			}
	});
});

module.exports = router;