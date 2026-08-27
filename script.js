(function() {
    'use strict';

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ===== GET SERVICE FROM URL =====
    function getServiceFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('service');
    }

    // ===== SET SERVICE TYPE IN FORM =====
    const serviceTypeInput = document.getElementById('service-type');
    if (serviceTypeInput) {
        const service = getServiceFromURL();
        if (service) {
            serviceTypeInput.value = service;
        } else {
            serviceTypeInput.value = 'Immigration Consultation'; // Default
        }
    }

    // ===== EMAILJS BOOKING FORM =====
    const form = document.getElementById('booking-form');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        // ⚠️ REPLACE 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('YOUR_PUBLIC_KEY');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // ⚠️ REPLACE 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    messageDiv.style.display = 'block';
                    messageDiv.className = 'form-message success';
                    messageDiv.innerHTML = '✅ Your consultation request has been sent! We\'ll get back to you within 24 hours.';
                    form.reset();
                    // Reset service type to the one from URL
                    const service = getServiceFromURL();
                    if (serviceTypeInput) {
                        serviceTypeInput.value = service || 'Immigration Consultation';
                    }
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Book This Appointment';
                }, function(error) {
                    console.log('EmailJS Error:', error);
                    messageDiv.style.display = 'block';
                    messageDiv.className = 'form-message error';
                    messageDiv.innerHTML = '❌ Something went wrong! Please try again or contact us directly at thomaschaseimmigration9@gmail.com';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Book This Appointment';
                });
        });
    }

    console.log('🚀 Thomas Carla Immigration');
    console.log('✉️  thomaschaseimmigration9@gmail.com');

})();
// ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    const contactMessageDiv = document.getElementById('contact-form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('contact-submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // ⚠️ REPLACE with your EmailJS IDs
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    contactMessageDiv.style.display = 'block';
                    contactMessageDiv.className = 'form-message success';
                    contactMessageDiv.innerHTML = '✅ Your message has been sent! We\'ll get back to you within 24 hours.';
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }, function(error) {
                    console.log('Contact Form Error:', error);
                    contactMessageDiv.style.display = 'block';
                    contactMessageDiv.className = 'form-message error';
                    contactMessageDiv.innerHTML = '❌ Something went wrong! Please try again or contact us directly at thomaschaseimmigration9@gmail.com';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                });
        });
    }
