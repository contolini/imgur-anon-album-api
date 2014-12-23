var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var data = {};

app.set('port', process.env.PORT || 8080);
app.get('/3/album/:id/images', function (req, res) {

  var url = 'https://imgur.com/a/' + req.params.id;

  request(url, function (error, response, html) {

    console.log();

    if (error || response.statusCode !== 200) {
      return res.status(404).send('Error finding that imgur album.');
    }

    var $ = cheerio.load(html);
    data.images = [];

    $('#image-container').find('.image').each(function () {
      var $this = $(this);
      var $id = $this.attr('id');
      var image = {
        id: $id || '',
        link: 'https://i.imgur.com/' + $id + '.gif',
      };

      if (image.id) {
        data.images.push(image);
      }
    });

    res.json({data: data});

  });

});

app.listen(app.get('port'));
exports = module.exports = app;