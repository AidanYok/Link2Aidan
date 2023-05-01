const { MongoClient } = require('mongodb');
const process = require('process');

const uri = `mongodb+srv://ayokuda:${process.env.MONGO_PASSWORD}@cluster0.fmquarj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
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
};

