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

const list = document.getElementById("programmeList");
const search = document.getElementById("programmeSearch");

let items = [];

function timeToMinutes(t){
  if(!t) return 0;

  const m=t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if(!m) return 0;

  let h=parseInt(m[1]);
  const min=parseInt(m[2]);
  const ampm=m[3].toUpperCase();

  if(ampm==="PM" && h!==12) h+=12;
  if(ampm==="AM" && h===12) h=0;

  return h*60+min;
}

async function loadProgramme(){

  const snap=await get(ref(db,"programme"));

  const data=snap.val()||{};

  items=Object.entries(data).map(([id,value])=>({
    id,
    ...value
  }));

  // Sort by Date then Time
  items.sort((a,b)=>{

    if(a.date!==b.date)
      return (a.date||"").localeCompare(b.date||"");

    return timeToMinutes(a.time)-timeToMinutes(b.time);

  });

  render();
}

function render(){

  const q=search.value.toLowerCase();

  list.innerHTML="";

  items
    .filter(i=>
      (i.title||"").toLowerCase().includes(q) ||
      (i.day||"").toLowerCase().includes(q) ||
      (i.time||"").toLowerCase().includes(q)
    )
    .forEach(i=>{

      list.innerHTML+=`
      <div class="card">

        <h3>${i.title||"Programme Item"}</h3>

        <p>📅 ${i.day||""} (${i.date||""})</p>

        <p>🕒 ${i.time||""}</p>

        <p>🎤 ${i.speaker||"-"}</p>

        <p>🎵 ${i.choir||"-"}</p>

        <div class="admin-actions">

          <a href="admin-edit-programme.html?id=${i.id}" class="edit-btn">
            ✏️ Edit
          </a>

          <button class="delete-btn" data-id="${i.id}">
            🗑️ Delete
          </button>

        </div>

      </div>`;
    });
}

search.addEventListener("input",render);

// Delete Programme Item
list.addEventListener("click",async e=>{

  if(!e.target.classList.contains("delete-btn")) return;

  if(confirm("Delete this programme item?")){

    await remove(ref(db,"programme/"+e.target.dataset.id));

    loadProgramme();

  }

});

loadProgramme();
