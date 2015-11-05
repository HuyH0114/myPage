/* 
    Name: Huy Huynh
    updated by Huy Huynh on November 4, 2015 at 10:32 PM
 */

function mult_calc() {
    /*Reading in the values the user inputed and storing it into variables*/
    var first_horiz = Number(document.getElementById('first_horizontal').value);
    var last_horiz = Number(document.getElementById('last_horizontal').value);
    var first_vert = Number(document.getElementById('first_vertical').value);
    var last_vert = Number(document.getElementById('last_vertical').value);
    console.log(first_horiz, last_horiz, first_vert, last_vert);
    
    
     $("#warning").empty();
     if(last_horiz < first_horiz) { 
        $("#warning").append("<p class='a7warning' > *Swapped first vertical and last horizontal inputs. </p>");
        var temp = first_horiz;
        first_horiz = last_horiz;
        last_horiz = temp;
    }
      if(last_vert < first_vert) {
        $("#warning").append("<p class='a7warning' > *Swapped first vertical and last vertical inputs. </p>");
        var temp = first_vert;
        first_vert = last_vert;
        last_vert = temp;
    }
   // checking if the inputs is valid
//    if(first_horiz === last_horiz || first_vert === last_vert) {
//        alert("The first and end values must be different.");
//        return;
//    }


    /* This commented section was for displaying the user's input from the form
            onto the page, This was just checking if the values were successfully stored.
            This was before I learned that you can just to console.log and add the variable
            names. This was done with help from 
            http://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements*/
//    document.getElementById("demo").innerHTML = first_horiz;
//    document.getElementById("demo1").innerHTML = last_horiz;
//    document.getElementById("demo2").innerHTML = first_vert;
//    document.getElementById("demo3").innerHTML = last_vert;

    var array = [];
    var horizontal = 0;
    var vertical = 0;
    // pushing the array, here I am making a 2 Dimensional Array
    // got help from Jason Downing for this part, and he also linked me to 
    // https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
    for (var i = 0; i <= Math.abs((last_horiz - first_horiz)); i++) {
        array[i] = [];
    }
    
    /*Did not really fully understand the whole pushing into 2D array way in 
     * Javascript so Jason Downing helped clarify this for me. Essentially 
     * the table begins at the first vertical spot and starts to calculate 
     * and populate that row. The horizontal and vertical variables are the
     * indexes for my 2d array. Every time I finish a row I would reset the
     * horizontal back to 0 and move down to the next column. Now I am on a 
     * new column but back at the 0th index in the horizontal aspect. I 
     * continue to loop through until the loop conditions fail.*/
    for(var a = first_vert; a <= last_vert; a++) {
        for(b = first_horiz; b <= last_horiz; b++) {
            array[horizontal][vertical] = a * b;
            horizontal++;
        }
        horizontal = 0;
        vertical++;
        
    }
   
    console.log(array);
    create_table(array);
    return false;
}
function create_table(created_array) {
    /*Reading in the values the user inputed and storing it into variables*/
    var first_horiz =Number(document.getElementById('first_horizontal').value) ;
    var last_horiz = Number(document.getElementById('last_horizontal').value);
    var first_vert = Number(document.getElementById('first_vertical').value);
    var last_vert = Number(document.getElementById('last_vertical').value);
    
    
     if(last_horiz < first_horiz) {
        var temp = first_horiz;
        first_horiz = last_horiz;
        last_horiz = temp;
    }
      if(last_vert < first_vert) {
        var temp = first_vert;
        first_vert = last_vert;
        last_vert = temp;
    }
    
    
    
    /*Filling in a table was confusing because I was still unsure how to do so
     * in Javascript so I got help from Jason Downing. He help me understand 
     * what I had to do and explained to me how he went about it. I also used
     * http://www.w3schools.com/html/html_tables.asp as another source of 
     * reference.*/
    var data = "";
    // making a table tag and giviing it a class called ctable
    data = data + "<table class='ctable'>";
    // empty spot on the top left
    data = data + "<tr ><td class='toprow'></td>";
    // filling in the first row
    for(var i = first_horiz; i <= last_horiz; i++) {
        data += "<td class ='toprow'>" + i + "</td>";
    }
    // close the tr tag for first row
    data = data + "</tr>";
    // indexes for 2d array
    var horizontal = 0;
    var vertical = 0;
    // filling in the products into the table
    for(var a = first_vert; a <= last_vert; a++) {
        data = data + "<tr><td class ='leftmostcol'>" + a + "</td>";
        for(var b = first_horiz; b <= last_horiz; b++) {
            data = data + "<td class='tablebody'>" + created_array[horizontal][vertical] + "</td>";
            horizontal++;
        }
        horizontal = 0;
        vertical++;
        
        // closing each body row
        data = data + "</tr>";
    }
        // closing table tag
        data = data + "</table>";
        
  
        $("#mult_table").html(data);
       return false;
}
function validate() {
          $('#frm1').validate({
            rules : {
                first_horizontal : {
                    required: true,
                    number: true,
                    range: [-15, +15 ]
                },
                last_horizontal : {
                    required: true,
                    number: true,
                    range: [-15, +15 ]
                },
                first_vertical : {
                    required: true,
                    number: true,
                    range: [-15, +15 ]
                },
                last_vertical : {
                    required: true,
                    number: true,
                    range: [-15, +15 ]
                }
            },
            messages : {
                first_horizontal : {
                    required: "<br>" +"ERROR: A number from -15 to 15 is needed for horizontal values. ",
                    number: "<br>" +"ERROR: Enter a valid number between -15 to 15.",
                    range: "<br>" +"ERROR: Your value is outside the expected range of -15 to 15."
                    
                    },
                last_horizontal : {
                    required: "<br>" +"ERROR: A number from -15 to 15 is needed for horizontal values. ",
                    number:"<br>" + "ERROR: Enter a valid number between -15 to 15.",
                    range: "<br>" +"ERROR: Your value is outside the expected range of -15 to 15."
                    },
                first_vertical : {
                    required:"<br>" + "ERROR: A number from -15 to 15 is needed for vertical values. ",
                    number: "<br>" +"ERROR: Enter a valid number between -15 to 15.",
                    range: "<br>" +"ERROR: Your value is outside the expected range of -15 to 15."
                    
                    },
                last_vertical : {
                    required: "<br>" +"ERROR: A number from -15 to 15 is needed for vertical values. ",
                    number: "<br>" +"ERROR: Enter a valid number between -15 to 15.",
                    range: "<br>" +"ERROR: Your value is outside the expected range of -15 to 15."
                    }
                
                    
            },   
        submitHandler: function() {
                    mult_calc();
                    return false;
                }    
                
            });
           
}


