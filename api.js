document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-translate]");
    const placeholders = document.querySelectorAll("[data-translate-placeholder]");
    const translations = {
        en: {
            navbar_brand: "CS 3300 Healthcare Platform",
            nav_home: "Home",
            nav_schedule: "Schedule Appointments",
            nav_contact: "Contact Us",
            nav_patient_register: "Patient Register",
            nav_doctor_register: "Doctor Register",
            nav_patient_login: "Patient Login",
            nav_doctor_login: "Doctor Login",
            nav_prescriptions: "Prescriptions",
            nav_lab_results: "Lab Results",
            footer_text: "CS 3300 Healthcare Platform",
            name_placeholder: "Name",
            email_placeholder: "Email",
            message_placeholder: "Message",
            register: "Register",
            login: "Login",
            schedule_title: "Schedule an Appointment",
            schedule_date: "Appointment Date",
            schedule_time: "Appointment Time",
            schedule_doctor: "Select Doctor",
            schedule_select_doctor: "Select a doctor",
            schedule_Dr_Aziz: "Dr. Aziz",
            schedule_Dr_Nick: "Dr. Nick",
            schedule_Dr_Trung: "Dr. Trung",
            schedule_payment_method: "Payment Method",
            schedule_select_payment: "Select a payment method",
            schedule_credit_card: "Credit Card",
            schedule_paypal: "PayPal",
            schedule_card_details: "Card Details",
            schedule_appointment: "Schedule Appointment ($30)",
            register_title: "Doctor Registration",
            register_first_name: "First Name",
            register_last_name: "Last Name",
            register_email: "Email",
            register_password: "Password",
            register_button: "Register",
            prescriptions_title: "Prescriptions",
            prescriptions_medication: "Medication",
            prescriptions_dosage: "Dosage",
            prescriptions_frequency: "Frequency",
            prescriptions_start_date: "Start Date",
            prescriptions_end_date: "End Date",
            contact_name: "Name",
            contact_email: "Email",
            contact_message: "Message",
            contact_send_message: "Send Message",
            lab_results_title: "Lab Results - CS 3300 Healthcare Platform",
            lab_results_heading: "Lab Results",
            result_id: "Result ID",
            patient_name: "Patient Name",
            test: "Test",
            result: "Result",
            date: "Date",
            cholesterol_test: "Cholesterol Test",
            glucose_test: "Glucose Test",
            cbc_test: "Complete Blood Count (CBC)",
            cholesterol_normal: "Total Cholesterol: 180 mg/dL (Normal)",
            glucose_high: "Blood Glucose: 140 mg/dL (High)",
            cbc_normal: "WBC: 6,000 /μL (Normal)",
            hero_title: "Welcome to Healthcare Platform",
            hero_description: "Your One-Stop Solution for Managing Appointments, Payments, and Health Records",
            get_started: "Get Started",
            features_title: "Features",
            features_description: "Discover the benefits of using our platform",
            features_appointments_title: "Easy Appointments",
            features_appointments_description: "Schedule your appointments with ease and convenience.",
            features_payments_title: "Secure Payments",
            features_payments_description: "Make secure payments through our platform with peace of mind.",
            features_records_title: "Health Records",
            features_records_description: "Access and manage your health records anytime, anywhere.",
            testimonials_title: "Testimonials",
            testimonials_description: "Hear what our users have to say",
            testimonial_1: "This platform has made managing my health so much easier!",
            testimonial_author_1: "John Doe",
            testimonial_2: "A game-changer for healthcare management.",
            testimonial_author_2: "Jane Smith",
            contact_title: "Contact Us",
            contact_description: "Have any questions? Get in touch!"
        },
        es: {
            navbar_brand: "Plataforma de Salud CS 3300",
            nav_home: "Inicio",
            nav_schedule: "Agendar Citas",
            nav_contact: "Contáctenos",
            nav_patient_register: "Registro de Paciente",
            nav_doctor_register: "Registro de Doctor",
            nav_patient_login: "Inicio de Sesión de Paciente",
            nav_doctor_login: "Inicio de Sesión de Doctor",
            nav_prescriptions: "Prescripciones",
            nav_lab_results: "Resultados de Laboratorio",
            footer_text: "Plataforma de Salud CS 3300",
            name_placeholder: "Nombre",
            email_placeholder: "Correo Electrónico",
            message_placeholder: "Mensaje",
            register: "Registrar",
            login: "Iniciar Sesión",
            schedule_title: "Agendar una Cita",
            schedule_date: "Fecha de la Cita",
            schedule_time: "Hora de la Cita",
            schedule_doctor: "Seleccionar Doctor",
            schedule_select_doctor: "Seleccione un doctor",
            schedule_Dr_Aziz: "Dr. Aziz",
            schedule_Dr_Nick: "Dr. Nick",
            schedule_Dr_Trung: "Dr. Trung",
            schedule_payment_method: "Método de Pago",
            schedule_select_payment: "Seleccione un método de pago",
            schedule_credit_card: "Tarjeta de Crédito",
            schedule_paypal: "PayPal",
            schedule_card_details: "Detalles de la Tarjeta",
            schedule_appointment: "Agendar Cita ($30)",
            register_title: "Registro de Doctor",
            register_first_name: "Nombre",
            register_last_name: "Apellido",
            register_email: "Correo Electrónico",
            register_password: "Contraseña",
            register_button: "Registrarse",
            prescriptions_title: "Prescripciones",
            prescriptions_medication: "Medicación",
            prescriptions_dosage: "Dosificación",
            prescriptions_frequency: "Frecuencia",
            prescriptions_start_date: "Fecha de Inicio",
            prescriptions_end_date: "Fecha de Fin",
            contact_name: "Nombre",
            contact_email: "Correo Electrónico",
            contact_message: "Mensaje",
            contact_send_message: "Enviar Mensaje",
            lab_results_title: "Resultados de laboratorio - Plataforma de salud CS 3300",
            lab_results_heading: "Resultados de laboratorio",
            result_id: "ID del Resultado",
            patient_name: "Nombre del Paciente",
            test: "Prueba",
            result: "Resultado",
            date: "Fecha",
            cholesterol_test: "Prueba de Colesterol",
            glucose_test: "Prueba de Glucosa",
            cbc_test: "Conteo Sanguíneo Completo (CBC)",
            cholesterol_normal: "Colesterol Total: 180 mg/dL (Normal)",
            glucose_high: "Glucosa en Sangre: 140 mg/dL (Alto)",
            cbc_normal: "WBC: 6,000 /μL (Normal)",
            hero_title: "Bienvenido a la Plataforma de Salud",
            hero_description: "Su solución integral para gestionar citas, pagos y registros de salud",
            get_started: "Comenzar",
            features_title: "Características",
            features_description: "Descubra los beneficios de usar nuestra plataforma",
            features_appointments_title: "Citas Fáciles",
            features_appointments_description: "Agende sus citas con facilidad y conveniencia.",
            features_payments_title: "Pagos Seguros",
            features_payments_description: "Realice pagos seguros a través de nuestra plataforma con tranquilidad.",
            features_records_title: "Registros de Salud",
            features_records_description: "Acceda y gestione sus registros de salud en cualquier momento y lugar.",
            testimonials_title: "Testimonios",
            testimonials_description: "Escuche lo que nuestros usuarios tienen que decir",
            testimonial_1: "¡Esta plataforma ha hecho que gestionar mi salud sea mucho más fácil!",
            testimonial_author_1: "John Doe",
            testimonial_2: "Un cambio radical en la gestión de la salud.",
            testimonial_author_2: "Jane Smith",
            contact_title: "Contáctenos",
            contact_description: "¿Tiene alguna pregunta? ¡Póngase en contacto!"
        },
        ar: {
            navbar_brand: "منصة الرعاية الصحية CS 3300",
            nav_home: "الرئيسية",
            nav_schedule: "جدولة المواعيد",
            nav_contact: "اتصل بنا",
            nav_patient_register: "تسجيل المريض",
            nav_doctor_register: "تسجيل الطبيب",
            nav_patient_login: "تسجيل دخول المريض",
            nav_doctor_login: "تسجيل دخول الطبيب",
            nav_prescriptions: "الوصفات الطبية",
            nav_lab_results: "نتائج المختبر",
            footer_text: "منصة الرعاية الصحية CS 3300",
            name_placeholder: "الاسم",
            email_placeholder: "البريد الإلكتروني",
            message_placeholder: "الرسالة",
            register: "تسجيل",
            login: "تسجيل الدخول",
            schedule_title: "جدولة موعد",
            schedule_date: "تاريخ الموعد",
            schedule_time: "وقت الموعد",
            schedule_doctor: "اختر طبيب",
            schedule_select_doctor: "اختر طبيب",
            schedule_Dr_Aziz: "د. عزيز",
            schedule_Dr_Nick: "د. نيك",
            schedule_Dr_Trung: "د. ترونج",
            schedule_payment_method: "طريقة الدفع",
            schedule_select_payment: "اختر وسيلة دفع",
            schedule_credit_card: "بطاقة ائتمان",
            schedule_paypal: "باي بال",
            schedule_card_details: "تفاصيل البطاقة",
            schedule_appointment: "جدولة موعد ($30)",
            register_title: "تسجيل الطبيب",
            register_first_name: "الاسم الأول",
            register_last_name: "الكنية",
            register_email: "البريد الإلكتروني",
            register_password: "كلمة المرور",
            register_button: "تسجيل",
            prescriptions_title: "الوصفات الطبية",
            prescriptions_medication: "الدواء",
            prescriptions_dosage: "الجرعة",
            prescriptions_frequency: "التردد",
            prescriptions_start_date: "تاريخ البدء",
            prescriptions_end_date: "تاريخ الانتهاء",
            contact_name: "الاسم",
            contact_email: "البريد الإلكتروني",
            contact_message: "الرسالة",
            contact_send_message: "أرسل رسالة",
            lab_results_title: "نتائج المختبر - منصة الرعاية الصحية CS 3300",
            lab_results_heading: "نتائج المختبر",
            result_id: "معرف النتيجة",
            patient_name: "اسم المريض",
            test: "اختبار",
            result: "النتيجة",
            date: "تاريخ",
            cholesterol_test: "اختبار الكوليسترول",
            glucose_test: "اختبار الجلوكوز",
            cbc_test: "فحص تعداد الدم الكامل (CBC)",
            cholesterol_normal: "الكوليسترول الكلي: 180 ملغم/دل (طبيعي)",
            glucose_high: "جلوكوز الدم: 140 ملغم/دل (مرتفع)",
            cbc_normal: "خلايا الدم البيضاء: 6,000 /μL (طبيعي)",
            hero_title: "مرحبًا بك في منصة الرعاية الصحية",
            hero_description: "الحل الشامل لإدارة المواعيد والمدفوعات والسجلات الصحية",
            get_started: "ابدأ الآن",
            features_title: "الميزات",
            features_description: "اكتشف فوائد استخدام منصتنا",
            features_appointments_title: "مواعيد سهلة",
            features_appointments_description: "جدولة مواعيدك بسهولة وراحة.",
            features_payments_title: "مدفوعات آمنة",
            features_payments_description: "قم بإجراء مدفوعات آمنة من خلال منصتنا براحة البال.",
            features_records_title: "السجلات الصحية",
            features_records_description: "الوصول إلى وإدارة سجلاتك الصحية في أي وقت وفي أي مكان.",
            testimonials_title: "الشهادات",
            testimonials_description: "استمع لما يقوله مستخدمونا",
            testimonial_1: "لقد جعلت هذه المنصة إدارة صحتي أسهل بكثير!",
            testimonial_author_1: "جون دو",
            testimonial_2: "تغيير جذري في إدارة الرعاية الصحية.",
            testimonial_author_2: "جين سميث",
            contact_title: "اتصل بنا",
            contact_description: "هل لديك أي أسئلة؟ اتصل بنا!"
        }
    };

    function translate(lang) {
        elements.forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        placeholders.forEach(element => {
            const key = element.getAttribute("data-translate-placeholder");
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    }

    function setLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
        translate(lang);
    }

    document.querySelector("#translate-en").addEventListener("click", function() {
        setLanguage("en");
    });

    document.querySelector("#translate-es").addEventListener("click", function() {
        setLanguage("es");
    });

    document.querySelector("#translate-ar").addEventListener("click", function() {
        setLanguage("ar");
    });

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);

    // Prescription fetching
    if (document.getElementById("prescriptionsTableBody")) {
        fetch('/api/prescriptions')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("prescriptionsTableBody");
                data.prescriptions.forEach(prescription => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${prescription.medication}</td>
                        <td>${prescription.dosage}</td>
                        <td>${prescription.frequency}</td>
                        <td>${prescription.start_date}</td>
                        <td>${prescription.end_date}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error fetching prescriptions:", error);
            });
    }

    // Patient registration form
    if (document.getElementById("registrationForm")) {
        document.querySelector("#registrationForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (firstName && lastName && email && password) {
                fetch('/patient_register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Registration successful. Please log in.");
                        window.location.href = 'patient_login.html';
                    } else {
                        alert("Registration failed: " + data.message);
                    }
                })
                .catch(error => {
                    alert("An error occurred: " + error.message);
                });
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }

    // Patient login form
    if (document.getElementById("loginForm")) {
        document.querySelector("#loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email && password) {
                fetch('/patient_login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Login successful.");
                        window.location.href = 'index.html';
                    } else {
                        alert("Login failed: " + data.message);
                    }
                })
                .catch(error => {
                    alert("An error occurred: " + error.message);
                });
            } else {
                alert("Please fill out all required fields.");
            }
        });
    } 

    // Doctor login form
    if (document.getElementById("doctorLoginForm")) {
        document.querySelector("#doctorLoginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email && password) {
                fetch('/doctor_login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Login successful.");
                        window.location.href = 'index.html';
                    } else {
                        alert("Login failed: " + data.message);
                    }
                })
                .catch(error => {
                    alert("An error occurred: " + error.message);
                });
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }

    // Doctor registration form
    if (document.getElementById("doctorRegistrationForm")) {
        document.querySelector("#doctorRegistrationForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (firstName && lastName && email && password) {
                fetch('/doctor_register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Registration successful. Please log in.");
                        window.location.href = 'doctor_login.html';
                    } else {
                        alert("Registration failed: " + data.message);
                    }
                })
                .catch(error => {
                    alert("An error occurred: " + error.message);
                });
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }

    // Appointment form
    if (document.getElementById("appointmentForm")) {
        document.querySelector("#appointmentForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const appointmentDate = document.getElementById("appointmentDate").value;
            const appointmentTime = document.getElementById("appointmentTime").value;
            const doctor = document.getElementById("doctor").value;
            const paymentMethod = document.getElementById("paymentMethod").value;
            const cardDetails = document.getElementById("cardDetails").value;

            if (appointmentDate && appointmentTime && doctor && paymentMethod && cardDetails) {
                fetch('/schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        appointment_date: appointmentDate,
                        appointment_time: appointmentTime,
                        doctor: doctor,
                        payment_method: paymentMethod,
                        card_details: cardDetails
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Appointment scheduled successfully.");
                        window.location.href = 'schedule_confirmation.html';
                    } else {
                        alert("Failed to schedule appointment: " + data.message);
                    }
                })
                .catch(error => {
                    alert("An error occurred: " + error.message);
                });
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }

    // Chatbot functionality
    async function getBotResponse(input, lang) {
        if (input.toLowerCase().includes("appointment")) {
            window.location.href = 'schedule.html';
            return translations[lang].appointment;
        } else if (input.toLowerCase().includes("contact")) {
            window.location.href = 'contact.html';
            return translations[lang].contact;
        } else if (input.toLowerCase().includes("lab results")) {
            window.location.href = 'lab_results.html';
            return translations[lang].lab_results;
        } else if (input.toLowerCase().includes("prescriptions")) {
            window.location.href = 'prescriptions.html';
            return translations[lang].prescriptions;
        } else if (input.toLowerCase().includes("developed")) {
            return translations[lang].developed;
        } else {
            const response = await fetch('/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: input })
            });
            const data = await response.json();
            return data.result;
        }
    }

    async function sendMessage() {
        const userInput = document.getElementById("userInput").value;
        const chatLogs = document.getElementById("chatlogs");
        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = userInput;
        chatLogs.appendChild(userMessage);

        const lang = localStorage.getItem('selectedLanguage') || 'en';
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.textContent = await getBotResponse(userInput, lang);
        chatLogs.appendChild(botMessage);

        document.getElementById("userInput").value = "";
    }

    if (document.getElementById("userInput")) {
        document.getElementById("userInput").addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});
