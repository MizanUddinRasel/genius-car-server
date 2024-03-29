const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()




const app = express();
const port = process.env.port || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dcyvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('connected to db');
        const database = client.db('carMechanic');
        const servicesCollection = database.collection('services');
        //POST api

        app.post('/services', async (req, res) => {
            console.log('hit the pst');
            const service = req.body
            const result = await servicesCollection.insertOne(service);
            // console.log(result);
            res.json(result)
        })

    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Running genius server')
})

app.listen(port, () => {
    console.log('running on port ', port);
})