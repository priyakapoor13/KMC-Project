let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// Function to update the badge display
const updateCartBadge = () => {
  document.getElementById('cart-badge').innerText = cartCount;
};

// Call the function to set the initial value
updateCartBadge();

const addToCart = (productId) => {
  cartCount++;
  localStorage.setItem('cartCount', cartCount); // Save count to local storage
  updateCartBadge(); // Update the badge display
  showNotification(productId);
};

const showNotification = (productId) => {
  const notification = document.getElementById(productId);
  notification.innerText = 'Added to cart!';
  setTimeout(() => {
    notification.innerText = '';
  }, 2000);
};


// // Attach event listeners to all add-to-cart buttons
// document.querySelectorAll('.add-to-cart-btn').forEach(button => {
//   button.addEventListener('click', function() {
//     const productId = this.getAttribute('data-product-id');
//     addToCart(productId);
//   });
// });

const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());




export const getProductDetails = async (productId) => {
  try {
    const response = await fetch("./database/refactored_product.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allProducts = await response.json();
    return allProducts[productId];
  } catch (err) {
    console.error("Error fetching product details:", err);
    return null;
  }
};
