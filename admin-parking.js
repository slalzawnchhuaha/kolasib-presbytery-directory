import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
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

const list = document.getElementById("parkingList");

let parkingAreas = [];

async function loadParking() {

  const snap = await get(ref(db, "parking"));

  const data = snap.val() || {};

  parkingAreas = Object.entries(data).map(([id, value]) => ({
    id,
    ...value
  }));

  render();

}

function render() {

  list.innerHTML = "";

  parkingAreas.forEach(p => {

    const mapLink =
      `https://www.google.com/maps?q=${p.latitude},${p.longitude}`;

    list.innerHTML += `
      <div class="card">

        <h3>${p.name}</h3>

        <p>📍 ${p.latitude}, ${p.longitude}</p>

        <div class="admin-actions">

          <a href="${mapLink}" target="_blank" class="edit-btn">
            🗺️ Maps
          </a>

          <a href="admin-edit-parking.html?id=${p.id}" class="edit-btn">
            ✏️ Edit
          </a>

          <button class="delete-btn" data-id="${p.id}">
            🗑️ Delete
          </button>

        </div>

      </div>`;
  });

}

list.addEventListener("click", async e => {

  if (!e.target.classList.contains("delete-btn")) return;

  if (confirm("Delete this parking area?")) {

    await remove(ref(db, "parking/" + e.target.dataset.id));

    loadParking();

  }

});

loadParking();
