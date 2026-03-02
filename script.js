// --------------------
// Side Menu Toggle
// --------------------
const sideMenu = document.getElementById('sideMenu');

function toggleMenu() {
    if(sideMenu.style.right === "0px") {
        sideMenu.style.right = "-250px";
    } else {
        sideMenu.style.right = "0px";
    }
}

// --------------------
// Scroll-to-top Button
// --------------------
const topBtn = document.getElementById('topBtn');

window.onscroll = function() {
    // Button sichtbar ab 200px scroll
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------
// Copy IP Button
// --------------------
function copyIP() {
    const ipText = document.querySelector('.ip').textContent;
    navigator.clipboard.writeText(ipText).then(() => {
        alert(`IP "${ipText}" wurde kopiert!`);
    });
}

// --------------------
// Scroll Fade-in Animation
// --------------------
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
});

// --------------------
// Optional: Close Side Menu on link click
// --------------------
const sideLinks = document.querySelectorAll('.side-menu a');
sideLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.style.right = "-250px";
    });
});
