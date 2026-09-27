
const searchInput = document.getElementById("q");
const list = document.getElementById("list");

let contacts = [];

function render() {
  const text = searchInput.value.toLowerCase().trim();
  list.innerHTML = "";

  const filtered = contacts.filter(c =>
    (c.name || "").toLowerCase().includes(text) ||
    (c.village || "").toLowerCase().includes(text) ||
    (c.church || "").toLowerCase().includes(text) ||
    (c.address || "").toLowerCase().includes(text) ||
    String(c.phone || "").includes(text)
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
        <span class="badge">${c.department || ""}</span>
        <p><a href="tel:${c.phone}">📞 ${c.phone}</a></p>
      </div>
    `;
  });
}

searchInput.addEventListener("input", render);

fetch("https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json")
  .then(res => res.json())
  .then(data => {
    contacts = Object.values(data || {});
    render();
  })
  .catch(err => {
    console.error(err);
    list.innerHTML = "<p>Unable to load contacts.</p>";
  });
