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

// This function handles events where a movie button is clicked
$("#addFood").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var food = $("#submitInput").val().trim();

    // Adding movie from the textbox to our array
    starterFood.push(food);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

// //To build the retrieval and post of gif data based on button clicked
// $('#searchInput').click(function(){

//     var searchInput = $('#searchInput').val(); 
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchInput +  "&api_key=y53RpclCSDGqsN0edEmYVNQGPPSX7v18";

//     $.ajax({
    
    
//     url: queryURL,
//     type: "GET",
//     success: function(response) {
//         console.log(response) 
//         console.log(response.rating)
//         console.log(response.images.fixed_height)

//         //create a div to hold topic
//         var topicDiv = $("<div class='result'>");

//         var rating = response.rating;

//         var xtra1 = $("<p>").text('Rating: ' + rating);

//         var title = response.title;

//         var xtra2 = $("<p>").text('Title: ' + title);

//         var imgURL = response.images.fixed_height;
//         var imgURLFixed = response.images.fixed_height_still;

//         var image = $("<img>").attr("src", imgURL);

//         topicDiv.append(image);


//     }
//     });






// });
