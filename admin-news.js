import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/* =========================================
   FIREBASE
   ========================================= */

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


/* =========================================
   GOOGLE DRIVE UPLOAD URL
   ========================================= */

const UPLOAD_URL =
"https://script.google.com/macros/s/AKfycbxw3lHSZU9loCUGQmFKRiGzYvL6On5Bpzh0FUDSxq3ht9NdQECjZVWEhnKs07U9sEpwRQ/exec";


/* =========================================
   ELEMENTS
   ========================================= */

const titleInput = document.getElementById("newsTitle");
const dateInput = document.getElementById("newsDate");
const contentInput = document.getElementById("newsContent");

const photo1Input = document.getElementById("newsPhoto1");
const photo2Input = document.getElementById("newsPhoto2");

const importantInput = document.getElementById("newsImportant");

const saveBtn = document.getElementById("saveNews");
const statusMsg = document.getElementById("statusMsg");

const newsList = document.getElementById("newsList");

const newsRef = ref(db, "news");


/* =========================================
   FILE → BASE64
   ========================================= */

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {

            const base64 = reader.result.split(",")[1];

            resolve(base64);

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}


/* =========================================
   UPLOAD PHOTOS
   ========================================= */

async function uploadPhotos() {

    const photo1 = photo1Input.files[0];
    const photo2 = photo2Input.files[0];

    const payload = {};

    if (photo1) {

        payload.photo1 = await fileToBase64(photo1);

        payload.photo1Name = photo1.name;

        payload.photo1Type = photo1.type;

    }

    if (photo2) {

        payload.photo2 = await fileToBase64(photo2);

        payload.photo2Name = photo2.name;

        payload.photo2Type = photo2.type;

    }

    /* No photos */

    if (!photo1 && !photo2) {

        return {
            photo1: "",
            photo2: ""
        };

    }


    const response = await fetch(
        UPLOAD_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(payload)
        }
    );


    const result = await response.json();


    if (!result.success) {

        throw new Error(
            result.error || "Photo upload failed."
        );

    }


    return {

        photo1:
            result.photos[0]?.url || "",

        photo2:
            result.photos[1]?.url || ""

    };

}


/* =========================================
   SAVE NEWS
   ========================================= */

saveBtn.addEventListener("click", async () => {

    const title = titleInput.value.trim();

    const date = dateInput.value;

    const content = contentInput.value.trim();

    const important = importantInput.checked;


    /* Validation */

    if (!title || !date || !content) {

        statusMsg.textContent =
            "Please fill in the headline, date and news.";

        statusMsg.style.color = "red";

        return;

    }


    try {

        saveBtn.disabled = true;

        saveBtn.textContent =
            "Uploading...";


        /* Upload photos */

        const photos = await uploadPhotos();


        saveBtn.textContent =
            "Publishing...";


        /* Save to Firebase */

        await push(newsRef, {

            Title: title,

            Date: date,

            Content: content,

            Photo1: photos.photo1,

            Photo2: photos.photo2,

            Important: important,

            CreatedAt: Date.now()

        });


        /* Clear form */

        titleInput.value = "";

        dateInput.value = "";

        contentInput.value = "";

        photo1Input.value = "";

        photo2Input.value = "";

        importantInput.checked = false;


        statusMsg.textContent =
            "News published successfully.";

        statusMsg.style.color =
            "green";


    } catch (error) {

        console.error(
            "News save error:",
            error
        );

        statusMsg.textContent =
            "Unable to publish news.";

        statusMsg.style.color =
            "red";

    }


    saveBtn.disabled = false;

    saveBtn.textContent =
        "💾 Publish News";

});


/* =========================================
   LOAD EXISTING NEWS
   ========================================= */

onValue(

    newsRef,

    (snapshot) => {

        const data =
            snapshot.val() || {};

        newsList.innerHTML = "";


        const newsItems =
            Object.entries(data);


        if (newsItems.length === 0) {

            newsList.innerHTML =
                "<p>No news published yet.</p>";

            return;

        }


        /* Newest first */

        newsItems.reverse();


        newsItems.forEach(
            ([id, news]) => {

                const photo1 =
                    news.Photo1 || "";

                const photo2 =
                    news.Photo2 || "";


                newsList.innerHTML += `

                    <div class="admin-news-item">

                        <div class="admin-news-info">

                            ${
                                news.Important
                                ? `<span class="news-important-badge">
                                    ⭐ IMPORTANT
                                   </span>`
                                : ""
                            }

                            <h3>
                                ${news.Title || ""}
                            </h3>

                            <small>
                                ${news.Date || ""}
                            </small>

                            <p>
                                ${news.Content || ""}
                            </p>


                            <div class="admin-news-images">

                                ${
                                    photo1
                                    ? `<img src="${photo1}" alt="News photo">`
                                    : ""
                                }

                                ${
                                    photo2
                                    ? `<img src="${photo2}" alt="News photo">`
                                    : ""
                                }

                            </div>

                        </div>


                        <div class="admin-news-actions">

                            <button
                                class="delete-news-btn"
                                data-id="${id}"
                            >
                                🗑️ Delete
                            </button>

                        </div>

                    </div>

                `;

            }
        );

    },

    (error) => {

        console.error(
            "Firebase news error:",
            error
        );

        newsList.innerHTML =
            "<p style='color:red;'>Unable to load news.</p>";

    }

);


/* =========================================
   DELETE NEWS
   ========================================= */

document.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest(
                ".delete-news-btn"
            );

        if (!button) return;


        const id =
            button.dataset.id;


        const confirmed =
            confirm(
                "Are you sure you want to delete this news?"
            );


        if (!confirmed) return;


        try {

            await remove(
                ref(db, `news/${id}`)
            );


            statusMsg.textContent =
                "News deleted successfully.";

            statusMsg.style.color =
                "green";


        } catch (error) {

            console.error(
                "Delete news error:",
                error
            );

            statusMsg.textContent =
                "Unable to delete news.";

            statusMsg.style.color =
                "red";

        }

    }
);
