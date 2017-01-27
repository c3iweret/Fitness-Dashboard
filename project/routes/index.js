var express = require('express');
var router = express.Router();
var Recipes = require('../models/recipe').Recipes;
var User_Recipes = require('../models/recipe').User_Recipes;
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

/* GET home page. */
router.get('/', requirelogin, function(req, res, next) {

    User.find({_id: req.user._id}, function(err, user){

        User_Recipes.findOne( {user: req.user._id}, function (err, results) {
            if (err) {
                res.status(500).send("error");
            }
            if(!results){
                var empty = {"name" : "No Saved Recipes yet!"};
                res.render('index', { 
                    title: "Fitness Stack", 
                    user: req.user,
                    data: empty,
                    partials: {
                        content: 'dashboard',
                        logInMessage: req.flash('loginMessage'), 
                        signUpMessage: req.flash('signupMessage')
                    }
                });
            }else{
                var user_recipe = JSON.parse("[" + results.recipes_array.slice(1, -1) + "]");

                var recipes_array = [];

                for(var i in user_recipe){

                    Recipes.findOne( {recipe_id: user_recipe[i]}, function (err, results) {
                        if(results){
                            recipes_array.push(results);
                        }
                        if(recipes_array.length == user_recipe.length){
                            res.render('index', { 
                                title: "Fitness Stack", 
                                user: req.user,
                                data: recipes_array,
                                partials: {
                                    content: 'dashboard',
                                    logInMessage: req.flash('loginMessage'), 
                                    signUpMessage: req.flash('signupMessage')
                                },
                                
                            });
                        }
                    })
                }
            }
            
        })
    });
});

module.exports = router;
