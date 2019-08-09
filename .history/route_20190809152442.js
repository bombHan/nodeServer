const  fs =require('fs') ;
exports = module.exports = [
  {
    method: 'GET',
    path: '/api/text',
    headers: 'text/plain',
    result: require('./return/getText')
  }, {
    method: 'POST',
    path: '/api/user',
    headers: 'application/json',
    result: (body) => {
      return user;
    }
  },{
    method: 'POST',
    path: '/api/user/add',
    headers: 'application/json',
    result: (body) => {
      console.log(user);
      let list = (JSON.parse(user)).list;
      let index =  (JSON.parse(user)).index + 1;
      let addObj = JSON.parse(body);
      list.push({
        ...addObj,
        id: index
      });
      console.log(list)
      fs.writeFileSync(__dirname+'/return/user.json',JSON.stringify({list, index}));
      return JSON.stringify({list});
    }
  },{
    method: 'POST',
    path: '/api/user/delete',
    headers: 'application/json',
    result: (body) => {
      console.log(user);
      let list = (JSON.parse(user)).list;
      let index =  (JSON.parse(user)).index;
      let deleteObj = JSON.parse(body);
      list = list.filter((item) => {
        return item.id !== deleteObj.id
      })
      console.log(list)
      fs.writeFileSync(__dirname+'/return/user.json',JSON.stringify({list, index}));
      return JSON.stringify({list});
    }
  }
];