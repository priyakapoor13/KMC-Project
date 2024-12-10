document.addEventListener('DOMContentLoaded', () => {
    // Load products from local storage or JSON file
    loadProductsFromLocalStorage();

    // Handle form submission
    document.getElementById('add-product-form').addEventListener('submit', handleFormSubmit);
});

function loadProductsFromLocalStorage() {
    let products = JSON.parse(localStorage.getItem('products')) || {};
    if (Object.keys(products).length === 0) {
        // Fetch the JSON file and store it in local storage if empty
        fetch('/landing-page/database/product.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('products', JSON.stringify(data));
                products = data;
                displayProducts(products);
            });
    } else {
        displayProducts(products);
    }
}

function displayProducts(products) {
    for (let id in products) {
        if (products.hasOwnProperty(id)) {
            const product = products[id];
            addProductToTable(product.name, product.description, product.price, product.imageSource, id);
        }
    }
}

function addProductToLocalStorage(name, description, price, imageSource) {
    const products = JSON.parse(localStorage.getItem('products')) || {};
    const id = new Date().getTime().toString(); // Generate a unique ID based on timestamp
    products[id] = { name, description, price, imageSource };
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to add a new product to the table
function addProductToTable(name, description, price, imageSource, id = new Date().getTime().toString()) {
    const tableBody = document.querySelector('#product-table tbody');

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', id);
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${description}</td>
        <td>₹${parseFloat(price).toFixed(2)}</td>
        <td><img src="${imageSource}" alt="${name}" style="width: 50px; height: 50px;"></td>
        <td>
            <button onclick="editProduct(this)">Edit</button>
            <button onclick="confirmDeleteProduct(this)">Delete</button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// Function to edit a product
function editProduct(button) {
    const row = button.parentElement.parentElement;
    const id = row.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('products')) || {};

    const product = products[id];

    // Pre-fill the form with the current product details
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;

    // Handle updating the product
    document.getElementById('add-product-form').onsubmit = function(event) {
        event.preventDefault();

        const updatedName = document.getElementById('product-name').value;
        const updatedDescription = document.getElementById('product-description').value;
        const updatedPrice = document.getElementById('product-price').value;
        const productImageInput = document.getElementById('product-image');
        const productImageFile = productImageInput.files[0];

        if (productImageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const updatedImageSource = e.target.result;
                products[id] = {
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice,
                    imageSource: updatedImageSource
                };
                localStorage.setItem('products', JSON.stringify(products));
                row.cells[0].innerText = updatedName;
                row.cells[1].innerText = updatedDescription;
                row.cells[2].innerText = `₹${parseFloat(updatedPrice).toFixed(2)}`;
                row.cells[3].querySelector('img').src = updatedImageSource;
            };
            reader.readAsDataURL(productImageFile);
        } else {
            products[id] = {
                name: updatedName,
                description: updatedDescription,
                price: updatedPrice,
                imageSource: product.imageSource // Keep existing image if not updated
            };
            localStorage.setItem('products', JSON.stringify(products));
            row.cells[0].innerText = updatedName;
            row.cells[1].innerText = updatedDescription;
            row.cells[2].innerText = `₹${parseFloat(updatedPrice).toFixed(2)}`;
        }

        // Reset form submission handling
        document.getElementById('add-product-form').onsubmit = handleFormSubmit;
        document.getElementById('add-product-form').reset();
    };
}

function handleFormSubmit(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productPrice = document.getElementById('product-price').value;
    const productImageInput = document.getElementById('product-image');
    const productImageFile = productImageInput.files[0];

    if (productImageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const productImageSource = e.target.result;
            addProductToLocalStorage(productName, productDescription, productPrice, productImageSource);
            addProductToTable(productName, productDescription, productPrice, productImageSource);
        };
        reader.readAsDataURL(productImageFile);
    }

    // Clear the form inputs
    this.reset();
}

// Show a notification before deleting a product
function confirmDeleteProduct(button) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(button);
    }
}

// Function to delete a product
function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    const id = row.getAttribute('data-id');
    row.remove();
    deleteProductFromLocalStorage(id);
}

function deleteProductFromLocalStorage(id) {
    let products = JSON.parse(localStorage.getItem('products')) || {};
    if (products.hasOwnProperty(id)) {
        delete products[id];
    }
    localStorage.setItem('products', JSON.stringify(products));
}

// Handle navigation
document.getElementById('dashboard-link').addEventListener('click', function() {
    document.getElementById('main-content').querySelector('h1').innerText = 'Dashboard Overview';
    document.getElementById('add-product-section').style.display = 'block';
    document.getElementById('product-list-section').style.display = 'block';
    document.getElementById('order-list-section').style.display = 'none';
});

document.getElementById('manage-products-link').addEventListener('click', function() {
    document.getElementById('main-content').querySelector('h1').innerText = 'Manage Products';
    document.getElementById('add-product-section').style.display = 'block';
    document.getElementById('product-list-section').style.display = 'block';
    document.getElementById('order-list-section').style.display = 'none';
});

document.getElementById('view-orders-link').addEventListener('click', function() {
    document.getElementById('main-content').querySelector('h1').innerText = 'View Orders';
    document.getElementById('add-product-section').style.display = 'none';
    document.getElementById('product-list-section').style.display = 'none';
    document.getElementById('order-list-section').style.display = 'block';
});

document.getElementById('logout-button').addEventListener('click', function() {
    alert('Logging out...');
    // Perform logout operations
});
