var starterFood = ["banana", "chinese food", "salsa", "guacamole", "pizza", "cookies"];

// function displayGifs() {

// }

//render buttons 


renderButtons();


function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonSection").empty();

    // Looping through the array of movies
    for (var i = 0; i < starterFood.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var cell = $("<button>");
      // Adding a class of movie-btn to our button
      cell.addClass("btn btn-warning foodButton m-1");
      // Adding a data-attribute
      cell.attr("data-name", starterFood[i]);
      // Providing the initial button text
      cell.text(starterFood[i]);
      // Adding the button to the buttons-view div
      $("#buttonSection").append(cell);
    }
  }

//This adds a food to the choice of foods on the screen as a button
$("#addFood").on("click", function(event) {
    event.preventDefault();
    // This grabs the value being submitted and stores it in the food variable
    var food = $("#submitInput").val().trim();

    // Adding movie from the textbox to our array
    starterFood.push(food);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

//To build the retrieval and post of gif data based on button clicked
$('.foodButton').click(function(){
    console.log(this);
    var searchInput = $(this).attr("data-name");
    console.log(searchInput);
    var amount = $(this).attr("quantity");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchInput +  "&limit=" + amount + "&api_key=y53RpclCSDGqsN0edEmYVNQGPPSX7v18";

    $.ajax({
    
    
    url: queryURL,
    type: "GET",
    success: function(response) {
        console.log(response) 
        console.log(response.data[1].rating)
        console.log(response.data[1].images.fixed_height)

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
