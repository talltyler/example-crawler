var cheerio = require('cheerio');
var request = require('request');

module.exports = function(url, selector, callback){
  request(url,function(err, res, data){
    // Node-style error handling and forwarding
    if (err) return callback(err);
    // Everything okay, load the HTML
    var $ = cheerio.load(data);

    // Find interesting bits via selector and convert to array
    var result = $(selector).map(function(){
      return $(this).text();
    }).toArray();

    // Pass data back to the callback in second argument
    callback(null, result);
  });
};