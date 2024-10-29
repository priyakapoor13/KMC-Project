// server.js
const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware to serve cart.json data
app.get('/cart', (req, res) => {
    try {
        const cart = JSON.parse(fs.readFileSync('cart.json', 'utf-8'));
        res.json(cart);
    } catch (err) {
        console.error('Error reading cart.json:', err);
        res.status(500).json({ error: 'Error reading cart data' });
    }
});

// Endpoint to run generateCart.js if needed
app.get('/generate-cart', (req, res) => {
    exec('node generateCart.js', (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing generateCart.js:', error);
            return res.status(500).json({ error: 'Error generating cart' });
        }
        console.log(stdout);
        res.json({ message: 'Cart generated successfully' });
    });
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample cart data (this would typically come from a database)
let cartItems = [];

// Endpoint to add items to the cart
app.post('/api/cart', (req, res) => {
  const item = req.body; // Expect item data in the request body
  cartItems.push(item);
  res.status(201).json({ message: 'Item added to cart', cartItems });
});

// Endpoint to get cart items
app.get('/api/cart', (req, res) => {
  res.json(cartItems);
});



// Endpoint to process payments
app.post('/api/checkout', (req, res) => {
    const paymentData = req.body;
  
    // Here you would typically validate and process the payment using your payment gateway's API.
    // This example assumes the payment is successful.
  
    res.json({ message: 'Payment processed successfully', paymentData });
  });
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
