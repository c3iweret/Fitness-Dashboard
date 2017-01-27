var  express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/load', (req, res) => {
    User.findOne({_id: req.user._id}, function(err, user) {
        res.send(user.todoList);
    });
});

router.post('/update', (req, res) => {
    var list = JSON.parse(req.body.list);
    User.update({_id: req.user._id}, {
        todoList: list
    }, function(err, numAffected) {
        if (!err) {
            res.send(list);
        }
        else {
            res.send(false);
        }
    });
});

module.exports = router;
