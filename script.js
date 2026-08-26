// ===== SET MINIMUM DATE FOR DATE PICKER =====
document.addEventListener('DOMContentLoaded', function() {
    var dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        // Set minimum date to today
        var today = new Date();
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var day = String(today.getDate()).padStart(2, '0');
        dateInput.min = year + '-' + month + '-' + day;
    }

    // ===== CHECK FOR SUCCESS MESSAGE =====
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
        // Hide the form
        const formWrapper = document.getElementById('formWrapper');
        if (formWrapper) {
            formWrapper.style.display = 'none';
        }
        
        // Hide the fee section
        var feeSection = document.querySelector('.consultation-fee');
        if (feeSection) {
            feeSection.style.display = 'none';
        }
        
        // Show success message
        const successMsg = document.getElementById('successMsg');
        if (successMsg) {
            successMsg.style.display = 'block';
            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
