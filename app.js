
import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const searchInput = document.getElementById("q");
const list = document.getElementById("list");

let contacts = [];

function render() {
  const text = searchInput.value.toLowerCase().trim();
  list.innerHTML = "";

  const filtered = contacts.filter(c =>
    (c.name || "").toLowerCase().includes(text) ||
    (c.address || "").toLowerCase().includes(text) ||
    (c.village || "").toLowerCase().includes(text) ||
    (c.church || "").toLowerCase().includes(text) ||
    (c.phone || "").includes(text)
  );

  if (filtered.length === 0) {
    list.innerHTML = "<p>No contacts found.</p>";
    return;
  }

  filtered.forEach(c => {
    list.innerHTML += `
      <div class="card">
        <h3>${c.name}</h3>
        <p>📍 ${c.village || ""}</p>
        <p>⛪ ${c.church || ""}</p>
        <p><a href="tel:${c.phone}">📞 ${c.phone}</a></p>
      </div>
    `;
  });
}

searchInput.addEventListener("input", render);

const contactsRef = ref(db, "contacts");

onValue(contactsRef, (snapshot) => {
  contacts = [];

  snapshot.forEach((child) => {
    contacts.push(child.val());
  });

  render();
});
