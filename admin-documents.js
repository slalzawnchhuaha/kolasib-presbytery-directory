
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
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

const documentsRef = ref(db, "documents");
const form = document.getElementById("documentForm");
const titleInput = document.getElementById("documentTitle");
const descriptionInput = document.getElementById("documentDescription");
const urlInput = document.getElementById("documentURL");
const status = document.getElementById("documentStatus");
const list = document.getElementById("adminDocumentsList");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const url = urlInput.value.trim();

    if (!title || !url) {
        status.textContent = "Please enter a title and document link.";
        return;
    }

    // Accept Google Drive file-sharing links only.
    if (!/^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view(?:\?.*)?$/.test(url)) {
        status.textContent = "Please paste a Google Drive file link.";
        return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = "Saving document...";

    try {
        await push(documentsRef, {
            Title: title,
            Description: description,
            URL: url,
            CreatedAt: Date.now()
        });

        form.reset();
        status.textContent = "Document saved successfully!";
    } catch (error) {
        console.error(error);
        status.textContent = "Could not save. Check Firebase permissions and try again.";
    } finally {
        button.disabled = false;
    }
});

onValue(documentsRef, (snapshot) => {
    list.replaceChildren();

    const documents = snapshot.val() || {};
    const entries = Object.entries(documents).sort(
        (a, b) => (b[1].CreatedAt || 0) - (a[1].CreatedAt || 0)
    );

    if (entries.length === 0) {
        list.textContent = "No documents found.";
        return;
    }

    entries.forEach(([id, item]) => {
        const card = document.createElement("article");
        card.className = "document-card";

        const details = document.createElement("div");
        details.className = "document-details";

        const title = document.createElement("h3");
        title.textContent = item.Title || "Untitled document";

        const description = document.createElement("p");
        description.textContent = item.Description || "PDF document";

        const openLink = document.createElement("a");
        openLink.href = item.URL || "#";
        openLink.target = "_blank";
        openLink.rel = "noopener noreferrer";
        openLink.textContent = "Open PDF ↗";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-news-btn";
        deleteButton.textContent = "Delete listing";

        deleteButton.addEventListener("click", async () => {
            if (!confirm(`Remove "${item.Title || "this document"}" from the portal? The PDF in Google Drive will not be deleted.`)) {
                return;
            }

            try {
                await remove(ref(db, `documents/${id}`));
            } catch (error) {
                console.error(error);
                alert("Could not remove the listing. Check Firebase permissions.");
            }
        });

        details.append(title, description, openLink, deleteButton);
        card.appendChild(details);
        list.appendChild(card);
    });

}, (error) => {
    console.error(error);
    list.textContent = "Unable to load documents. Check Firebase permissions.";
});
