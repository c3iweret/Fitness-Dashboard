var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/index');
    }
    else {
        res.render('home', {
            partials: {
                content: 'login'
            }
       });
   }
});

module.exports = router;
