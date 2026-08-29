// ===== EMAILJS CONFIGURATION =====
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

    // ===== AUTO-FILL SERVICE FROM URL =====
    const urlParams = new URLSearchParams(window.location.search);
    const serviceFromUrl = urlParams.get('service');
    const serviceInput = document.getElementById('serviceType');
    
    if (serviceFromUrl && serviceInput) {
        const decodedService = decodeURIComponent(serviceFromUrl);
        serviceInput.value = decodedService;
    } else if (serviceInput) {
        serviceInput.value = 'Not selected';
        serviceInput.style.color = '#94a3b8';
    }

    // ===== CHECK FOR SUCCESS MESSAGE =====
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
            event.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const loadingMsg = document.getElementById('loadingMsg');
            const errorMsg = document.getElementById('errorMsg');
            
            submitBtn.style.display = 'none';
            loadingMsg.style.display = 'block';
            errorMsg.style.display = 'none';
            
            // Get selected payment method
            const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
            const paymentMethod = selectedPayment ? selectedPayment.value : 'Not selected';
            
            // Collect form data
            const formData = {
                service_type: document.getElementById('serviceType').value,
                selected_date: document.querySelector('input[name="selected_date"]').value,
                selected_time: document.querySelector('select[name="selected_time"]').value,
                payment_method: paymentMethod,
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                address: document.querySelector('input[name="address"]').value,
                city: document.querySelector('input[name="city"]').value,
                zip: document.querySelector('input[name="zip"]').value,
                notes: document.querySelector('textarea[name="notes"]').value
            };

            console.log('Sending:', formData);
            
            // Send email
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status);
                    window.location.href = 'booking.html?success=true';
                })
                .catch(function(error) {
                    console.log('FAILED:', error);
                    errorMsg.style.display = 'block';
                    loadingMsg.style.display = 'none';
                    submitBtn.style.display = 'block';
                });
        });
    }
});
