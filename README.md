imgur-anon-album-api
======================

Imgur's API doesn't return images from anonymous albums. :( This simple scraper will do just that.

```bash
$ npm install -g forever
$ forever start server.js
```
Visit `http://wherevs:8080/3/album/XXXXXX/images` where `XXXXXX` is the id of the anonymous album. The response mirrors the format of the official [Imgur API](https://api.imgur.com/endpoints/album) but with a whole lot less info.

## License

MIT
