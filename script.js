const pageLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

const heartButton = document.getElementById("heartButton");

const revealButton = document.getElementById("revealButton");
const messageBox = document.getElementById("messageBox");
const heartContainer = document.getElementById("heartContainer");

const playDemo = document.getElementById("playDemo");
const record = document.querySelector(".record");
const playerText = document.getElementById("playerText");

const audioPlayer = document.getElementById("audioPlayer");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");


// =========================
// PAGE NAVIGATION
// =========================

function showPage(pageName) {

  pages.forEach(page => {
    page.classList.remove("active-page");
  });

  const target = document.getElementById(pageName);

  if (target) {
    target.classList.add("active-page");
  }

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  history.replaceState(null, "", "#" + pageName);
}


pageLinks.forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    showPage(link.dataset.page);

  });

});


window.addEventListener("load", () => {

  const pageFromHash = location.hash.replace("#", "");

  if (document.getElementById(pageFromHash)) {
    showPage(pageFromHash);
  }

});


// =========================
// HEART BUTTON
// =========================

heartButton.addEventListener("click", () => {

  heartButton.textContent =
    heartButton.textContent === "♡" ? "♥" : "♡";

  heartButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.35)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 350
    }
  );

});


// =========================
// SURPRISE MESSAGE + HEARTS
// =========================

revealButton.addEventListener("click", () => {

  messageBox.classList.toggle("show");

  const isOpen = messageBox.classList.contains("show");

  revealButton.textContent = isOpen
    ? "💗 TUTUP PESAN"
    : "💌 Ada pesan dari aku";


  // Hanya membuat hati ketika pesan DIBUKA
  if (isOpen) {

    for (let i = 0; i < 12; i++) {

      const heart = document.createElement("span");

      heart.className = "floating-heart";

      heart.textContent =
        i % 2 === 0 ? "♡" : "♥";

      heart.style.setProperty(
        "--x",
        `${Math.random() * 180 - 90}px`
      );

      heart.style.setProperty(
        "--rotate",
        `${Math.random() * 60 - 30}deg`
      );

      heart.style.animationDelay =
        `${i * 0.08}s`;

      heartContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2500);

    }

  }

});


// =========================
// SONG PLAYER
// =========================

playDemo.addEventListener("click", () => {

  if (audioPlayer.paused) {

    audioPlayer.play();

    record.classList.add("playing");

    playDemo.textContent = "Ⅱ";

    playerText.textContent =
      "Playing our song ♡";

  } else {

    audioPlayer.pause();

    record.classList.remove("playing");

    playDemo.textContent = "▶";

    playerText.textContent =
      "Paused ♡";

  }

});


// =========================
// SONG TIMER
// =========================

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds =
    Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

}


// Menampilkan durasi total lagu
audioPlayer.addEventListener(
  "loadedmetadata",
  () => {

    duration.textContent =
      formatTime(audioPlayer.duration);

  }
);


// =========================
// SONG PROGRESS BAR
// =========================

audioPlayer.addEventListener(
  "timeupdate",
  () => {

    const current =
      audioPlayer.currentTime;

    const total =
      audioPlayer.duration;


    // Timer berjalan
    currentTime.textContent =
      formatTime(current);


    // Progress bar bergerak
    if (
      Number.isFinite(total) &&
      total > 0
    ) {

      const progress =
        (current / total) * 100;

      progressBar.style.width =
        `${progress}%`;

    }

  }
);


// Reset ketika lagu selesai
audioPlayer.addEventListener(
  "ended",
  () => {

    record.classList.remove("playing");

    playDemo.textContent = "▶";

    playerText.textContent =
      "Press play ♡";

    progressBar.style.width = "0%";

    currentTime.textContent = "0:00";

  }
);


// =========================
// MEMORY CARDS
// =========================

document
  .querySelectorAll(".photo-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      document
        .querySelectorAll(".photo-card")
        .forEach(item => {

          item.classList.remove("selected");

        });

      card.classList.add("selected");

    });

  });


// =========================
// MEMORY LIGHTBOX
// =========================

const photoCards =
  document.querySelectorAll(".photo-card");

const photoLightbox =
  document.getElementById("photoLightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxTitle =
  document.getElementById("lightboxTitle");

const lightboxClose =
  document.getElementById("lightboxClose");


photoCards.forEach(card => {

  card.addEventListener("click", () => {

    const image =
      card.dataset.image;

    const title =
      card.querySelector("h3").textContent;


    lightboxImage.src = image;

    lightboxImage.alt = title;

    lightboxTitle.textContent = title;


    photoLightbox.classList.add("show");

    document.body.style.overflow =
      "hidden";

  });

});


function closeLightbox() {

  photoLightbox.classList.remove("show");

  document.body.style.overflow = "";

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


photoLightbox.addEventListener(
  "click",
  event => {

    if (event.target === photoLightbox) {

      closeLightbox();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeLightbox();

    }

  }
);