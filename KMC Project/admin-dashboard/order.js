// Function to fetch orders from product.json
function fetchOrders() {
    fetch('order.json')
        .then(response => response.json())
        .then(orders => {
            const orderTable = document.getElementById('order-table').getElementsByTagName('tbody')[0];
            orderTable.innerHTML = ''; // Clear existing rows

            orders.forEach(order => {
                const row = orderTable.insertRow();
                row.innerHTML = `
                    <td>${order.orderId}</td>
                    <td>${order.customerName}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                        <span class="status ${order.status}">${order.status}</span>
                        <button class="update-status-btn" onclick="updateOrderStatus('${order.orderId}')">Update Status</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
}

// Function to update order status
function updateOrderStatus(orderId) {
    fetch('order.json')
        .then(response => response.json())
        .then(orders => {
            const order = orders.find(o => o.orderId === orderId);
            if (order) {
                // Toggle status between 'pending' and 'completed'
                order.status = order.status === 'pending' ? 'completed' : 'pending';
                // Save the updated order list back to the file or local storage
                saveOrders(orders);
                fetchOrders(); // Re-fetch orders to reflect status change
            }
        })
        .catch(error => console.error('Error updating order status:', error));
}

// Function to save updated orders back to product.json (or localStorage)
function saveOrders(orders) {
    // In a real-world scenario, you'd send this updated data to your server to save in a database.
    // For now, we'll store it in localStorage as a simulation.
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Toggle between sections
const viewOrdersLink = document.getElementById('view-orders-link');
const addProductSection = document.getElementById('add-product-section');
const productListSection = document.getElementById('product-list-section');
const orderListSection = document.getElementById('order-list-section');

viewOrdersLink.addEventListener('click', () => {
    addProductSection.style.display = 'none';
    productListSection.style.display = 'none';
    orderListSection.style.display = 'block'; // Show order section
    fetchOrders(); // Fetch and display orders
});

// Default page is Dashboard Overview
document.getElementById('dashboard-link').addEventListener('click', () => {
    addProductSection.style.display = 'none';
    productListSection.style.display = 'none';
    orderListSection.style.display = 'none'; // Hide order section
});

// Call fetchOrders when the page loads to ensure orders are displayed
document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});
