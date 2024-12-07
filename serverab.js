// Function to edit and delete habits (Microservice B)
function fetchHabits() {
    fetch('http://localhost:3001/habits')
        .then(response => response.json())
        .then(habits => {
            const habitsList = document.getElementById("habitsList");
            habitsList.innerHTML = '';  

            habits.forEach(habit => {
                const habitItem = document.createElement("li");
                habitItem.classList.add("habit-item");

                const habitName = document.createElement("span");
                habitName.textContent = habit.name;

                const completeButton = document.createElement("button");
                completeButton.textContent = "Complete";
                completeButton.addEventListener("click", () => {
                    const note = prompt("Add a note about your completion (optional):");
                    logHabitCompletion(habit.id, true, note); 
                })

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => editHabit(habit.id));

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => deleteHabit(habit.id));

                habitItem.appendChild(habitName);
                habitItem.appendChild(completeButton);
                habitItem.appendChild(editButton);
                habitItem.appendChild(deleteButton);

                habitsList.appendChild(habitItem);
            });
        })
        .catch(error => console.error("Error fetching habits:", error));
}

// Edit habit function
function editHabit(habitId) {
    const newName = prompt("Enter new habit name:");
    if (newName) {
        fetch(`http://localhost:3001/habits/${habitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        })
        .then(response => response.json())
        .then(updatedHabit => {
            console.log('Updated habit:', updatedHabit);
            fetchHabits();  
        });
    }
}

// Delete habit function
function deleteHabit(habitId) {
    if (confirm("Are you sure you want to delete this habit?")) {
        fetch(`http://localhost:3001/habits/${habitId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchHabits(); 
        });
    }
}

// Load habits on page load
fetchHabits();

// Function to log habit completion (Microservice A)
function logHabitCompletion(habitId, completed) {
    const loggedAt = new Date().toISOString();

    fetch('http://localhost:2500/api/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habitId, note, loggedAt, completed })
    })
    .then(response => response.json())
    .then(log => {
        console.log('Logged habit completion:', log);
    })
    .catch(error => {
        console.error("Error logging habit:", error);
    });
}



