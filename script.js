
/* ==========================================
   PREMIUM WEDDING WEBSITE 2026
   script.js
========================================== */

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const website = document.getElementById("website");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

        website.classList.remove("hidden");

    }, 3000);

});

/* ==========================================
   ENVELOPE
========================================== */

const envelope = document.querySelector(".envelope");

const openButton = document.getElementById("openInvitation");

const envelopeSection = document.getElementById("envelopeSection");

if (openButton && envelope) {

    openButton.addEventListener("click", () => {

        envelope.classList.add("open");

        setTimeout(() => {

            envelopeSection.style.display = "none";

            document.getElementById("website").scrollIntoView({
                behavior: "smooth"
            });

        }, 1800);

        playBackgroundMusic();

    });

}

/* ==========================================
   BACKGROUND MUSIC
========================================== */

const music = document.getElementById("bgMusic");

const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;

function playBackgroundMusic() {

    if (!music || musicStarted) return;

    music.volume = 0.4;

    music.play().then(() => {

        musicStarted = true;

        if (musicToggle) {

            musicToggle.textContent = "🔊";

        }

    }).catch(() => {

        console.log("Autoplay blocked until user interaction.");

    });

}

if (musicToggle && music) {

    musicToggle.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicToggle.textContent = "🔊";

        } else {

            music.pause();

            musicToggle.textContent = "🔇";

        }

    });

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/* ==========================================
   LIVE COUNTDOWN
========================================== */

const weddingDate = new Date("September 18, 2026 18:00:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        if (daysElement) daysElement.textContent = "000";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    if (daysElement)
        daysElement.textContent = String(days).padStart(3, "0");

    if (hoursElement)
        hoursElement.textContent = String(hours).padStart(2, "0");

    if (minutesElement)
        minutesElement.textContent = String(minutes).padStart(2, "0");

    if (secondsElement)
        secondsElement.textContent = String(seconds).padStart(2, "0");

}

/* ---------- START ---------- */

updateCountdown();

setInterval(updateCountdown, 1000);

/* ==========================================
   COUNTDOWN CARD ANIMATION
========================================== */

const countdownCards = document.querySelectorAll(".time-box");

setInterval(() => {

    countdownCards.forEach((card, index) => {

        setTimeout(() => {

            card.animate(

                [

                    {

                        transform: "translateY(0px)"

                    },

                    {

                        transform: "translateY(-8px)"

                    },

                    {

                        transform: "translateY(0px)"

                    }

                ],

                {

                    duration: 600,

                    easing: "ease"

                }

            );

        }, index * 120);

    });

}, 5000);
/* ==========================================
   PREMIUM MUSIC PLAYER
========================================== */

const bgMusic = document.getElementById("bgMusic");

const playBtn = document.getElementById("playMusic");

const pauseBtn = document.getElementById("pauseMusic");

const volumeSlider = document.getElementById("volumeControl");

/* ---------- DEFAULT ---------- */

if(bgMusic){

    bgMusic.loop = true;

    bgMusic.volume = 0.4;

}

/* ---------- PLAY ---------- */

if(playBtn){

playBtn.addEventListener("click",()=>{

    bgMusic.play();

    musicStarted = true;

});

}

/* ---------- PAUSE ---------- */

if(pauseBtn){

pauseBtn.addEventListener("click",()=>{

    bgMusic.pause();

});

}

/* ---------- VOLUME ---------- */

if(volumeSlider){

volumeSlider.addEventListener("input",(e)=>{

    bgMusic.volume=e.target.value;

});

}

/* ---------- FADE IN ---------- */

function fadeInMusic(){

if(!bgMusic) return;

bgMusic.volume=0;

bgMusic.play();

let volume=0;

const fade=setInterval(()=>{

volume+=0.05;

bgMusic.volume=Math.min(volume,0.4);

if(volume>=0.4){

clearInterval(fade);

}

},150);

}

/* ---------- FADE OUT ---------- */

function fadeOutMusic(){

if(!bgMusic) return;

let volume=bgMusic.volume;

const fade=setInterval(()=>{

volume-=0.05;

bgMusic.volume=Math.max(volume,0);

if(volume<=0){

clearInterval(fade);

bgMusic.pause();

}

},150);

}

/* ---------- SAVE STATE ---------- */

