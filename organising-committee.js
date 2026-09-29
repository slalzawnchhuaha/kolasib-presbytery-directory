const photos = [
  "001.jpg",
  "002.jpg",
  "003.jpg",
  "004.jpg",
  "005.jpg"
];

const gallery = document.getElementById("committeeGallery");

photos.forEach(photo => {
  gallery.innerHTML += `
    <div class="gallery-card">
      <img src="organising-committee/${photo}"
           alt="Organising Committee Photo">
    </div>
  `;
});
