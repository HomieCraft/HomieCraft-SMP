// ===============================
// SIDEBAR
// ===============================

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

// ===============================
// COPY IP
// ===============================

function copyIP() {
    navigator.clipboard.writeText("homiecraft-smp.aternos.me");

    const btn = document.querySelector(".btn-primary");
    btn.innerText = "✔ Kopiert";
    setTimeout(() => {
        btn.innerText = "IP kopieren";
    }, 2000);
}

// ===============================
// SCROLL TO TOP
// ===============================

const scrollBtn = document.getElementById("scrollTop");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===============================
// ACCORDION
// ===============================

document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// ===============================
// SERVER API
// ===============================

fetch("https://api.mcsrvstat.us/2/homiecraft-smp.aternos.me")
    .then(res => res.json())
    .then(data => {
        const statusEl = document.getElementById("server-status");
        const statusCard = document.getElementById("status-card");
        const playersCard = document.getElementById("players-card");
        const versionCard = document.getElementById("version-card");
        const footerVersion = document.getElementById("footer-version");

        if (data.online) {
            statusEl.innerHTML = "🟢 " + data.players.online + " Spieler online";
            statusCard.innerHTML = "Status: 🟢 Online";
        } else {
            statusEl.innerHTML = "🔴 Server Offline";
            statusCard.innerHTML = "Status: 🔴 Offline";
        }

        playersCard.innerHTML = "Spieler: " + data.players.online + " / 30";
        versionCard.innerHTML = "Version: " + data.version;
        footerVersion.innerHTML = "Version: " + data.version;
    });

// ===============================
// TEAM SYSTEM
// ===============================

const teamMembers = [
    { name: "LucaMaximal", rank: "Owner" },
    { name: "Eierfratze0815", rank: "Owner" },
    { name: "person12", rank: "Admin" },
    { name: "derMax", rank: "Moderator" },
    { name: "Dolo1898", rank: "Support" },
    { name: "Saro4444444", rank: "Creator" },
    { name: "LinusCreeperTH", rank: "Creator" }
];

const teamContainer = document.getElementById("team-container");

teamMembers.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="https://mc-heads.net/avatar/${member.name}" 
             alt="${member.name}" 
             style="width:80px;border-radius:8px;margin-bottom:10px;">
        <h3>${member.name}</h3>
        <p>${member.rank}</p>
    `;

    teamContainer.appendChild(card);
});

// ===============================
// PARTICLES BACKGROUND
// ===============================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,229,255,0.6)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
