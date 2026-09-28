import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set
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

const saveBtn = document.getElementById("saveCounter");
const statusMsg = document.getElementById("statusMsg");

const photoInput = document.getElementById("photo");
const choosePhoto = document.getElementById("choosePhoto");
const photoPreview = document.getElementById("photoPreview");
const photoStatus = document.getElementById("photoStatus");

let selectedPhoto = null;

choosePhoto.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", () => {

  selectedPhoto = photoInput.files[0];

  if (!selectedPhoto) return;

  photoPreview.src = URL.createObjectURL(selectedPhoto);
  photoPreview.style.display = "block";
  photoStatus.textContent = selectedPhoto.name;

});

saveBtn.addEventListener("click", async () => {

  const item = {
  number: document.getElementById("counterNumber").value.trim(),
  location: document.getElementById("location").value.trim(),
  photo: selectedPhoto ? selectedPhoto.name : ""
};

  if (!item.number || !item.location) {
    alert("Counter Number and Location are required.");
    return;
  }

  try {

    await push(ref(db, "refreshment"), item);

    statusMsg.textContent = "✅ Counter saved successfully.";
    statusMsg.style.color = "green";

    setTimeout(() => {
      window.location.href = "admin-refreshment.html";
    }, 1000);

  } catch (err) {

    console.error(err);

    statusMsg.textContent = "❌ Failed to save counter.";
    statusMsg.style.color = "red";

  }

});
