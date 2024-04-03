const schedule = require("node-schedule");
const mongoClient = require('./client/mongodb-client');

async function setDailyWordcord() {
    try {
        console.log("Running Scheduler");

        // Connect the client to the server	(optional starting in v4.7)
        await mongoClient.connect();

        // Send a ping to confirm a successful connection
        await mongoClient.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
        const wordcordSuggestionsCollection = mongoClient.db("discord").collection("wordcord_suggestions");
        const wordcordDocuments = await wordcordSuggestionsCollection.aggregate([
            {$match:{selected: false}},
            {$sample:{size:1}}
        ]).toArray();
        if (wordcordDocuments.length != 1) {
            throw new Error("Internal Error while retrieving a random WordCord from wordcord_suggestions collection");
        }

        const updatedWordcordSuggestionsResult = await wordcordSuggestionsCollection.updateOne(
            {_id: wordcordDocuments[0]._id},
            {$set: {selected: true}}
        )
        if (updatedWordcordSuggestionsResult.modifiedCount != 1) {
            throw new Error("Internal Error while updating the 'selected' field to true in wordcord_suggestions collection");
        }

        const wordcord = wordcordDocuments[0].word;
        console.log(`Successfully retrieved daily WordCord: ${wordcord}!`);

        const dailyWordcordCollection = mongoClient.db("discord").collection("daily_wordcord");
        const updatedDailyWordcordResult = await dailyWordcordCollection.updateOne(
            {}, 
            {$set: {word: wordcord}},
            {upsert: true}    
        );
        if(updatedDailyWordcordResult.upsertedCount != 1 && updatedDailyWordcordResult.modifiedCount != 1) {
            throw new Error("Internal Error while updating the previous WordCord in the daily_wordcord collection");
        }

        // const deletedDailyWordcordResult = await dailyWordcordCollection.deleteMany({});
        // if (deletedDailyWordcordResult.deletedCount >= 1) {
        //     throw new Error("Internal Error while deleting the previous WordCord in the daily_wordcord collection");
        // }
        // await dailyWordcordCollection.insertOne({word: wordcord});

    } catch (error) {
        console.error(error.message);
        // Ensures that the client will close when you finish/error
        await mongoClient.close();
        console.log("Closing MongoClient");
    }
    // finally {
    //     // Ensures that the client will close when you finish/error
    //     await mongoClient.close();
    //     console.log("Closing MongoClient");
    // }
}

function scheduler() {
//   const rule = new schedule.RecurrenceRule();
//   rule.hour = 0;
//   rule.minute = 0;
//   rule.tz = 'America/Chicago';
//   schedule.scheduleJob(rule, setDailyWordcord);

  schedule.scheduleJob('*/3 * * * *', setDailyWordcord);
}

module.exports = scheduler;
