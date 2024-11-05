document.addEventListener("DOMContentLoaded", () => {
    // Navigation back to index page for Cancel buttons
    document.querySelectorAll(".cancelbtn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "index.html";
        });
    });

    // Redirect to home page on Login or Sign Up submission
    const loginForm = document.querySelector("form[action='login.php']");
    const signUpForm = document.querySelector("form[action='submit_form.php']");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            window.location.href = "home.html";
        });
    }

    if (signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
            event.preventDefault();
            window.location.href = "home.html";
        });
    }

    // Home Help Popup
    const helpPopup = document.getElementById("helpPopup");
    const helpBtn = document.getElementById("helpBtn");
    const skipBtn = document.getElementById("skipBtn");
    const startBtn = document.getElementById("startBtn");
    const tutorialSection = document.getElementById("tutorialSection");
    const closeBtn = document.getElementById("closeBtn");

    // Check if the elements exist before adding event listeners
    if (helpBtn && helpPopup) {
        // Show the help popup when the help button is clicked
        helpBtn.addEventListener("click", () => {
            console.log("Help button clicked");
            helpPopup.style.display = "flex";
        });

        // Close the popup and skip tutorial when the skip button is clicked
        skipBtn.addEventListener("click", () => {
            helpPopup.style.display = "none"; // Hide the help popup
        });

        // Close the popup and show tutorial when the start button is clicked
        startBtn.addEventListener("click", () => {
            helpPopup.style.display = "none"; // Hide the help popup
            tutorialSection.style.display = "flex"; // Show the tutorial section
        });
    }

    if (closeBtn && tutorialSection) {
        closeBtn.addEventListener("click", () => {
            tutorialSection.style.display = "none"; // Hide the tutorial section
        });
    }

    // Plus button on Home page to go to Create Habit page
    const plusButton = document.getElementById("plusButton");
    if (plusButton) {
        plusButton.addEventListener("click", () => {
            window.location.href = "create.html";
        });
    }

    // Create Habit Form on `create.html`
    const createHabitForm = document.getElementById("createHabitForm");
    const backBtn = document.getElementById("backBtn");
    const undoBtn = document.getElementById("undoBtn");
    const saveBtn = document.getElementById("saveBtn");
    const confirmationModal = document.getElementById("confirmationModal");
    const cancelBackBtn = document.getElementById("cancelBackBtn");
    const confirmBackBtn = document.getElementById("confirmBackBtn");

    // Back button with confirmation modal
    if (backBtn && confirmationModal) {
        backBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (createHabitForm && hasUnsavedChanges(createHabitForm)) {
                confirmationModal.style.display = "flex";
            }
            else {
                window.location.href = "home.html";
            }
        });

        // Cancel going back
        if (cancelBackBtn) {
            cancelBackBtn.addEventListener("click", () => {
            confirmationModal.style.display = "none";
            });
        }

        // Confirm going back
        if (confirmBackBtn) {
            confirmBackBtn.addEventListener("click", () => {
                window.location.href = "home.html";
            });
        }
    }

    // Undo button to clear form inputs
    if (undoBtn && createHabitForm) {
        undoBtn.addEventListener("click", (event) => {
            event.preventDefault();
            createHabitForm.reset();
        });
    }

    // Save button functionality
    if (saveBtn && createHabitForm) {
        saveBtn.addEventListener("click", (event) => {
            event.preventDefault();
            saveHabit(createHabitForm);
            window.location.href = "home.html";  // Redirect back to home page after saving
        });
    }

    // Helper function to check if form has unsaved changes
    function hasUnsavedChanges(form) {
        const inputs = form.querySelectorAll("input, textarea, select");
        return Array.from(inputs).some(input => input.value.trim() !== "");
    }    

    // Helper function to save habit data (stored in localStorage)
    function saveHabit(form) {
        const habit = {
            name: form.habitName.value,
            frequency: form.habitFrequency.value,
            startDate: form.startDate.value,
            description: form.habitDescription.value
        };
        const habits = JSON.parse(localStorage.getItem("habits") || "[]");
        habits.push(habit);
        localStorage.setItem("habits", JSON.stringify(habits));
    }
 });


         
