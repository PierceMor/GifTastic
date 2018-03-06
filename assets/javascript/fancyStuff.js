$(document).ready(function(){

    // Make Giphy Api pull ajax 
    $('button').on('click', function(){

    var animal = $(this).attr("data-animal");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // that Ajax get request 
    $.ajax({
        url: queryURL,
        method:"GET"
    })
    // after the data comes back from the API 
    .then(function(response){
        //storing an array of results in the results variable 
        var results = response.data; 

        // looping over every result item 
        for (var i=0; i < results.length; i++){

            // only taking action if the photo has an appropriate rating 
            if (results[i].rating !== "r" && results[i].rating !== "pg-13"){

                //creating a div  with the class "animalPicture"
                var gifDiv = $("<div class='animalPicture' >");

                // storing the result item's rating
                var rating = results[i].rating;

                //creaating a paragraph tag with teh result item's rating 
                var p = $('<p>').text("Rating: " + rating);

                // creating an image tag
                var animalImage = $("<img data-animate>"); 

                //giving the image tag an src attribute of a propety, makes it dance or not 
                animalImage.attr("src", results[i].images.original.url);
                animalImage.attr("data-animate", results[i].images.original.url);
                animalImage.attr("data-still", results[i].images.original_still.url);
                

                //appending the things to gifDiv
                gifDiv.append(p);
                gifDiv.append(animalImage);

                $("#gifAcceptor").prepend(gifDiv);
            }

            $('img').on('click', function(){

                var state = $(this).attr('data-state');

                if (state === 'still') {
                    $(this).attr("src", $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
                }

            });
        }
    });

    console.log("after");
});
    // make buttons connected to Giphy Api
    // make a button creater decive
    // stylize pictures that are created by buttons 
    // make buttons clean page 

});