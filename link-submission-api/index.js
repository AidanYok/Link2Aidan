const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

module.exports = app;

