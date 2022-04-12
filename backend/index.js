require("./src/db/db")();
require("dotenv").config();
require("colors");
const express = require("express");
const errorHandler = require("./src/middleware/error");
const formData = require("express-form-data");
const cors = require("cors");

const products = require("./src/routes/products");

const app = express();

// Cors
app.use(cors());

// Body parser
app.use(express.json());
app.use(formData.parse());

// Routes
app.use("/api/v1/products", products);

app.use(errorHandler);


app.listen(
    process.env.PORT || 5050,
    console.log(
        `Server running on`.yellow.bold,
        process.env.ENV,
        `Mode on Port`.yellow.bold,
        process.env.PORT || 5050
    )
);
