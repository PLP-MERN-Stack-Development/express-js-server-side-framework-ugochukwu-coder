const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { ValidationError, NotFoundError } = require("../utils/errors");
const auth = require("../middleware/auth");
const router = express.Router();

// Sample in-memory products database
let products = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false,
  },
];

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/products/:id
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
});

// POST /api/products
router.post("/", auth, (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !price)
    return next(new ValidationError("Name and price are required"));

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put("/:id", auth, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete("/:id", auth, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});

module.exports = router;
