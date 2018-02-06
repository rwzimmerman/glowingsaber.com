



/* Returns true if an object is empty. */

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



/* This function toggles a set of Divs between hidden and displayed and 
displayd a different Div based on screen width.
Parameters
    buttonId - The ID (sans #) of the button used to toggle the div display
    narrowDiv - The ID (with #) of the Div to display of for a "narrow" width
    wideDiv - The ID (with #) of the Div to display of for a "wide" width

When the button is clicked the innerHTML value of the button is read.  If it
is "Display" the approprate div is displayed other wise all divs are hidden, 
then the innerHTML value of the button is set the "Hide".
The screen width is read and if is is greater than the tableWidth value the 
wideDiv is displayed, otherwise the narrowDiv is displayed.  */


    

function toggleTable(buttonId,wideDiv,narrowDiv) {
    $(document).ready(function(){ 
        var w = window.innerWidth;
        var h = window.innerHeight;
        var tableWidth = 700;
        var buttonText = document.getElementById(buttonId).innerHTML;


        /* If no narrowDiv is given set it to the wideDiv */
        if (isEmpty(narrowDiv)) {narrowDiv = wideDiv}

        if (buttonText == "Show") {
            document.getElementById(buttonId).innerHTML = "Hide";
            if (w > tableWidth) {
                $(wideDiv).slideDown();
                document.getElementById(wideDiv).style.visibility = "visible";
                $(narrowDiv).slideUp();
            } else {
                $(wideDiv).slideUp();
                $(narrowDiv).slideDown();
                document.getElementById(narrowDiv).style.visibility = "visible";
            }
        } else {
            document.getElementById(buttonId).innerHTML = "Show";
            $(narrowDiv).slideUp();
            $(wideDiv).slideUp();
        }
    });
}


