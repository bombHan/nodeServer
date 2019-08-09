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
    let arr = []
    req.on('data', (c) => {
      arr.push(c);
    })
    req.on('end', () => {
      const body = (Buffer.concat(arr)).toString('utf8')
      console.log(querystring.parse(body))
      res.end(querystring.parse(body));
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