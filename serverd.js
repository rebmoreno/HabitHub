document.addEventListener('DOMContentLoaded', () => {
    
    const randomQuoteButton = document.getElementById('randomQuote');
    randomQuoteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3003/quote');
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const quote = await response.json();
            document.getElementById('quote').textContent = quote.text;
        } catch (error) {
            console.error('Error fetching random quote:', error);
            document.getElementById('quote').textContent = 'Could not fetch a quote.';
        }
    });

    const fitnessQuoteButton = document.getElementById('fitnessQuote');
    fitnessQuoteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3003/quote?category=fitness');
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const quote = await response.json();
            document.getElementById('quote').textContent = quote.text;
        } catch (error) {
            console.error('Error fetching fitness quote:', error);
            document.getElementById('quote').textContent = 'Could not fetch a quote.';
        }
    });

   const streakCalculatorBtn = document.getElementById('streakCalculatorBtn'); 
   const streakCalculatorSection = document.getElementById('streak-calculator');
   const overlay = document.getElementById('overlay');
   
   if (streakCalculatorBtn && streakCalculatorSection) {
       streakCalculatorBtn.addEventListener('click', (e) => {
           e.preventDefault(); 
           streakCalculatorSection.classList.toggle('hidden');
           overlay.style.display = "block";
       });
   } 
   else {
       console.error('Streak calculator button or section not found!');
   }

   const calculateStreakButton = document.getElementById('calculateStreak');
   
   if (calculateStreakButton) {
       calculateStreakButton.addEventListener('click', async () => {
           const datesInput = document.getElementById('datesInput').value;
           if (!datesInput) {
               document.getElementById('streakResult').textContent = 'Please enter some dates.';
               return;
           }

           const dates = datesInput.split(',').map(date => date.trim());

           const validDates = dates.every(date => !isNaN(new Date(date).getTime()));
           if (!validDates) {
               document.getElementById('streakResult').textContent = 'Invalid date format. Please enter valid dates.';
               return;
           }

           // Calculate the streak
           const response = await fetch('http://localhost:3003/streak', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ dates })
           });

           const result = await response.json();
           const longestStreak = result.longestStreak;

           if (longestStreak !== undefined) {
               document.getElementById('streakResult').textContent = `Longest Streak: ${longestStreak} days`;

               setTimeout(() => {
                    streakCalculatorSection.classList.add('hidden');
                    overlay.style.display = "none";
                }, 2000); // 2 seconds delay
           } 
           else {
               document.getElementById('streakResult').textContent = 'Error: ' + (result.error || 'Unknown error');
           }
       });
   } 
   else {
       console.error('Calculate Streak button not found!');
   }

});




