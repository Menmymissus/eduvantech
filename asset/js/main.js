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


function openWhatsapp() {
    const phoneNumber = "9779812367676";
    // const message = "Hello! I want to chat with you.";
    const url = `https://wa.me/${phoneNumber}`;
    // const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url,"_blank");
}

let currentPage = 1;
const apiURL = "https://dev.to/api/articles?page=1";
let allPosts=[];
const POSTS_PER_PAGE = 5;

async function fetchAllPosts() {
    try {
        const res = await fetch(apiURL);
        if(!res.ok) {
            throw new Error(`Api error: ${res.status}`);
        }
        allPosts = await res.json();
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
            <div class="blog-post border-bottom rounded">
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

function renderPagination() {
    const ul = document.getElementById("pagination");
    ul.innerHTML = '';
    const pageCount = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    // Previous button
    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled":""}`;
    prevLi.innerHTML = `<button class="page-link" ${currentPage===1} ? 'tabindex="-1" aria-disabled="true"' : "">&laquo; Prev</button>`;
    prevLi.onclick = () => changePage(currentPage -1);
    ul.appendChild(prevLi);

    for(let p = 1; p<=pageCount; p++) {
        const li = document.createElement("li");
        li.className = `page-item ${p === currentPage ? 'active':''}`;
        li.innerHTML = `<button class="page-link">${p}</button>`;
        li.onclick = () => changePage(p);
        ul.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${currentPage === 1 ? "disabled":""}`;
    nextLi.innerHTML = `<button class="page-link" ${currentPage===pageCount} ? 'tabindex="-1" aria-disabled="true"' : "">Next &raquo;</button>`;
    nextLi.onclick = () => changePage(currentPage+1);
    ul.appendChild(nextLi);
}

function changePage(page) {
    if(page < 1 || page > Math.ceil(allPosts.length/POSTS_PER_PAGE)) return;
    currentPage = page;
    const start = (page -1)*POSTS_PER_PAGE;
    const slicedBlogs = allPosts.slice(start,start + POSTS_PER_PAGE);
    renderPosts(slicedBlogs);
    renderPagination();

    document.getElementById("latest-blog").scrollIntoView({behavior:"smooth", block:"start"});
}

document.addEventListener("DOMContentLoaded",async() => {
    await fetchAllPosts();
    changePage(1);
    // renderPosts(posts);
});


$(document).ready(function () {
    // Initialize MixItUp
    var mixer = mixitup('.myMixCont', {
        selectors: {
            target: '.mix',
            control: '.control'
        },
        animation: {
            duration: 300
        }
    });
});
