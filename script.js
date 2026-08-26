// ================================================================
// THOMAS CARLA IMMIGRATION
// EMAILJS + BOOKING SYSTEM
// ================================================================


// ================================================================
// EMAILJS CONFIGURATION
// ================================================================

const EMAILJS_PUBLIC_KEY = 'BaMHIw9kfA9clVk2L';
const EMAILJS_SERVICE_ID = 'service_n2vnl2h';
const EMAILJS_TEMPLATE_ID = 'template_0qa04br';


// ================================================================
// INITIALIZE EMAILJS
// ================================================================

emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});


// ================================================================
// PAGE LOAD
// ================================================================

document.addEventListener('DOMContentLoaded', function () {


    // ============================================================
    // SET MINIMUM BOOKING DATE
    // ============================================================

    const dateInput = document.getElementById('bookingDate');

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        dateInput.min = `${year}-${month}-${day}`;
    }


    // ============================================================
    // AUTO-FILL SERVICE TYPE FROM URL
    // ============================================================

    const urlParams = new URLSearchParams(window.location.search);

    const serviceFromUrl = urlParams.get('service');

    const serviceInput = document.getElementById('serviceType');

    if (serviceFromUrl && serviceInput) {

        try {

            serviceInput.value = decodeURIComponent(serviceFromUrl);

        } catch (error) {

            serviceInput.value = serviceFromUrl;

        }

    } else if (serviceInput) {

        serviceInput.value = 'Immigration Consultation';

    }


    // ============================================================
    // SHOW SUCCESS PAGE
    // ============================================================

    if (
        urlParams.get('success') === 'true'
    ) {

        const formWrapper =
            document.getElementById('formWrapper');

        if (formWrapper) {
            formWrapper.style.display = 'none';
        }


        const feeSection =
            document.querySelector('.consultation-fee');

        if (feeSection) {
            feeSection.style.display = 'none';
        }


        const successMsg =
            document.getElementById('successMsg');

        if (successMsg) {

            successMsg.style.display = 'block';

            successMsg.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }


    // ============================================================
    // BOOKING FORM
    // ============================================================

    const bookingForm =
        document.getElementById('bookingForm');


    if (bookingForm) {

        bookingForm.addEventListener(
            'submit',
            function (event) {

                event.preventDefault();


                // ------------------------------------------------
                // GET BUTTONS / MESSAGES
                // ------------------------------------------------

                const submitBtn =
                    document.getElementById('submitBtn');

                const loadingMsg =
                    document.getElementById('loadingMsg');

                const errorMsg =
                    document.getElementById('errorMsg');


                // ------------------------------------------------
                // HIDE PREVIOUS ERROR
                // ------------------------------------------------

                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }


                // ------------------------------------------------
                // SHOW LOADING
                // ------------------------------------------------

                if (submitBtn) {

                    submitBtn.disabled = true;

                    submitBtn.style.display = 'none';
                }


                if (loadingMsg) {

                    loadingMsg.style.display = 'block';
                }


                // ------------------------------------------------
                // SEND FORM THROUGH EMAILJS
                // ------------------------------------------------

                emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    bookingForm
                )

                .then(function (response) {

                    console.log(
                        'BOOKING SENT SUCCESSFULLY',
                        response.status,
                        response.text
                    );


                    // --------------------------------------------
                    // REDIRECT TO SUCCESS MESSAGE
                    // --------------------------------------------

                    window.location.href =
                        'booking.html?success=true';

                })


                .catch(function (error) {

                    console.error(
                        'EMAILJS BOOKING ERROR:',
                        error
                    );

                    console.error(
                        'EMAILJS ERROR TEXT:',
                        error.text
                    );


                    // --------------------------------------------
                    // RESTORE BUTTON
                    // --------------------------------------------

                    if (submitBtn) {

                        submitBtn.disabled = false;

                        submitBtn.style.display = 'block';
                    }


                    if (loadingMsg) {

                        loadingMsg.style.display = 'none';
                    }


                    // --------------------------------------------
                    // SHOW ERROR MESSAGE
                    // --------------------------------------------

                    if (errorMsg) {

                        errorMsg.innerHTML = `
                            <strong>
                                ❌ Something went wrong!
                            </strong>

                            <p>
                                We could not send your booking request.
                                Please try again.
                            </p>

                            <p style="
                                font-size: 0.8rem;
                                margin-top: 10px;
                                color: #fca5a5;
                            ">
                                EmailJS Error:
                                ${error.text || 'Unknown error'}
                            </p>

                            <p style="
                                margin-top: 10px;
                            ">
                                Please contact us directly at:
                                <br>
                                <strong>
                                    thomaschaseimmigration9@gmail.com
                                </strong>
                            </p>
                        `;

                        errorMsg.style.display = 'block';


                        errorMsg.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }

                });

            }
        );
    }


    // ============================================================
    // CONTACT FORM
    // ============================================================

    const contactForm =
        document.getElementById('contactForm');


    if (contactForm) {

        contactForm.addEventListener(
            'submit',
            function (event) {

                event.preventDefault();


                const submitBtn =
                    contactForm.querySelector('.btn-submit');


                const successMsg =
                    document.getElementById(
                        'contactSuccessMsg'
                    );


                const errorMsg =
                    document.getElementById(
                        'contactErrorMsg'
                    );


                // ----------------------------------------------
                // BUTTON LOADING
                // ----------------------------------------------

                if (submitBtn) {

                    submitBtn.textContent =
                        '⏳ Sending...';

                    submitBtn.disabled = true;
                }


                // ----------------------------------------------
                // SEND CONTACT FORM
                // ----------------------------------------------

                emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm
                )

                .then(function (response) {

                    console.log(
                        'CONTACT MESSAGE SENT:',
                        response.status,
                        response.text
                    );


                    if (successMsg) {

                        successMsg.style.display =
                            'block';
                    }


                    if (errorMsg) {

                        errorMsg.style.display =
                            'none';
                    }


                    contactForm.reset();


                    if (submitBtn) {

                        submitBtn.textContent =
                            'Send Message';

                        submitBtn.disabled = false;
                    }

                })


                .catch(function (error) {

                    console.error(
                        'EMAILJS CONTACT ERROR:',
                        error
                    );

                    console.error(
                        'CONTACT ERROR TEXT:',
                        error.text
                    );


                    if (successMsg) {

                        successMsg.style.display =
                            'none';
                    }


                    if (errorMsg) {

                        errorMsg.style.display =
                            'block';
                    }


                    if (submitBtn) {

                        submitBtn.textContent =
                            'Send Message';

                        submitBtn.disabled = false;
                    }

                });

            }
        );
    }

});
