exports = module.exports = [{
    method: 'GET',
    path: '/text',
    headers: 'text/plain',
    result: require('./return/getText')
  }, {
    method: 'POST',
    path: '/user',
    headers: 'application/json',
    result: JSON.stringify(require('./return/user'))
  }];