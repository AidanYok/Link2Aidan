require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const uri = `mongodb+srv://ayokuda:${process.env.MONGO_PASSWORD}@cluster0.fmquarj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const clientSideDirectory = 'public/';
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

