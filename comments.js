
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
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

const commentsRef = ref(db, "comments");
const form = document.getElementById("commentForm");
const nameInput = document.getElementById("visitorName");
const churchInput = document.getElementById("visitorChurch");
const messageInput = document.getElementById("visitorMessage");
const status = document.getElementById("commentStatus");
const list = document.getElementById("commentsList");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const church = churchInput.value.trim();
  const message = messageInput.value.trim();
  const button = form.querySelector('button[type="submit"]');

  if (!name || !message) {
    status.textContent = "Please enter your name and comment.";
    return;
  }

  if (name.length > 80 || church.length > 100 || message.length > 1000) {
    status.textContent = "Please shorten your entry to the allowed length.";
    return;
  }

  button.disabled = true;
  status.textContent = "Submitting your comment...";

  try {
    await push(commentsRef, {
      Name: name,
      Church: church,
      Message: message,
      CreatedAt: Date.now()
    });

    form.reset();
    status.textContent = "Thank you! Your comment has been published.";
  } catch (error) {
    console.error("Comment submission error:", error);
    status.textContent =
      "Unable to submit your comment. Please try again later.";
  } finally {
    button.disabled = false;
  }
});

onValue(commentsRef, (snapshot) => {
  list.replaceChildren();

  const comments = snapshot.val() || {};

  const entries = Object.entries(comments).sort(
    (a, b) => (b[1].CreatedAt || 0) - (a[1].CreatedAt || 0)
  );

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Be the first to share your experience!";
    list.appendChild(empty);
    return;
  }

  entries.forEach(([id, item]) => {
    const card = document.createElement("article");
    card.className = "visitor-comment";

    const title = document.createElement("h3");
    title.textContent = item.Name || "Visitor";

    const meta = document.createElement("p");
    meta.className = "comment-meta";

    const date = item.CreatedAt
      ? new Date(item.CreatedAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        })
      : "";

    meta.textContent = [item.Church, date].filter(Boolean).join(" • ");

    const message = document.createElement("p");
    message.className = "comment-message";
    message.textContent = item.Message || "";

    card.append(title, meta, message);
    list.appendChild(card);
  });
}, (error) => {
  console.error("Comments loading error:", error);
  list.textContent = "Unable to load comments. Please try again later.";
});
