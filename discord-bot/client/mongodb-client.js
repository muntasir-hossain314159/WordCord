const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = mongoClient;