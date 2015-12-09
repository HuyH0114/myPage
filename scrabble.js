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


var scrabble_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
]
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
function get_word() {
    var created_word = "";
    var user_score = 0;
    
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile != "pieceX") {
            created_word += get_letter(scrabble_row[i].tile);
            user_score += get_score(scrabble_row[i].tile);
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

function scrabble_double(){
    if(scrabble_row[2].tile != "pieceX") {
        return 1;
    }
    if (scrabble_row[12].tile != "pieceX") {
        return 1;
    }
    
    return 0;
}

function calc_score(passed_id) {
    var letter = find_letter(passed_id);
    var score = 0;
    
    for(var i = 0; i < 27;i++) {
        var object = pieces[i];
        
        if(object.letter == letter) {
            score = object.value;
            score += (score * double_letter(passed_id));
        
            return score;
        }

    }
    return -1;
}

function double_letter(passed_id) {
    var dropped_ID = find_tile_position(passed_id);
    
    if(droppedID == "drop6" || droppedID == "drop8") {
        return 1
    }
    else {
        return 0;
    }
}
function find_letter(passed_id) {
    for(var i = 0; i < 7; i++) {
        if(scrabble_tiles[i].id == passed_id) {
            return scrabble_tiles[i].letter;
        }
    }
        return -1;
}
function find_board_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].id == passed_id) {
            return i;
        }
    }
    return -1;
}

function load_pieces() {
    var img_location = "../scrabbleimages";
    var rand_num = 1;
 //   var scrabblePiece = "<img class ='pieces' id='pieces" + i + "'src='" + img_location + temp_num + 
 //           ".jpg" + "'></img>";
   var scrabble_piece = "";
    var scrabblePieceID = "";
    
    
    for(var i = 0; i < 7; i++) {
        var temp = true;
        while(temp == true) {
            rand_num = generate_random_ints(0,26);
            
            if(pieces[rand_num].amount != 0) {
                temp = false;
                pieces[rand_num].amount--;
            }
        
        }
        
     scrabble_piece = "<img class='pieces' id='pieces" + i + "'src='" + img_location + pieces[rand_num].letter + ".jpj"
                        + "'></img>";   
    }
    
    
    
}
