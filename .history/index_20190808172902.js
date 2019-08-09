const http = require('http');
const nUrl = require('url');
const config = require('./config');
const Route = require('./route');
const querystring = require("querystring");
const server = http.createServer((req, res) => {
  let method = req.method;
  let url = nUrl.parse(req.url);
  let matchRoute = Route.find((item) => {
    return item.method === method && item.path === url.pathname;
  })
  if (matchRoute) {
    res.statusCode = 200;
    res.setHeader('Content-Type', matchRoute.headers);
    res.end(matchRoute.result);
//     console.log(req.httpVersion);
//     console.log(req.headers);
//     console.log(req.method);
//     console.log(req.url);
//     console.log(req.trailers);
    req.on('data', (c) => {
      let body = Buffer.concat([c]).toString('utf8')
      console.log(body, querystring.parse(body))
    })
    return;
  }
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
});
server.listen(config.port, config.hostname, () => {
  console.log(`Server running at <a href="http://${config.hostname}:${config.port}/api/text`);
});