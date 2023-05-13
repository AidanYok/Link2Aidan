const allowCors = require('./../index'); // the allowCors function is exported from index.js

const data = {
  message: 'This data is from the server',
}

const dataHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

module.exports = allowCors(dataHandler);

