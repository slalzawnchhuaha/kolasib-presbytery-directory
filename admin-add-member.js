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

document.getElementById("saveMember").onclick = async () => {

  const member = {
    name: document.getElementById("name").value.trim(),
    village: document.getElementById("village").value.trim(),
    church: document.getElementById("church").value.trim(),
    phone: document.getElementById("phone").value.trim()
  };

  if (!member.name) {
    alert("Name is required.");
    return;
  }

  await push(ref(db, "contacts"), member);

  document.getElementById("statusMsg").textContent = "✅ Member added successfully.";

  setTimeout(() => {
    window.location.href = "admin-directory.html";
  }, 1200);
};
