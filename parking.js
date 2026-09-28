import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
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

const container = document.getElementById("parkingCards");

let parkingData = [];

// Live updates from Firebase
onValue(ref(db, "parking"), (snap) => {

  const data = snap.val() || {};

  parkingData = Object.entries(data).map(([id, value]) => ({
    id,
    ...value
  }));

  render();

});

function render() {

  container.innerHTML = "";

  parkingData.forEach(p => {

    const coords = `${p.latitude},${p.longitude}`;

    container.innerHTML += `
      <div class="parking-card" id="${p.id}">

        <h3>${p.name}</h3>

        <span class="vehicle-badge">${p.type || "Parking"}</span>

        <p>📍 ${coords}</p>

        <a class="navigate-btn"
           href="https://www.google.com/maps?q=${coords}"
           target="_blank">

          Navigate with Google Maps

        </a>

      </div>`;
  });

}

// Keep your existing map-pin feature
window.jumpTo = function(id){

  document.querySelectorAll(".parking-card")
    .forEach(c => c.classList.remove("active"));

  const card = document.getElementById(id);

  if (!card) return;

  card.classList.add("active");

  card.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });

};
