$(document).ready(function() {

var starterFood = ["banana", "salad", "salsa", "guacamole", "pizza", "cookies"];
//Possible download button - Need to feed the url from the api
//<a class="btn btn-primary btn-lg" href="http://anothersitehere.com/file.pdf">
//   Download PDF
//</a>



// function displayGifs() {

// }

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
      console.log('qty: ' + $('#exampleSelect1').val().trim());
      
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
    console.log('food button: ' + food);
    // Adding movie from the textbox to our array
    starterFood.push(food);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

//To build the retrieval and post of gif data based on button clicked
$(document).on('click', '.foodButton', function(){
    console.log(this);
    var searchInput = $(this).attr("data-name");
    console.log(searchInput);
    var amount = $(this).attr("qty-amt");
    console.log(amount);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInput +  "&limit=" + amount + "&api_key=y53RpclCSDGqsN0edEmYVNQGPPSX7v18";
    
    
    
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response) 
        // console.log(response.data[i].rating)
        // console.log(response.data[1].images.fixed_height)
        for (let i=0; i < response.data.length; i++ ){
          console.log(response.data.length);
          //create a div to hold topic
          var topicDiv = $("<div class='result container col-6'>");
          console.log('i value: ' + i);
          console.log('Arron Requsted: ', response.data); 
          
          var rating = response.data[i].rating;
          console.log('rating: ' + rating);
          var ratingStat = $("<p>").text('Rating: ' + rating);

          var title = response.data[i].title;
          console.log('title: ' + title);
          var titleStat = $("<p>").text('Title: ' + title);

          // var imgURL = response.images.fixed_height;
          var imgURLFixed = response.data[i].images.fixed_height.url;
          console.log(imgURLFixed);
          var image = $("<img>").attr("src", imgURLFixed);

          var download = '<a class="btn btn-dark btn-lg" href="' + imgURLFixed  + '" download="yourGif.gif" role="button" target="_blank"> Download Gif</a>';
          $(download).attr("href", imgURLFixed);
          console.log('img html: ' + download);
          topicDiv.append(image);
          topicDiv.append(ratingStat);
          topicDiv.append(titleStat);
          topicDiv.append(download);
          $('#gifArea').append(topicDiv);
      }

    });
    });

    





});
