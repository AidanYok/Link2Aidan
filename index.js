const http = require('http');
const url = require('url');
const dataRouter = require('./api/data');
const getLinksRouter = require('./api/get-links');
const submitLinksRouter = require('./api/submit-links');

const allowCors = fn => async (req, res) => {

  res.setHeader('Access-Control-Allow-Credentials', true)

  res.setHeader('Access-Control-Allow-Origin', '*')

  // another common pattern

  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')

  res.setHeader(

    'Access-Control-Allow-Headers',

    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'

  )

  if (req.method === 'OPTIONS') {

    res.status(200).end()

    return

  }

  return await fn(req, res)

}
module.exports.allowCors = allowCors

const handler = (req, res) => {

  const d = new Date()

  res.end(d.toString())

}


module.exports = allowCors(handler)

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/api/data') {
    return dataRouter(req, res);
  }

  if (pathname === '/api/get-links' && req.method === 'GET') {
    return getLinksRouter(req, res);
  }

  if (pathname === '/api/submit-link' && req.method === 'POST') {
    return submitLinksRouter(req, res);
  }

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, World!');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

