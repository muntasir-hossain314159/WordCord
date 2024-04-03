const { SlashCommandBuilder } = require('discord.js');
const mongoClient = require("../../client/mongodb-client");

async function addSuggestionsToDatabase(wordcordSuggestionsDictionaryList) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();

    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const collection = mongoClient.db("discord").collection("wordcord_suggestions");
    wordcordSuggestionsDictionaryList.forEach(element => {
      collection.updateOne(
        {word: element.word},
        {
          $setOnInsert: {word: element.word, selected: false}
        },
        {upsert: true}
      )
    });
    console.log(`Successfully inserted WordCord suggestions: ${JSON.stringify(wordcordSuggestionsDictionaryList)}!`);
  } catch (error) {
    console.error(error.message);
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
    console.log("Closing MongoClient");
  }
  // finally {
  //   // Ensures that the client will close when you finish/error
  //   await mongoClient.close();
  //   console.log("Closing MongoClient");
  // }
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
        const wordcordSuggestionsDictionaryList = wordcordSuggestions.map(item => {return {word: item}});
        addSuggestionsToDatabase(wordcordSuggestionsDictionaryList);
    },
};