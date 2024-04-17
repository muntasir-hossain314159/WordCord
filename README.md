# WordCord
WordCord is a fun and interactive game built for Discord communities, bringing the popular Wordle game directly to your server. Developed with Next.js and Node.js, this project allows users to guess a word suggested by other members of the community, fostering engagement and excitement within your Discord server.

# Implementation
Recreated the Wordle game using Next.js and integrated it with a Discord bot.\
The Discord bot was built using Node.js, and it was configured with slash commands to enable users to submit 5-letter words which are subsequently stored in a MongoDB database.\
The server then executes a daily Cron job to randomly select a word from the database and update the daily WordCord prompt.

# Installation
## To setup WordCord
* Git clone the repository
* Run `npm install` in the client-app folder
* Create a .env file in the client-app folder
* Set up a MongoDB Atlas database and obtain the connection string for Node.js driver
* Set `MONGO_DB_URI=<connection_string>` in the .env file
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
