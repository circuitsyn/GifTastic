$(document).ready(function() {

var starterFood = ["banana", "salad", "salsa", "avocado", "pizza", "cookies"];

//render buttons 
siteGlobals = {
  count: 0,
};

renderButtons();


function renderButtons() {

    // Clearing button area to prevent duplicates
    $("#buttonSection").empty();

    // Looping through the array of starter foods
    for (var i = 0; i < starterFood.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var cell = $("<button>");
      // Adding a class of movie-btn to our button
      cell.addClass("foodButton btn btn-warning m-1");
      // Adding a data-attribute
      cell.attr("data-name", starterFood[i]);
      //Adding a qty attribute
      cell.attr("qty-amt", $('#exampleSelect1').val().trim());
      siteGlobals.count = $('#exampleSelect1').val().trim();
      
      
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
$(document).on('click', '.foodButton', function(){
    
    var searchInput = $(this).attr("data-name");
    
    var amount = $(this).attr("qty-amt");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInput +  "&limit=" + amount + "&api_key=y53RpclCSDGqsN0edEmYVNQGPPSX7v18";
    
    
    
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
        // console.log(response.data[i].rating)
        // console.log(response.data[1].images.fixed_height)
        for (let i=0; i < response.data.length; i++ ){
          
          //create a div to hold topic
          var topicDiv = $("<div class='container col-6'>");
          
          
          var rating = response.data[i].rating;
          
          var ratingStat = $("<p>").text('Rating: ' + rating);

          var title = response.data[i].title;
          
          var titleStat = $("<p>").text('Title: ' + title);

          // var imgURL = response.images.fixed_height;
          var imgURLFixed = response.data[i].images.fixed_height_still.url;
          
          var image = $('<img class="result">').attr("src", imgURLFixed);
          $(image).attr("data-state", "still"); //establish still state for object
          $(image).attr("data-still", response.data[i].images.fixed_height_still.url);
          $(image).attr("data-animate", response.data[i].images.fixed_height.url);
          var download = '<a class="btn btn-dark btn-lg dnld" href="' + imgURLFixed  + '" download="yourGif.gif" role="button" target="_blank"> Download Gif</a>';
          $(download).attr("href", imgURLFixed);
          
          topicDiv.append(image);
          topicDiv.append(ratingStat);
          topicDiv.append(titleStat);
          topicDiv.append(download);
          $('#gifArea').append(topicDiv);
      }

    });
    });

    $(document).on('click', '.result', function(){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

   
});
