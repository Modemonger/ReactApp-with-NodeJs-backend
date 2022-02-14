const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config();
const port = process.env.PORT || 3001;

app.use(express.json({extended: false}));

const connectionString = process.env.API_KEY;


const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const readCsv = (apartmentssCollection) => {
    fs.createReadStream(path.resolve(__dirname, './data/apartments.csv'))
    .pipe(csv.parse({ headers: true, delimiter: ',' }))
    .on('error', error => console.error(error))
    .on('data', row => {
        apartmentssCollection.insertOne(row);
    })
}

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');

        const db = client.db('apartments');
        const apartmentsCollection = db.collection('apartments')

        app.post('/post', (req, res) => {
            console.log(req.body, " Post request")
            apartmentsCollection.insertOne(req.body)
            .then(result => {
                res.send('Apartment recieved. apartment Id is '+result.insertedId);
            })
            .catch(error => console.error(error))
            
        });
        
        //uncomment bellow to add data from file
        // readCsv();

        app.get('/api/v1/apartments', async (req, res) => {
            let data = await db.collection('apartments').find().toArray();
            if(data){
                console.log('Sending apartment data..');
                res.json(data);
            }
        });

        app.get('/api', (req, res) => {
            console.log('Receaved api request')
            res.json({ message: "Hello from the server side!" });
        });

        app.delete('/remove:id', (req, res) => {
            const reqApartment = req.params.id.slice(1).toString();
            console.log('Removing apartment ',reqApartment);
            apartmentsCollection.deleteOne({ "_id" : ObjectId(reqApartment) })
            .then(result => {
                console.log(result);
                res.send('Apartment: "'+reqApartment+'" has been removed')
            })
            .catch(error => console.error(error))
            
        });

        app.put('/update:id', async (req,res) => {
            const reqApartment = req.params.id.slice(1).toString();

            let data = await db.collection('apartments').findOne({ "_id" : ObjectId(reqApartment) });
            let status = '"sold"';
            if(data.status === '"available"') status = '"available"';
            console.log(reqApartment, data);

            apartmentsCollection.updateOne({ "_id" : ObjectId(reqApartment) }, {$set: { status: status}})
        })

      })
      .catch(error => console.error(error))



app.listen(port, () => {
    console.log('Server started');
    console.log(`listening on ${port}`);
});