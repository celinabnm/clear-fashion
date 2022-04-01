const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db');

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




app.get('/product/search', async(req,resp) => {
  let limit = req.query.limit
  let brand = req.query.brand
  let price = req.query.price
  let product;
  limit_int = parseInt(limit)
  console.log(price)
  price_int = parseInt(price)


if (typeof brand !== 'undefined' && typeof price !== 'undefined'){
  console.log("brand : True price : True")
  product = await db.find({"brand":brand,"price": {"$lt":price_int}},limit_int)

}
else if (typeof brand !== 'undefined' && typeof price === 'undefined'){

  product = await db.find({"brand":brand},limit_int)
}

else if(typeof brand === 'undefined' && typeof price !== 'undefined' ){
    console.log("brand : False price : True")
  product = await db.find({"price": {"$lt":price_int}},limit_int)
}

else if (typeof brand === 'undefined' && typeof price === 'undefined'){
    console.log("brand : False price : false")
  product = await db.find({},limit_int)
}






{ $lt: 20 }

resp.send(product)

});


app.get('/product/:id',async (request,response) => {
  const product = await db.find({'_id': request.params.id})
  console.log(product)
  response.send(product);
});






app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

