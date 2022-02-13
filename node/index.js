const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.json({extended: false}));

const connectionString = process.env.API_KEY;

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');

        const db = client.db('quotes');
        const quotesCollection = db.collection('quotes')

        app.post('/post', (req, res) => {
            console.log(req.body, " Post request")
            quotesCollection.insertOne(req.body)
            .then(result => {
                res.send('Quote recieved. Object Id is '+result.insertedId);
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

        app.get('/api', (req, res) => {
            console.log('Receaved api request')
            res.json({ message: "Hello from the server side!" });
        });

        app.delete('/remove:quote', (req, res) => {
            const reqQuote = req.params.quote.slice(1);
            console.log('Removing quote ',reqQuote);
            quotesCollection.deleteOne({ quote: reqQuote })
            .then(result => {
                console.log(result);
                res.send('Quote: "'+reqQuote+'" has been removed')
            })
            .catch(error => console.error(error))
            
        });

      })
      .catch(error => console.error(error))



app.listen(port, () => {
    console.log('Server started');
    console.log(`listening on ${port}`);
});