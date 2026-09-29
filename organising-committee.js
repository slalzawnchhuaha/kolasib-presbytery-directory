import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSzp3WT1U8S-_1zlxP1xEE0sSX5ssrv-E",
  authDomain: "kolasib-presbytery-vawi-12-na.firebaseapp.com",
  databaseURL: "https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kolasib-presbytery-vawi-12-na",
  storageBucket: "kolasib-presbytery-vawi-12-na.firebasestorage.app",
  messagingSenderId: "515741204477",
  appId: "1:515741204477:web:995e01bfffdb1c553a2394"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const gallery = document.getElementById("committeeGallery");

async function loadPhotos() {
  const snap = await get(ref(db, "organisingCommittee"));
  const data = snap.val() || {};

  gallery.innerHTML = "";

  Object.values(data)
    .sort((a, b) => (b.uploaded || 0) - (a.uploaded || 0))
    .forEach(photo => {

      gallery.innerHTML += `
        <div class="gallery-card">
          <img src="${photo.url}" alt="${photo.name}">
        </div>
      `;

    });
}

loadPhotos();
