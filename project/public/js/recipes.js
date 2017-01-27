$(function(){

	console.log("in public");

	
 	$("#save").on("click", function () {
    	var recipe_array =[];
    	$("input:checkbox[name=recipe_id]:checked").each(function () {
        	recipe_array.push($(this).val());
			//alert("Id: " + $(this).attr("id") + " Value: " + $(this).val());
     	});
	    console.log(recipe_array);

	    //$.post("/recipes", {a : JSON.stringify(recipe_array)}); 
	    $.ajax({
	        url: "/recipes",
	        type: 'POST',
	        data: {recipe_array: JSON.stringify(recipe_array)},
	        success: function(data) {
	           console.log("ok");
	        },
	        error: function(err){
		  		console.log("Error: " + JSON.stringify(err));
		  	}

	    })
	})


});


function CreateRecipe(){


	$.ajax({
	 	url: "/recipes/addrecipe",
	 	method: "POST",
	 	data: {
		  	name: name,
		  	date: date
	  	},
	  	success: function(data){
	  		LoadExercises();
	  	}
	});	
}