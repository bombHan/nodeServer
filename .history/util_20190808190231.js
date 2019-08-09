
const querystring = require("querystring");

function getBody(body) {
    console.log(body)
      let rqs = body.split(';');
      rqs = rqs.filter((item, index) => {return index>0});
      let name = [];
      let value = [];
      rqs.forEach((item) => {
        let arr = item.split('\r\n\r\n');
        name.push(arr[0]);
        value.push(arr[1]);
      });
      name = name.map((item) => {let arrN = item.split('=');return arrN[1]});
      name = name.map((item) => {return (item.split('\"'))[1]});
      value = value.map((item) => {let arrV = (item || '').split('\n'); return arrV[0]});
      value = value.map((item) => {return (item.split('\r'))[0]});
      let rbody = {};
      name.forEach((item, index) => {
        rbody[item] = value[index]
      });
      console.log(rqs, name, value, rbody)
      return rbody
}

exports = module.exports = {
    getBody
}