var main = function () {
  "use strict";
  $.getJSON("/counts.json", function (response){
    var mood = response.happy / response.sad;
    
    if (mood < .3) {
      $("#result h2").append("twitter is having a really bad day.");
      $("#result").css("background", "#EE9999");
      $("title").append("D:");
    } else if (mood <= .3 && mood > .75) {
      $("#result h2").append("twitter is not doing so hot.");
      $("#result").css("background", "#CC9999");
      $("title").append("):");
    } else if (mood <= 1.25 && mood > .75) {
      $("#result h2").append("twitter is feeling so-so.");
      $("#result").css("background", "#999999");
      $("title").append(":/");
    } else if (mood <= 3 && mood > 1.25) {
      $("#result h2").append("twitter is feeling pretty good.");
      $("#result").css("background", "#99CC99");
      $("title").append(":)");
    } else if (mood > 3) {
      $("#result h2").append("twitter is ecstatic today!");
      $("#result").css("background", "#99EE99");
      $("title").append(":D");
    }
    
    $("#happy").append("<h2>" + response.happy + "</h2> <h4>(tracked tags: " + response.happyarray + ")</h4>");
    $("#sad").append("<h2>" + response.sad + "</h2> <h4>(tracked tags: " + response.sadarray + ")</h4>");
  });
};

$(document).ready(main);