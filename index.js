var Twit = require('twit');
var config = require('./config');
var twitter = new Twit(config);
var flatsheet = require('flatsheet')({
  token: process.env.FLATSHEET_TOKEN
});

var slug = '8nakzyhuattzq7vp-21toq';

flatsheet.sheet(slug, function (err, res) { 
  res.rows.forEach(function (row, i) {
    if (!row.tweeted || row.tweeted !== 'true') {
      res.rows[i].tweeted = 'true';
      createTweet(row);
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