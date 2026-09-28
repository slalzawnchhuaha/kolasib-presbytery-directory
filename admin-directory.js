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

const list = document.getElementById("adminMemberList");
const search = document.getElementById("adminSearch");

let members = [];

function initials(name){
  return name.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();
}

async function loadMembers(){

  const snap = await get(ref(db,"contacts"));

  const data = snap.val() || {};

  members = Object.entries(data).map(([id,value])=>({
    id,
    ...value
  }));

  render();
}

function render(){

  const q = search.value.toLowerCase();

  list.innerHTML="";

  members
    .filter(m =>
      (m.name||"").toLowerCase().includes(q) ||
      (m.village||"").toLowerCase().includes(q)
    )
    .forEach(m=>{

      list.innerHTML += `
      <div class="card">

        <div class="avatar">${initials(m.name)}</div>

        <h3>${m.name}</h3>

        <p>📍 ${m.village}</p>

        <p>⛪ ${m.church}</p>

        <p>📞 ${m.phone}</p>

        <div class="admin-actions">

          <button class="edit-btn" data-id="${m.id}">
            ✏️ Edit
          </button>

          <button class="delete-btn" data-id="${m.id}">
            🗑️ Delete
          </button>

        </div>

      </div>`;
    });
}

search.addEventListener("input",render);

// Delete Member
list.addEventListener("click",async e=>{

  if(!e.target.classList.contains("delete-btn")) return;

  const id = e.target.dataset.id;

  if(confirm("Delete this member?")){

    await remove(ref(db,"contacts/"+id));

    loadMembers();

  }

});

loadMembers();
