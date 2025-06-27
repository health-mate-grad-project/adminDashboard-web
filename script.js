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