import { NextResponse } from 'next/server';
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

export async function GET(request) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await mongoClient.connect();
        // Send a ping to confirm a successful connection
        await mongoClient.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
        const collection = mongoClient.db("discord").collection("wordcord_suggestions");
        const wordcordDocuments = await collection.aggregate([{$sample:{size:1}}]).toArray();
        if (wordcordDocuments.length != 1) {
            return NextResponse.json("Internal Error", { status: 500, statusText: "Internal Error" });
        }
        const wordcord = wordcordDocuments[0].word;
        console.log(`Successfully retrieved WordCord suggestion: ${wordcord}!`);
        return NextResponse.json({wordcord});
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoClient.close();
        console.log("Closing MongoClient");
    }

}