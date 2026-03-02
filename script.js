/* --------------------
   Hamburger Menü
-------------------- */
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu.style.right === "0px") {
        menu.style.right = "-250px";
    } else {
        menu.style.right = "0px";
    }
}

/* --------------------
   Copy Server IP
-------------------- */
function copyIP() {
    navigator.clipboard.writeText("homiecraft-smp.aternos.me")
        .then(() => {
            alert("IP kopiert: homiecraft-smp.aternos.me");
        })
        .catch(() => {
            alert("Fehler beim Kopieren der IP!");
        });
}

/* --------------------
   Scroll-to-top Button
-------------------- */
const topBtn = document.getElementById("topBtn");

window.onscroll = function() {
    if (document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --------------------
   Server Status Anzeige
-------------------- */
function checkServerStatus() {
    // Einfacher Platzhalter für jetzt
    const statusEl = document.getElementById("server-status");
    // Du könntest hier eine API einfügen, wenn Aternos API verfügbar ist
    statusEl.innerText = "Online"; // Alternativ "Offline"
}

// Seite fertig geladen → Server Status prüfen
window.onload = function() {
    checkServerStatus();
};
