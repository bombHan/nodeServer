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
      const user = require('./return/user');
      user.push({
        name: 'test',
        age: 28
      });
      console.log(__dirname)
      fs.writeSync(__dirname+'/return/user.json',JSON.stringify(user));
      return JSON.stringify(require('./return/user'))
      // return body;
    }
  }];