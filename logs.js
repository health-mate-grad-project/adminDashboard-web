document.addEventListener('DOMContentLoaded', async function () {
    const logsList = document.getElementById('login-logs-list');
    if (!logsList) return;

    logsList.textContent = 'Loading...';
    try {
        const response = await fetch('http://localhost:5181/api/admin/user-logs-login');
        if (!response.ok) {
            logsList.textContent = 'Failed to load logs.';
            return;
        }
        const data = await response.json();
        const logs = data.logs || [];
        if (logs.length === 0) {
            logsList.textContent = 'No login logs found.';
            return;
        }
        logsList.innerHTML = logs.map(log => `
            <div class="log-entry">
                <div><strong>Action:</strong> ${log.action}</div>
                <div><strong>User ID:</strong> ${log.userId}</div>
                <div><strong>Time:</strong> ${log.timestamp.replace('T', ' ').slice(0, 19)}</div>
                <div><strong>Details:</strong> ${log.details}</div>
            </div>
        `).join('');
    } catch (err) {
        logsList.textContent = 'Error connecting to server.';
    }
}); 