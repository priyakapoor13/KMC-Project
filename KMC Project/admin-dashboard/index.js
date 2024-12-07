document.addEventListener('DOMContentLoaded', function () {
    const manageProductsLink = document.getElementById('manage-products-link');
    const productListSection = document.getElementById('product-list-section');
    const productTableBody = document.querySelector('#product-table tbody');

    // Modal and form references
    const editProductModal = document.getElementById('edit-product-modal');
    const closeModal = document.getElementById('close-modal');
    const editProductForm = document.getElementById('edit-product-form');
    
    // Handle navigation to 'Manage Products'
    manageProductsLink.addEventListener('click', function () {
        productListSection.style.display = 'block';
        fetchProducts();
    });

    // Fetch and display products from the product.json file
    function fetchProducts() {
        fetch('/landing-page/database/product.json')
            .then(response => response.json())
            .then(products => {
                productTableBody.innerHTML = ''; // Clear existing rows
                
                // Loop through each product (using Object.values to get an array of product objects)
                Object.values(products).forEach(product => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-product-id', product.id);  // Add unique id for identification
                    
                    // Create table cells for each product attribute
                    const nameCell = document.createElement('td');
                    nameCell.textContent = product.name;

                    const titleCell = document.createElement('td');
                    titleCell.textContent = product.title;

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = product.description;

                    const priceCell = document.createElement('td');
                    priceCell.textContent = `$${product.price.toFixed(2)}`;

                    const imageCell = document.createElement('td');
                    const image = document.createElement('img');
                    image.src = product.imageSource; // Use 'imageSource' from JSON
                    image.alt = product.name;
                    image.style.width = '50px';
                    image.style.height = '50px';
                    imageCell.appendChild(image);

                    const actionsCell = document.createElement('td');
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';

                    // Append buttons to actions cell
                    actionsCell.appendChild(editButton);
                    actionsCell.appendChild(deleteButton);

                    // Append all cells to the row
                    row.appendChild(nameCell);
                    row.appendChild(titleCell);
                    row.appendChild(descriptionCell);
                    row.appendChild(priceCell);
                    row.appendChild(imageCell);
                    row.appendChild(actionsCell);

                    // Add the row to the table body
                    productTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    // Delegate events for dynamically created buttons (Edit and Delete)
    productTableBody.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const row = event.target.closest('tr');
            const productId = row ? row.getAttribute('data-product-id') : null;

            if (!productId) return;

            if (event.target.textContent === 'Edit') {
                openEditModal(productId); // Open the modal and pass productId
            } else if (event.target.textContent === 'Delete') {
                deleteProduct(productId); // Call the delete function with productId
            }
        }
    });

    // Function to open the Edit Product modal
    function openEditModal(productId) {
        // Fetch product data by ID
        fetch('/landing-page/database/product.json')
            .then(response => response.json())
            .then(products => {
                const product = products[productId];
                if (product) {
                    // Populate modal fields with product data
                    document.getElementById('edit-product-name').value = product.name;
                    document.getElementById('edit-product-title').value = product.title;
                    document.getElementById('edit-product-description').value = product.description;
                    document.getElementById('edit-product-price').value = product.price;

                    // Open modal
                    editProductModal.style.display = 'block';

                    // Handle form submission
                    editProductForm.onsubmit = function (event) {
                        event.preventDefault();

                        // Get updated values from the form
                        const updatedName = document.getElementById('edit-product-name').value;
                        const updatedTitle = document.getElementById('edit-product-title').value;
                        const updatedDescription = document.getElementById('edit-product-description').value;
                        const updatedPrice = parseFloat(document.getElementById('edit-product-price').value);

                        if (updatedName && updatedTitle && updatedDescription && updatedPrice) {
                            // Update product (You can send the data to the server or update locally)
                            product.name = updatedName;
                            product.title = updatedTitle;
                            product.description = updatedDescription;
                            product.price = updatedPrice;

                            // Update the table row
                            const row = document.querySelector(`tr[data-product-id='${productId}']`);
                            row.querySelector('td:nth-child(1)').textContent = updatedName;
                            row.querySelector('td:nth-child(2)').textContent = updatedTitle;
                            row.querySelector('td:nth-child(3)').textContent = updatedDescription;
                            row.querySelector('td:nth-child(4)').textContent = `$${updatedPrice.toFixed(2)}`;

                            // Close the modal
                            editProductModal.style.display = 'none';
                        } else {
                            alert('Please fill in all fields.');
                        }
                    };
                }
            });
    }

    // Close modal when clicking the "X" button
    closeModal.addEventListener('click', function () {
        editProductModal.style.display = 'none';
    });

    // Function to delete a product
    function deleteProduct(productId) {
        const row = productTableBody.querySelector(`tr[data-product-id='${productId}']`);
        if (row) {
            row.remove(); // Remove the row from the table
        }
    }
});



