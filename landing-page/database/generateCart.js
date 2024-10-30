// const fs = require('fs');

// // Helper function to generate a UUID (v4)
// function generateUUID() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         const r = Math.random() * 16 | 0;
//         const v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

// // Function to generate 105 products with unique UUIDs
// function generateProducts() {
//     const products = Array.from({ length: 105 }, (_, index) => ({
//         id: generateUUID(),
//         name: `Product ${index + 1}`,
//         price: (10 + index * 1.5).toFixed(2),
//         quantity: 1,
//         description: `This is a description for Product ${index + 1}`
//     }));
//     return products;
// }

// // Function to save products to cart.json
// function saveProductsToFile(products) {
//     fs.writeFileSync('cart.json', JSON.stringify(products, null, 4));
//     console.log("cart.json file updated with 105 products.");
// }

// // Function to auto-generate and save products every few seconds
// function autoGenerateProducts(intervalSeconds) {
//     setInterval(() => {
//         const products = generateProducts();
//         saveProductsToFile(products);
//     }, intervalSeconds * 1000);
// }

// // Start the auto-generation every 10 seconds (can adjust this value)
// autoGenerateProducts(10);

const fs = require('fs');

// Function to generate a new UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to check if cart.json exists and read its content
function getCartData() {
    try {
        if (fs.existsSync('cart.json')) {
            const data = fs.readFileSync('cart.json', 'utf-8');
            return JSON.parse(data);
        } else {
            return {}; // Return empty object if file does not exist
        }
    } catch (err) {
        console.error('Error reading cart.json:', err);
        return {};
    }
}

// Function to write cart data to cart.json
function saveCartData(cart) {
    fs.writeFileSync('cart.json', JSON.stringify(cart, null, 2));
    console.log('Cart data saved successfully.');
}

// Main logic to ensure UUID exists in cart.json
function ensureUUIDInCart() {
    let cart = getCartData(); // Get current cart data

    // Check if UUID already exists, if not, generate a new one
    if (!cart.id) {
        console.log('UUID not found. Generating new UUID...');
        cart.id = generateUUID();
    } else {
        console.log('UUID exists:', cart.id);
    }

    saveCartData(cart); // Save the updated cart data
}

// Execute the function
ensureUUIDInCart();
