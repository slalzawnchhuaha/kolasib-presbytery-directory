import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration
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

const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("adminPassword");
const loginMsg = document.getElementById("loginMsg");

loginBtn.addEventListener("click", async () => {
  try {
    const entered = passwordInput.value.trim();

    const snap = await get(ref(db, "admin/password"));
    const realPassword = snap.val();

    if (entered === realPassword) {
      sessionStorage.setItem("adminLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      loginMsg.textContent = "Incorrect password.";
      loginMsg.style.color = "#DC2626";
    }
  } catch (err) {
    console.error(err);
    loginMsg.textContent = "Connection error.";
    loginMsg.style.color = "#DC2626";
  }
});
