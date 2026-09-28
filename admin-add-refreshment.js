import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const photoStatus = document.getElementById("photoStatus");
const statusMsg = document.getElementById("statusMsg");

let selectedPhoto = "";

photoInput.addEventListener("change", () => {

  const file = photoInput.files[0];

  if (!file) return;

  selectedPhoto = file.name;

  photoPreview.src = URL.createObjectURL(file);
  photoPreview.style.display = "block";
  photoStatus.textContent = file.name;

});

document.getElementById("saveCounter").addEventListener("click", async () => {

  const number = document.getElementById("counterNumber").value.trim();
  const location = document.getElementById("location").value.trim();

  if (!number || !location) {
    alert("Counter Number and Location are required.");
    return;
  }

  try {

    await set(ref(db, `refreshment/counter${number}`), {
      number,
      location,
      photo: selectedPhoto
    });

    statusMsg.textContent = "✅ Counter saved.";
    statusMsg.style.color = "green";

    setTimeout(() => {
      location.href = "admin-refreshment.html";
    }, 800);

  } catch (err) {

    console.error(err);

    statusMsg.textContent = "❌ Save failed.";
    statusMsg.style.color = "red";

  }

});
