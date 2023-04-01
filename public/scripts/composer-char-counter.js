// Character counter function

$(document).ready(function() {

  $('#tweet-text').on('input', onInput)

}); 

const onInput = function(event) {
  
  // (this) is the textarea in id "tweet-text"
  let $input = $(this); 
  let length = $input.val().length;
  let chars = 140 - length; 

  const $form = $input.closest('form');
  const $counter = $form.find('#char-counter')
  
  $counter.html(chars); 

  if (chars < 0) {
    $counter.addClass('form-red');
  } else {
    $counter.removeClass('form-red'); 
  }
};
