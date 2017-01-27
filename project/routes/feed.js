var express = require('express');
var router = express.Router();
var feed = require("feed-read-parser");

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

	var url = "https://www.bing.com/news/search?q=fitness&format=RSS";

	
    feed(url, function(err, articles) {
		  if (err) throw err;
		  // Each article has the following properties:
		  //
		  //   * "title"     - The article title (String).
		  //   * "author"    - The author's name (String).
		  //   * "link"      - The original article link (String).
		  //   * "content"   - The HTML content of the article (String).
		  //   * "published" - The date that the article was published (Date).
		  //   * "feed"      - {name, source, link}
		  //

		  var titles = [];
		  for(var article in articles){
		  	var art = articles[article];
			var art_title = (art.title).split(/[\||-]/)[0];
		  	var company = (art.title).split(/[\||-]/)[1];

		  	titles.push({"article_title": art_title, "company": company, "link": art.link, "published": art.published.toString(), "content": art.content});
		  }

		  res.render('index', {
        	title: 'News Feed',
        	user: req.user,
        	news_articles: titles,
        	partials: {
            	content: 'feed'
        	}
    	  });

	});

});

/* GET feed page. */
router.get('/news_data', function(req, res) {

	var new_topic = req.query.id;

	var new_url = "https://www.bing.com/news/search?q=" + new_topic + "&format=RSS";

    feed(new_url, function(err, articles) {
		  if (err) throw err;
		  // Each article has the following properties:
		  //
		  //   * "title"     - The article title (String).
		  //   * "author"    - The author's name (String).
		  //   * "link"      - The original article link (String).
		  //   * "content"   - The HTML content of the article (String).
		  //   * "published" - The date that the article was published (Date).
		  //   * "feed"      - {name, source, link}
		  //

		  
		  var titles = [];
		  for(var article in articles){
		  	var art = articles[article];
			var art_title = (art.title).split(/[\||-]/)[0];
		  	var company = (art.title).split(/[\||-]/)[1];

		  	titles.push({"article_title": art_title, "company": company, "link": art.link, "published": art.published.toString(), "content": art.content});
		  }

		  res.send(titles);

	});

});

module.exports = router;
