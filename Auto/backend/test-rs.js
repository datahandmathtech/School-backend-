const { MongoClient } = require('mongodb');
const uri = "mongodb://Y_db_user:Abhay557@cluster0-shard-00-00.m1ah6f.mongodb.net:27017/fleet_management?ssl=true&authSource=admin";

const client = new MongoClient(uri);

async function run() {
    try {
        console.log("Connecting to single shard...");
        await client.connect();
        console.log("Connected successfully to shard 0!");
        const status = await client.db('admin').admin().replSetGetStatus();
        console.log("Replica Set Name:", status.set);
    } catch (err) {
        console.error("Failed:", err.message);
    } finally {
        await client.close();
    }
}
run();
