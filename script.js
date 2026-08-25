// ===== SHOW SUCCESS MESSAGE AFTER FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // If ?success=true is in the URL, show success and hide form
    if (urlParams.has('success') && urlParams.get('success') === 'true') {
        const successMsg = document.getElementById('successMsg');
        const form = document.querySelector('form');

        if (successMsg) {
            successMsg.style.display = 'block';
        }
        if (form) {
            form.style.display = 'none';
        }
    }
});
