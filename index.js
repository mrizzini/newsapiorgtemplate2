/*global $ APIKEY*/
$(document).ready(function() {
    $.ajax({
		    method: "GET",
		    url: "https://newsapi.org/v2/sources",
		    data: { category: "technology", country: "us", language: "en", apiKey: APIKEY },
		    success: function(data) {
			     if (data.status == "ok") {
					console.log(data);
				    for (var i = 0; i < data.sources.length; i++) {
						var source = document.createElement("OPTION");
					    source.setAttribute("value", data.sources[i].id);
					    source.innerHTML = data.sources[i].name;
					    document.getElementById('selection').appendChild(source);
				      }
			        }
		       }
	    });
	//     .done(function( data ) {
	//         console.log( data );
	//         console.log( data.status );
	//         console.log( data.sources[0] );
	//   });
	    $('#source').submit(function(event) {
			event.preventDefault();
		    document.getElementById('list').innerHTML = "";
		 // alert(document.getElementById("selection").value);
		 // alert(document.getElementById("selection").name);
		    $.ajax({
			        method: "GET",
			        url: "https://newsapi.org/v2/top-headlines",
			        data: { sources: document.getElementById('selection').value, apiKey: APIKEY },
			        success: function(data2) {
				    	if (data2.status == "ok") {
					    console.log(data2);
					    	for (var i = 0; i < data2.articles.length; i++) {
					        		$("#headline").html(data2.articles[i].source.name + " Top Headlines");
						        	var headline = data2.articles[i].title;
						            var articles = document.createElement("LI");
						            var anchor = document.createElement("A");
						            anchor.setAttribute('href', data2.articles[i].url);
						            anchor.setAttribute('target', "_blank");
						            anchor.innerHTML = headline;
						            articles.setAttribute("id", "articles" + i);
						            var description = document.createElement("P");
						            var descriptionText = data2.articles[i].description;
						            description.innerHTML = "-" + descriptionText;
						            // var url = document.createElement("A");
						            // url.setAttribute('href', data2.articles[i].url);
						            // url.innerHTML = "-" + url;
						            // var image = document.createElement("IMG");
						            // image.src = data2.articles[i].urlToImage;
						            document.getElementById("list").appendChild(articles);
						            document.getElementById("articles" + i).appendChild(anchor);
						            document.getElementById("list").appendChild(description);
						            // document.getElementById("list").appendChild(url);
						            // document.getElementById("list").appendChild(image);
					               }
				              }
			             } 
		          });
	        });
});




