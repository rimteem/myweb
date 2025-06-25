document.addEventListener('DOMContentLoaded', () => {
    // Tab switching for Auth page
    const loginTabBtn = document.getElementById('loginTabBtn');
    const registerTabBtn = document.getElementById('registerTabBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function switchAuthForm(activeFormType) {
        if (activeFormType === 'login') {
            if(loginTabBtn) loginTabBtn.classList.add('active');
            if(registerTabBtn) registerTabBtn.classList.remove('active');
            if(loginForm) loginForm.classList.remove('hidden-form');
            if(registerForm) registerForm.classList.add('hidden-form');
            // Update URL for better UX without full page reload if needed, or rely on Express routes
            // window.history.pushState({}, '', '/login' + window.location.search);
        } else if (activeFormType === 'register') {
            if(loginTabBtn) loginTabBtn.classList.remove('active');
            if(registerTabBtn) registerTabBtn.classList.add('active');
            if(loginForm) loginForm.classList.add('hidden-form');
            if(registerForm) registerForm.classList.remove('hidden-form');
            // window.history.pushState({}, '', '/register' + window.location.search);
        }
    }

    if (loginTabBtn && registerTabBtn) {
        loginTabBtn.addEventListener('click', () => switchAuthForm('login'));
        registerTabBtn.addEventListener('click', () => switchAuthForm('register'));

        // Check if server already set active form (e.g. by rendering the page with a specific form active)
        // The EJS template already handles this by adding/removing 'hidden-form' based on `activeForm` variable.
        // So this client-side initial switch might not be strictly necessary if Express handles the initial state.
    }


    // Mobile navigation toggle (basic example)
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const authAndLangSelector = document.querySelector('.auth-and-lang-selector');


    if (mobileNavToggle && mainNav && authAndLangSelector) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            authAndLangSelector.classList.toggle('active'); // Also toggle auth/lang for mobile
        });
    }

    // Language switcher links in the header will cause a page reload with the `?lang=` query parameter.
    // The i18n middleware in Express will pick this up and set the cookie and locale.
});