const gallery = document.getElementById("committeeGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

async function loadGallery() {
  try {
    const response = await fetch("organising-committee/photos.json");
    const photos = await response.json();

    gallery.innerHTML = "";

    photos.forEach(photo => {
      gallery.innerHTML += `
        <div class="gallery-card">
          <img src="organising-committee/${photo}"
               alt="Organising Committee Photo"
               loading="lazy"
               data-src="organising-committee/${photo}">
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    gallery.innerHTML = "<p>Unable to load gallery.</p>";
  }
}

loadGallery();

// Open photo in full-screen
gallery.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;

  lightbox.style.display = "flex";
  lightboxImg.src = e.target.dataset.src;
});

// Close full-screen viewer
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("close-lightbox")) {
    lightbox.style.display = "none";
  }
});
