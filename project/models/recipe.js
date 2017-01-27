// app/models/recipe.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our recipe model
// module.exports allows us to pass this to other files when it is called

// TODO: add fields & methods
var recipeSchema = mongoose.Schema({
	recipe_id: String,
    name : String, 
    ingredients: String,
    nutrition: String
});	

var User_RecipesSchema = mongoose.Schema({
    recipes_array : {type: String, default: 'Empty'},
    user: {type: String}
});

// recipeSchema.methods.findSimilarType = function findSimilarType (cb) {
//   return this.model('Recipe').find({ type: this.type }, cb);
// };

module.exports.User_Recipes = mongoose.model('User_Recipes', User_RecipesSchema);
module.exports.Recipes = mongoose.model('Recipes', recipeSchema);