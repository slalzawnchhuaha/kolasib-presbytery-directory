import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  remove
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

const list = document.getElementById("refreshmentList");

let counters = [];

async function loadCounters() {

  const snap = await get(ref(db, "refreshment"));

  const data = snap.val() || {};

  counters = Object.entries(data).map(([id, value]) => ({
    id,
    ...value
  }));

  render();
}

function render() {

  list.innerHTML = "";

  counters.sort((a,b)=>Number(a.number)-Number(b.number));

  counters.forEach(c => {

    list.innerHTML += `
      <div class="card">

        <div class="avatar">🍛</div>

        <h3>Counter ${c.number}</h3>

        <p>📍 ${c.location}</p>

        <div class="admin-actions">

          <a href="admin-edit-refreshment.html?id=${c.id}" class="edit-btn">
            ✏️ Edit
          </a>

          <button class="delete-btn" data-id="${c.id}">
            🗑️ Delete
          </button>

        </div>

      </div>`;
  });
}

list.addEventListener("click", async e => {

  if (!e.target.classList.contains("delete-btn")) return;

  if (!confirm("Delete this counter?")) return;

  await remove(ref(db, "refreshment/" + e.target.dataset.id));

  loadCounters();

});

loadCounters();
