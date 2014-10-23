var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var data = {};

app.set('port', process.env.PORT || 8080);
app.get('/3/album/:id/images', function (req, res) {

  var url = 'https://imgur.com/a/' + req.params.id + '/layout/grid';

  request(url, function (error, response, html) {

    console.log();

    if (error || response.statusCode !== 200) {
      return res.status(404).send('Error finding that imgur album.');
    }

    var $ = cheerio.load(html);
    data.images = [];

    $('.posts').find('.post').each(function () {
      var $this = $(this);
      var link = $this.find('a').attr('href');
      var image = {
        id: $this.attr('id') || '',
        link: link ? 'https:' + link : '',
      };
      if (image.link) {
        data.images.push(image);
      }
    });

    res.json({data: data});

  });

});

app.listen(app.get('port'));
exports = module.exports = app;