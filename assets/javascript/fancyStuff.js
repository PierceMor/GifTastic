$(document).ready(function(){


 

   
    // Make Giphy Api pull ajax 
    
    
    var theAnimal = [  "cat", "human", "elephant", "mouse" ];
    
    function renderButtons(){

            // loop through our array of animals 
            for (var i=0; i < theAnimal.length; i++){
                //dynamically generate buttons 
                var a = $("<button id='fuckingWork'>");

                //adding class 
                a.addClass("btn btn-secondary");

                //add attribute to that will make the button connected to the whol sheen bang
                a.attr("data-animal", theAnimal[i]);

            
                //writing text into button 
                a.text(theAnimal[i]);

                //putting button 
                $("#buttonPopulator").append(a);
            }
        }

    $("#gifMakerButton").on('click', function(event) {

        $("#buttonPopulator").empty();

        event.preventDefault();

        var animalAddage = $("#gifPopulator").val().trim();

        theAnimal.push(animalAddage);

        renderButtons();
    });
   

    renderButtons();

    $(document).on("click", "button", function(){

    var animal = $(this).attr("data-animal");

        console.log(animal);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // that Ajax get request 
    $.ajax({
        url: queryURL,
        method:"GET"
    })

    //this gathers the Gif
    // after the data comes back from the API 
    .then(function(response){
        
        //thiss empties out the Gifs already there, so we dont have 100000000 gifs in the damn thing
        $("#gifAcceptor").empty();

        //storing an array of results in the results variable 
        var results = response.data; 

        // looping over every result item 
        for (var i=0; i < results.length; i++){

            // only taking action if the photo has an appropriate rating 
            if (results[i].rating !== "r" && results[i].rating !== "pg-13"){

                //creating a div  with the class "animalPicture"
                var gifDiv = $("<div class='animalPicture'>");

                // storing the result item's rating
                var rating = results[i].rating;

                //creaating a paragraph tag with teh result item's rating 
                var p = $('<p>').text("Rating: " + rating);

                // creating an image tag
                var animalImage = $("<img>"); 

                //giving the image tag an src attribute of a propety, makes it dance or not 
                animalImage.attr("src", results[i].images.original.url);
                animalImage.attr("data-animate", results[i].images.original.url);
                animalImage.attr("data-still", results[i].images.original_still.url);
                

                //appending the things to gifDiv
                gifDiv.append(p);
                gifDiv.append(animalImage);

                $("#gifAcceptor").prepend(gifDiv);
           
                // this is to animate the gifs
            animalImage.on('click', function(){

                var state = $(this).attr('data-state');

                if (state === 'still') {
                    $(this).attr("src", $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                    console.log('still');
                } else {
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
                    console.log('animate');
                }

            });
        } 
    }
});

    console.log("after");
});

    // make a button creater decive
    // make buttons clean page 

});