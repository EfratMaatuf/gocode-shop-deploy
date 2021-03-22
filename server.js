const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("product", productSchema);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(
      products.filter((product) => {
        product.title.includes(q) ||
          product.category.includes(q) ||
          product.description.includes(q);
      }) ?? {}
    );
    console.log("Products with filter:" + q);
  } else {
    res.send(products);
    console.log("All Products");
  }
});

app.get("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  console.log(`Product number ${productId}`);
  const product = await Product.findById(productId).exec();
  res.send(product ?? {});
});

app.post("/api/products", (req, res) => {
  const { title, price, description, category, image } = req.body;
  if (title && price) {
    new Product({ title, price, description, category, image }).save();
    console.log("New product");
    res.send("OK!");
  } else {
    if (!price) {
      res.send({ ErrText: "No price. please insert!" });
    } else {
      res.send({ ErrText: "No title. please insert!" });
    }
  }
});

app.put("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { title, price, description, category, image } = req.body;
  console.log("Update: " + productId);
  await Product.updateOne(
    { _id: productId },
    { title, price, description, category, image },
    { omitUndefined: true }
  ).exec();
  // if (title) {
  //   await Product.updateOne({ _id: productId }, { title }).exec();
  // }
  // if (price) {
  //   await Product.updateOne({ _id: productId }, { price }).exec();
  // }
  // if (description) {
  //   await Product.updateOne({ _id: productId }, { description }).exec();
  // }
  // if (category) {
  //   await Product.updateOne({ _id: productId }, { category }).exec();
  // }
  // if (image) {
  //   await Product.updateOne({ _id: productId }, { image }).exec();
  // }
  res.send("OK!");
});

app.delete("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  console.log("Delete: " + productId);
  await Product.deleteOne({ _id: productId }).exec();
  res.send("OK!");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`App Server listening on port ${PORT}!`);
  });
});
