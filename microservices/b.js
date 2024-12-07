const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3001;

app.use(cors());
app.use(express.json());

let habits = [
  { id: 1, name: 'Drink Water', frequency: 'daily', startDate: '2024-12-04', description: 'Stay hydrated' },
  { id: 2, name: 'Exercise', frequency: 'weekly', startDate: '2024-12-01', description: 'Work out every Monday, Wednesday, Friday' },
  { id: 3, name: 'Read a Book', frequency: 'daily', startDate: '2024-12-02', description: 'Read at least 30 minutes a day' }
];

app.get('/habits', (req, res) => {
  res.json(habits);
});

// PUT request to edit a habit
app.put('/habits/:id', (req, res) => {
  const habitId = parseInt(req.params.id);
  const { name, frequency, startDate, description } = req.body;

  const habit = habits.find(h => h.id === habitId);

  if (habit) {
    habit.name = name || habit.name;
    habit.frequency = frequency || habit.frequency;
    habit.startDate = startDate || habit.startDate;
    habit.description = description || habit.description;

    res.json({ message: 'Habit updated successfully', habit });
  } 
  else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

// DELETE request to remove a habit
app.delete('/habits/:id', (req, res) => {
  const habitId = parseInt(req.params.id);

  const habitIndex = habits.findIndex(h => h.id === habitId);

  if (habitIndex !== -1) {
    habits.splice(habitIndex, 1);  // Remove the habit from the array
    res.json({ message: 'Habit deleted successfully' });
  } 
  else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