window.addEventListener("beforeunload",()=>{

localStorage.setItem("musicTime",bgMusic.currentTime);

localStorage.setItem("musicPlaying",!bgMusic.paused);

});

/* ---------- RESTORE ---------- */

window.addEventListener("load",()=>{

const time=localStorage.getItem("musicTime");

const playing=localStorage.getItem("musicPlaying");

if(time){

bgMusic.currentTime=parseFloat(time);

}

if(playing==="true"){

bgMusic.play().catch(()=>{});

}

});
/* ==========================================
   PREMIUM GALLERY
========================================== */

const galleryImages = document.querySelectorAll(".gallery-slider img");

let currentImage = 0;

/* ---------- CREATE MODAL ---------- */

const modal = document.createElement("div");
modal.className = "gallery-modal";

const modalImage = document.createElement("img");

const closeButton = document.createElement("span");
closeButton.className = "gallery-close";
closeButton.innerHTML = "&times;";

modal.appendChild(closeButton);
modal.appendChild(modalImage);

document.body.appendChild(modal);

/* ---------- OPEN ---------- */

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentImage = index;

        modalImage.src = image.src;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

/* ---------- CLOSE ---------- */

function closeGallery() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

closeButton.addEventListener("click", closeGallery);

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeGallery();

    }

});

/* ---------- KEYBOARD ---------- */

document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {

        closeGallery();

    }

    if (e.key === "ArrowRight") {

        currentImage++;

        if (currentImage >= galleryImages.length) {

            currentImage = 0;

        }

        modalImage.src = galleryImages[currentImage].src;

    }

    if (e.key === "ArrowLeft") {

        currentImage--;

        if (currentImage < 0) {

            currentImage = galleryImages.length - 1;

        }

        modalImage.src = galleryImages[currentImage].src;

    }

});

/* ---------- MOBILE SWIPE ---------- */

let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

modal.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < 40) return;

    if (diff > 0) {

        currentImage++;

        if (currentImage >= galleryImages.length) {

            currentImage = 0;

        }

    } else {

        currentImage--;

        if (currentImage < 0) {

            currentImage = galleryImages.length - 1;

        }

    }

    modalImage.src = galleryImages[currentImage].src;

});
/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(

    "section, .timeline-item, .love-content, .time-box, footer"

);

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            element.classList.add("active");
            element.classList.add("reveal");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* ==========================================
   PARALLAX HERO
========================================== */

const hero = document.getElementById("hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const y = window.scrollY;

    hero.style.backgroundPositionY = `${y * 0.35}px`;

});

/* ==========================================
   FLOATING RINGS
========================================== */

const rings = document.querySelector(".rings");

if (rings) {

    setInterval(() => {

        rings.animate(

            [

                {

                    transform: "translateY(0px) rotate(0deg)"

                },

                {

                    transform: "translateY(-10px) rotate(4deg)"

                },

                {

                    transform: "translateY(0px) rotate(0deg)"

                }

            ],

            {

                duration: 2500,

                easing: "ease-in-out"

            }

        );

    }, 2600);

}

/* ==========================================
   GOLDEN BUTTON EFFECT
========================================== */

document.querySelectorAll("button,.hero-button").forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.animate(

            [

                {

                    transform: "scale(1)"

                },

                {

                    transform: "scale(1.05)"

                },

                {

                    transform: "scale(1)"

                }

            ],

            {

                duration: 400

            }

        );

    });

});
/* ==========================================
   FLOATING HEARTS
========================================== */

const HEARTS_COUNT = 12;

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const hearts = ["❤️", "💖", "💛", "🤍"];

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (18 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (8 + Math.random() * 5) + "s";

    heart.style.opacity =
        0.3 + Math.random() * 0.7;

    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}

/* ---------- INITIAL ---------- */

for (let i = 0; i < HEARTS_COUNT; i++) {

    setTimeout(createHeart, i * 600);

}

/* ---------- LOOP ---------- */

setInterval(createHeart, 1800);

/* ==========================================
   GOLDEN SPARKLES
========================================== */

function createSparkle() {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = Math.random() * 100 + "vw";

    sparkle.style.top = Math.random() * 100 + "vh";

    sparkle.style.animationDuration =
        (2 + Math.random() * 2) + "s";

    document.body.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 4000);

}

