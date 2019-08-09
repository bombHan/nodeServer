const  fs =require('fs') ;
exports = module.exports = [{
    method: 'GET',
    path: '/api/text',
    headers: 'text/plain',
    result: require('./return/getText')
  }, {
    method: 'POST',
    path: '/api/user',
    headers: 'application/json',
    result: (body) => {
      let user = '';
      let ss = '';
      fs.readFile("./return/user.json",'utf-8',function(err, data) {
        console.log(data,typeof(data), body,typeof(body))
        user = data
      })
      // user.list.push({
      //   name: 'test',
      //   age: 28
      // });
      console.log(ss)
      // fs.writeSync(__dirname+'/return/user.json',JSON.stringify(user));
      return ss
      // return body;
    }
  }];