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

const params = new URLSearchParams(window.location.search);
const counterId = params.get("id");

const numberInput = document.getElementById("counterNumber");
const locationInput = document.getElementById("location");
const statusMsg = document.getElementById("statusMsg");

async function loadCounter(){

  const snap = await get(ref(db, "refreshment/" + counterId));

  if(!snap.exists()) return;

  const data = snap.val();

  numberInput.value = data.number || "";
  locationInput.value = data.location || "";
}

loadCounter();

document.getElementById("saveCounter").addEventListener("click", async ()=>{

  await update(ref(db, "refreshment/" + counterId),{
    number:numberInput.value.trim(),
    location:locationInput.value.trim()
  });

  statusMsg.textContent="✅ Counter updated.";
  statusMsg.style.color="green";

  setTimeout(()=>{
    window.location.href="admin-refreshment.html";
  },1000);

});
