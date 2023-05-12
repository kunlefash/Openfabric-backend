const express = require("express");
const bodyParser = require("body-parser");
const {
  generateToken,
  verifyToken,
  hashPassword,
  comparePasswords,
} = require("./src/auth.js");
// const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Connect to the database
// client.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MongoDB:", err);
//     return;
//   }
//   console.log("Connected to MongoDB");

// });

app.use(bodyParser.json());
let products = [];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    res.sendStatus(404);
    return;
  }

  res.json(product);
});

// POST a new product
app.post("/products", (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);

  res.status(201).json(product);
});

// PUT (update) a product
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    res.sendStatus(404);
    return;
  }

  products[productIndex] = { ...req.body, id };

  res.json(products[productIndex]);
});

// DELETE a product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    res.sendStatus(404);
    return;
  }

  const deletedProduct = products.splice(productIndex, 1)[0];
  res.json(deletedProduct);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
