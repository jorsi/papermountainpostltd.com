document.addEventListener("DOMContentLoaded", function() {
    // setup mason grid after all images are loaded
    var masonry = Macy({
        container: '#works-grid',
        trueOrder: false,
        waitForImages: true,
        margin: 16,
        mobileFirst: true,
        columns: 1,
        breakAt: {
            992: 5,
            768: 3,
            400: 2
        }
    });
 });