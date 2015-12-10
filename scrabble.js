/*
 * 
 *  Huy Huynh
    Created on December 3, 2015 @ 8:00 PM
    Modified on December 5, 2015 @ 10:00PM
    Modified on December 7, 2015 @ 4:00PM
    Modified on December 8, 2015 @ 11:00PM
    Modified on December 9, 2015 @ 9:00PM
 */
/*
 * This was based of Ramon's inital post and also from Jason Downing's first verstion
 * I got help from Jason Downing throughout this Assignment 9. This assignment
 * I personally found pretty difficult as there were a lot of ideas to think of.
 */
var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];

/* This is a global variable but more really an array of objects
 * This was to determine letters for each piece
 * 
 */
var scrabble_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
]

// This was an object that kept track of my Scrabble Row and pieceX 
// initially means that there has nothing on that tile. 
// I received help from Jason Downing and look at his first version of
// his implementation for the scrabble row provided on Piazza.
var scrabble_row = [
  {"id": "drop0",  "tile": "pieceX"},
  {"id": "drop1",  "tile": "pieceX"},
  {"id": "drop2",  "tile": "pieceX"},
  {"id": "drop3",  "tile": "pieceX"},
  {"id": "drop4",  "tile": "pieceX"},
  {"id": "drop5",  "tile": "pieceX"},
  {"id": "drop6",  "tile": "pieceX"},
  {"id": "drop7",  "tile": "pieceX"},
  {"id": "drop8",  "tile": "pieceX"},
  {"id": "drop9",  "tile": "pieceX"},
  {"id": "drop10", "tile": "pieceX"},
  {"id": "drop11", "tile": "pieceX"},
  {"id": "drop12", "tile": "pieceX"},
  {"id": "drop13", "tile": "pieceX"},
  {"id": "drop14", "tile": "pieceX"}
]

// this function will find what the current word will be and then output it to the
// html doc. It also gets the score but by calling another function to actually
// calculate the score.
function get_word() {
    var created_word = "";
    var user_score = 0;
    
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile != "pieceX") {
            created_word += get_letter(scrabble_row[i].tile);
            user_score += calc_score(scrabble_row[i].tile);
        }
    }
    
    user_score += (user_score * scrabble_double());
    
    $("#user_score").html(user_score);
    
    if(created_word != "") {
        $("#created_word").html(created_word);
        return;
    }
    $("#created_word").html("_____")
}
// This function does the actual calculation for the score and 
function calc_score(passed_id) {
    var letter = get_letter(passed_id);
    var score = 0;
    
    // a for loop to go through the array of objects pieces which contains all of the
    // letters in the alphabet with their own score value.
    for(var i = 0; i < 27;i++) {
        var object = pieces[i];
        
        // checking if the piece on the screen correspond with what is actually in the 
        // object.
        if(object.letter == letter) {
            score = object.value;
            
            // This Jason Downing helped me to understand and showed me how to do this.
            // What I learned was this was to check if we should double the letter or not based
            // on where the letter was placed. 
            score += (score * double_letter(passed_id));
        
            return score;
        }

    }
    // error code indicating something went wrong.
    return -1;
}

// this function was just cases whether the program had to double the word or not
// in this case the tiles where I had double words were at index 3 and 11 which is 
// the fourth and twelveth tiles on my scrabble row. 
function scrabble_double(){
    if(scrabble_row[3].tile != "pieceX") {
        return 1;
    }
    if (scrabble_row[11].tile != "pieceX") {
        return 1;
    }
    
    return 0;
}

// This function similar to the scrabble_double function, it is checking if the 
// program has to double the letter this time. For this case the places where I 
// had these double letters was the first tile, the 8th tile, and the last tile.
// which translate to the to the 0th, 7th, and 14th index.
function double_letter(passed_id) {
    var dropped_ID = find_tile_position(passed_id);
    
    if(dropped_ID == "drop0" || dropped_ID == "drop7" || dropped_ID == "drop14") {
        return 1
    }
    else {
        return 0;
    }
}
// This function was to get the letter by passing an ID and then return the letter
// 
function get_letter(passed_id) {
    // loop to iterate through the 7 pieces on the rack
    for(var i = 0; i < 7; i++) {
//        console.log("Passing; " + passed_id);
        // case to check if the letter was found
        if(scrabble_tiles[i].id == passed_id) {
            return scrabble_tiles[i].letter;
        }
    }
    // error to indicate if something went wrong.
        return -1;
}

// Jason Downing helped me with these two functions and explained to me why he used
// them in his own implementation and suggested I should also do something similar.
// What I learned from him was this was to find the position the passed ID was at
// in the array and return it.
function find_board_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].id == passed_id) {
            return i;
        }
    }
    return -1;
}
// Jason Downing helped me with these two functions and explained to me why he used
// them in his own implementation and suggested I should also do something similar.
// What I learned from him was this was to find which dropped ID does the passed ID
// belongs to.
function find_tile_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile == passed_id) {
            return scrabble_row[i].id;
        }
    }
}

