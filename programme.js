import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const container = document.getElementById("programmeContent");
const dayButtons = document.querySelectorAll(".day-btn");

let programmeItems = [];
let currentTab = "day1";

const dateMap = {
  day1: "2026-10-09",
  day2: "2026-10-10",
  day3: "2026-10-11"
};

function timeToMinutes(time) {
  const m = (time || "").match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;

  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const ap = m[3].toUpperCase();

  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;

  return h * 60 + min;
}

function render() {

  container.innerHTML = "";

 if (currentTab === "agenda") {

  get(ref(db, "agenda")).then((snap) => {

    const data = snap.val() || {};

    container.innerHTML = `
      <div class="programme-card agenda-card">
  <div class="details">
          <h3>📝 Agenda</h3>
          <p style="white-space:pre-line;">${data.agenda || "No agenda yet."}</p>
        </div>
      </div>

     <div class="programme-card agenda-card">
  <div class="details">
          <h3>📍 Bial</h3>
          <p style="white-space:pre-line;">${data.bial || "No bial yet."}</p>
        </div>
      </div>
    `;
  });

  return;
}

  const selectedDate = dateMap[currentTab];

  const items = programmeItems
    .filter(i => i.date === selectedDate)
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  if (items.length === 0) {

    container.innerHTML = `
      <div class="programme-card">
        <div class="details">
          <h3>No programme yet</h3>
          <p>Add items from the Admin Panel.</p>
        </div>
      </div>`;
    return;
  }

  items.forEach(item => {

    container.innerHTML += `
      <div class="programme-card">

        <div class="time">${item.time}</div>

        <div class="details">

          <h3>${item.title}</h3>

          ${item.speaker ? `<p>🎤 ${item.speaker}</p>` : ""}

          ${item.choir ? `<p>🎵 ${item.choir}</p>` : ""}

        </div>

      </div>`;
  });
}

// Live updates from Firebase
onValue(ref(db, "programme"), snap => {

  const data = snap.val() || {};

  programmeItems = Object.values(data);

  render();

});

// Day tab switching
dayButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    dayButtons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    currentTab = btn.dataset.day;

    render();

  });

});
