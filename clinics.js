document.addEventListener('DOMContentLoaded', async function () {
    const clinicsList = document.getElementById('clinics-list');

    // Fetch all clinics
    async function fetchClinics() {
        const response = await fetch('http://localhost:5181/api/admin/clinics');
        if (!response.ok) {
            clinicsList.innerHTML = '<p>Failed to load clinics.</p>';
            return;
        }
        const clinics = await response.json();
        clinicsList.innerHTML = '';
        clinics.forEach(clinic => {
            const card = document.createElement('div');
            card.className = 'clinic-card';
            card.innerHTML = `
                <div class="clinic-title">${clinic.name}</div>
                <input class="clinic-location-input" type="text" placeholder="Enter location" value="${clinic.location || ''}" />
                <button class="update-location-btn">Update Location</button>
                <div class="location-message" style="color: #43cea2; font-size: 0.95rem; margin-top: 0.3rem;"></div>
            `;
            const input = card.querySelector('.clinic-location-input');
            const button = card.querySelector('.update-location-btn');
            const message = card.querySelector('.location-message');
            button.addEventListener('click', async () => {
                const newLocation = input.value.trim();
                if (!newLocation) {
                    message.textContent = 'Location cannot be empty!';
                    message.style.color = 'red';
                    return;
                }
                button.disabled = true;
                message.textContent = 'Updating...';
                message.style.color = '#185a9d';
                try {
                    const res = await fetch(`http://localhost:5181/api/admin/clinic/${clinic.id}/location`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ Location: newLocation })
                    });
                    if (res.ok) {
                        message.textContent = 'Location updated!';
                        message.style.color = '#43cea2';
                    } else {
                        message.textContent = 'Failed to update location.';
                        message.style.color = 'red';
                    }
                } catch (err) {
                    message.textContent = 'Error connecting to server.';
                    message.style.color = 'red';
                }
                button.disabled = false;
            });
            clinicsList.appendChild(card);
        });
    }

    fetchClinics();
}); 