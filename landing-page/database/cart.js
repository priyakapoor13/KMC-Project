const cartCount = 'cartCount';

// Function to read cart data from localStorage
const readCartData = (sessionId) => {
    // Retrieve the cart data from localStorage
    const allCartItems = JSON.parse(localStorage.getItem('cart')) || {};

    // Check if the sessionId exists in the cart data
    if (allCartItems.hasOwnProperty(sessionId)) {
        return allCartItems[sessionId];  // Return the cart for the specific sessionId
    }

    return null;  // Return null if sessionId doesn't exist in the cart
}


export const appendToCart = (sessionId, productDetails) => {
    // Retrieve existing cart data from localStorage
    let allCartItems = JSON.parse(localStorage.getItem('cart')) || {};

    // Add the new product to the appropriate session
    if (allCartItems.hasOwnProperty(sessionId)) {
        allCartItems[sessionId].push(productDetails); // Append product
    } else {
        allCartItems[sessionId] = [productDetails]; // Create new cart array for sessionId
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(allCartItems));

    console.log(allCartItems); // Log updated cart
};


  

export const getCartCount = (sessionId) => {
    readCartData(sessionId).then((result) => { if (result) { return result['count'] } else return 0 }).catch((err) => console.log(err));
}

