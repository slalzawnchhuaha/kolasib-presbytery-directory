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
const id = params.get("id");

async function loadMember(){

  const snap = await get(ref(db,"contacts/"+id));

  const m = snap.val();

  document.getElementById("name").value = m.name || "";
  document.getElementById("village").value = m.village || "";
  document.getElementById("church").value = m.church || "";
  document.getElementById("phone").value = m.phone || "";

}

loadMember();

document.getElementById("saveChanges").onclick = async ()=>{

  await update(ref(db,"contacts/"+id),{

    name:document.getElementById("name").value,
    village:document.getElementById("village").value,
    church:document.getElementById("church").value,
    phone:document.getElementById("phone").value

  });

  document.getElementById("statusMsg").textContent="✅ Saved.";

  setTimeout(()=>{

    window.location.href="admin-directory.html";

  },1000);

};
