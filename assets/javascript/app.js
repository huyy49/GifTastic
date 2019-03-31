$(document).ready(function () {
  var key = "vyvSZGsFRL9ZbUxfKfz5utTKA68j50cj";
  var queryURL = "";
  // var topics = [];

  var renderGif = function (term) {
    queryURL = "https://api.giphy.com/v1/gifs/search?q="+ term + "&api_key=" + key + "&limit=10";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      for(var i=0; i<10; i++){
        var still = response.data[i].images.original_still.url;
        var animate = response.data[i].images.original.url;
        var rating = response.data[i].rating;
        var title = response.data[i].title;
        $("#display-images").prepend($("<div>").addClass("card float-left my-2 mr-2 border-0").attr("id", "card-container"));
        $("#card-container").append($("<h5>").addClass("card-title").html("Rating: " + rating.toUpperCase()));
        $("#card-container").append($("<p6>").addClass("card-text mw-40").html("Title: " + title));
        $("#card-container").append($("<div>").addClass("card-img-bottom").html("<img src='" + still + "' data-still='" + still + "' data-animate='" + animate + "' data-state='still' class='gif img rounded' height='200'></img>"));
        $("#card-container").append($("<div>").addClass("card-text my-1").html("<a href =" + animate + " download><button>Download</button></a>"));
      }
    });
  }

  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    console.log($("#search-term").val());

    if(!$("#search-term").val()) {
      alert('Entry is empty!');
    } else {
    renderGif($("#search-term").val());

    $("#display-topics").append($("<div>").addClass("float-left my-2 mr-2").html("<button type='button' class='btn btn-primary topics-button' id='topics-" + topics.length + "'>" + $("#search-term").val() + "</button>"));

    topics.push($("#search-term").val());
    console.log(topics);
    }

    localStorage.setItem("topiclist", JSON.stringify(topics));
  });

  var topics = JSON.parse(localStorage.getItem("topiclist"));
  console.log("Topics: " + topics);

  if (!Array.isArray(topics)) {
    topics = [];
  }

  if (topics.length > 0) {
    for(var i=0; i<topics.length; i++){
    $("#display-topics").append($("<div>").addClass("float-left my-2 mr-2").html("<button type='button' class='btn btn-primary topics-button' id='topics-" + i + "'>" + topics[i] + "</button>"));
    }
  }

  $(document).on("click", ".gif", function(event) {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $(document).on("click", ".topics-button", function(event) {
    var topic = $(this).attr("id");
    console.log(topic);
    var topicSelect = topic.match(/\d+/g).map(Number)[0];
    console.log(topicSelect);
    renderGif(topics[topicSelect]);
  });

  $("#reload").click(function() {
    location.reload();
    localStorage.clear();
  });
});
