const photos = [
  "001.jpg",
  "002.jpg",
  "003.jpg",
  "004.jpg",
  "005.jpg"
];

const gallery = document.getElementById("committeeGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

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
