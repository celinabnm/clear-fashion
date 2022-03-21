require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { Db } = require('mongodb');
//const db = require('./db');
const products = require('./products.json');
//const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb+srv://celina:celina93@cluster0.xfst6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const { MongoClient } = require('mongodb');


const  MONGODB_DB_NAME = "ClearFashion";


const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});




app.get('/products/search', (request, response) => {
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

  collection.find(product_to_find).toArray((error, result) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send(result);
  });


});


app.get('/products/:id', (request, response) => {
  collection.findOne({'_id': request.params.id},(error, result) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send(result);
  });
  
});

//app.listen(PORT);

app.listen(PORT, () => {
  MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true}, (error, client)=>{
    if(error) {
      throw error;
  }
    db = client.db(MONGODB_DB_NAME);
    collection = db.collection("first_file_scrapping");
    console.log("Connected to `" + MONGODB_DB_NAME + "`!");
  });
});

console.log(`📡 Running on port ${PORT}`);
