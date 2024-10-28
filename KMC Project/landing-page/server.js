// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample data for products, orders, and users
let products = [
  { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
  { id: 2, name: 'Product 2', price: 200, category: 'Category 2' },
  // Add more products as needed
];

let orders = [
  { id: 1, customer: 'Customer 1', total: 100, status: 'Shipped', date: '2024-10-16' },
  // Add more orders as needed
];

let users = [
  { id: 1, username: 'User1', email: 'user1@example.com', role: 'Admin' },
  // Add more users as needed
];

// API Endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== parseInt(id));
  res.status(204).send();
});

// Other endpoints for orders and users
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




