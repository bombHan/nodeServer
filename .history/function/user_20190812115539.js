const  fs =require('fs') ;
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
// console.log(__dirname, ROOT_PATH ,ROOT_PATH + '/return/user.json')
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
    fs.writeFileSync(ROOT_PATH + '/return/user.json',JSON.stringify({list, index}));
    return {list, index}
}

function deleteUser(body, user) {
    console.log(user);
    let list = (JSON.parse(user)).list;
    let index =  (JSON.parse(user)).index;
    let deleteObj = JSON.parse(body);
    list = list.filter((item) => {
        return item.id !== deleteObj.id
    })
    console.log(list)
    fs.writeFileSync(ROOT_PATH + '/return/user.json',JSON.stringify({list, index}));
    return {list, index}
}

function editUser(body, user) {
    console.log(user);
    let list = (JSON.parse(user)).list;
    let index =  (JSON.parse(user)).index;
    let editObj = JSON.parse(body);
    list = list.map((item) => {
    if (item.id === editObj.id) {
        item = {
        ...item,
        ...editObj
        }
    }
    return item;
    })
    console.log(list)
    fs.writeFileSync(ROOT_PATH + '/return/user.json',JSON.stringify({list, index}));
    return {list, index}
}

exports = module.exports = {
    addUser,
    deleteUser,
    editUser
}