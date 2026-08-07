const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Y_db_user:Abhay557@cluster0.m1ah6f.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error("Connection failed:", err.message);
    } finally {
        await client.close();
    }
}
run();
