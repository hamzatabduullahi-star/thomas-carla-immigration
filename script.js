// ===== EMAILJS CONFIGURATION =====
// YOUR ACTUAL KEYS
const EMAILJS_PUBLIC_KEY = 'BaMHIw9kfA9clVk2L';
const EMAILJS_SERVICE_ID = 'service_n2vnl2h';
const EMAILJS_TEMPLATE_ID = 'template_wt6u974';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== SET MINIMUM DATE FOR DATE PICKER =====
document.addEventListener('DOMContentLoaded', function() {
    var dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        var today = new Date();
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var day = String(today.getDate()).padStart(2, '0');
        dateInput.min = year + '-' + month + '-' + day;
    }

    // ===== CHECK FOR SUCCESS MESSAGE =====
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
        const formWrapper = document.getElementById('formWrapper');
        if (formWrapper) formWrapper.style.display = 'none';
        
        var feeSection = document.querySelector('.consultation-fee');
        if (feeSection) feeSection.style.display = 'none';
        
        const successMsg = document.getElementById('successMsg');
        if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // ===== BOOKING FORM SUBMISSION =====
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload
            
            // Show loading message
            const submitBtn = document.getElementById('submitBtn');
            const loadingMsg = document.getElementById('loadingMsg');
            submitBtn.style.display = 'none';
            loadingMsg.style.display = 'block';
            
            // Collect form data
            const formData = {
                selected_date: document.querySelector('input[name="selected_date"]').value,
                selected_time: document.querySelector('select[name="selected_time"]').value,
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                address: document.querySelector('input[name="address"]').value,
                city: document.querySelector('input[name="city"]').value,
                zip: document.querySelector('input[name="zip"]').value,
                notes: document.querySelector('textarea[name="notes"]').value
            };
            
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Redirect to success page
                    window.location.href = 'booking.html?success=true';
                }, function(error) {
                    console.log('FAILED...', error);
                    // Show error message
                    document.getElementById('errorMsg').style.display = 'block';
                    loadingMsg.style.display = 'none';
                    submitBtn.style.display = 'block';
                });
        });
    }

    // ===== CONTACT FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.textContent = '⏳ Sending...';
            submitBtn.disabled = true;
            
            const formData = {
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
                subject: document.querySelector('input[name="subject"]').value,
                message: document.querySelector('textarea[name="message"]').value
            };
            
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(function(response) {
                    document.getElementById('contactSuccessMsg').style.display = 'block';
                    document.getElementById('contactForm').reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        document.getElementById('contactSuccessMsg').style.display = 'none';
                    }, 5000);
                }, function(error) {
                    document.getElementById('contactErrorMsg').style.display = 'block';
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        document.getElementById('contactErrorMsg').style.display = 'none';
                    }, 5000);
                });
        });
    }
});
