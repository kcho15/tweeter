/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {
    
  const $tweetContainer = $("#tweets-container");

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  const createTweetElement = (tweet) => {
    // returns tweet article
    const $tweet = $(`
      <article class="tweet">
        <header id="top-half">
            <div class="user1">
              <img class="avatar" src="${tweet.user.avatars}">
              ${$("<span>").text(tweet.user.name).prop('outerHTML')} 
            </div>
            ${$('<div class="handle">').text(tweet.user.handle).prop('outerHTML')}
        </header>
          ${$('<div class="tweet-content">').text(tweet.content.text).prop('outerHTML')}
        <footer>
          ${$('<div class="days">').text(timeago.format(tweet.created_at)).prop('outerHTML')}
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  // grab the form from the DOM
  const $form = $('#new-tweet-form');

  // add a submit event handler to the form
  $form.on('submit', (event) => {
  // prevent refresh, tweets load on page after submission
    event.preventDefault();

    const $errorMessage = $("#error-message-container");
    $errorMessage.slideUp();

    // grab text from submission
    const $tweetText = $('#tweet-text');
    console.log('$tweetText', $tweetText);
    
    // Max character limit
    const maxCharLimit = 140;

    //
    // Validation checks
    //
    // Error if no text is submitted submitted text
    if ($tweetText.val().trim().length === 0) {
      $errorMessage.html(`<span class="error-message">⚠ Tweet empty! ⚠</span>`);
      $errorMessage.slideDown(400);
      return;
    }
   
    // Error if tweet is above max char limit
    if ($tweetText.val().length > maxCharLimit) {
      $errorMessage.html(`<span class="error-message">⚠ Tweet length exceeded! ⚠</span>`);
      $errorMessage.slideDown(400);
      return;
    }

    // POST Route
    const urlencoded = $form.serialize(); // gives us back urlencoded data
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded,
    }).then(loadTweets);
    // clear the textarea after submission
    $('#tweet-text').val('');
  });
  
  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(renderTweets);
    $tweetContainer.empty(); // returns tweet-container to original state and prevents duplicate loads
  };
 
  loadTweets();
  
});