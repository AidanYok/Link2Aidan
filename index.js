require('dotenv').config();

// node.js
const http = require('http')
const url = require('url')
const dataRouter = require('./api/data')

const { MongoClient } = require('mongodb');
const path = require('path');

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

const PORT = process.env.PORT || 3000;

const uri = `mongodb+srv://ayokuda:${process.env.MONGO_PASSWORD}@cluster0.fmquarj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const clientSideDirectory = 'client/';
app.use(express.static(path.join(__dirname, clientSideDirectory)));

app.post('/submit-link', async (req, res) => {
    const { name, link } = req.body;

    try {
        await client.connect();
        const collection = client.db('your_database').collection('links');
        await collection.insertOne({ name, link });
        res.status(201).json({ message: 'Link submitted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting the link. Please try again.' });
    } finally {
        await client.close();
    }
});

app.get('/get-links', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db('your_database').collection('links');
        const links = await collection.find({}).toArray();
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving links. Please try again.' });
    } finally {
        await client.close();
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, clientSideDirectory, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

