import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set
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

const liveInput = document.getElementById("liveUrl");
const statusMsg = document.getElementById("statusMsg");

async function loadLive() {
  const snap = await get(ref(db, "admin/live"));

  if (snap.exists()) {
    liveInput.value = snap.val().url || "";
  }
}

loadLive();

document.getElementById("saveLive").addEventListener("click", async () => {

  await set(ref(db, "admin/live"), {
    url: liveInput.value.trim()
  });

  statusMsg.textContent = "✅ Live link saved.";
  statusMsg.style.color = "green";

});