// This function loads the seven pieces onto the rack which is just simply an image
// It will also make the pieces draggable and also snappable. 
function load_pieces() {
    var img_location = "scrabbleimages/Scrabble_Tile_";
    var rand_num = 1;
 //   var scrabblePiece = "<img class ='pieces' id='pieces" + i + "'src='" + img_location + temp_num + 
 //           ".jpg" + "'></img>";
   var scrabble_piece = "";
   var scrabblePieceID = "";
    
    console.log;
    for(var i = 0; i < 7; i++) {
        var temp = true;
        while(temp == true) {
            // this was generate 7 random letters from the object
            rand_num = generate_random_ints(0,26);
            // this was to check that each time we generate 7 random letters
            // to remove those letters out of the object pieces
            if(pieces[rand_num].amount != 0) {
                temp = false;
                pieces[rand_num].amount--;
            }
        
        }
     
     // Jason Downing helped me with this which was to make the img HTMl and img ID to append tiles easily
     scrabble_piece = "<img class='pieces' id='piece" + i + "'src='" + img_location + pieces[rand_num].letter + ".jpg"
                        + "'></img>"; 
     
    
     scrabblePieceID = "#piece" + i;
     // placing the randomized letters into the scrabble_row object
     scrabble_row[i].letter = pieces[rand_num].letter;
     // placing the randomized letters into the scrabble_tiles object
     scrabble_tiles[i].letter = pieces[rand_num].letter;
     
     // I had Jason's help to figure out why my pieces were in funky positions 
     // and he suggested me to this stackoverflow post :  https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
     var position = $("#scrabble_board_row").position();
     
     // this was to just reposition the tile pieces to appear as if it is on the rack
     // I just simply guess and checked to find the correct values to have it close to
     // appearing on the rack. My Display was on a 15 inch 1080p laptop screen. 
     // With that in mind my pieces may appear to be different depending on the user's 
     // monitor's resolution and how big their screen is. 
     var left_of_image = position.left + 700 + (70*i);
     var top_of_image = position.top + 200;
     
     // add the pieces onto the screen
     $("#rack").append(scrabble_piece);
     $(scrabblePieceID).css("left", left_of_image).css("top", top_of_image).css("position", "absolute");
//     console.log("TEST");

    // making the pieces draggable and snapping
    // I used http://api.jqueryui.com/draggable/#option-snap to make it snap
     $(scrabblePieceID).draggable({
         snap: true,
         snapMode:"inner",
         snapTolerance: 30
         
     }) ;
//     console.log("TEST");
             
             
    }

}

// this was to generate random numbers Jason Downing suggested me this and provided me
// with this stackoverflow link: : https://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function generate_random_ints(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// This function is to make the Scrabble row droppable and let the program know where
// a piece is dropped. I used Jason Downing's and some of the other students who
// were kindly enough to share their early implementations with the class on Piazza. 
// I also had Jason Downing help me with some of the bugs or errors I ran into. 
function load_droppable_pieces() {
    var img_location = "scrabbleimages/scrabble_transparent.png"; // the image's location
    var drop = "";
    var scrabbleDropID = "#drop" + i;
    
    console.log("Load Droppable Function")
    for(var i = 0; i < 15; i++) {
//        drop = "<img class='droppable' id='drop" + i + "'src='" + img_location + "'></img> ";
        scrabbleDropID = "#drop" + i;
//        
//        var position = $("#scrabble_row").position();
//        var left_of_image = position.left + -235  + (5*i);
//        var top_of_image = position.top + -275;
//        
//        $("#board").append(drop);
//        $(scrabbleDropID).css("left", left_of_image).css("top", top_of_image).css("position", "relative");
//        
//      Making the ID droppable
        $(scrabbleDropID).droppable ({
        // I used the https://jqueryui.com/droppable/#default to help me understand the whole droppable idea
        // This was to allow the row to know what has been dropped in one of its tiles and hold that piece's info.
            drop: function(event, ui) {
                
                // This part I had Jasons's help and guidance. He referred me to a site that he used
                // to find this implementation : // https://stackoverflow.com/questions/5562853/jquery-ui-get-id-of-droppable-element-when-dropped-an-item
                var drag_scrabbleID = ui.draggable.attr("id");
                var drop_scrabbleID = $(this).attr("id");
                scrabble_row[find_board_position(drop_scrabbleID)].tile = drag_scrabbleID;
                get_word();
//             console.log("this was drop here " + drag_scrabbleID + "" + drop_scrabbleID );
//             a good log just for debugging purposes
               console.log("Tile is: " + drag_scrabbleID + " - dropped on " + drop_scrabbleID);
               // this was a forloop for a previous implementation I tried and struggled with.
//             for(var j = 0; j < 15; j++) {
//                 
//                 console.log("Word is : " + scrabble_row[find_board_position(drop_scrabbleID)].id);
//             }

//          This was to make the pieces snap however I really didn't notice any difference, it was
//          shown to me from Jason however the snapp thing I used from JQuery above seem to work
//          
            $(this).append($(ui.draggable));
            ui.draggable.css("top", $(this).css("top"));
            ui.draggable.css("left", $(this).css("left"));
            ui.draggable.css("position", "relative");
           get_word();
           
            },
         // this was to make it so if a letter was removed from the row, then to also do that for the 
         // word, and score and the score/word will change due to the letter removal.
            out: function(event, ui) {
                var drag_scrabbleID = ui.draggable.attr("id");
                var drop_scrabbleID = $(this).attr("id");
                
                if(drag_scrabbleID != scrabble_row[find_board_position(drop_scrabbleID)].tile) {
                    return;
                }
                scrabble_row[find_board_position(drop_scrabbleID)].tile = "pieceX";
                
                get_word();
            }
            
        });
    }
    
}
