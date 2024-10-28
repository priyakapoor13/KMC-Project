//order section
async function displayOrders(status = '') {
    const response = await fetch(`/api/orders?status=${status}`);
    const orders = await response.json();
    const orderTableContainer = document.getElementById('orderTableContainer');
    let orderTableHTML = '<table><tr><th>Order ID</th><th>User</th><th>Amount</th><th>Status</th><th>Actions</th></tr>';

    orders.forEach(order => {
        orderTableHTML += `
            <tr>
                <td>${order._id}</td>
                <td>${order.user}</td>
                <td>${order.amount}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="updateOrderStatus('${order._id}', 'Shipped')">Ship</button>
                    <button onclick="updateOrderStatus('${order._id}', 'Delivered')">Deliver</button>
                </td>
            </tr>
        `;
    });

    orderTableHTML += '</table>';
    orderTableContainer.innerHTML = orderTableHTML;
}

// Update order status
async function updateOrderStatus(orderId, status) {
    await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    displayOrders();
}

// Initial load of orders
displayOrders();




//user section
let users = [];

// Open user form
function openUserForm(user = {}) {
    document.getElementById('userId').value = user._id || '';
    document.getElementById('userName').value = user.name || '';
    document.getElementById('userEmail').value = user.email || '';
    document.getElementById('userRole').value = user.role || 'Customer';
    document.getElementById('userFormModal').style.display = 'block';
}

// Close user form
function closeUserForm() {
    document.getElementById('userFormModal').style.display = 'none';
}

// Add or update user
document.getElementById('saveUserBtn').addEventListener('click', async () => {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const role = document.getElementById('userRole').value;

    const user = { name, email, role };

    if (id) {
        await updateUser(id, user);
    } else {
        await addUser(user);
    }

    closeUserForm();
    displayUsers();
});

// Display users
async function displayUsers() {
    const response = await fetch('/api/users');
    users = await response.json();
    const userTableContainer = document.getElementById('userTableContainer');
    let userTableHTML = '<table><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>';

    users.forEach(user => {
        userTableHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="openUserForm('${user._id}')">Edit</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    userTableHTML += '</table>';
    userTableContainer.innerHTML = userTableHTML;
}

// Add user
async function addUser(user) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    const newUser = await response.json();
    users.push(newUser);
}

// Update user
async function updateUser(id, user) {
    await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
}

// Delete user
async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    users = users.filter(user => user._id !== id);
    displayUsers();
}

displayUsers();


//analytical section

async function displayMonthlySalesChart() {
    const response = await fetch('/api/monthly-sales'); // Fetch monthly sales data
    const salesData = await response.json();

    const labels = salesData.map(data => data.month);
    const amounts = salesData.map(data => data.amount);

    const ctx = document.getElementById('monthlySalesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Sales',
                data: amounts,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
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

async function displayProductCategoriesChart() {
    const response = await fetch('/api/product-categories'); // Fetch product category data
    const categoriesData = await response.json();

    const labels = categoriesData.map(data => data.category);
    const quantities = categoriesData.map(data => data.quantity);

    const ctx = document.getElementById('productCategoriesChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Product Categories',
                data: quantities,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        }
    });
}

// Call the chart functions
displayMonthlySalesChart();
displayProductCategoriesChart();