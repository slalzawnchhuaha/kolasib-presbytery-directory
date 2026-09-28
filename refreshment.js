import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const container = document.getElementById("refreshmentCards");

async function loadCounters() {
  const snap = await get(ref(db, "refreshment"));
  const data = snap.val() || {};

  const counters = Object.entries(data)
    .map(([id, value]) => ({ id, ...value }))
    .sort((a, b) => Number(a.number) - Number(b.number));

  container.innerHTML = "";

  counters.forEach(c => {

    const img = c.photo
      ? `<img src="refreshment/${c.photo}" class="parking-photo">`
      : "";

    container.innerHTML += `
      <div class="parking-card">

        ${img}

        <h3>🍛 Counter ${c.number}</h3>

        <p>📍 ${c.location}</p>

      </div>
    `;
  });
}

loadCounters();
