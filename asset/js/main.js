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

// var mixer = mixitup(containerEl, {
//     selectors: {
//         target: '[data-ref~="mixitup-target"]'
//     }
// });

function openWhatsapp() {
    const phoneNumber = "9779812367676";
    // const message = "Hello! I want to chat with you.";
    const url = `https://wa.me/${phoneNumber}`;
    // const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url,"_blank");
}

const apiURL = "https://dev.to/api/articles?page=1";

async function fetchPosts() {
   console.log("Before fetch");
    try {
        console.log("Before fetch")
        const res = await fetch(apiURL);
        console.log("After fetch")
        if(!res.ok) {
            throw new Error(`Api error: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function renderPosts(posts) {
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = '';
    if(posts.length === 0) {
        blogContainer.textContent = "No posts found";
        return;
    }

    posts.forEach(post => {
        const element = document.createElement("div");
        element.className = "row justify-content-center m-3";
        element.innerHTML = `
        <div class="col-md-8 mx-auto">
            <div class="blog-post">
                <a target="_blank" href="${post.url}">
                    <img src="${post.social_image}" class="img-fluid" alt=""/>
                    <h2>${post.title}</h2>
                </a>
            </div>
        </div>
        `;
        blogContainer.appendChild(element);
    })
}

document.addEventListener("DOMContentLoaded",async() => {
    const posts = await fetchPosts();
    renderPosts(posts);
})
