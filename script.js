// ===== FULLCALENDAR SETUP =====
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    // Check if calendar element exists
    if (!calendarEl) return;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Theme and appearance
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        
        // Available hours (9:00 AM - 6:00 PM)
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
            startTime: '09:00',
            endTime: '18:00'
        },
        
        // Only allow clicking on available slots
        selectable: true,
        selectMirror: true,
        selectConstraint: 'businessHours',
        
        // Slot duration (60 minutes)
        slotDuration: '01:00:00',
        slotMinTime: '09:00:00',
        slotMaxTime: '18:00:00',
        allDaySlot: false,
        
        // When user selects a date/time - UPDATE THE FORM
        select: function(info) {
            // Get the selected date and time
            var selectedDate = info.start.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            var selectedTime = info.start.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Store in hidden fields
            document.getElementById('selectedDate').value = selectedDate;
            document.getElementById('selectedTime').value = selectedTime;
            
            // UPDATE the form with selected date/time
            document.getElementById('selectedDateTime').innerHTML = 
                '📌 Selected: <strong style="color:#facc15;">' + selectedDate + ' at ' + selectedTime + '</strong>';
            
            // Highlight the form to show it's ready
            document.getElementById('selectedDateTime').style.background = 'rgba(250, 204, 21, 0.1)';
            document.getElementById('selectedDateTime').style.border = '1px solid #facc15';
            
            // Scroll to form on mobile
            if (window.innerWidth < 768) {
                document.getElementById('selectedDateTime').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        
        // Click on date to show available times
        dateClick: function(info) {
            // Switch to week view to show time slots
            calendar.changeView('timeGridWeek');
            calendar.gotoDate(info.date);
        },
        
        // Button text
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week'
        },
        
        // Disable past dates
        validRange: {
            start: new Date()
        }
    });

    calendar.render();

    // ===== SHOW SUCCESS MESSAGE =====
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
        const successMsg = document.getElementById('successMsg');
        const form = document.getElementById('bookingForm');
        const calendarWrapper = document.querySelector('.booking-calendar');
        const formWrapper = document.querySelector('.booking-form');

        if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.scrollIntoView({ behavior: 'smooth' });
        }
        if (form) {
            form.style.display = 'none';
        }
        if (calendarWrapper) {
            calendarWrapper.style.display = 'none';
        }
        if (formWrapper) {
            formWrapper.style.display = 'none';
        }
        // Hide the fee section too
        var feeSection = document.querySelector('.consultation-fee');
        if (feeSection) {
            feeSection.style.display = 'none';
        }
    }
});
