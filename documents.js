
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
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

const documentsList = document.getElementById("documentsList");

onValue(ref(db, "documents"), (snapshot) => {
    documentsList.replaceChildren();

    const documents = snapshot.val() || {};

    const entries = Object.entries(documents).sort((a, b) =>
        (b[1].CreatedAt || 0) - (a[1].CreatedAt || 0)
    );

    if (entries.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No documents have been published yet.";
        documentsList.appendChild(message);
        return;
    }

    entries.forEach(([id, documentData]) => {
        const card = document.createElement("article");
        card.className = "document-card";

        const icon = document.createElement("div");
        icon.className = "document-icon";
        icon.textContent = "📕";

        const details = document.createElement("div");
        details.className = "document-details";

        const title = document.createElement("h3");
        title.textContent = documentData.Title || "Untitled document";

        const description = document.createElement("p");
        description.textContent =
            documentData.Description || "PDF document";

        const link = document.createElement("a");
        link.className = "document-open-btn";
        link.textContent = "Open Document ↗";
        link.href = documentData.URL || "#";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        if (!documentData.URL) {
            link.removeAttribute("target");
            link.textContent = "Link unavailable";
            link.removeAttribute("href");
        }

        details.append(title, description, link);
        card.append(icon, details);
        documentsList.appendChild(card);
    });

}, (error) => {
    console.error("Documents loading error:", error);
    documentsList.textContent = "Unable to load documents. Please try again later.";
});
