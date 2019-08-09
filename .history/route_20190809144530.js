const  fs =require('fs') ;
let user = '';
fs.readFile("./return/user.json",'utf-8',function(err, data) {
  // console.log(data,typeof(data))
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
      console.log(user);
      return user;
    }
  },{
    method: 'POST',
    path: '/api/addUser',
    headers: 'application/json',
    result: (body) => {
      console.log(user);
      let list = (JSON.parse(user)).list
      list.push(body);
      console.log(list)
      fs.writeFileSync(__dirname+'/return/user.json',JSON.stringify({list}));
      return JSON.stringify({list});
    }
  }];