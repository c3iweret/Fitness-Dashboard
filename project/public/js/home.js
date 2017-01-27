$(document).ready(function(){
	$("button#b-login").on('click', (function() {
        $("form#form-login").toggleClass("hidden");
    }));
    
    $("button#b-signup").on('click', (function() {
        $("form#signup").toggleClass("hidden");
    }));
    
});