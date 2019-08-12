const  fs =require('fs') ;
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
console.log(__dirname)
function addUser(body, user) {
    console.log(user);
    let list = (JSON.parse(user)).list;
    let index =  (JSON.parse(user)).index + 1;
    let addObj = JSON.parse(body);
    list.push({
    ...addObj,
    id: index
    });
    console.log(list)
    fs.writeFileSync(path.resolve(ROOT_PATH, '/return/user.json'),JSON.stringify({list, index}));
    return {list, index}
}

exports = module.exports = {
    addUser
}