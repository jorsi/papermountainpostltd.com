let navigationElement;
let desktopNavigationElement;
let mobileNavigationElement;
let mobileNavigationPopupElement;
let mobileNavigationButton;
let isMobileMenuOpen = false;
let lastScrollY = 0;

function animationInit() {
    // splash animations to perform on page load
    let paperMountain = document.querySelector('#header .mountain');
    paperMountain.classList.add('animate');
    paperMountain.style.transform = 'translate(-22px, 0)';
    paperMountain.style.strokeDashoffset = '0';
}

function gridInit() {
    // setup mason grid after all images are loaded
    let masonry = Macy({
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
    let links = mobileNavigationPopupElement.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            toggleMobileMenu();
        });
    });

}

function onWindowResize(e) {
    // make sure mobile menu closes when resizing
    if (isMobileMenuOpen && window.innerWidth > 768) {
        toggleMobileMenu();
    }
}

function onWindowScroll(e) {
    // navigation
    // slides in when past header and scrolling up
    // slides out when scrolling down
    let currentScrollY = window.scrollY;
    let isScrollingDown = currentScrollY > lastScrollY; 
    let headerHeight = document.querySelector('#header').clientHeight;
    let documentHeight = document.body.clientHeight;
    
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

    
    // paralax header mountain
    if (currentScrollY < headerHeight) {
        let paperMountain = document.querySelector('#header .mountain');
        let verticalShift = 50 * (currentScrollY + 1) /  headerHeight;
        paperMountain.style.transform = `translate(-22px, ${verticalShift}px)`;
    }

    // paralax footer mountain
    let footerElement = document.querySelector('#footer');
    let footerViewPoint = footerElement.offsetTop - window.innerHeight;
    if (currentScrollY >= footerViewPoint) {
        let footerMountain = document.querySelector('#footer .mountain');
        let distanceIntoFooter = currentScrollY - footerViewPoint;
        let verticalShift = 100 - (100 * (distanceIntoFooter + 1) / footerElement.clientHeight);
        footerMountain.style.transform = `translate(-22px, ${verticalShift}px)`;
    }

    lastScrollY = currentScrollY;
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
    animationInit();

    window.addEventListener('scroll', onWindowScroll);
    window.addEventListener('resize', onWindowResize);
 });