// Simple PNR JavaScript - Cuties Railways
// Check PNR status from localStorage

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if PNR is in URL
    const urlParams = new URLSearchParams(window.location.search);
    const pnrFromUrl = urlParams.get('pnr');
    
    if (pnrFromUrl) {
        document.getElementById('pnr').value = pnrFromUrl;
        // Auto-search if PNR is in URL
        setTimeout(() => {
            searchPNR(pnrFromUrl);
        }, 500);
    }
    
    // Add form submit event
    document.getElementById('pnr-form').addEventListener('submit', handlePNRSubmit);
    
    // Only allow numbers in PNR input
    document.getElementById('pnr').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});

// Handle form submission
function handlePNRSubmit(event) {
    event.preventDefault();
    
    const pnr = document.getElementById('pnr').value.trim();
    
    // Validate PNR
    if (!pnr || pnr.length !== 10) {
        alert('Please enter a valid 10-digit PNR number!');
        return;
    }
    
    searchPNR(pnr);
}

// Search for PNR
function searchPNR(pnr) {
    showLoading();
    hideResults();
    
    // Search after 1 second (fake loading)
    setTimeout(() => {
        performPNRSearch(pnr);
    }, 1000);
}

// Perform the actual PNR search
function performPNRSearch(pnr) {
    try {
        const bookings = JSON.parse(localStorage.getItem('cutiesBookings') || '{}');
        const booking = bookings[pnr];
        
        hideLoading();
        
        if (booking) {
            displayBookingDetails(booking);
        } else {
            showNotFound();
        }
    } catch (error) {
        console.error('Error searching PNR:', error);
        hideLoading();
        showNotFound();
    }
}

// Display booking details
function displayBookingDetails(booking) {
    const bookingInfo = document.getElementById('booking-info');
    
    bookingInfo.innerHTML = `
        <div class="detail-row">
            <strong>PNR:</strong> <span>${booking.pnr}</span>
        </div>
        <div class="detail-row">
            <strong>Train:</strong> <span>${booking.trainNumber} - ${booking.trainName}</span>
        </div>
        <div class="detail-row">
            <strong>Route:</strong> <span>${booking.from} → ${booking.to}</span>
        </div>
        <div class="detail-row">
            <strong>Time:</strong> <span>${booking.time}</span>
        </div>
        <div class="detail-row">
            <strong>Date:</strong> <span>${booking.date}</span>
        </div>
        <div class="detail-row">
            <strong>Passenger:</strong> <span>${booking.passengerName}</span>
        </div>
        <div class="detail-row">
            <strong>Passengers:</strong> <span>${booking.passengers}</span>
        </div>
        <div class="detail-row">
            <strong>Status:</strong> <span style="color: green;">✅ ${booking.status}</span>
        </div>
    `;
    
    showPNRResult();
}

// Show/Hide functions
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showPNRResult() {
    document.getElementById('pnr-result').classList.remove('hidden');
}

function showNotFound() {
    document.getElementById('not-found').classList.remove('hidden');
}

function hideResults() {
    document.getElementById('pnr-result').classList.add('hidden');
    document.getElementById('not-found').classList.add('hidden');
}
