function toggleMenu(){
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function copyIP(){
    navigator.clipboard.writeText("homiecraft-smp.aternos.me");
    alert("IP kopiert!");
}

const scrollBtn=document.getElementById("scrollTop");
window.onscroll=()=>scrollBtn.style.display=
document.documentElement.scrollTop>300?"block":"none";

function scrollToTop(){
    window.scrollTo({top:0,behavior:"smooth"});
}

/* ACCORDION */
document.querySelectorAll(".accordion-header").forEach(h=>{
    h.addEventListener("click",()=>{
        const c=h.nextElementSibling;
        c.style.maxHeight=c.style.maxHeight?null:c.scrollHeight+"px";
    });
});

/* SERVER API */
fetch("https://api.mcsrvstat.us/2/homiecraft-smp.aternos.me")
.then(res=>res.json())
.then(data=>{
    if(!data||!data.players)return;

    if(data.online){
        document.getElementById("server-status").innerHTML=
        "🟢 Online – "+data.players.online+"/"+data.players.max;

        document.getElementById("status-card").innerHTML="Status: 🟢 Online";
    }else{
        document.getElementById("server-status").innerHTML="🔴 Offline";
        document.getElementById("status-card").innerHTML="Status: 🔴 Offline";
    }

    document.getElementById("players-card").innerHTML=
    "Spieler: "+data.players.online+"/30";

    document.getElementById("version-card").innerHTML=
    "Version: "+data.version;

    document.getElementById("footer-version").innerHTML=
    "Version: "+data.version;
});

/* TEAM */
const team=[
{name:"LucaMaximal",rank:"owner"},
{name:"Eierfratze0815",rank:"owner"},
{name:"person12",rank:"admin"},
{name:"derMax",rank:"moderator"},
{name:"Dolo1898",rank:"support"},
{name:"Saro4444444",rank:"creator"}
];

const container=document.getElementById("team-container");
team.forEach(m=>{
    const card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
    <img src="https://mc-heads.net/avatar/${m.name}" width="80" style="border-radius:10px;margin-bottom:10px;">
    <h3>${m.name}</h3>
    <p class="rank-${m.rank}">${m.rank.toUpperCase()}</p>
    `;
    container.appendChild(card);
});

/* PARTICLES */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=Array.from({length:60},()=>({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
dx:(Math.random()-0.5)*0.4,
dy:(Math.random()-0.5)*0.4
}));

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);
particles.forEach(p=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle="rgba(0,229,255,0.4)";
ctx.fill();
p.x+=p.dx;p.y+=p.dy;
});
requestAnimationFrame(animate);
}
animate();
