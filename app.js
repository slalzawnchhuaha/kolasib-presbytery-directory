
import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const searchInput = document.getElementById("q");
const list = document.getElementById("list");

let contacts = [];

function render() {
  const text = searchInput.value.toLowerCase();
  list.innerHTML = "";

  contacts
    .filter(c =>
      (c.name || "").toLowerCase().includes(text) ||
      (c.address || "").toLowerCase().includes(text) ||
      (c.phone || "").includes(text)
    )
    .forEach(c => {
      list.innerHTML += `
        <div class="card">
          <b>${c.name}</b><br>
          ${c.address}<br>
          <a href="tel:${c.phone}">${c.phone}</a>
        </div>`;
    });
}

searchInput.addEventListener("input", render);

const contactsRef = ref(db, "contacts");

onValue(contactsRef, snapshot => {
  contacts = [];
  snapshot.forEach(child => contacts.push(child.val()));
  render();
});
