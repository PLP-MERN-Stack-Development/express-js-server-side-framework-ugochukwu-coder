# 🧃 My Express Products API

A fun little store API built with Express.js.

## 🚀 How to Run
1. Open your terminal
2. Type: `npm install`
3. Copy `.env.example` to `.env`
4. Type: `node server.js`
5. Visit: http://localhost:3000

## 🧩 API Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/products | Show all products |
| GET | /api/products/:id | Show one product |
| POST | /api/products | Add new product (needs x-api-key) |
| PUT | /api/products/:id | Update a product (needs x-api-key) |
| DELETE | /api/products/:id | Delete a product (needs x-api-key) |
| GET | /api/products/stats/all | Show number of products in each category |
