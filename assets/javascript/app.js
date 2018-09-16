var starterFood = ["banana", "chinese food", "salsa", "guacamole", "pizza", "cookies"];

function displayGifs() {

}

//render buttons 

function renderButtons() {
    $("#buttons-view").empty();

    
}





//To build the retrieval and post of gif data based on button clicked
$('.typeOFood').click(function(){

    var searchInput = $('#searchInput').val(); 
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchInput +  "&api_key=y53RpclCSDGqsN0edEmYVNQGPPSX7v18";

    $.ajax({
    
    
    url: queryURL,
    type: "GET",
    success: function(response) {
        console.log(response) 

        //create a div to hold topic
        var topicDiv = $("<div class='result'>");

        var rating = response.rating;

        var xtra1 = $("<p>").text('Rating: ' + rating);

        var title = response.title;

        var xtra2 = $("<p>").text('Title: ' + title);

        var imgURL = response.images.fixed_height;
        var imgURLFixed = response.images.fixed_height_still;

        var image = $("<img>").attr("src", imgURL);

        topicDiv.append(image);


    }
    });






});
