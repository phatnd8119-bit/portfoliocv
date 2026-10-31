document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. DARK / LIGHT MODE TOGGLE (III.14, V.19) ==================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Kiểm tra bộ nhớ LocalStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', theme);
    });

    /* ==================== 2. MOBILE HAMBURGER MENU (III.14) ==================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Đóng menu khi bấm vào link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* ==================== 3. LỌC DỰ ÁN / PROJECT FILTER (V.19) ==================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==================== 4. VALIDATE FORM LIÊN HỆ (III.15) ==================== */
    const contactForm = document.getElementById('contact-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    // Hàm kiểm tra định dạng email bằng Regex
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn submit load lại trang

        let isValid = true;

        // Reset thông báo lỗi
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formSuccess.textContent = '';

        // Validate Họ tên
        if (fullnameInput.value.trim() === '') {
            nameError.textContent = 'Vui lòng nhập họ và tên của bạn!';
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Vui lòng nhập địa chỉ email!';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Định dạng email không hợp lệ!';
            isValid = false;
        }

        // Validate Lời nhắn
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Vui lòng nhập nội dung lời nhắn!';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Lời nhắn phải chứa ít nhất 10 ký tự!';
            isValid = false;
        }

        // Nếu tất cả hợp lệ
        if (isValid) {
            formSuccess.textContent = 'Cảm ơn bạn! Lời nhắn đã được gửi thành công.';
            contactForm.reset();
        }
    });
});