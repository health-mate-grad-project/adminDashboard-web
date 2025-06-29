document.addEventListener('DOMContentLoaded', async function () {
    // Map page to API endpoint and container ID
    const logConfig = {
        'login-logs.html': {
            endpoint: 'http://localhost:5181/api/admin/user-logs-login',
            containerId: 'login-logs-list',
            title: 'Login Logs'
        },
        'booking-logs.html': {
            endpoint: 'http://localhost:5181/api/admin/user-logs-book',
            containerId: 'booking-logs-list',
            title: 'Booking Logs'
        },
        'rescheduling-logs.html': {
            endpoint: 'http://localhost:5181/api/admin/user-logs-reschedule',
            containerId: 'rescheduling-logs-list',
            title: 'Rescheduling Logs'
        },
        'cancel-logs.html': {
            endpoint: 'http://localhost:5181/api/admin/user-logs-cancel',
            containerId: 'cancel-logs-list',
            title: 'Cancel Logs'
        },
        'start-logs.html': {
            endpoint: 'http://localhost:5181/api/admin/user-logs-start',
            containerId: 'start-logs-list',
            title: 'Start Logs'
        },
        'reminders-logs.html': {
            endpoint: 'http://localhost:5181/api/admin/user-logs-reminder',
            containerId: 'reminders-logs-list',
            title: 'Reminders Logs'
        }
    };

    const page = window.location.pathname.split('/').pop();
    const config = logConfig[page];
    if (!config) return;
    const logsList = document.getElementById(config.containerId);
    const logsCount = document.getElementById('logs-count');
    if (!logsList) return;

    logsList.textContent = 'Loading...';
    try {
        const response = await fetch(config.endpoint);
        if (!response.ok) {
            logsList.textContent = 'Failed to load logs.';
            if (logsCount) logsCount.textContent = '';
            return;
        }
        const data = await response.json();
        const logs = data.logs || [];
        if (logsCount) logsCount.textContent = logs.length > 0 ? `${logs.length} log${logs.length > 1 ? 's' : ''}` : '';
        if (logs.length === 0) {
            logsList.textContent = 'No logs found.';
            return;
        }
        logsList.innerHTML = logs.map(log => `
            <div class="log-entry">
                <div><strong>Action:</strong> ${log.action || '-'}</div>
                <div><strong>User ID:</strong> ${log.userId || '-'}</div>
                <div><strong>Time:</strong> ${(log.timestamp || '').replace('T', ' ').slice(0, 19)}</div>
                <div><strong>Details:</strong> ${log.details || '-'}</div>
            </div>
        `).join('');
    } catch (err) {
        logsList.textContent = 'Error connecting to server.';
        if (logsCount) logsCount.textContent = '';
    }
}); 