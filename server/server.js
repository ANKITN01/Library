const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('./db/config')
const User = require("./db/User");
const Product = require("./db/Product");
const { Connection } = require("./db/config");
const dotenv = require('dotenv');



// mongoose.connect('mongodb+srv://ankit:1FhBOh2VWpa4dywE@cluster0.poaog8t.mongodb.net/Library', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })

const app = express();
app.use(express.json());

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


// mongoose.connect('mongodb+srv://ankit:1FhBOh2VWpa4dywE@cluster0.poaog8t.mongodb.net/Library', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch(error => {
//   console.error('Error connecting to MongoDB:', error);
// });


// const corsOptions = {
//   origin: 'http://localhost:3000', // Define this in your environment variables
//   methods: 'POST, GET, PUT, DELETE',
//   credentials: true,
// };
app.use(cors());


app.post("/signup",async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

app.post("/login",async (req,resp)=>{
   if(req.body.email && req.body.password){
    let user =await User.findOne(req.body).select("-password");
    if(user){
        resp.send(user);
    }
    else{
        resp.send({result:'No User Found'})
    }
   }
});


app.post("/add-product", async (req, resp) => {
    try {
      let product = new Product(req.body);
      let result = await product.save();
      resp.send(result);
    } catch (error) {
      resp.status(500).send({ error: "An error occurred while adding the product." });
    }
  });


app.get("/products", async (req, resp) => {
    try {
      let products = await Product.find();
      if (products.length > 0) {
        resp.send(products);
      } else {
        resp.send({ result: "No Products found" });
      }
    } catch (error) {
      resp.status(500).send({ error: "An error occurred while fetching the products." });
    }
  });


  
app.delete("/product/:id", async (req, resp) => {
    try {
      const result = await Product.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        resp.send({ message: "Product deleted successfully" });
      } else {
        resp.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      resp.status(500).send({ error: "An error occurred while deleting the product." });
    }
  });
  
  app.get("/product/:id", async (req, resp) => {
    try {
      let result = await Product.findOne({ _id: req.params.id });
      if (result) {
        resp.send(result);
      } else {
        resp.send({ result: "No Record Found" });
      }
    } catch (error) {
      resp.status(500).send({ error: "An error occurred while fetching the product." });
    }
  });
  
  app.put("/product/:id",async (req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    resp.send(result);
  })

// const connectDB = async()=>{
//     mongoose.connect('mongodb://localhost:27017/library');
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('users', productSchema);
//     const data = await product.find();
//     console.log(data);
// }

// connectDB();


console.log(USERNAME,PASSWORD);

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.lyhr137.mongodb.net/?retryWrites=true&w=majority`;
Connection(URL);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ankit
// MQy16NvJFxKndpmT
// 182.69.121.74/32
