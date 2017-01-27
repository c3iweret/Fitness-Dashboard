var express = require('express');
var router = express.Router();


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

/* GET feed page. */
router.get('/', requirelogin, function(req, res) {

	res.render('index', {
		title: 'Projections',
		user: req.user,
		partials: {
			content: 'projections'
		}
	});

});

module.exports = router;
