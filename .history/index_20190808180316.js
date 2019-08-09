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
      const body = (Buffer.concat(arr)).toString('utf8');
      console.log(body)
      let rqs = body.split(';');
      rqs = rqs.filter((item, index) => {return index>0});
      let name = [];
      let value = [];
      rqs.forEach((item) => {
        let arr = item.split('\n\n');
        name.push(arr[0]);
        value.push(arr[1]);
      });
      name = name.map((item) => {return (item.split("="))[1]});
      value = value.map((item) => {let arrV = item.split("\n"); return arrV[0]});
      let rbody = {};
      name.forEach((item, index) => {
        rbody[item] = value[index]
      });
      console.log(rqs, name, value, rbody)
      res.end(matchRoute.result);
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