// --------------------
// Hamburger Menü Toggle
// --------------------
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    if (menu.style.right === '0px') {
        menu.style.right = '-260px';
    } else {
        menu.style.right = '0px';
    }
}

// --------------------
// Scroll-to-top Button
// --------------------
const topBtn = document.getElementById("topBtn");

// Zeige Button wenn gescrollt
window.onscroll = function() {
    scrollFunction();
    revealSections();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// Scroll-to-top Funktion
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------
// Sections Fade-in beim Scrollen
// --------------------
function revealSections() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
}

// --------------------
// IP Kopieren Button
// --------------------
function copyIP() {
    const ipText = document.querySelector('.server-box .ip').textContent;
    navigator.clipboard.writeText(ipText).then(() => {
        alert(`IP ${ipText} wurde kopiert!`);
    }).catch(err => {
        alert('Kopieren fehlgeschlagen!');
    });
}
