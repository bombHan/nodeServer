const  fs =require('fs') ;
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
const moment = require('moment')
function register(body, platFormUser) {
    // console.log(body);
    let flag = true;
    let message = ''
    console.log(platFormUser)
    platFormUser.forEach((item) => {
      if(item.phone === body.phone) {
        flag = false;
        message = '该手机号已被注册，请重新输入';
        return;
      }
    })
    if(flag) {
      let users = platFormUser;
      users.push(body)
      fs.writeFileSync(ROOT_PATH + '/return/platFormUser.json',JSON.stringify({users}));
      return {success:flag, desc: '注册成功', platFormUser: users}
    } else {
      return {success:flag, desc: message}
    }
    // fs.writeFileSync(ROOT_PATH + '/return/user.json',JSON.stringify({list, index}));
    
}

exports = module.exports = {
  register
}