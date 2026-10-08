import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Load member statistics
fetch("https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json")
  .then(r => r.json())
  .then(data => {
    const contacts = Object.values(data || {});

    document.getElementById("totalMembers").textContent = contacts.length;
    document.getElementById("totalVillages").textContent =
      new Set(contacts.map(c => c.village).filter(Boolean)).size;
    document.getElementById("totalChurches").textContent =
      new Set(contacts.map(c => c.church).filter(Boolean)).size;
  })
  .catch(console.error);

// ===== Smart Visitor Counter (One visit per device per day) =====

const visitorEl = document.getElementById("visitorCount");
const visitsRef = ref(db, "stats/visits");

const today = new Date().toISOString().split("T")[0];
const lastVisit = localStorage.getItem("lastVisitDate");

async function updateVisitorCounter() {
  try {
    if (lastVisit !== today) {
      await runTransaction(visitsRef, current => (current || 0) + 1);
      localStorage.setItem("lastVisitDate", today);
    }

    const snapshot = await get(visitsRef);

    if (visitorEl) {
      visitorEl.textContent = snapshot.val() || 0;
    }

  } catch (err) {
    console.error(err);
  }
}

updateVisitorCounter();
// ===== Secret Admin Access (PC + Mobile) =====

const adminLogo = document.getElementById("adminLogo");

if (adminLogo) {
  let pressTimer = null;

  const startPress = (e) => {
    e.preventDefault();
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      window.location.href = "admin-login.html";
    }, 5000);
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  adminLogo.addEventListener("pointerdown", startPress);
  adminLogo.addEventListener("pointerup", cancelPress);
  adminLogo.addEventListener("pointerleave", cancelPress);
  adminLogo.addEventListener("pointercancel", cancelPress);
  adminLogo.addEventListener("contextmenu", (e) => e.preventDefault());
}

// ===== YouTube Live Button =====

const btnLive = document.getElementById("btnLive");

if (btnLive) {
  btnLive.addEventListener("click", () => {
    window.location.href = "live.html";
  });
}
