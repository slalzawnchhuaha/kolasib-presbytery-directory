It 404 in the direct url

Perfect. Since you've already completed Step 5 (organising-committee.js), let's add the feature that will make this gallery feel premium: tap any photo to view it full-screen, just like Google Photos.

Step 8 — Add Full-Screen Photo Viewer (Lightbox)

Open organising-committee.js and make these two changes.

A. At the top, add these two lines

Right below:

const gallery = document.getElementById("committeeGallery");

add:

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
B. Replace the image block

Find this part:

<img src="organising-committee/${photo}"
     alt="Organising Committee Photo"
     loading="lazy">

Replace it with this:

<img src="organising-committee/${photo}"
     alt="Organising Committee Photo"
     loading="lazy"
     onclick="openPhoto(this.src)">
C. Add these functions at the very bottom

Paste this after loadGallery();

function openPhoto(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("close-lightbox")) {
    lightbox.style.display = "none";
  }
});
Result

Now when someone opens:

Home → Organising Committee → Tumpui Kohhran

they'll get:

📸 Responsive photo gallery.

👆 Tap any photo to open it full-screen.

✖ Tap outside the photo or the × button to close.

4
Next Feature (worth adding)

The next improvement is one I think will suit your Presbytery app very well: swipe left/right in full-screen mode to move to the next or previous photo, exactly like WhatsApp or Google Photos. It works smoothly on phones and doesn't require any extra library.

The code in Step B is noty available in my organising-committee.js script

You're right. I looked back at your actual organising-committee.js, and it doesn't contain that standalone <img> block. It's inside a template literal. Let's modify your version instead.

Step 8 (Correct for your file)
1. Add these two lines at the top

Find:

const gallery = document.getElementById("committeeGallery");

Immediately below it, add:

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
2. Replace this entire section

In your photos.forEach(photo => { ... }), you currently have something like:

gallery.innerHTML += `
  <div class="gallery-card">
    <img src="organising-committee/${photo}"
         alt="Organising Committee Photo"
         loading="lazy">
  </div>
`;

Replace it with this:

gallery.innerHTML += `
  <div class="gallery-card">
    <img src="organising-committee/${photo}"
         alt="Organising Committee Photo"
         loading="lazy"
         data-src="organising-committee/${photo}">
  </div>
`;
3. Add this at the bottom of the file

Paste this after loadGallery();

gallery.addEventListener("click", (e) => {

  if (e.target.tagName !== "IMG") return;

  lightbox.style.display = "flex";
  lightboxImg.src = e.target.dataset.src;

});

lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox || e.target.classList.contains("close-lightbox")) {
    lightbox.style.display = "none";
  }

});
Result

Now:

📸 Tap any photo → it opens full-screen.

✖ Tap outside the photo or the × button → it closes.

One improvement I'd recommend next

Instead of a plain full-screen viewer, we can make it swipe left/right between photos, just like WhatsApp or Google Photos. It's only about 20 extra lines of JavaScript and works beautifully on phones.

Step 3 : the script is noit there

You're right. Rather than hunting for lines that may not exist anymore, let's replace organising-committee.js completely with a version that works with the photos.json gallery and the full-screen lightbox.

Replace the entire organising-committee.js with this
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
Make sure organising-committee.html has this

Just above the script tag, you should have:

<div id="lightbox" class="lightbox">
  <span class="close-lightbox">&times;</span>
  <img id="lightboxImg" alt="Photo">
</div>

<script src="organising-committee.js"></script>

After this, tapping any photo will open it full-screen, and tapping outside the photo or the × will close it.

Next feature

I can make this gallery feel like a native iPhone/Android gallery by adding swipe left/right, pinch-to-zoom, and next/previous arrows—all without changing your app's design.
