"use strict";
// Import the dependency.
const clientPromise = require('./mongodb-client');
require('dotenv').config();
const { MongoClient } = require('mongodb');


const  MONGODB_DB_NAME = "ClearFashion";


const PORT = 8092;

const app = express();

module.exports = app;

let collection, client;


/*
// Handler
module.exports = async (req, res) => {
    // Get the MongoClient by calling await on the promise.
    // Because it is a promise, it will only resolve once.
    
    // Use the client to return the name of the connected database.
    res.status(200).json({ dbName: client.db().databaseName });
}
 
*/

 


app.get('/', async (request, response) => {
    client = await clientPromise;
    db = client.db(MONGODB_DB_NAME);
    collection = db.collection("first_file_scrapping");
    console.log("Connected to `" + MONGODB_DB_NAME + "`!");
  response.send({'ack': true});
});




app.get('/products/search', async (request, response) => {
  var limit = parseInt(request.params.limit)
  var brand = request.params.brand
  var price = request.params.price

  var product_to_find = {};

  if(brand!== undefined )
  {
    product_to_find["brand"] = brand;
  }

  if(price!== undefined)
  {
    price = parseInt(price)
    product_to_find["price"]=price;
  }

  await collection.find(product_to_find).toArray((error, result) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send(result);
  });


});


app.get('/products/:id', async (request, response) => {
  await collection.findOne({'_id': request.params.id},(error, result) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send(result);
  });
  
});

//for a complete list of the products 
app.get('/products', async (request, response) => {
    await collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
console.log(`📡 Running on port ${PORT}`);



