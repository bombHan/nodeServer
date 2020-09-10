const  fs =require('fs') ;
const func = require('../function/platFormUser');
let platFormUser = JSON.stringify(require('../return/platFormUser.json'));
const users =  [
{
    method: 'POST',
    path: '/api/register',
    headers: 'application/json',
    result: (body) => {
      const result = func.register(JSON.parse(body),(JSON.parse(platFormUser)).users);
      if(result.success) {
        platFormUser = JSON.stringify({users:result.platFormUser})
        return JSON.stringify({ code: '00000', desc: result.desc});
      } else {
        return JSON.stringify({ code: '00001', desc: result.desc});
      }
    }
  }
];

exports = module.exports = users;