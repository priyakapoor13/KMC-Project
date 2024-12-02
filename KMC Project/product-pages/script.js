// import { manageSessionId, getCookie } from "/landing-page/common.js"
// import { appendToCart } from "/landing-page/database/cart.js";
// import { getProductDetails } from "./page.js";
// manageSessionId();



// const addToCart = (event) => {
//   const productId = event.target.value;
//   const sessionId = getCookie('sessionId');
//   console.log("your session id is " + " -- " + sessionId);
//   console.log("your product id is " + " -- " + productId);

//   getProductDetails(productId).then((product) => {
//     if (product) {
//       console.log("Product Details:", product);
//       const productDetails = { id: productId, ...product };
//       appendToCart(sessionId, productDetails);
//     } else {
//       console.log("Product not found or error occurred.");
//     }
//   });



//   cartCount++;
//   localStorage.setItem('cartCount', cartCount);
//   updateCartBadge();
//   showNotification(productId);
// };

// const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
// for (const addToCartButton of addToCartButtons) {
//   addToCartButton.addEventListener("click", addToCart)
// }

// // Cart functionality
// let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// const updateCartBadge = () => {
//   document.getElementById('cart-badge').innerText = cartCount;
// };

// updateCartBadge();



// const showNotification = (productId) => {
//   const notification = document.getElementById(productId);
//   notification.innerText = 'Added to cart!';
//   setTimeout(() => {
//     notification.innerText = '';
//   }, 2000);
// };

import { manageSessionId, getCookie } from "../landing-page/common.js";
import { appendToCart } from "../landing-page/database/cart.js";
import { getProductDetails } from "./page.js";
manageSessionId();

// Search functionality
const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');

if (searchButton && searchBar) {
  searchButton.addEventListener('click', function () {
    const query = searchBar.value.toLowerCase();

    let pageUrl;
    switch (query) {
      case 'laddo gopal poshak':
        pageUrl = 'simple-poshak.html';
        break;
      case 'fancy poshak':
        pageUrl = 'fancy-poshak.html';
        break;
      case 'night-suit':
        pageUrl = 'nightsuit.html';
        break;
      case 'bister-set':
        pageUrl = 'bister-set.html';
        break;
      case 'accessories':
        pageUrl = 'accessories1.html';
        break;
      case 'bansuri':
        pageUrl = 'bansuri1.html';
        break;
      case 'simple-mala':
        pageUrl = 'simple-mala.html';
        break;
      case 'fancy-mala':
        pageUrl = 'fancymala.html';
        break;
      case 'furniture':
        pageUrl = 'furniture.html';
        break;
      default:
        alert('Page not found');
        return;
    }

    window.location.href = pageUrl;
  });
}

let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
let cartData = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];

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
  const notification = document.getElementById(productId);
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
  if (cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    cartData.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Price: Rs.${item.price}</p>
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
  console.log("Session ID: ", sessionId);
  console.log("Product ID: ", productId);

  getProductDetails(productId).then((product) => {
    if (product) {
      console.log("Product Details:", product);
      const productDetails = { id: productId, ...product };
      appendToCart(sessionId, productDetails);

      // Add product to side cart
      cartData.push(productDetails);
      localStorage.setItem('cartData', JSON.stringify(cartData));

      cartCount++;
      localStorage.setItem('cartCount', cartCount);
      updateCartBadge();
      showNotification(productId);
      loadCartItems();
    } else {
      console.log("Product not found or error occurred.");
    }
  }).catch(error => console.error('Error fetching product details:', error));
};

// Remove product from cart
const removeFromCart = (productId, cartItemElement, productPrice) => {
  cartData = cartData.filter(item => item.id !== productId);
  localStorage.setItem('cartData', JSON.stringify(cartData));

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

// Add event listeners to 'Add to Cart' buttons if they exist
const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
if (addToCartButtons) {
  for (const addToCartButton of addToCartButtons) {
    addToCartButton.addEventListener("click", addToCart);
  }
}

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

// Shipping cost functionality
const shippingCosts = {
  "New York": 50,
  "Los Angeles": 40,
  "Chicago": 30,
  "Houston": 20,
  "Phoenix": 10
};

const updateShippingCost = () => {
  const city = document.getElementById('shipping-city').value.trim();
  const shippingCost = shippingCosts[city] || 0;
  if (document.getElementById('shipping-cost')) {
    document.getElementById('shipping-cost').innerText = shippingCost;
  }
  const cartTotal = document.getElementById('cart-total');
  const totalWithShipping = cartTotal ? parseInt(cartTotal.innerText) + shippingCost : 0;
  if (document.getElementById('total-with-shipping')) {
    document.getElementById('total-with-shipping').innerText = totalWithShipping;
  }
};

if (document.getElementById('shipping-city')) {
  document.getElementById('shipping-city').addEventListener('input', updateShippingCost);
}

// Load cart items on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCartItems();
});

// Carousel functionality
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (carousel && carouselItems.length > 0 && prevButton && nextButton) {
  let currentIndex = 0;

  function showSlide(index) {
    if (index >= carouselItems.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = carouselItems.length - 1;
    } else {
      currentIndex = index;
    }
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 3000);

  window.addEventListener('resize', () => {
    carousel.style.transition = 'none';
    showSlide(currentIndex);
    setTimeout(() => {
      carousel.style.transition = 'transform 0.5s ease-in-out';
    }, 0);
  });
}




