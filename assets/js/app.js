
// app object

$(document).ready(function() {

var giphyapp = {
    animal : [],
    searchUrl : "https://api.giphy.com/v1/gifs/search?q=",
    api_key : "api_key=dc6zaTOxFJmzC&limit=10",
    refreshButtons : function() {

        // clear buttons.
        $("#buttons-animals-here").empty();
        // add button from list
        for( var i = 0; i < this.animal.length; i++) {
            var animalBtn = $('<button class = "button-animal btn btn-info" data-btn-name = "'+
            this.animal[i].toLowerCase()+'">'+this.animal[i]+"</button>");
            $("#buttons-animals-here").append(animalBtn);
        }
    }
};


/**
 * listener on the submit button
 */

$("#form-animal-submit").click(function(event){
    event.preventDefault();    
    // check if value already exsts and if not then add to array
    var input = $("#form-animal-name").val().trim();
    var isThere = false;
    for ( var i = 0; !isThere && i < giphyapp.animal.length; i++) {
        if ( giphyapp.animal[i].toLowerCase() === input.toLowerCase() ) {
            isThere = true;
        }
    }
    if ( !isThere && input.length > 0) {
        giphyapp.animal.unshift($("#form-animal-name").val().trim());
        giphyapp.refreshButtons();
    }

    // clear the input
    $("#form-animal-name").val("");

});

/**
 * listener on dynamic animal buttons
 */
$(document).on("click",".button-animal",function(event){
    
    $.ajax({
        url : giphyapp.searchUrl + $(this).attr("data-btn-name") +  "&"+ giphyapp.api_key,
        method : "GET"
    }).then( function(res) {
        
        var r = res.data;

        // clean it up
        for ( var i = 0; i < r.length; i++) {
            $("#animal-"+(i+1)).empty();
        }

        // populate with gifs
        for ( var i = 0; i < r.length; i++ ) {
            var gifAnimals = $("<div>");
            var rating = r[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var stillGif = r[i].images.fixed_height_still.url;
            var animateGif = r[i].images.fixed_width.url;
            var gif = $('<img src="'+ stillGif+
            '" data-still="'+stillGif+
            '" data-animate="'+animateGif+
            '" data-state="still" class="gifAnimal">');
            gifAnimals.append(gif);
            gifAnimals.append(p);
            $("#animal-"+(i+1)).append(gifAnimals);
        }
    });


});

// change data state , toggle
$(document).on("click",".gifAnimal",function(event){

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


});



