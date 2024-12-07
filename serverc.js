document.addEventListener('DOMContentLoaded', () => {
    const reminderBtn = document.getElementById('reminderBtn');
    const reminderForm = document.getElementById('reminderForm');
    const overlay = document.getElementById('overlay');

    reminderBtn.addEventListener('click', () => {
        console.log('Reminder button clicked');
        reminderForm.style.display = 'block';
        overlay.style.display = "block";
    });

    // Handle form submission to create a reminder
    reminderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const habitName = document.getElementById('habitName').value;
        const reminderTime = document.getElementById('reminderTime').value;

        try {
            const response = await fetch('http://localhost:3002/reminders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ habitName, reminderTime }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                reminderForm.style.display = 'none';
                overlay.style.display = 'none';
            } 
            else {
                alert('Error: ' + data.message);
            }
        } 
        catch (error) {
            console.error('Error setting reminder:', error);
        }
    });


    const logoutBtn = document.getElementById('logoutButton');
    
    // Handle logout (POST request)
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3002/logout', {
                method: 'POST',
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                
                localStorage.clear(); 
                sessionStorage.clear(); 
    
                window.location.replace('index.html'); 
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    });
});


