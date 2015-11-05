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
    
    // Fellow classmate Jason Downing assisted me with adding a little warning message
    // This was not really an error, more of a warning to let the user know what the program
    // is doing when the user entered in the numbers in reverse. For example the first
    // horizontal value was 2 and last horizontal value was 1. The program will actually
    // swap it and calculate it as 1 and 2 instead and this was to just inform the user what it is happening.
    
    // Initially I was confused with the jquery.append and empty() and what it was really doing, 
    // Jason Downing helped clear things up. 
     $("#warning").empty();
     if(last_horiz < first_horiz) { 
        $("#warning").append("<p class='a7warning' > Swapped first horizontal and last horizontal inputs. </p>");
        var temp = first_horiz;
        first_horiz = last_horiz;
        last_horiz = temp;
    }
      if(last_vert < first_vert) {
        $("#warning").append("<p class='a7warning' > Swapped first vertical and last vertical inputs. </p>");
        var temp = first_vert;
        first_vert = last_vert;
        last_vert = temp;
    }
    
    // Took this part out after thinking about it this case really did not even make sense
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

// I used the sample code provided in the class notes, and also seeked some help
// from my fellow classmate Jason Downing. Initally I was still confused where
// I should start or do to implement the validator and error cases for my table.
// Jason Downing helped me get a better understanding and helped me get started. 
// I also used this https://teaching.cs.uml.edu/~heines/91.461/91.461-2012-13f/461-lecs/code/jmh-table-v9.html?language=English&xBegin=-3&xEnd=1&yBegin=1&yEnd=10
// to go about this assignment and get a better understanding of how the whole
// plugin and jQuery works. In addition I also used the runnable code link that was in the class
// notes. URL: https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-lecs/code/ChrisBurbineValidationTest.html
// In addition I also used this http://jqueryvalidation.org/validate/ site to learn more about 
// the plugin's key words, and how to use different functions of the plugin. In addition this site
// as well http://jqueryvalidation.org/documentation/
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
            
            // I noticed in Prof. Heine's code he added the <br> tag to add a new line to his error messages.
            // I used his sample code as reference to base my own message.
            messages : {
                first_horizontal : {
                    required: "<br>" +"Any number from -15 to 15 is needed for horizontal values. ",
                    number: "<br>" +"Enter a valid number between -15 to 15.",
                    range: "<br>" +"Your value is outside the expected range of -15 to 15."
                    
                    },
                last_horizontal : {
                    required: "<br>" +"Any number from -15 to 15 is needed for horizontal values. ",
                    number:"<br>" + "Enter a valid number between -15 to 15.",
                    range: "<br>" +"Your value is outside the expected range of -15 to 15."
                    },
                first_vertical : {
                    required:"<br>" + "Any number from -15 to 15 is needed for vertical values. ",
                    number: "<br>" +"Enter a valid number between -15 to 15.",
                    range: "<br>" +"Your value is outside the expected range of -15 to 15."
                    
                    },
                last_vertical : {
                    required: "<br>" +"Any number from -15 to 15 is needed for vertical values. ",
                    number: "<br>" +"Enter a valid number between -15 to 15.",
                    range: "<br>" +"Your value is outside the expected range of -15 to 15."
                    }
                
                    
            },
        // This was to get my table to actually generate and display.    
        submitHandler: function() {
                    mult_calc();
                    return false;
                }    
                
            });
           
}


