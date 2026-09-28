import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  remove,
  set
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

const list = document.getElementById("parkingList");

let parkingAreas = [];

async function loadParking() {

  const snap = await get(ref(db, "parking"));

  const data = snap.val() || {};

  parkingAreas = Object.entries(data).map(([id, value]) => ({
    id,
    ...value
  }));
const initBtn = document.getElementById("initParkingBtn");

if (initBtn && parkingAreas.length > 1) {
  initBtn.style.display = "none";
}
  render();

}

function render() {

  list.innerHTML = "";

  parkingAreas.forEach(p => {

    const mapLink = `https://www.google.com/maps?q=${p.latitude},${p.longitude}`;

    list.innerHTML += `
      <div class="card">

        <div class="avatar">🚗</div>

        <h3>${p.name}</h3>

        <span class="badge">${p.type || "Parking"}</span>

        <p>📍 ${p.latitude}, ${p.longitude}</p>

        <div class="admin-actions">

          <a href="${mapLink}" target="_blank" class="edit-btn">
            🗺️ Maps
          </a>

         <a href="./admin-edit-parking.html?id=${p.id}" class="edit-btn">
  ✏️ Edit
</a>

          <button class="delete-btn" data-id="${p.id}">
            🗑️ Delete
          </button>

        </div>

      </div>`;
  });

}

list.addEventListener("click", async e => {

  if (!e.target.classList.contains("delete-btn")) return;

  if (confirm("Delete this parking area?")) {

    await remove(ref(db, "parking/" + e.target.dataset.id));

    loadParking();

  }

});

loadParking();

const initBtn = document.getElementById("initParkingBtn");

if (initBtn) {
  initBtn.addEventListener("click", async () => {

    if (!confirm("Create the default Parking 1–10 layout?")) return;

    const defaults = {
      parking1:{name:"Parking Area 1",type:"2 & 4 Wheeler",latitude:"24.233085",longitude:"92.673818"},
      parking2:{name:"Parking Area 2",type:"2 Wheeler",latitude:"24.233690",longitude:"92.673706"},
      parking3:{name:"Parking Area 3",type:"4 Wheeler",latitude:"24.233222",longitude:"92.674056"},
      parking4:{name:"Parking Area 4",type:"2 Wheeler",latitude:"24.232905",longitude:"92.673848"},
      parking5:{name:"Parking Area 5",type:"2 Wheeler",latitude:"24.232992",longitude:"92.673505"},
      parking6:{name:"Parking Area 6",type:"2 Wheeler",latitude:"24.233094",longitude:"92.673300"},
      parking7:{name:"Parking Area 7",type:"2 & 4 Wheeler",latitude:"24.233650",longitude:"92.674269"},
      parking8:{name:"Parking Area 8",type:"2 & 4 Wheeler",latitude:"24.233642",longitude:"92.674706"},
      reserve:{name:"Reserve Parking",type:"2 & 4 Wheeler",latitude:"24.233180",longitude:"92.674694"},
      parking9:{name:"Parking Area 9",type:"2 & 4 Wheeler",latitude:"24.232648",longitude:"92.673365"},
      parking10:{name:"Parking Area 10",type:"2 & 4 Wheeler",latitude:"24.232642",longitude:"92.672882"}
    };

    await set(ref(db,"parking"), defaults);

    loadParking();

    alert("Parking layout created successfully.");

  });
}
