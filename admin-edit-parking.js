import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update
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

// Get parking ID from URL
const params = new URLSearchParams(window.location.search);
const parkingId = params.get("id");

// Form elements
const nameInput = document.getElementById("name");
const typeInput = document.getElementById("type");
const latInput = document.getElementById("latitude");
const lngInput = document.getElementById("longitude");
const statusMsg = document.getElementById("statusMsg");

// Load existing parking data
async function loadParking() {

  if (!parkingId) {
    statusMsg.textContent = "❌ Invalid parking ID.";
    statusMsg.style.color = "red";
    return;
  }

  const snap = await get(ref(db, "parking/" + parkingId));

  if (!snap.exists()) {
    statusMsg.textContent = "❌ Parking area not found.";
    statusMsg.style.color = "red";
    return;
  }

  const data = snap.val();

  nameInput.value = data.name || "";
  typeInput.value = data.type || "2 & 4 Wheeler";
  latInput.value = data.latitude || "";
  lngInput.value = data.longitude || "";
}

loadParking();

// Save changes
document.getElementById("saveParking").addEventListener("click", async () => {

  await update(ref(db, "parking/" + parkingId), {
    name: nameInput.value.trim(),
    type: typeInput.value,
    latitude: latInput.value.trim(),
    longitude: lngInput.value.trim()
  });

  statusMsg.textContent = "✅ Parking updated successfully.";
  statusMsg.style.color = "green";

  setTimeout(() => {
    window.location.href = "admin-parking.html";
  }, 1000);

});
