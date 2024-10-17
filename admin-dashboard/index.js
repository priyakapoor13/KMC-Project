document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadOrders();
    loadUsers();
    loadAnalytics();
    showSection('dashboard');
  });
  
  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
  }
  
  function loadProducts() {
    fetch('/api/products', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(products => {
      const tbody = document.querySelector('#productTable tbody');
      tbody.innerHTML = '';
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.category}</td>
          <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
  }
  
  function openProductForm() {
    document.getElementById('productModal').style.display = 'block';
    document.getElementById('productId').value = '';
    document.getElementById('productForm').reset();
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  function saveProduct(event) {
    event.preventDefault();
    const product = {
      id: document.getElementById('productId').value,
      name: document.getElementById('productName').value,
      price: document.getElementById('productPrice').value,
      description: document.getElementById('productDescription').value,
      image: document.getElementById('productImage').value,
      category: document.getElementById('productCategory').value
    };
  
    const method = product.id ? 'PUT' : 'POST';
    const endpoint = product.id ? `/api/products/${product.id}` : '/api/products';
  
    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(product)
    })
    .then(() => {
      loadProducts();
      closeModal('productModal');
    });
  }
  
  function editProduct(productId) {
    fetch(`/api/products/${productId}`, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(product => {
      document.getElementById('productId').value = product.id;
      document.getElementById('productName').value = product.name;
      document.getElementById('productPrice').value = product.price;
      document.getElementById('productDescription').value = product.description;
      document.getElementById('productImage').value = product.image;
      document.getElementById('productCategory').value = product.category;
      document.getElementById('productModal').style.display = 'block';
    });
  }
  
  function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(() => {
      loadProducts();
    });
  }
  
  function loadOrders() {
    fetch('/api/orders', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(orders => {
      const tbody = document.querySelector('#orderTable tbody');
      tbody.innerHTML = '';
      orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.total}</td>
          <td>${order.status}</td>
          <td>
            <button onclick="editOrder(${order.id})">Edit</button>
            <button onclick="deleteOrder(${order.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
  }
  
  function loadUsers() {
    fetch('/api/users', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(users => {
      const tbody = document.querySelector('#userTable tbody');
      tbody.innerHTML = '';
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
  }
  
  function searchProducts() {
    const input = document.getElementById('productSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      const name = cells[1].textContent.toLowerCase();
      const category = cells[3].textContent.toLowerCase();
      if (name.includes(input) || category.includes(input)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  function searchOrders() {
    const input = document.getElementById('orderSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#orderTable tbody tr');
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      const customer = cells[1].textContent.toLowerCase();
      const status = cells[3].textContent.toLowerCase();
      if (customer.includes(input) || status.includes(input)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  function searchUsers() {
    const input = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      const name = cells[1].textContent.toLowerCase();
      const email = cells[2].textContent.toLowerCase();
      if (name.includes(input) || email.includes(input)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  function loadAnalytics() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
  
  
  // script.js
  
  document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadOrders();
    loadUsers();
    loadAnalytics();
    showSection('dashboard');
  });
  
  // Function to fetch products from the backend
  function loadProducts() {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(products => {
        const tbody = document.querySelector('#productTable tbody');
        tbody.innerHTML = '';
        products.forEach(product => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
              <button onclick="editProduct(${product.id})">Edit</button>
              <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      });
  }
  
  // Function to add a new product
  function addProduct() {
    const formData = new FormData(document.getElementById('productForm'));
    const product = {};
    formData.forEach((value, key) => {
      product[key] = value;
    });
  
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(response => response.json())
    .then(newProduct => {
      loadProducts();
      closeModal();
    });
  }
  
  // Function to delete a product
  function deleteProduct(productId) {
    fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        loadProducts();
      }
    });
  }
  
  // Other functions for orders, users, and analytics...
    