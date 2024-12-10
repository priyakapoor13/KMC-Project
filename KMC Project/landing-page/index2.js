import { manageSessionId, getCookie } from "./common.js";
import { appendToCart } from "./database/cart.js";
import { getProductDetails } from "./product.js";
manageSessionId();

// Search functionality
const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');

if (searchButton && searchBar) {
  searchButton.addEventListener('click', function () {
    const query = searchBar.value.toLowerCase();

    let pageUrl;
    const searchMap = {
        'laddo gopal poshak': 'simple-poshak.html',
        'fancy poshak': 'fancy-poshak.html',
        'night-suit': 'nightsuit.html',
        'bister-set': 'bister-set.html',
        'accessories': 'accessories1.html',
        'bansuri': 'bansuri1.html',
        'simple-mala': 'simple-mala.html',
        'fancy-mala': 'fancymala.html',
        'furniture': 'furniture.html',
    };

    pageUrl = searchMap[query];
    if (pageUrl) {
        window.location.href = pageUrl;
    } else {
        alert('Page not found');
    }

    window.location.href = pageUrl;
  });
}

let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
let cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// Update cart badge
const updateCartBadge = () => {
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.innerText = cartCount;
  }
};

// Initial cart badge update
updateCartBadge();

// Show notification
const showNotification = (productId) => {
  const notification = document.getElementById(`notification-${productId}`);
  if (notification) {
    notification.innerText = 'Added to cart!';
    setTimeout(() => {
      notification.innerText = '';
    }, 2000);
  }
};

// Load cart items from localStorage on page load
const loadCartItems = () => {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const sessionId = getCookie('sessionId');
  if (cartData.constructor !== Array) {
    cartData = cartData[sessionId];
  }
  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    if (!cartData) {
      return;
    } 
    cartData.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.imageSource}" alt="${item.name}" class ="image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Price: ₹${item.price}</p>
        </div>
        <button class="remove-from-cart" data-product-id="${item.id}">&times;</button>
      `;
      cartItems.appendChild(cartItem);

      total += parseInt(item.price);

      // Add event listener to remove button
      cartItem.querySelector('.remove-from-cart').addEventListener('click', (e) => {
        removeFromCart(item.id, cartItem, parseInt(item.price));
      });
    });
    if (cartTotal) {
      cartTotal.innerText = total;
    }
  }
};

// Add product to cart
const addToCart = (event) => {
  const productId = event.target.value;
  const sessionId = getCookie('sessionId');

  getProductDetails(productId).then((product) => {
    if (product) {
      console.log("Product Details:", product);
      const productDetails = { 
        id: productId,
        name: product.name,
        price: product.price,
        imageSource: product.image
      };

      // Append product to the cart in the session (you may already have a function for this)
      appendToCart(sessionId, productDetails);

      // Add product to cartData
      if (!cartData.some(item => item.id === productId)) {
        cartData.push(productDetails);
        localStorage.setItem('cart', JSON.stringify(cartData));
    } else {
        console.log("Product already in cart");
    }

      // Update cart count and cart badge
      cartCount++;
      localStorage.setItem('cartCount', cartCount);
      updateCartBadge();

      // Show notification
      showNotification(productId);

      // Refresh the cart items display
      loadCartItems();
    } else {
      console.error("Product not found or error occurred.");
    }
  }).catch(error => {
    console.error('Error fetching product details:', error);
  });
};

// Remove product from cart
const removeFromCart = (productId, cartItemElement, productPrice) => {
  cartData = cartData.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cartData));

  if (cartItemElement) {
    cartItemElement.parentNode.removeChild(cartItemElement);
  }

  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
    cartTotal.innerText = parseInt(cartTotal.innerText) - productPrice;
  }

  cartCount--;
  localStorage.setItem('cartCount', cartCount);
  updateCartBadge();
};

// Listen for storage events to update cart data across all tabs/pages
window.addEventListener('storage', (event) => {
  if (event.key === 'cart' || event.key === 'cartCount') {
    cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    updateCartBadge();
    loadCartItems();
  }
});

// Initial load of cart items
document.addEventListener('DOMContentLoaded', function() {
  loadCartItems();
  
  // Function to extract category from URL
  function getCategoryFromURL() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    const category = page ? page.split('.')[0].toLowerCase() : null;
    return category;
  }

  // Fetch and display products based on the current category
  function fetchProductsByCategory(category) {
    if (!category) {
      console.error('No valid category specified for this page.');
      return;
    }

    fetch('./database/product.json')
  .then(response => response.json())
  .then(products => {
    const productContainer = document.getElementsByClassName('product-container');
    productContainer.innerHTML = ''; // Clear the container before adding new products

    for (let productId in products) {
      const product = products[productId];

      // Check if the product belongs to the current category
      if (product.category.toLowerCase() === category) {
        // Create the product card dynamically
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
          <img src="${product.imageSource}" class="product-image" />
          <h2 class="product-title">${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <p class="product-price">₹${product.price}</p>
          <a href="product.html?id=${productId}" class="view-detail-btn">View Details</a>
          <button class="add-to-cart-btn" value="${productId}">Add to Cart</button>
          <div class="notification" id="notification-${productId}"></div>
        `;

        // Append the product card to the product container
        productContainer.appendChild(productCard);
      }
    }

    // Attach event listeners to dynamically created "Add to Cart" buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            addToCart(event);
        }
    });
  })
  .catch(error => console.error('Error fetching products:', error));

  }



  // Get the category from the URL
  const category = getCategoryFromURL();
  console.log('Current category:', category); // Log the detected category

  // Call the function to fetch and display products based on the current category
  fetchProductsByCategory(category);
});

// Cart functionality (open/close)
const openCart = () => {
  const sideCart = document.getElementById('side-cart');
  const overlay = document.getElementById('overlay');
  if (sideCart && overlay) {
    sideCart.classList.add('open');
    overlay.classList.add('show');
  }
};

const closeCart = () => {
  const sideCart = document.getElementById('side-cart');
  const overlay = document.getElementById('overlay');
  if (sideCart && overlay) {
    sideCart.classList.remove('open');
    overlay.classList.remove('show');
  }
};

if (document.getElementById('cart-badge-link')) {
  document.getElementById('cart-badge-link').addEventListener('click', openCart);
}

if (document.getElementById('close-cart')) {
  document.getElementById('close-cart').addEventListener('click', closeCart);
}
if (document.getElementById('overlay')) {
  document.getElementById('overlay').addEventListener('click', closeCart);
}




     
