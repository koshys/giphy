
// app object

$(document).ready(function() {

var giphyapp = {
    animal : [],
    url : "https://api.giphy.com/v1/gifs/search/?api_key=dc6zaTOxFJmzC&limit=10&q=",
    refreshButtons : function() {
        console.log("refreshing");
        // clear buttons.
        $("#buttons-animals-here").empty();
        // add button from list
        for( var i = 0; i < this.animal.length; i++) {

            var animalBtn = $("<button>");
            animalBtn.addClass("btn btn-info button-animal");
            animalBtn.attr("data-btn-name",this.animal[i].toLowerCase());
            animalBtn.text(this.animal[i]);
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
    if ( !isThere ) {
        giphyapp.animal.unshift($("#form-animal-name").val().trim());
    }

    console.log(giphyapp.animal);
    giphyapp.refreshButtons();


    // clear the input
    $("#form-animal-name").val("");

});

/**
 * listener on animal button
 */
$(".button-animal").click(function(event){
    event.preventDefault();    
    
        console.log("clicked");
        //console.log($(this).attr("data-button-name"));


});

});



