import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

const photoInput = document.getElementById("photos");
const photoCount = document.getElementById("photoCount");
const uploadBtn = document.getElementById("uploadBtn");
const statusMsg = document.getElementById("statusMsg");

photoInput.addEventListener("change", () => {
  photoCount.textContent = `${photoInput.files.length} photo(s) selected.`;
});

uploadBtn.addEventListener("click", async () => {
  const files = [...photoInput.files];

  if (!files.length) {
    alert("Please select at least one photo.");
    return;
  }

  uploadBtn.disabled = true;
  statusMsg.textContent = "Uploading...";

  try {
    for (const file of files) {
      const filename = `${Date.now()}-${file.name}`;
      const imgRef = storageRef(storage, `organisingCommittee/${filename}`);

      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);

      await push(ref(db, "organisingCommittee"), {
        name: file.name,
        url: url,
        uploaded: Date.now()
      });
    }

    statusMsg.textContent = "✅ All photos uploaded successfully.";
    photoInput.value = "";
    photoCount.textContent = "No photos selected.";

  } catch (err) {
    console.error(err);
    statusMsg.textContent = "❌ Upload failed.";
  }

  uploadBtn.disabled = false;
});
