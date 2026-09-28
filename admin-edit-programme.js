import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig={
  apiKey:"AIzaSyCSzp3WT1U8S-_1zlxP1xEE0sSX5ssrv-E",
  authDomain:"kolasib-presbytery-vawi-12-na.firebaseapp.com",
  databaseURL:"https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"kolasib-presbytery-vawi-12-na",
  storageBucket:"kolasib-presbytery-vawi-12-na.firebasestorage.app",
  messagingSenderId:"515741204477",
  appId:"1:515741204477:web:995e01bfffdb1c553a2394"
};

const app=initializeApp(firebaseConfig);
const db=getDatabase(app);

const params=new URLSearchParams(window.location.search);
const id=params.get("id");

async function loadItem(){

  const snap=await get(ref(db,"programme/"+id));

  const p=snap.val();

  document.getElementById("date").value=p.date||"";
  document.getElementById("day").value=p.day||"";
  document.getElementById("time").value=p.time||"";
  document.getElementById("title").value=p.title||"";
  document.getElementById("speaker").value=p.speaker||"";
  document.getElementById("choir").value=p.choir||"";

}

loadItem();

document.getElementById("saveChanges").onclick=async()=>{

  await update(ref(db,"programme/"+id),{

    date:document.getElementById("date").value,
    day:document.getElementById("day").value,
    time:document.getElementById("time").value,
    title:document.getElementById("title").value,
    speaker:document.getElementById("speaker").value,
    choir:document.getElementById("choir").value

  });

  document.getElementById("statusMsg").textContent="✅ Saved.";

  setTimeout(()=>{
    window.location.href="admin-programme.html";
  },1000);

};
