const data = {
  message: 'This data is from the server',
}

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

