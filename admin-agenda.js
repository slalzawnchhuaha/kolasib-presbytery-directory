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

const agendaText = document.getElementById("agendaText");
const bialText = document.getElementById("bialText");
const status = document.getElementById("statusMsg");

async function loadAgenda() {
  const snap = await get(ref(db, "agenda"));
  const data = snap.val() || {};

  agendaText.value = data.agenda || "";
  bialText.value = data.bial || "";
}

loadAgenda();

document.getElementById("saveAgenda").onclick = async () => {
  await update(ref(db, "agenda"), {
    agenda: agendaText.value,
    bial: bialText.value
  });

  status.textContent = "✅ Saved successfully.";

  setTimeout(() => {
    window.location.href = "admin-programme.html";
  }, 1000);
};
