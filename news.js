import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/* =========================================
   FIREBASE CONFIG
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


/* =========================================
   INITIALIZE FIREBASE
   ========================================= */

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* =========================================
   GOOGLE DRIVE PHOTO LINK
   ========================================= */

function getDriveViewUrl(imageUrl) {
    const match = imageUrl.match(/[?&]id=([^&]+)/);

    if (match) {
        return `https://drive.google.com/file/d/${match[1]}/view`;
    }

    return imageUrl;
}

/* =========================================
   LOAD NEWS
   ========================================= */

const newsPageList = document.getElementById("newsPageList");

const newsPhotoViewer = document.getElementById("newsPhotoViewer");
const newsViewerImage = document.getElementById("newsViewerImage");
const closeNewsViewer = document.getElementById("closeNewsViewer");
const downloadNewsImage = document.getElementById("downloadNewsImage");

/* Open the photo viewer */
function openNewsPhoto(imageUrl, title) {
    newsViewerImage.src = imageUrl;
    newsViewerImage.alt = title || "News photograph";
    downloadNewsImage.href = imageUrl;

    newsPhotoViewer.classList.add("active");
    newsPhotoViewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

window.openNewsPhoto = openNewsPhoto;

/* Close the photo viewer */
function closePhotoViewer() {
    newsPhotoViewer.classList.remove("active");
    newsPhotoViewer.setAttribute("aria-hidden", "true");
    newsViewerImage.src = "";
    document.body.style.overflow = "";
}

closeNewsViewer.addEventListener("click", closePhotoViewer);

newsPhotoViewer.addEventListener("click", (event) => {
    if (event.target === newsPhotoViewer) {
        closePhotoViewer();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePhotoViewer();
    }
});

const newsRef = ref(db, "news");


onValue(newsRef, (snapshot) => {

    const data = snapshot.val() || {};

    newsPageList.innerHTML = "";

    let newsItems = Object.entries(data);


    /* Newest news first */

    newsItems.sort((a, b) => {

        const dateA = a[1].CreatedAt || 0;
        const dateB = b[1].CreatedAt || 0;

        return dateB - dateA;

    });


    /* No news */

    if (newsItems.length === 0) {

        newsPageList.innerHTML = `
            <div class="home-news-empty">
                <p>No news has been published yet.</p>
            </div>
        `;

        return;
    }


    /* Display all news */

    newsItems.forEach(([id, news]) => {

        const photo1 = news.Photo1 || "";
        const photo2 = news.Photo2 || "";


        newsPageList.innerHTML += `

            <article class="home-news-card">

                ${
                    photo1 || photo2
                    ? `
                    <div class="home-news-images">

                        ${
                            photo1
                            ? `
                            <a
    href="${getDriveViewUrl(photo1)}"
    target="_blank"
    rel="noopener noreferrer"
    class="news-photo-link"
>
    <img
    src="${photo1}"
    alt="${news.Title || "News photo"}"
    onclick="openNewsPhoto('${photo1}', '${news.Title || "News photo"}')"
    style="cursor: zoom-in;"
>
</a>
                            `
                            : ""
                        }

                        ${
                            photo2
                            ? `
                            <a
    href="${getDriveViewUrl(photo2)}"
    target="_blank"
    rel="noopener noreferrer"
    class="news-photo-link"
>
    <img
    src="${photo2}"
    alt="${news.Title || "News photo"}"
    onclick="openNewsPhoto('${photo2}', '${news.Title || "News photo"}')"
    style="cursor: zoom-in;"
>
</a>
                            `
                            : ""
                        }

                    </div>
                    `
                    : ""
                }


                <div class="home-news-content">

                    ${
                        news.Important
                        ? `
                        <span class="home-news-important">
                            ⭐ IMPORTANT
                        </span>
                        `
                        : ""
                    }


                    <h3>
                        ${news.Title || ""}
                    </h3>


                    <div class="home-news-date">
                        📅 ${news.Date || ""}
                    </div>


                    <p>
                        ${news.Content || ""}
                    </p>

                </div>

            </article>

        `;

    });

}, (error) => {

    console.error("News loading error:", error);

    newsPageList.innerHTML = `
        <div class="home-news-empty">
            <p>Unable to load news.</p>
        </div>
    `;

});
