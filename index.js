var Twit = require('twit');
var twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var flatsheet = require('flatsheet')({
  token: process.env.FLATSHEET_TOKEN
});

var slug = '8nakzyhuattzq7vp-21toq';

flatsheet.sheet(slug, function (err, res) { 
  res.rows.forEach(function (row, i) {
    if (row.published === 'true') {
      if (!row.tweeted || row.tweeted !== 'true') {
        res.rows[i].tweeted = 'true';
        createTweet(row);
      }
    }
  });

  flatsheet.update(res, function (updateErr, updateRes) {
    console.log(updateErr);
  });
});

function createTweet (row) {
  var status = row.title + ' http://notes.seattle.io/' + row.slug
  twitter.post('statuses/update', { status: status }, function (err, data, response) {
    if (err) console.log(err);
    console.log(data);
  });
}