document.addEventListener("DOMContentLoaded", function () {

    // BURGER MENU
    window.toggleMenu = function () {
        document.getElementById("sidebar")?.classList.toggle("active");
        document.getElementById("overlay")?.classList.toggle("active");
    };

    // COPY IP
    window.copyIP = function () {
        navigator.clipboard.writeText("homiecraft-smp.aternos.me");
        const btn = document.querySelector(".btn-primary");
        if (btn) {
            btn.innerText = "✔ Kopiert";
            setTimeout(() => { btn.innerText = "IP kopieren"; }, 2000);
        }
    };

    // SCROLL TOP
    const scrollBtn = document.getElementById("scrollTop");

    window.onscroll = function () {

        if (scrollBtn) {
            if (document.documentElement.scrollTop > 10) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        }

        fadeInSections();
        parallaxScroll();
    };

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ACCORDION
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            if (content) {
                content.style.maxHeight =
                    content.style.maxHeight ? null : content.scrollHeight + "px";
            }
        });
    });

    // SERVER API
    function loadServerStatus() {

        fetch("https://api.mcsrvstat.us/2/homiecraft-smp.aternos.me")
            .then(res => res.json())
            .then(data => {

                const statusEl = document.getElementById("server-status");
                const statusCard = document.getElementById("status-card");
                const playersCard = document.getElementById("players-card");
                const versionCard = document.getElementById("version-card");
                const footerVersion = document.getElementById("footer-version");

                if (!data) {
                    if (statusEl) statusEl.innerHTML = "Status unbekannt";
                    return;
                }

                if (data.online === true && data.players) {

                    const onlinePlayers = data.players.online ?? 0;
                    const maxPlayers = data.players.max ?? 30;

                    if (statusEl) statusEl.innerHTML = `🟢 Online – ${onlinePlayers}/${maxPlayers}`;
                    if (statusCard) statusCard.innerHTML = "Status: 🟢 Online";
                    if (playersCard) playersCard.innerHTML = `Spieler: ${onlinePlayers}/${maxPlayers}`;
                    if (versionCard) versionCard.innerHTML = `Version: ${data.version ?? "Unbekannt"}`;
                    if (footerVersion) footerVersion.innerHTML = `Version: ${data.version ?? "Unbekannt"}`;

                } else {

                    if (statusEl) statusEl.innerHTML = "🔴 Offline";
                    if (statusCard) statusCard.innerHTML = "Status: 🔴 Offline";
                    if (playersCard) playersCard.innerHTML = "Spieler: 0/30";
                    if (versionCard) versionCard.innerHTML = "Version: Unbekannt";
                    if (footerVersion) footerVersion.innerHTML = "";

                }

            })
            .catch(error => {
                console.error("API Fehler:", error);
                const el = document.getElementById("server-status");
                if (el) el.innerHTML = "⚠ API Fehler";
            });

    }

    loadServerStatus();
    setInterval(loadServerStatus, 60000);

    // TEAM SYSTEM
    const teamMembers = [
        { name: "LucaMaximal", rank: "owner" },
        { name: "Eierfratze0815", rank: "owner" },
        { name: "person12", rank: "admin" },
        { name: "LucaMaximal", rank: "developer" },
        { name: "derMax", rank: "moderator" },
        { name: "Dolo1989", rank: "support" },
        { name: "Saro4444444", rank: "creator" }
    ];

    const teamContainer = document.getElementById("team-container");

    if (teamContainer) {

        teamMembers.forEach(member => {

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="https://mc-heads.net/avatar/${member.name}" style="width:80px;border-radius:8px;margin-bottom:10px;">
                <h3>${member.name}</h3>
                <p class="rank-${member.rank}">${member.rank.toUpperCase()}</p>
            `;

            card.addEventListener("mouseover", () => {
                card.style.transform = "translateY(-7px)";
                card.style.boxShadow = `0 0 15px var(--${member.rank})`;
            });

            card.addEventListener("mouseout", () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "";
            });

            teamContainer.appendChild(card);

        });

    }

    // FADE-IN SECTIONS
    function fadeInSections() {

        document.querySelectorAll(".section,.hero").forEach(el => {

            const top = el.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {
                el.style.opacity = 1;
                el.style.transform = "translateY(0)";
            }

        });

        const hero = document.querySelector(".hero");

        if (hero) {
            hero.querySelectorAll(".hero-title,.subtitle,.hero-buttons").forEach(el => {
                el.style.opacity = 1;
                el.style.transform = "translateY(0)";
            });
        }

    }

    // PARTICLES & NEBEL
    const canvas = document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        for (let i = 0; i < 120; i++) {

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                color: Math.random() > 0.5 ? "#00e5ff" : "#a855f7"
            });

        }

        function animateParticles() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "rgba(15,17,23,0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
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

    }

    // PARALLAX SCROLL
    function parallaxScroll() {

        const scrolled = window.scrollY;

        document.querySelectorAll(".section").forEach((section, i) => {

            const speed = 0.05 + (i * 0.01);

            section.style.transform =
                `translateY(${scrolled * speed}px)
                 rotateX(${scrolled * 0.02}deg)`;

        });

    }

});
