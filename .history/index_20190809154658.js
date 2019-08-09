const http = require('http');
const nUrl = require('url');
const config = require('./config');
const Route = require('./route');
const util = require('./util');
const  fs =require('fs') ;
let user = '';
  fs.readFileSync("./return/user.json",'utf-8',function(err, data) {
    // console.log(data,typeof(data))
    user = data
  });
const server = http.createServer((req, res) => {
  
  let method = req.method;
  let url = nUrl.parse(req.url);
  console.log(method, url.pathname)
  let matchRoute = Route.find((item) => {
    return item.method === method && item.path === url.pathname;
  })
  console.log(matchRoute)
  if (matchRoute) {
    res.statusCode = 200;
    res.setHeader('Content-Type', matchRoute.headers);
    let arr = []
    req.on('data', (c) => {
      arr.push(c);
    })
    req.on('end', () => {
      if (req.method === 'POST') {
        const body = (Buffer.concat(arr)).toString('utf8');
        // const rbody = util.getBody(body); // 用postman的form-data传参的时候需要这样解析
        res.end(matchRoute.result(body,user));
        // res.end(body)
      } else {
        res.end(matchRoute.result);
      }
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