//GifTastic

var topics = ["lions", "tigers", "bears", "oh my!"];
var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "Blo3ibsamqsT9R9a0CZBbWMbDKRpV1DL";
var searchNumber = 10;

function buttonMaker() {
  $("#animal-buttons").empty();
  for (i = 0; i <  topics.length; i++) {
    var emptyButton = $("<button>");
    // Bootstrap classes for UI.
    $(emptyButton).addClass("btn btn-warning m-1 animal-button");
    // Set data attribute equal to the string from the array.
    $(emptyButton).attr("id", topics[i]);
    $(emptyButton).html(topics[i]);
    $("#animal-buttons").append(emptyButton);
  }
};

function motionMaker() {
  // if the image the user clicks on is currently in the "still" state, switch to "motion"
  if ($(this).attr("current-state") === "img-still") {
    $(this).attr("current-state", "img-motion");
    $(this).attr("src", $(this).attr("img-motion"));
  // if the image the users clicks on is currently in the "motion" state, switch to "still"
  } else {
    $(this).attr("current-state", "img-still");
    $(this).attr("src", $(this).attr("img-still"));
  }
};
function cardMaker() {
  // clear any previous elements that were generated
  $("#animals").empty();
  // ajax call based on the paramters set at the top of the file
  $.ajax({
    url: queryURL + $(this).attr("id") + "&api_key=" + apiKey + "&limit=" + searchNumber,
    method: "GET"
  }).then(function (response) {
    for (i= 1; i < searchNumber; i++){ 
      console.log(response);
      var newCard = $("<div class='card mt-4 mx-2 float-left'>")
      var newImage = $("<img class='card-img-top img-thumbnail'>");
      // setting variables for the urls for the still image and the motion image
      var stillImage = response.data[i-1].images.downsized_still.url;
      var motionImage = response.data[i-1].images.downsized.url;
      // setting the "alt" to whatever is provided from GIPHY for the title
      $(newImage).attr("alt", response.data[i-1].title);
      // set the default source to the still image
      $(newImage).attr("src", stillImage);
      // set the still image and motion image urls as an attribute to easily reference with (this) later.
      $(newImage.attr("img-still", stillImage));
      $(newImage.attr("img-motion", motionImage));
      $(newImage).attr("current-state", "img-still");
      var newCardBody = $("<div class='card-body'>");
      // var newCardTitle = $("<h5 class='card-title'>");
      // newCardTitle.html("Title: " + response.data[i-1].title);
      var newCardText = $("<p class='card-text'>");
      newCardText.html("Rating: " + response.data[i-1].rating);
      // newCardBody.append(newCardTitle).append(newCardText);
      newCardBody.append(newCardText);
      newCard.append(newImage).append(newCardBody);
      $("#animals").append(newCard);
    };
  })
};
function addAnimal() {
  event.preventDefault();
  var newAnimal = $("#animal-input").val();
  topics.push(newAnimal);
  $("#animal-input").val("");
  buttonMaker();
};
// event listeners
$(document).on('click', '.animal-button', cardMaker); 
$(document).on('click', '.img-thumbnail', motionMaker);
$(document).on('click', '#add-animal', addAnimal);
// call the buttonMaker function to populate the page.
buttonMaker();