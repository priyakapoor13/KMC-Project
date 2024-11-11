// Utility functions to manage cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to generate a unique session ID
function generateSessionId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    });
}

// Function to get or set the session ID cookie
function manageSessionId() {
    let sessionId = getCookie("sessionId");
    if (!sessionId) {
        sessionId = generateSessionId();
        setCookie("sessionId", sessionId, 7); // Store for 7 days
    }
    return sessionId;
}

// Function to read cart data from JSON file
async function readCartData() {
    const response = await fetch('./cart.json');
    const data = await response.json();
    return data;
}

// Function to update cart data in JSON file (requires backend support)
async function updateCartData(cartData) {
    const response = await fetch('./cart.json', {
        method: 'POST', // Or 'PUT' depending on your backend setup
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
    });
    return response.json();
}

// Main function to manage cart
async function manageCart() {
    const sessionId = manageSessionId();
    let cartData = await readCartData();
    
    // Find or create a cart for the current session
    let sessionCart = cartData.find(cart => cart.sessionId === sessionId);
    if (!sessionCart) {
        sessionCart = {
            sessionId: sessionId,
            products: []
        };
        cartData.push(sessionCart);
    }

    // Update cart as needed
    // Example: Add a new product
    sessionCart.products.push({
        productId: "new-product-id",
        productName: "New Product",
        quantity: 1,
        price: 20.00
    });

    // Update the cart data
    await updateCartData(cartData);
}

// Call manageCart to initialize
manageCart();
