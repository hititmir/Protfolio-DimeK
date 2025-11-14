document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const mkdBtn = document.getElementById('mkd-btn');
    const engBtn = document.getElementById('eng-btn');
    const elementsToTranslate = document.querySelectorAll('[data-lang-mkd]');

    // =======================================
    // 1. DARK MODE
    // =======================================
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // =======================================
    // 2. MOBILE MENU
    // =======================================
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (navbar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // =======================================
    // 3. LANGUAGE SWITCH
    // =======================================
    function setLanguage(lang) {
        elementsToTranslate.forEach(element => {
            element.textContent = element.getAttribute(
                lang === 'eng' ? 'data-lang-eng' : 'data-lang-mkd'
            );
        });

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

    const savedLang = localStorage.getItem('portfolioLang') || 'mkd';
    setLanguage(savedLang);

    mkdBtn.addEventListener('click', () => {
        setLanguage('mkd');
        localStorage.setItem('portfolioLang', 'mkd');
    });

    engBtn.addEventListener('click', () => {
        setLanguage('eng');
        localStorage.setItem('portfolioLang', 'eng');
    });

    // =======================================
    // 4. READ MORE (PORTFOLIO)
    // =======================================
    const portfolioReadMore = document.getElementById('portfolio-read-more');
    const portfolioContainer = document.querySelector('.portfolio-container');
    let isMoreVisible = false;

    portfolioReadMore.addEventListener('click', () => {
        isMoreVisible = !isMoreVisible;
        portfolioContainer.classList.toggle('show-more');

        portfolioReadMore.textContent =
            document.documentElement.lang === 'en'
                ? (isMoreVisible ? 'Show Less' : 'Show More')
                : (isMoreVisible ? 'Прикажи Помалку' : 'Прикажи Повеќе');
    });

    // =======================================
    // 5. CONTACT FORM (Web3Forms)
    // =======================================
    const form = document.getElementById('form');   // ← важно: мора да постои во HTML!
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append("access_key", "c09f7ae5-4494-43c6-91ad-5272cd2d598a"); // ← ОВА МЕСТО!

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Your message has been sent.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});
