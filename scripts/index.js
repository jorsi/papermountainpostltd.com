var navigationElement;
var desktopNavigationElement;
var mobileNavigationElement;
var mobileNavigationPopupElement;
var mobileNavigationButton;
var isMobileMenuOpen = false;
var lastScrollY = 0;

function gridInit() {
    // setup mason grid after all images are loaded
    var masonry = Macy({
        container: '#works-grid',
        trueOrder: false,
        waitForImages: true,
        margin: 16,
        mobileFirst: true,
        columns: 1,
        breakAt: {
            768: 3,
            400: 2
        }
    });
}

function navigationInit() {
    navigationElement = document.querySelector('#navigation');
    desktopNavigationElement = document.querySelector('#navigation-desktop');

    // setup mobile menu
    // on click button, open menu
    // on click any link, close menu
    mobileNavigationElement = document.querySelector('#navigation-mobile');
    mobileNavigationPopupElement = document.querySelector('#navigation-popup');
    mobileNavigationButton = document.querySelector('#navigation-button');
    mobileNavigationButton.addEventListener('click', function () {
        toggleMobileMenu();
    });
    var links = mobileNavigationPopupElement.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            toggleMobileMenu();
        });
    });

}

function onWindowResize(e) {
    if (isMobileMenuOpen && window.innerWidth > 768) {
        toggleMobileMenu();
    }
}

function onWindowScroll(e) {
    // navigation
    // slides in when past header and scrolling up
    // slides out when scrolling down
    var currentScrollY = window.scrollY;
    var isScrollingDown = currentScrollY > lastScrollY; 
    var headerHeight = document.querySelector('#header').clientHeight;
    var documentHeight = document.body.clientHeight;
    
    if (isMobileMenuOpen) {
        return; // do nothing if mobile menu is open
    }

    if (isScrollingDown) {
        if (currentScrollY > headerHeight) {
            navigationElement.style.transform = 'translate(0, -200%)';
        }
    } else {
        if (currentScrollY > headerHeight) {
            navigationElement.style.transform = 'translate(0, 0)';
        } else {
            navigationElement.style.transform = 'translate(0, -200%)';
        }
    }

    lastScrollY = currentScrollY;

    // animations
}

function toggleMobileMenu () {
    mobileNavigationElement.classList.toggle('is-open');
    mobileNavigationButton.classList.toggle('is-active');
    mobileNavigationPopupElement.classList.toggle('is-open');

    isMobileMenuOpen = !isMobileMenuOpen;
}

document.addEventListener("DOMContentLoaded", function() {
    navigationInit();
    gridInit();

    window.addEventListener('scroll', onWindowScroll);

    // make sure mobile menu closes when resizing
    window.addEventListener('resize', onWindowResize);
 });