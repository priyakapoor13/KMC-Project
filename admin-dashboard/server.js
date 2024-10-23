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
  { id: 2, customer: 'Customer 2', total: 100, status: 'Shipped', date: '2024-10-16' },
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






const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));

// Sample user data (hashed password for 'password123')
const user = {
    admin: '$2b$10$KIX0QK2OQ4KjEJx4INx8Ge1Us0.PdH/0Kpb/T/yKhH5v81r1zBsuG' // Hash for 'password123'
};

// Serve static files (CSS, JS, etc.)
app.use(express.static('public'));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the username exists
    if (user[username]) {
        // Compare the provided password with the hashed password
        bcrypt.compare(password, user[username], (err, result) => {
            if (result) {
                // Authentication successful
                req.session.username = username; // Store username in session
                return res.redirect('/admin-dashboard/index.html'); // Redirect to admin dashboard
            } else {
                // Invalid password
                return res.send('Invalid username or password. <a href="login.html">Try again</a>');
            }
        });
    } else {
        // Username does not exist
        return res.send('Invalid username or password. <a href="login.html">Try again</a>');
    }
});

// Admin dashboard route
app.get('/admin-dashboard/index.html', (req, res) => {
    if (req.session.username) {
        res.send(`<h1>Welcome to the Admin Dashboard, ${req.session.username}</h1>
                  <form action="/logout" method="POST">
                      <button type="submit">Logout</button>
                  </form>`);
    } else {
        res.redirect('/admin-dashboard/log-in.html'); // Redirect to login if not authenticated
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out.');
        }
        res.redirect('login.html'); // Redirect to login page after logout
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
