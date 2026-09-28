import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const params = new URLSearchParams(window.location.search);
const counterId = params.get("id");

const numberInput = document.getElementById("counterNumber");
const locationInput = document.getElementById("location");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const photoStatus = document.getElementById("photoStatus");
const statusMsg = document.getElementById("statusMsg");

let currentPhoto = "";

async function loadCounter() {

  const snap = await get(ref(db, "refreshment/" + counterId));

  if (!snap.exists()) return;

  const data = snap.val();

  numberInput.value = data.number || "";
  locationInput.value = data.location || "";

  currentPhoto = data.photo || "";

  if (currentPhoto) {
    photoPreview.src = "refreshment/" + currentPhoto;
    photoPreview.style.display = "block";
    photoStatus.textContent = currentPhoto;
  }

}

photoInput.addEventListener("change", () => {

  const file = photoInput.files[0];

  if (!file) return;

  currentPhoto = file.name;

  photoPreview.src = URL.createObjectURL(file);
  photoPreview.style.display = "block";
  photoStatus.textContent = file.name;

});

loadCounter();

document.getElementById("saveCounter").addEventListener("click", async () => {

  try {

    await update(ref(db, "refreshment/" + counterId), {
      number: numberInput.value.trim(),
      location: locationInput.value.trim(),
      photo: currentPhoto
    });

    statusMsg.textContent = "✅ Counter updated.";
    statusMsg.style.color = "green";

    setTimeout(() => {
      location.href = "admin-refreshment.html";
    }, 800);

  } catch (err) {

    console.error(err);

    statusMsg.textContent = "❌ Update failed.";
    statusMsg.style.color = "red";

  }

});
