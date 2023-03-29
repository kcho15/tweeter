// Character counter function

$(document).ready(function() {
  // Display default 140 char count
  $('#char-counter').text('140');
  // event handler to textarea element for form inside of new-tweet
  $('#tweet-text').keyup(function () {
    let chars = 140 - $(this).val().length; // jquery val() method returns the current value of the textarea element

    if (chars < 0) {
      // if < 0, display red negative numbers using css 
      $('#char-counter').css('color', 'red'); 
    } else {
      // reset color back to default 
      $('#char-counter').css('color', '');
    }
    // Update the text of the element id char-counter to display chars left 
    // $('#char-counter').text(chars); < bad practice
    // traverse up the DOM tree with .closest from textarea until it finds the nearest form element
    // .find goes back down the DOM tree to find the id char-counter  
    $(this).closest('form').find('#char-counter').text(chars);
  }); 
});