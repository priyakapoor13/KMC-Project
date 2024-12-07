const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());




export const getProductDetails = async (productId) => {
  try {
    const response = await fetch("./database/product.json");
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

