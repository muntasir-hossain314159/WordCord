const { SlashCommandBuilder } = require('discord.js');
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

async function addSuggestionsToDatabase(wordcordSuggestions) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const collection = await mongoClient.db("discord").collection("wordcord_suggestions");
    await collection.insertMany(wordcordSuggestions);
    console.log(`Successfully inserted WordCord suggestions: ${JSON.stringify(wordcordSuggestions)}!`);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
    console.log("Closing MongoClient");
  }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-wordcord')
		.setDescription('Add your suggested words to the daily WordCord pool!')
        .addStringOption(option => 
            option.setName('wordcord-suggestions')
                .setDescription('Pass in 5-letter words seperated by commas')
                .setRequired(true)),
    async execute(interaction) {
        const wordcordSuggestions = interaction.options.getString('wordcord-suggestions')
                                                        .split(',')
                                                        .map(item => item.trim())
                                                        .filter(item => item.length === 5);
        await interaction.reply(`Thank you for your WordCord suggestions: ${wordcordSuggestions.toString()}!`);
        const wordcordSuggestionsDictList = wordcordSuggestions.map(item => {return {word: item}});
        addSuggestionsToDatabase(wordcordSuggestionsDictList);
    },
};