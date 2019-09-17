const navigationEl = document.querySelector('#navigation');
const hamburgerEl = document.querySelector('#navigation-hamburger');
if (hamburgerEl) {
    hamburgerEl.addEventListener('click', () => {
        navigationEl.classList.toggle('is-menu-open');
    });
}