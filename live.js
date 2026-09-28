import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get
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

const frame = document.getElementById("liveFrame");
const status = document.getElementById("liveStatus");

async function loadLive() {

  try {

    const snap = await get(ref(db, "admin/live"));

    if (!snap.exists()) {
      status.textContent = "Live stream has not been configured yet.";
      return;
    }

    const url = snap.val().url || "";

    const match = url.match(/(?:v=|youtu\.be\/|live\/)([A-Za-z0-9_-]{11})/);

    if (!match) {
      status.textContent = "Invalid YouTube link.";
      return;
    }

    frame.src = `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;

    status.style.display = "none";

  } catch (err) {

    console.error(err);
    status.textContent = "Unable to load live stream.";

  }
}

loadLive();
