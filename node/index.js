const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = process.env.API_KEY;

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');

        const db = client.db('quotes');
        const quotesCollection = db.collection('quotes')

        app.post('/post', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        });
        
        app.get('/quotes', async (req, res) => {
            let data = await db.collection('quotes').find().toArray();
            if(data){
                console.log('Sending quote data..');
                res.json(data);
            }
        });

        app.get("/api", (req, res) => {
            console.log('Receaved api request')
            res.json({ message: "Hello from the server side!" });
          });

      })
      .catch(error => console.error(error))



app.listen(port, () => {
    console.log('Server started');
    console.log(`listening on ${port}`);
});