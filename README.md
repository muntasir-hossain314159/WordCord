# WordCord
WordCord is a fun and interactive game built for Discord communities, bringing the popular Wordle game directly to your server. Developed with Next.js and Node.js, this project allows users to guess a word suggested by other members of the community, fostering engagement and excitement within your Discord server.

# Features
Wordle Gameplay: Enjoy the classic gameplay of Wordle within your Discord server. Users can guess the hidden word based on suggestions provided by other community members.

Interactive Interface: A user-friendly interface designed for seamless interaction, making it easy for players to input their guesses and see their progress.

Real-Time Updates: Stay up-to-date with real-time updates on the game's progress. See which letters have been guessed correctly, helping players to narrow down their options and solve the word.

Community Engagement: Encourage community participation by allowing members to suggest words for others to guess. This fosters collaboration and camaraderie among your Discord members.

Customizable Settings: Tailor the game experience to suit your community's preferences with customizable settings. Adjust parameters such as the difficulty level, word length, and more.

# Installation
## To setup WordCord
* Git clone the repository
* Run `npm install` in the client-app folder
* Create a .env file in the client-app folder
* Set up a MongoDB Atlas database and set `MONGO_DB_URI=<connection_string>` in the .env file
* Run `npm run dev` to run the Next.js WordCord application
## To setup the Discord Bot
* Run `npm install` in the discord-bot folder
* [Follow the instructions here to set up a Discord Bot in the Developer Portal](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
* Create a .env file in the discord-bot folder
* Copy the generated bot token and set `DISCORD_TOKEN=<token>` in the .env file
* [Follow the instructions here to obtain the Client ID and Guid ID to register slash commands](https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration)
* Set the `CLIENT_ID=<client id>` and `GUILD_ID=<guild id>` in the .env file
* Set  `MONGO_DB_URI=<connection_string>` in the .env file for the MongoDB Atlas databse created in the WordCord installation
* Run `npm run start` to run the Discord Bot
  
Enjoy playing Wordle with your community!

# Next Steps
* Integrate keyboard in the user interface
* Streamline the installation process using Docker
* Publish the Discord Bot
* Deploy the application on Vercel

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
WordCord was inspired by the original Wordle game.
