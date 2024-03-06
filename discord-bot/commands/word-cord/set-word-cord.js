const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-wordcord')
		.setDescription('Add your suggested words to the daily WordCord pool!')
        .addStringOption(option => 
            option.setName('wordcord-suggestions')
                .setDescription('Pass in 5-letter words seperated by commas')
                .setRequired(true)),
    async execute(interaction) {
        const wordcordSuggestions = interaction.options.getString('wordcord-suggestions').split(',').map(item => item.trim()).filter(item => item.length === 5);;
        await interaction.reply(`Thank you for your WordCord suggestions: ${JSON.stringify(wordcordSuggestions)}!`);
    },
};