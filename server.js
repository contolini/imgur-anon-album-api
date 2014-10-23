var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var data = {};

app.get('/api', function(req, res){

  var url = 'https://imgur.com/a/1Oiej/layout/grid';

  request(url, function(error, response, html) {

    if ( !error ) {

      var $ = cheerio.load( html );
      data.images = [];

      $('.posts').find('.post').each(function(i, elem) {

        var $this = $(this),
            link = $this.find('a').attr('href');

        var image = {
          id: $this.attr('id') || '',
          link: link ? 'https:' + link : '',
        };

        if ( image.link ) {
          data.images.push( image );
        }

      });

    }

    res.json( {data: data} );

  });

});

app.listen('8123');
exports = module.exports = app;