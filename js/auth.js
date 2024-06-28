document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (document.querySelector('#patientLoginForm')) {
        const patientLoginForm = document.querySelector('#patientLoginForm');
        patientLoginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        });
    }

    if (document.querySelector('#doctorLoginForm')) {
        const doctorLoginForm = document.querySelector('#doctorLoginForm');
        doctorLoginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        });
    }

    const protectedPages = ['lab_results.html', 'prescriptions.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        alert('You must be logged in to view this page.');
        window.location.href = 'patient_login.html';
    }
});
