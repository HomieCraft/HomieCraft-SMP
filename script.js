function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function copyIP() {
    navigator.clipboard.writeText("homiecraft-smp.aternos.me");
    const btn = document.querySelector(".btn-primary");
    btn.innerText = "✔ Kopiert";
    setTimeout(() => btn.innerText = "IP kopieren", 2000);
}

const scrollBtn = document.getElementById("scrollTop");

window.onscroll = function () {
    scrollBtn.style.display =
        document.documentElement.scrollTop > 300 ? "block" : "none";
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        content.style.maxHeight =
            content.style.maxHeight ? null : content.scrollHeight + "px";
    });
});

fetch("https://api.mcsrvstat.us/2/homiecraft-smp.aternos.me")
.then(res => res.json())
.then(data => {
    if (!data) return;

    document.getElementById("server-status").innerHTML =
        data.online ? `🟢 ${data.players.online}/${data.players.max}` : "🔴 Offline";

    document.getElementById("status-card").innerHTML =
        data.online ? "Status: 🟢 Online" : "Status: 🔴 Offline";

    document.getElementById("players-card").innerHTML =
        `Spieler: ${data.players.online}/30`;

    document.getElementById("version-card").innerHTML =
        `Version: ${data.version}`;

    document.getElementById("footer-version").innerHTML =
        `Version: ${data.version}`;
});

const teamMembers = [
    { name: "LucaMaximal", rank: "owner" },
    { name: "Eierfratze0815", rank: "owner" },
    { name: "person12", rank: "admin" },
    { name: "derMax", rank: "moderator" },
    { name: "Dolo1898", rank: "support" },
    { name: "Saro4444444", rank: "creator" }
];

const container = document.getElementById("team-container");

teamMembers.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="https://mc-heads.net/avatar/${member.name}" width="90">
        <h3>${member.name}</h3>
        <p class="rank-${member.rank}">${member.rank.toUpperCase()}</p>
    `;
    container.appendChild(card);
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
}));

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(0,229,255,0.6)";
        ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(animate);
}
animate();
