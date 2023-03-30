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
              <img src="${tweet.user.avatars}">
              <span>${tweet.user.name}</span>
            </div>
            <div class="handle">${tweet.user.handle}</div>
        </header>
          <div class="canned-text">${tweet.content.text}</div>
        <footer>
          <div class="days">${timeago.format(tweet.created_at)}</div>
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
    
    // grab text from submission
    const $tweetText = $('#tweet-text');
  
    // Max character limit
    const maxCharLimit = 140;

    // Validation checks including XSS 
    // Error if no text is submitted, replaced .val() with .text() to safely encode user submitted text 
    if ($tweetText.text().trim().length === 0) {
      alert('Error: Tweet content is empty.');
      return;
    }
    // Error if tweet is above max char limit
    if ($tweetText.text().length > maxCharLimit) {
      alert('Error: Tweet length exceeds maximum limit.');
      return;
    }
  
    console.log('New tweet incoming!'); // debugging

    const urlencoded = $form.serialize(); // gives us back urlencoded data
  
    console.log(urlencoded); // debugging

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded,
    }).then(loadTweets);
  });

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then((tweets) =>{
      $tweetContainer.empty(); 
      renderTweets(tweets)
    }); 
  };
  
  loadTweets(); // testing
  
});