import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSzp3WT1U8S-_1zlxP1xEE0sSX5ssrv-E",
  authDomain: "kolasib-presbytery-vawi-12-na.firebaseapp.com",
  databaseURL: "https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kolasib-presbytery-vawi-12-na",
  storageBucket: "kolasib-presbytery-vawi-12-na.firebasestorage.app",
  messagingSenderId: "515741204477",
  appId: "1:515741204477:web:995e01bfffdb1c553a2394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save Programme Item
document.getElementById("saveProgramme").onclick = async () => {

  const item = {
    date: document.getElementById("date").value,
    day: document.getElementById("day").value.trim(),
    time: document.getElementById("time").value.trim(),
    title: document.getElementById("title").value.trim(),
    speaker: document.getElementById("speaker").value.trim(),
    choir: document.getElementById("choir").value.trim()
  };

  if (!item.title || !item.time) {
    alert("Programme Title and Time are required.");
    return;
  }

  try {
    await push(ref(db, "programme"), item);

    document.getElementById("statusMsg").textContent =
      "✅ Programme item added successfully.";

    setTimeout(() => {
      window.location.href = "admin-programme.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    document.getElementById("statusMsg").textContent =
      "❌ Failed to save programme item.";
  }

};
