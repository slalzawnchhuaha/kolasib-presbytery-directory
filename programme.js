import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
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

const container = document.getElementById("programmeList");

function timeToMinutes(t) {
  const m = (t || "").match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;

  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const ap = m[3].toUpperCase();

  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;

  return h * 60 + min;
}

onValue(ref(db, "programme"), (snap) => {

  const data = snap.val() || {};

  const items = Object.values(data).sort((a, b) => {
    if ((a.date || "") !== (b.date || ""))
      return (a.date || "").localeCompare(b.date || "");

    return timeToMinutes(a.time) - timeToMinutes(b.time);
  });

  container.innerHTML = "";

  let currentDate = "";

  items.forEach(item => {

    if (item.date !== currentDate) {

      currentDate = item.date;

      container.innerHTML += `
        <div class="day-divider">
          <h2>${item.day}</h2>
          <small>${item.date}</small>
        </div>`;
    }

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

});
