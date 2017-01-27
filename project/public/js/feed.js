$(function(){

	function setOnClicks(){
		
		let tags = ["fitness", "lifestyle", "exercise"];

		for(let x = 0; x < tags.length; x++){

			let id = {id: tags[x]};

			document.getElementById(tags[x]).onclick = function(){
				$.get('/feed/news_data', id, function(resp){
					$("#feed-item-container").empty();

					$("#feed-item-container").append("<h2>News Feed</h2>");

					for(let i = 0; i < resp.length; i++){
						let art = resp[i];
						$("#feed-item-container").append('<div class="feed-item"><div><h3>' + art.article_title + '</a></h3><h6>' + art.published + '</h6></div>' +
	           										    '<h5>' + art.content + '</h5>' +
	           										    '<input id="feed-item-' + i + '" class="read-more" type="button" value="Read More" />' +
														'</div>'
						);
						document.getElementById('feed-item-' + i).onclick = function(){
							window.open(art.link);
						};
					}
				});
			}

		}
	}

	function init(){
		setOnClicks();
	}

	init();

});