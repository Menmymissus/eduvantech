$('#myCarousel').carousel({
    interval: 5000
})

$('#myCarousel .carousel-item').each(function() {
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});
var containerEl = document.querySelector('[data-ref~="mixitup-container"]');

    var mixer = mixitup(containerEl, {
    selectors: {
        target: '[data-ref~="mixitup-target"]'
    }
});

function openWhatsapp() {
    const phoneNumber = "9779812367676";
    const message = "Hello! I want to chat with you.";
    const url = `https://wa.me/${phoneNumber}`;
    // const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url,"_blank");
}

const blogContainer = document.getElementById("blog-container");
const apiURL = "https://dev.to/api/articles?page=1&per_page=5";
fetch(apiURL).then(response => response.json()).then(articles => {
 articles.foreach(article => {
        const post = document.createElement("div");
        post.className = "blog-post";
    })
});














