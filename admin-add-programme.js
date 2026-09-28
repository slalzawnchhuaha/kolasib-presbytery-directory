import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Automatic Mizo day names
const mizoDays = [
  "Pathianni",   // Sunday
  "Thawhṭanni",  // Monday
  "Thawhlehni",  // Tuesday
  "Nilaini",     // Wednesday
  "Ningani",     // Thursday
  "Zirtawpni",   // Friday
  "Inrinni"      // Saturday
];

function convertTime(time24){
  if(!time24) return "";

  let [h,m]=time24.split(":").map(Number);

  const ap=h>=12?"PM":"AM";

  h=h%12||12;

  return `${h}:${String(m).padStart(2,"0")} ${ap}`;
}
const saveBtn = document.getElementById("saveProgramme");
const statusMsg = document.getElementById("statusMsg");

const dateInput = document.getElementById("date");
const dayInput = document.getElementById("day");

// Automatically fill Mizo day from selected date
dateInput.addEventListener("change", () => {
  const d = new Date(dateInput.value);
  dayInput.value = mizoDays[d.getDay()] || "";
});

saveBtn.addEventListener("click", async () => {
  const item = {
    date: document.getElementById("date").value,
    day: document.getElementById("day").value.trim(),
    time: convertTime(document.getElementById("time").value),
    title: document.getElementById("title").value.trim(),
    speaker: document.getElementById("speaker").value.trim(),
    choir: document.getElementById("choir").value.trim()
  };

  if (!item.title || !item.time) {
    alert("Programme Title and Time are required.");
    return;
  }

  try {
    await push(ref(db, "programme"), item);

    statusMsg.textContent = "✅ Programme saved successfully.";
    statusMsg.style.color = "green";

    setTimeout(() => {
      window.location.href = "admin-programme.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    statusMsg.textContent = "❌ Failed to save programme.";
    statusMsg.style.color = "red";
  }
});
