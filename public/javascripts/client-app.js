var main = function () {
  $.getJSON("/counts.json", function (response){
    $("#happy").append("<h2>" + response.happy + "</h2>");
    $("#sad").append("<h2>" + response.sad + "</h2>");
  });
};

$(document).ready(main);