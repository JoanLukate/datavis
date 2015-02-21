var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	consumer_key : '4qnHVeGEztJRqe7mfoQ3NYZ51',
	consumer_secret : '9SMYcDbJoe8Ct9C2T0Jv3EPuK8BETAXOo5Z4RquYE0O3O9bsaA',
	access_token : '3049266707-3nc6BjGb2hz7SRv7N4cxTD8V7jQp74Kp3QCXtlJ',
	access_token_secret : 'yaDk6qufYKsjpdzoMb37PYv8iYyEzaPokz59QSJtGaNj9'
});

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
var stream = twit.stream('statuses/filter', { locations: uk })
var lFile = fs.createWriteStream('tweets.log'); // create new variable log

stream.on('tweet', processTweet);

function processTweet(tweet) {
  var strTweet = JSON.stringify(tweet);
    lFile.write(strTweet+"\n");
    //console.log(tweet);
};
