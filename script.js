document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const mkdBtn = document.getElementById('mkd-btn');
    const engBtn = document.getElementById('eng-btn');
    const elementsToTranslate = document.querySelectorAll('[data-lang-mkd]');

    // =======================================
    // 1. DARK MODE TOGGLE
    // =======================================

    // Proverka na lokalnata memorija za zapameten režim
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Promena na ikona
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Zapamti go izborot vo lokalna memorija
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // =======================================
    // 2. MOBILE MENU TOGGLE
    // =======================================
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        // Promena na ikonata: od hamburger (bars) vo X (times)
        if (navbar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // =======================================
    // 3. JAZIK SELEKTOR (MKD/ENG)
    // =======================================
    
    function setLanguage(lang) {
        // Promena na jazikot za sekoj element
        elementsToTranslate.forEach(element => {
            if (lang === 'eng') {
                // Zemi go tekstot od data-lang-eng atributot
                element.textContent = element.getAttribute('data-lang-eng');
            } else {
                // Zemi go tekstot od data-lang-mkd atributot
                element.textContent = element.getAttribute('data-lang-mkd');
            }
        });

        // Promena na aktivno kopče
        if (lang === 'eng') {
            engBtn.classList.add('active');
            mkdBtn.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            mkdBtn.classList.add('active');
            engBtn.classList.remove('active');
            document.documentElement.lang = 'mkd';
        }
    }

    // Postavi go jazikot po default na MKD (ili zapameten od local storage)
    const savedLang = localStorage.getItem('portfolioLang') || 'mkd';
    setLanguage(savedLang);

    // Event Listeners za kopčinjata
    mkdBtn.addEventListener('click', () => {
        setLanguage('mkd');
        localStorage.setItem('portfolioLang', 'mkd');
    });

    engBtn.addEventListener('click', () => {
        setLanguage('eng');
        localStorage.setItem('portfolioLang', 'eng');
    });

    // =======================================
    // 4. PORTFOLIO READ MORE
    // =======================================
    const portfolioReadMore = document.getElementById('portfolio-read-more');
    const portfolioContainer = document.querySelector('.portfolio-container');
    let isMoreVisible = false;

    portfolioReadMore.addEventListener('click', () => {
        isMoreVisible = !isMoreVisible;
        
        if (isMoreVisible) {
            portfolioContainer.classList.add('show-more');
            // Update button text
            if (document.documentElement.lang === 'en') {
                portfolioReadMore.textContent = 'Show Less';
            } else {
                portfolioReadMore.textContent = 'Прикажи Помалку';
            }
        } else {
            portfolioContainer.classList.remove('show-more');
            // Update button text
            if (document.documentElement.lang === 'en') {
                portfolioReadMore.textContent = 'Show More';
            } else {
                portfolioReadMore.textContent = 'Прикажи Повеќе';
            }
        }
    });

    // =======================================
    // 5. KONTAKT FORMA
    // =======================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Spreči standardno submition na formata
        
        // Tuka se izvršuva kodot za ispraḱanje na email (obiočno so PHP/Node.js backend)
        
        // Prikazi status
        formStatus.style.color = 'green';
        const currentLang = document.documentElement.lang;
        if (currentLang === 'en') {
             formStatus.textContent = 'Message sent successfully! I will reply soon.';
        } else {
             formStatus.textContent = 'Пораката е успешно испратена! Ќе ви одговорам наскоро.';
        }
        
        contactForm.reset();
        setTimeout(() => { formStatus.textContent = ''; }, 5000);
    });
    
});
