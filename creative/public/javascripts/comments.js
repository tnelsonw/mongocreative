$(document).ready(function(){
  $("#postPhoto").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          $("#done").html(textStatus);
}
})
  });

 $("#getPhotos").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li>" + com.Name + "<br> <img src=\"" + com.Comment + "\" alt=\"\"></li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });

  $("#deletePhotos").click(function() {
    var url = "comment";
    $.ajax({
      url:url,
      type: "DELETE",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    });
  });
});

