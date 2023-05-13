const { allowCors } = require('./../index'); // import allowCors using destructuring

const data = {
  message: 'This data is from the server',
}

const dataHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

module.exports = allowCors(dataHandler);

