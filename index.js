const http = require('http')
const url = require('url')
const dataRouter = require('./api/data')

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url)

  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (pathname === '/api/data') {
    return dataRouter(req, res)
  }

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('Hello, World!')
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

