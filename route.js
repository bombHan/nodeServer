const  fs =require('fs') ;
let user = JSON.stringify(require('./return/user.json'));
const userFun = require('./function/user');
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
      const listJson = userFun.findUser(body, user);
      return listJson;
    }
  },{
    method: 'POST',
    path: '/api/user/add',
    headers: 'application/json',
    result: (body) => {
      const userObj = userFun.addUser(body, user);
      user = JSON.stringify(userObj);
      return JSON.stringify({list: userObj.list});
    }
  },{
    method: 'POST',
    path: '/api/user/delete',
    headers: 'application/json',
    result: (body) => {
      const userObj = userFun.deleteUser(body, user);
      user = JSON.stringify(userObj);
      return JSON.stringify({list: userObj.list});
    }
  },{
    method: 'POST',
    path: '/api/user/edit',
    headers: 'application/json',
    result: (body) => {
      const userObj = userFun.editUser(body, user);
      user = JSON.stringify(userObj);
      return JSON.stringify({list: userObj.list});
    }
  },{
    method: 'POST',
    path: '/api/main',
    headers: 'application/json',
    result: (body) => {
      if (JSON.parse(body).path === 'findUser') {
        const listJson = userFun.findUser(body, user);
        return JSON.stringify(
          {
            ...JSON.parse(listJson),
            code: 200
          }
        );
      } else if (JSON.parse(body).path === 'addUser') {
        const userObj = userFun.addUser(body, user);
        user = JSON.stringify(userObj);
        return JSON.stringify({list: userObj.list, code: 200, message: '添加成功'});
      } else if (JSON.parse(body).path === 'deleteUser') {
        const userObj = userFun.deleteUser(body, user);
        user = JSON.stringify(userObj);
        return JSON.stringify({list: userObj.list, code: 200, message: '删除成功'});
      } else {
        return JSON.stringify(
          {
            message: '地址有误',
            code: 404
          }
        )
      }
    }
  }
];