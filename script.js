console.log('Admin Dashboard loaded');

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('http://localhost:5181/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // Redirect to dashboard.html on successful login
                window.location.href = 'dashboard.html';
            } else {
                const error = await response.json();
                alert('Login failed: ' + (error.message || 'Invalid credentials'));
            }
        } catch (err) {
            alert('Error connecting to server.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Only run on users.html
  if (window.location.pathname.endsWith('users.html')) {
    const usersList = document.getElementById('usersList');
    const usersTableBody = document.getElementById('usersTable').querySelector('tbody');
    usersList.style.display = 'block';
    usersTableBody.innerHTML = '<tr><td colspan="5">Loading users...</td></tr>';
    fetch('http://localhost:5181/api/admin/users')
      .then(response => response.json())
      .then(users => {
        usersTableBody.innerHTML = '';
        if (!users.length) {
          usersTableBody.innerHTML = '<tr><td colspan="5">No users found.</td></tr>';
          return;
        }
        users.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.type}</td>
            <td>
              ${user.profileImageUrl ? `<img src="${user.profileImageUrl}" alt="Profile" width="50"/>` : 'N/A'}
            </td>
          `;
          usersTableBody.appendChild(row);
        });
      })
      .catch(error => {
        usersTableBody.innerHTML = '<tr><td colspan="5">Failed to load users.</td></tr>';
        console.error('Error fetching users:', error);
      });
  }
}); 