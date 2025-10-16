const express = require("express");
const bodyParser = require("body-parser");
const productsRoute = require("./routes/products");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRoute);

// Error Handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
