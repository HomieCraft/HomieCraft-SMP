document.addEventListener("DOMContentLoaded",function(){

// BURGER MENU
window.toggleMenu=function(){
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
};

// COPY IP
window.copyIP=function(){
    navigator.clipboard.writeText("homiecraft-smp.aternos.me");
    const btn=document.querySelector(".btn-primary");
    btn.innerText="✔ Kopiert";
    setTimeout(()=>{btn.innerText="IP kopieren";},2000);
};

// SCROLL TOP
const scrollBtn=document.getElementById("scrollTop");
window.onscroll=function(){
    if(document.documentElement.scrollTop>10){scrollBtn.style.display="block";}
    else{scrollBtn.style.display="none";}
    fadeInSections();
    parallaxScroll();
};
window.scrollToTop=function(){window.scrollTo({top:0,behavior:"smooth"});};

// ACCORDION
document.querySelectorAll(".accordion-header").forEach(header=>{
    header.addEventListener("click",()=>{
        const content=header.nextElementSibling;
        content.style.maxHeight=content.style.maxHeight?null:content.scrollHeight+"px";
    });
});

// SERVER API
function loadServerStatus(){
    fetch("https://api.mcsrvstat.us/2/homiecraft-smp.aternos.me")
    .then(res=>res.json())
    .then(data=>{
        const statusEl=document.getElementById("server-status");
        const statusCard=document.getElementById("status-card");
        const playersCard=document.getElementById("players-card");
        const versionCard=document.getElementById("version-card");
        const footerVersion=document.getElementById("footer-version");
        if(!data){statusEl.innerHTML="Status unbekannt"; return;}
        if(data.online===true && data.players){
            const onlinePlayers=data.players.online??0;
            const maxPlayers=data.players.max??30;
            statusEl.innerHTML=`🟢 Online – ${onlinePlayers}/${maxPlayers}`;
            statusCard.innerHTML="Status: 🟢 Online";
            playersCard.innerHTML=`Spieler: ${onlinePlayers}/${maxPlayers}`;
            versionCard.innerHTML=`Version: ${data.version??"Unbekannt"}`;
            footerVersion.innerHTML=`Version: ${data.version??"Unbekannt"}`;
        }else{
            statusEl.innerHTML="🔴 Offline";
            statusCard.innerHTML="Status: 🔴 Offline";
            playersCard.innerHTML="Spieler: 0/30";
            versionCard.innerHTML="Version: Unbekannt";
            footerVersion.innerHTML="";
        }
    }).catch(error=>{
        console.error("API Fehler:",error);
        document.getElementById("server-status").innerHTML="⚠ API Fehler";
    });
}
loadServerStatus();
setInterval(loadServerStatus,60000);

// TEAM SYSTEM
const teamMembers=[
    {name:"LucaMaximal",rank:"owner"},
    {name:"Eierfratze0815",rank:"owner"},
    {name:"person12",rank:"admin"},
    {name:"LucaMaximal",rank:"developer"},
    {name:"derMax",rank:"moderator"},
    {name:"Dolo1989",rank:"support"},
    {name:"Saro4444444",rank:"creator"}
];
const teamContainer=document.getElementById("team-container");
teamMembers.forEach(member=>{
    const card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
        <img src="https://mc-heads.net/avatar/${member.name}" style="width:80px;border-radius:8px;margin-bottom:10px;">
        <h3>${member.name}</h3>
        <p class="rank-${member.rank}">${member.rank.toUpperCase()}</p>
    `;
    card.addEventListener("mouseover",()=>{card.style.transform="translateY(-7px)";card.style.boxShadow=`0 0 15px var(--${member.rank})`;});
    card.addEventListener("mouseout",()=>{card.style.transform="translateY(0)";card.style.boxShadow="";});
    teamContainer.appendChild(card);
});

// FADE-IN SECTIONS
function fadeInSections(){
    document.querySelectorAll(".section,.hero").forEach(el=>{
        const top=el.getBoundingClientRect().top;
        if(top<window.innerHeight-100){el.style.opacity=1;el.style.transform="translateY(0)";}
    });
    // hero text/buttons
    const hero=document.querySelector(".hero");
    hero.querySelectorAll(".hero-title,.subtitle,.hero-buttons").forEach(el=>{el.style.opacity=1; el.style.transform="translateY(0)";});
}

// PARTICLES & NEBEL
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];
for(let i=0;i<100;i++){particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2+1,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5
});}
function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Nebel
    ctx.fillStyle="rgba(15,17,23,0.15)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(0,229,255,0.2)";
        ctx.fill();
        p.x+=p.dx;p.y+=p.dy;
        if(p.x<0||p.x>canvas.width)p.dx*=-1;
        if(p.y<0||p.y>canvas.height)p.dy*=-1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

// PARALLAX SCROLL
function parallaxScroll(){
    const scrolled = window.scrollY;
    document.querySelectorAll(".section").forEach(el=>{
        el.style.transform = `translateY(${scrolled * 0.05}px)`;
    });
}
});
