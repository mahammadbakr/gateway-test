require('dotenv').config();
require("colors");
const fs = require("fs");
const mongoose = require("mongoose");

// Load models
const Product = require("./src/models/product");

// Connect to DB
mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Read JSON files
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/product.json`, "utf-8")
);


// Import into DB
const importData = async () => {
  try {
    await Product.create(product);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
