const  fs =require('fs') ;
let user = '';
fs.readFile("./return/user.json",'utf-8',function(err, data) {
  console.log(data,typeof(data))
  user = data
});
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
      console.log(user)
      // user.list.push({
      //   name: 'test',
      //   age: 28
      // });
      // fs.writeSync(__dirname+'/return/user.json',JSON.stringify(user));
      // return user
      return body;
    }
  }];