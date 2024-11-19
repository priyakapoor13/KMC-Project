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


// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const menubar = document.querySelector('.menubar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    menubar.classList.toggle('active');
});

// Change main product image on thumbnail click
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.src;
    });
});

// Function to handle color selection
function selectColor(color) {
    alert('Color selected: ' + color);
}


// document.getElementById('size-select').addEventListener('change', function() {
//     const selectedSize = this.value;
//     console.log('You have selected size: ' + selectedSize);
// });



   // Fetch products from JSON
   fetch("../landing-page/database/product.json")
   .then(response => response.json())
   .then(json => console.log(json));


 