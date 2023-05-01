const { MongoClient } = require('mongodb');
const process = require('process');

const uri = `mongodb+srv://ayokuda:${process.env.MONGO_PASSWORD}@cluster0.fmquarj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
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
};

