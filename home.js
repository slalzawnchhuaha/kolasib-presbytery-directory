import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSzp3WT1U8S-_1zlxP1xEE0sSX5ssrv-E",
  authDomain: "kolasib-presbytery-vawi-12-na.firebaseapp.com",
  databaseURL: "https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kolasib-presbytery-vawi-12-na",
  storageBucket: "kolasib-presbytery-vawi-12-na.firebasestorage.app",
  messagingSenderId: "515741204477",
  appId: "1:515741204477:web:995e01bfffdb1c553a2394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Load member statistics
fetch("https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json")
  .then(r => r.json())
  .then(data => {
    const contacts = Object.values(data || {});

    document.getElementById("totalMembers").textContent = contacts.length;
    document.getElementById("totalVillages").textContent =
      new Set(contacts.map(c => c.village).filter(Boolean)).size;
    document.getElementById("totalChurches").textContent =
      new Set(contacts.map(c => c.church).filter(Boolean)).size;
  })
  .catch(console.error);

// ===== Smart Visitor Counter (One visit per device per day) =====

const visitorEl = document.getElementById("visitorCount");
const visitsRef = ref(db, "stats/visits");

const today = new Date().toISOString().split("T")[0];
const lastVisit = localStorage.getItem("lastVisitDate");

async function updateVisitorCounter() {
  try {
    if (lastVisit !== today) {
      await runTransaction(visitsRef, current => (current || 0) + 1);
      localStorage.setItem("lastVisitDate", today);
    }

    const snapshot = await get(visitsRef);

    if (visitorEl) {
      visitorEl.textContent = snapshot.val() || 0;
    }

  } catch (err) {
    console.error(err);
  }
}

updateVisitorCounter();
// ===== Secret Admin Access (PC + Mobile) =====

const adminLogo = document.getElementById("adminLogo");

if (adminLogo) {
  let pressTimer = null;

  const startPress = (e) => {
    e.preventDefault();
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      window.location.href = "admin-login.html";
    }, 5000);
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  adminLogo.addEventListener("pointerdown", startPress);
  adminLogo.addEventListener("pointerup", cancelPress);
  adminLogo.addEventListener("pointerleave", cancelPress);
  adminLogo.addEventListener("pointercancel", cancelPress);
  adminLogo.addEventListener("contextmenu", (e) => e.preventDefault());
}

// ===== YouTube Live Button =====

const btnLive = document.getElementById("btnLive");

if (btnLive) {
  btnLive.addEventListener("click", () => {
    window.location.href = "live.html";
  });
}

/* =========================================
   HOME PAGE NEWS
   ========================================= */

function getDriveViewUrl(imageUrl) {
    const match = imageUrl.match(/[?&]id=([^&]+)/);

    if (match) {
        return `https://drive.google.com/file/d/${match[1]}/view`;
    }

    return imageUrl;
}
const homeNewsList = document.getElementById("homeNewsList");

if (homeNewsList) {

    const newsRef = ref(db, "news");

    onValue(newsRef, (snapshot) => {

        const data = snapshot.val() || {};

        homeNewsList.innerHTML = "";

        let newsItems = Object.entries(data);

        /* Newest first */
        newsItems.sort((a, b) => {
            const dateA = a[1].CreatedAt || 0;
            const dateB = b[1].CreatedAt || 0;

            return dateB - dateA;
        });

        /* Show latest 3 */
       newsItems = newsItems.slice(0, 1);

        /* No news */
        if (newsItems.length === 0) {

            homeNewsList.innerHTML = `
                <div class="home-news-empty">
                    <p>No news has been published yet.</p>
                </div>
            `;

            return;
        }

        /* Display news */
        newsItems.forEach(([id, news]) => {

            const photo1 = news.Photo1 || "";
            const photo2 = news.Photo2 || "";

            homeNewsList.innerHTML += `

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

        homeNewsList.innerHTML = `
            <div class="home-news-empty">
                <p>Unable to load news.</p>
            </div>
        `;

    });

}
