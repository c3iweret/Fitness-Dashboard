var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
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

/* GET users listing. */
router.get('/', requirelogin, function(req, res, next) {
	//go through database and load recipes
	Recipes.find({}, function(err, docs){
		//console.log(docs);
		if (err){
			throw err;
		}else{
			res.render('index', { 
				title: "Recipes", 
				user: req.user,
				data: docs,
				partials: {
            		content: 'recipes'
        		}
			});
		}
	});
  
});


router.get('/addrecipe', requirelogin, function(req, res, next) {
	res.render('index', { 
		title: "Add Recipe", 
		user: req.user,
		partials: {
    		content: 'addrecipe'
		}
	});
});

router.post('/addrecipe', requirelogin, function(req, res, next) {

	var recipe = new Recipes({name: req.body.name, ingredients: req.body.ingredients, nutrition: req.body.nutrition});
		console.log("User: " + req.user._id);

	recipe.save(function(err){
		if(err)
			res.status(500).send("Recipe could not save");
		else
			res.redirect("/recipes");
	});
});

router.get('/my_recipes', requirelogin, function(req, res, next) {
	
	User.find({_id: req.user._id}, function(err, user){

		User_Recipes.findOne( {user: req.user._id}, function (err, results) {
			if (err) {
		    	res.status(500).send("error");
		    }
		    if(!results){
                var empty = {"name" : "No Saved Recipes yet!"};
                res.render('index', { 
                    title: "My Saved Recipes", 
                    user: req.user,
                    data: empty,
                    partials: {
                        content: 'my_recipes'
                    }
                });
            }else{
            	var user_recipe = JSON.parse("[" + results.recipes_array.slice(1, -1) + "]");
			    var recipes_array = [];

			    // console.log(user_recipe);
			    // console.log(typeof(user_recipe));

			    for(var i in user_recipe){
			    	//console.log(i);
			    	// console.log(typeof(i));

			    	Recipes.findOne( {_id: user_recipe[i]}, function (err, results) {
			    		if(results){
			    			recipes_array.push(results);
			    			//console.log(recipes_array);

			    		}
			    		if(recipes_array.length == user_recipe.length){

			    			res.render('index', { 
								title: "My Saved Recipes", 
								user: req.user,
								data: recipes_array,
								partials: {
				            		content: 'my_recipes'
				        		}
							});
			    		}
			    	})
			    }
            }
		    
		})
	});
  
});

router.post('/', function(req, res) {

	var recipe_array = req.body.recipe_array;
	console.log("User_Recipes:"+recipe_array);

	var newUserRecipe = new User_Recipes();

	console.log(req.user._id);

	//look for current user
	User.find({_id: req.user._id}, function(err, user){
		//check if current user has recipes
		User_Recipes.findOne( {user: req.user._id}, function (err, results) {
		    if (err) {
		    	res.status(500).send("error");
		    }
		    if (!results) {
		        var newUserRecipe = new User_Recipes({recipes_array: recipe_array, user: req.user._id});
				//res.locals.name = req.body.name;

				newUserRecipe.save(function(err){
					if(err || !user)
						res.status(500).send("No user found");
					else
						res.end("Success");
				});
		    } else {
		    	console.log(results.recipes_array);
		    	results.recipes_array = recipe_array;
		    	results.save(function (err) {
			        if(err) {
			            console.error('ERROR!');
			        }
			    });
		    }
		})
	});

});



module.exports = router;
