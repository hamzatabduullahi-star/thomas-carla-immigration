/* =========================================================
   THOMAS CARLA
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("mobile-open");

            if (navbar.classList.contains("mobile-open")) {
                menuToggle.innerHTML = "✕";
            } else {
                menuToggle.innerHTML = "☰";
            }

        });

        /* Close menu after clicking a link */

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("mobile-open");

                menuToggle.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       SET MINIMUM BOOKING DATE
    ===================================================== */

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const todayFormatted = `${year}-${month}-${day}`;

        dateInput.setAttribute("min", todayFormatted);

    }


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const firstName =
                document.getElementById("firstName")?.value.trim();

            const lastName =
                document.getElementById("lastName")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const phone =
                document.getElementById("phone")?.value.trim();

            const country =
                document.getElementById("country")?.value.trim();

            const service =
                document.getElementById("service")?.value;

            const date =
                document.getElementById("date")?.value;

            const time =
                document.getElementById("time")?.value;


            /* Basic validation */

            if (
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !country ||
                !service ||
                !date ||
                !time
            ) {

                alert(
                    "Please complete all required fields before submitting your appointment request."
                );

                return;
            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            /*
             * Temporary response.
             *
             * The real booking system will be connected later.
             */

            alert(
                "Your appointment request has been received. We will confirm the appointment after reviewing the requested date and time."
            );


            bookingForm.reset();

        });

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("contactName")?.value.trim();

            const email =
                document.getElementById("contactEmail")?.value.trim();

            const subject =
                document.getElementById("contactSubject")?.value;

            const message =
                document.getElementById("contactMessage")?.value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                alert(
                    "Please complete all fields before sending your message."
                );

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            alert(
                "Thank you. Your message has been received."
            );


            contactForm.reset();

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });


});
