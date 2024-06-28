document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    event.preventDefault();
                    input.reportValidity();
                }
            });
        });
    });
    

    const patientRegisterForm = document.querySelector('#patientRegisterForm');
    if (patientRegisterForm) {
        patientRegisterForm.addEventListener('submit', (event) => {
            const password = document.querySelector('#password');
            const passwordHelp = document.querySelector('#passwordHelp');
            const passwordPattern = /^(?=.*[0-9]).{8,}$/;
            if (!passwordPattern.test(password.value)) {
                event.preventDefault();
                password.setCustomValidity('Password must be at least 8 characters long and contain a number.');
                passwordHelp.style.color = 'red';
                password.reportValidity();
            } else {
                password.setCustomValidity('');
                passwordHelp.style.color = 'muted';
            }
        });
    }
});
