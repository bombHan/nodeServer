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
      let user = JSON.parse(require('./return/user.json'));
      console.log(user)
      // user.list.push({
      //   name: 'test',
      //   age: 28
      // });
      console.log(user)
      // fs.writeSync(__dirname+'/return/user.json',JSON.stringify(user));
      return require('./return/user.json')
      // return body;
    }
  }];