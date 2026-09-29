const gallery = document.getElementById("committeeGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

let photos = [];
let currentIndex = 0;

async function loadGallery() {
  try {
    const response = await fetch("organising-committee/photos.json");
    photos = await response.json();

    gallery.innerHTML = "";

    photos.forEach((photo, index) => {
      gallery.innerHTML += `
        <div class="gallery-card">
          <img src="organising-committee/${photo}"
               alt="Organising Committee Photo"
               loading="lazy"
               data-index="${index}">
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    gallery.innerHTML = "<p>Unable to load gallery.</p>";
  }
}

loadGallery();

gallery.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;

  currentIndex = Number(e.target.dataset.index);
  showPhoto();
});

function showPhoto() {
  lightbox.style.display = "flex";
  lightboxImg.src = `organising-committee/${photos[currentIndex]}`;
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("close-lightbox")) {
    lightbox.style.display = "none";
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return;

  if (e.key === "Escape") lightbox.style.display = "none";

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto();
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showPhoto();
  }
});

// Mobile swipe support
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) < 50) return;

  if (diff < 0) {
    currentIndex = (currentIndex + 1) % photos.length;
  } else {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  }

  showPhoto();
});
