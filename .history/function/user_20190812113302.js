const  fs =require('fs') ;
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
    fs.writeFileSync('../return/user.json',JSON.stringify({list, index}));
    return {list, index}
}

exports = module.exports = {
    addUser
}