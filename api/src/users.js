import { MongoClient } from 'mongodb';

import { config } from "dotenv";
config();

const mongoURI = process.env.MONGO_URI;
const mongoDB = process.env.MONGO_DB;

if (!mongoURI || !mongoDB) {
    throw new Error("Please set the MONGO_URI and MONGO_DB environment variables.");
}

const client = new MongoClient(mongoURI);
let db;

async function connectToDb() {
    try {
        if (!db) {
            await client.connect();
            db = client.db(mongoDB);
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

async function getContacts(req, res) {
    try {
        await connectToDb();
        const collection = db.collection('contacts');
        const contacts = await collection.find({}).toArray();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function addContact(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required' });
    }
  
    const contact = { name, email };
    try {
        await connectToDb();
        const collection = db.collection('contacts');
        await collection.insertOne(contact);
        res.status(201).send(contact);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

export default { getContacts, addContact }
