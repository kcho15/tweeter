/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "/images/avatar1.PNG"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "/images/avatar2.PNG",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Nyamero",
        "avatars": "/images/avatar5.PNG",
        "handle": "@docmilo" },
      "content": {
        "text": "nyan"
      },
      "created_at": 1461113959069
    }

  ]
  // grab the tweet-container section in the DOM 
  const $tweetContainer = $("#tweets-container");

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);  
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

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
          <div class="days">${tweet.created_at}</div>
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
  
  renderTweets(data); 


  // grab the form from the DOM
  const $form = $('#new-tweet-form');

  // add a submit event handler to the form
  $form.on('submit', (event) => {
    event.preventDefault(); // stop the browser from default behavior 
    console.log('New tweet incoming!'); 

    const urlencoded = $form.seralize(); // gives us back urlencoded data 
    console.log(urlencoded); // debugging

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded,
    }).then((newTweet) => {
      console.log(newTweet);

    });
  });
});