/* ---------- LOOP ---------- */

setInterval(createSparkle, 500);

for (let i = 0; i < 20; i++) {

    createSparkle();

}
/* ==========================================
   CONFETTI EFFECT
========================================== */

function createConfetti(amount = 80) {

    const colors = [
        "gold",
        "white",
        "pink"
    ];

    for(let i = 0; i < amount; i++){

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.width =
            (5 + Math.random() * 8) + "px";

        confetti.style.height =
            (10 + Math.random() * 15) + "px";

        confetti.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        confetti.style.transform =
            `rotate(${Math.random()*360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.remove();

        },7000);

    }

}


/* ==========================================
   FIREWORKS
========================================== */

function createFirework(x,y){

    const particles = 25;

    for(let i=0;i<particles;i++){

        const particle =
            document.createElement("div");

        particle.className="firework";

        particle.style.left=x+"px";

        particle.style.top=y+"px";

        const angle =
            Math.random()*Math.PI*2;

        const distance =
            40 + Math.random()*100;


        particle.style.setProperty(
            "--x",
            Math.cos(angle)*distance+"px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle)*distance+"px"
        );


        document.body.appendChild(particle);


        setTimeout(()=>{

            particle.remove();

        },1500);

    }

}


/* ==========================================
   OPEN INVITATION CELEBRATION
========================================== */

if(openButton){

openButton.addEventListener("click",()=>{

    setTimeout(()=>{

        createConfetti(120);

        createFirework(
            window.innerWidth/2,
            window.innerHeight/3
        );

    },1800);

});

}


/* ==========================================
   RSVP SUCCESS CELEBRATION
========================================== */

function successCelebration(){

    createConfetti(100);

    createFirework(

        window.innerWidth/2,

        window.innerHeight/2

    );

}
/* =========================================
   CONFETTI & FIREWORKS
========================================= */

.confetti{

position:fixed;

background:#d4af37;

z-index:99999;

animation:confettiFall linear forwards;

}


@keyframes confettiFall{

to{

transform:
translateY(110vh)
rotate(720deg);

}

}



.firework{

position:fixed;

width:6px;

height:6px;

background:#ffd95a;

border-radius:50%;

z-index:99999;

animation:
fireworkExplode 1.5s ease-out forwards;

}


@keyframes fireworkExplode{

from{

transform:
translate(0,0);

opacity:1;

}

to{

transform:
translate(var(--x),var(--y));

opacity:0;

}

}
/* ==========================================
   RSVP FORM
========================================== */

const rsvpForm = document.getElementById("rsvpForm");


const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";


if(rsvpForm){


rsvpForm.addEventListener("submit", async (e)=>{


e.preventDefault();


const name =
document.getElementById("guestName").value.trim();


const phone =
document.getElementById("phone").value.trim();


const guests =
document.getElementById("guests").value;


const attendance =
document.getElementById("attendance").value;


const message =
document.getElementById("message").value.trim();



/* ---------- VALIDATION ---------- */


if(name === "" || phone === ""){


alert("Please fill your name and phone number.");

return;


}



/* ---------- DATA ---------- */


const data = {


name:name,

phone:phone,

guests:guests,

attendance:attendance,

message:message,

date:new Date().toLocaleString()


};



/* ---------- SAVE LOCAL ---------- */


localStorage.setItem(

"weddingRSVP",

JSON.stringify(data)

);



/* ---------- SEND GOOGLE SHEETS ---------- */


try{


await fetch(

GOOGLE_SCRIPT_URL,

{


method:"POST",

mode:"no-cors",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify(data)


}

);



showSuccess();



}

catch(error){


console.log(error);


showSuccess();


}



});


}



/* ==========================================
   SUCCESS MESSAGE
========================================== */


function showSuccess(){


const message =
document.createElement("div");


message.className =
"success-message";


message.innerHTML =

"❤️ Thank you! Your response has been received.";


document

.getElementById("rsvpForm")

.appendChild(message);



setTimeout(()=>{


message.classList.add("show");


successCelebration();


},300);



setTimeout(()=>{


message.remove();


},6000);



rsvpForm.reset();


}
/* ==========================================
   PWA SERVICE WORKER
========================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
        .register("service-worker.js")

        .then(() => {

            console.log(
                "Service Worker registered"
            );

        })

        .catch((error)=>{

            console.log(
                "Service Worker error:",
                error
            );

        });

    });

}


/* ==========================================
   IMAGE LAZY LOADING
========================================== */

const lazyImages =
document.querySelectorAll(
"img"
);


const imageObserver =
new IntersectionObserver(
(entries, observer)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


const img =
entry.target;


img.classList.add(
"loaded"
);


observer.unobserve(img);


}


});


},
{

threshold:0.2

}
);



lazyImages.forEach(img=>{


imageObserver.observe(img);


});



/* ==========================================
   PREVENT DOUBLE SUBMIT
========================================== */


if(rsvpForm){


rsvpForm.addEventListener(
"submit",
()=>{


const button =
rsvpForm.querySelector("button");


if(button){


button.disabled=true;


button.innerHTML=
"Sending ❤️";


setTimeout(()=>{


button.disabled=false;


button.innerHTML=
"Send RSVP";


},5000);


}


}

);


}


/* ==========================================
   PAGE VISIBILITY MUSIC CONTROL
========================================== */


document.addEventListener(
"visibilitychange",
()=>{


if(!bgMusic) return;



if(document.hidden){


bgMusic.pause();


}

else{


if(musicStarted){


bgMusic.play()
.catch(()=>{});


}


}


});
/* ==========================================
   FINAL PREMIUM INITIALIZATION
========================================== */


/* ---------- ADD REVEAL CLASS ---------- */

window.addEventListener("DOMContentLoaded",()=>{


const animatedElements =
document.querySelectorAll(
"section, footer, .time-box, .timeline-content, .love-content"
);



animatedElements.forEach(element=>{


element.classList.add("reveal");


});


});



/* ---------- MEMORY CLEANUP ---------- */


function cleanOldEffects(){


const effects =
document.querySelectorAll(
".floating-heart, .sparkle, .petal, .confetti, .firework"
);



if(effects.length > 150){


effects.forEach((item,index)=>{


if(index < 50){

item.remove();

}


});


}


}



setInterval(
cleanOldEffects,
10000
);



/* ---------- PREMIUM MODE ---------- */


document.body.classList.add(
"premium-mode"
);



/* ---------- DATE DISPLAY ---------- */


const weddingYear =
document.querySelectorAll(
".wedding-year"
);



weddingYear.forEach(item=>{


item.textContent =
"2026";


});



/* ---------- CONSOLE MESSAGE ---------- */


console.log(
`
💍 Premium Wedding Website 2026

Muhammetşazada ❤️ Dünýagözel

Luxury Mode Activated ✨
`
);



/* ---------- INTRO EFFECT ---------- */


window.addEventListener(
"load",
()=>{


setTimeout(()=>{


document.body.classList.add(
"loaded"
);


},3500);


});
/* ==========================================
   FINAL OPTIMIZATION
========================================== */


/* ---------- SAFE SELECT ---------- */

function exists(element){

    return element !== null &&
           element !== undefined;

}


/* ---------- DISABLE RIGHT CLICK (OPTIONAL) ---------- */

document.addEventListener(
"contextmenu",
(e)=>{

    e.preventDefault();

});


/* ---------- OPTIMIZED SCROLL ---------- */

let ticking = false;


window.addEventListener(
"scroll",
()=>{


if(!ticking){


window.requestAnimationFrame(()=>{


revealOnScroll();


ticking=false;


});


ticking=true;


}


});



/* ---------- CONNECTION CHECK ---------- */

window.addEventListener(
"online",
()=>{

console.log(
"Internet connection restored"
);

});


window.addEventListener(
"offline",
()=>{

console.log(
"Offline mode enabled"
);

});



/* ---------- PRELOAD IMPORTANT IMAGES ---------- */

const importantImages=[

"assets/images/hero.jpg",

"assets/images/photo1.jpg"

];


importantImages.forEach(src=>{


const img=new Image();

img.src=src;


});



/* ---------- FINAL START ---------- */

window.addEventListener(
"load",
()=>{


console.log(
`
━━━━━━━━━━━━━━━━━━

💍 Wedding Invitation Loaded

Muhammetşazada ❤️ Dünýagözel

18 September 2026

Premium Experience Ready ✨

━━━━━━━━━━━━━━━━━━
`
);


});

