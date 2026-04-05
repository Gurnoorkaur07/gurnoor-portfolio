// Simple Booking JavaScript - Cuties Railways
// No JSON files - all data is hardcoded for simplicity

// Simple train data - hardcoded
const trains = [
    {
        number: "12014",
        name: "Amritsar Express",
        from: "Delhi",
        to: "Amritsar",
        time: "06:15 - 11:45",
        seats: 45
    },
    {
        number: "12345",
        name: "Chandigarh Mail",
        from: "Delhi",
        to: "Chandigarh",
        time: "07:30 - 12:15",
        seats: 32
    },
    {
        number: "12678",
        name: "Ludhiana Express",
        from: "Chandigarh",
        to: "Ludhiana",
        time: "09:00 - 11:30",
        seats: 28
    },
    {
        number: "13456",
        name: "Punjab Mail",
        from: "Delhi",
        to: "Rajpura",
        time: "14:20 - 18:45",
        seats: 50
    },
    {
        number: "14567",
        name: "Capital Express",
        from: "Amritsar",
        to: "Delhi",
        time: "16:30 - 22:00",
        seats: 38
    },
    {
        number: "15678",
        name: "City Link",
        from: "Rajpura",
        to: "Chandigarh",
        time: "10:15 - 11:45",
        seats: 25
    }
];

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as minimum date
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    
    // Add form submit event
    document.getElementById('booking-form').addEventListener('submit', searchTrains);
});

// Search for trains
function searchTrains(event) {
    event.preventDefault();
    
    // Get form values
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;
    
    // Check if stations are selected
    if (!from || !to) {
        alert('Please select both departure and destination stations!');
        return;
    }
    
    // Check if same station
    if (from === to) {
        alert('Departure and destination stations cannot be the same!');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Hide previous results
    hideResults();
    
    // Search after 1 second (fake loading)
    setTimeout(() => {
        performSearch(from, to, date, passengers);
    }, 1000);
}

// Perform the actual search
function performSearch(from, to, date, passengers) {
    // Filter trains based on from and to stations
    const foundTrains = trains.filter(train => 
        train.from === from && train.to === to
    );
    
    hideLoading();
    
    if (foundTrains.length > 0) {
        displayResults(foundTrains, date, passengers);
    } else {
        showNoResults();
    }
}

// Display search results
function displayResults(foundTrains, date, passengers) {
    const trainList = document.getElementById('train-list');
    trainList.innerHTML = '';
    
    foundTrains.forEach(train => {
        const trainDiv = document.createElement('div');
        trainDiv.className = 'train-info';
        trainDiv.innerHTML = `
            <h4>${train.number} - ${train.name}</h4>
            <p><strong>Route:</strong> ${train.from} → ${train.to}</p>
            <p><strong>Time:</strong> ${train.time}</p>
            <p><strong>Available Seats:</strong> ${train.seats}</p>
            <button class="btn" onclick="bookTrain('${train.number}', '${train.name}', '${train.from}', '${train.to}', '${train.time}', '${date}', '${passengers}')">
                Book Now
            </button>
        `;
        trainList.appendChild(trainDiv);
    });
    
    showResults();
}

// Book a train
function bookTrain(trainNumber, trainName, from, to, time, date, passengers) {
    // Simple booking - ask for passenger name
    const passengerName = prompt('Enter passenger name:');
    
    if (passengerName) {
        // Generate simple PNR
        const pnr = generatePNR();
        
        // Save booking to localStorage
        const booking = {
            pnr: pnr,
            trainNumber: trainNumber,
            trainName: trainName,
            from: from,
            to: to,
            time: time,
            date: date,
            passengers: passengers,
            passengerName: passengerName,
            status: 'Confirmed'
        };
        
        saveBooking(booking);
        
        // Show success message
        alert(`🎉 Booking Confirmed!\n\nPNR: ${pnr}\nTrain: ${trainName}\nPassenger: ${passengerName}\n\nRedirecting to PNR page...`);
        
        // Redirect to PNR page
        window.location.href = `pnr.html?pnr=${pnr}`;
    }
}

// Generate simple PNR number
function generatePNR() {
    return '24' + Math.random().toString().substr(2, 8);
}

// Save booking to localStorage
function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem('cutiesBookings') || '{}');
    bookings[booking.pnr] = booking;
    localStorage.setItem('cutiesBookings', JSON.stringify(bookings));
}

// Show/Hide functions
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showResults() {
    document.getElementById('results').classList.remove('hidden');
}

function hideResults() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('no-results').classList.add('hidden');
}

function showNoResults() {
    document.getElementById('no-results').classList.remove('hidden');
}
