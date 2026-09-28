
const searchInput=document.getElementById("q");
const list=document.getElementById("list");
const villageFilters=document.getElementById("villageFilters");
let selectedVillage="";

let contacts=[];

function initials(name){
return name.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();
}

function render(){

const text=searchInput.value.toLowerCase().trim();

list.innerHTML="";

const filtered = contacts.filter(c => {

  const matchesSearch =
    (c.name || "").toLowerCase().includes(text) ||
    (c.village || "").toLowerCase().includes(text) ||
    (c.church || "").toLowerCase().includes(text) ||
    (c.address || "").toLowerCase().includes(text) ||
    String(c.phone || "").includes(text);

  const matchesVillage =
    selectedVillage === "" || c.village === selectedVillage;

  return matchesSearch && matchesVillage;

});
  
  if (filtered.length === 0) {
  list.innerHTML = "<p style='text-align:center;padding:30px;'>No contacts found.</p>";
  return;
}

filtered.forEach(c=>{

list.innerHTML+=`
<div class="card">

<div class="avatar">${initials(c.name)}</div>

<h3>${c.name}</h3>

<p>📍 ${c.village}</p>

<p>⛪ ${c.church}</p>

<p><a class="call-btn" href="tel:${c.phone}">📞 Call ${c.phone}</a></p>

</div>`;
});
}

searchInput.addEventListener("input",render);

fetch("https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json")
  .then(r => r.json())
  .then(data => {
    contacts = Object.values(data || {});

   const membersEl = document.getElementById("totalMembers");
const villagesEl = document.getElementById("totalVillages");
const churchesEl = document.getElementById("totalChurches");

if (membersEl) membersEl.textContent = contacts.length;
if (villagesEl) villagesEl.textContent =
  new Set(contacts.map(c => c.village).filter(Boolean)).size;
if (churchesEl) churchesEl.textContent =
  new Set(contacts.map(c => c.church).filter(Boolean)).size;

    const villages = [...new Set(contacts.map(c => c.village).filter(Boolean))].sort();

villages.forEach(village => {

  const btn = document.createElement("button");

  btn.className = "chip";

  btn.textContent = village;

  btn.dataset.village = village;

 btn.onclick = () => {

  selectedVillage = village;

  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));

  btn.classList.add("active");

  render();

};

villageFilters.appendChild(btn);

});

const allBtn = document.querySelector('.chip[data-village=""]');

allBtn.onclick = () => {

  selectedVillage = "";

  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));

  allBtn.classList.add("active");

  render();

};
    render();
  })
  .catch(err => {
    console.error(err);

    // ===== Scroll to Top =====

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

  if (!scrollBtn) return;

  if (window.scrollY > 350) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }

});

if (scrollBtn) {
  scrollBtn.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
}
    list.innerHTML =
      "<p style='text-align:center;padding:40px;'>Unable to load contacts.</p>";
  });
