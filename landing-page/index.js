// Search functionality
document.getElementById('search-button').addEventListener('click', function() {
  const searchBar = document.getElementById('search-bar');
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

// Cart functionality
let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

const updateCartBadge = () => {
  document.getElementById('cart-badge').innerText = cartCount;
};

updateCartBadge();

const addToCart = (productId) => {
  cartCount++;
  localStorage.setItem('cartCount', cartCount);
  updateCartBadge();
  showNotification(productId);
};

const showNotification = (productId) => {
  const notification = document.getElementById(productId);
  notification.innerText = 'Added to cart!';
  setTimeout(() => {
    notification.innerText = '';
  }, 2000);
};

// document.querySelectorAll('.add-to-cart-btn').forEach(button => {
//   button.addEventListener('click', function() {
//     const productId = this.getAttribute('data-product-id');
//     addToCart(productId);
//   });
// });

// Hamburger menu functionality
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};

mobileNav.addEventListener("click", () => toggleNav());

// Carousel functionality
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

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
