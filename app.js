
const searchInput=document.getElementById("q");
const list=document.getElementById("list");

let contacts=[];

function initials(name){
return name.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();
}

function render(){

const text=searchInput.value.toLowerCase().trim();

list.innerHTML="";

const filtered=contacts.filter(c=>
(c.name||"").toLowerCase().includes(text)||
(c.village||"").toLowerCase().includes(text)||
(c.church||"").toLowerCase().includes(text)||
(c.address||"").toLowerCase().includes(text)||
String(c.phone||"").includes(text)
);

filtered.forEach(c=>{

list.innerHTML+=`
<div class="card">

<div class="avatar">${initials(c.name)}</div>

<h3>${c.name}</h3>

<p>📍 ${c.village}</p>

<p>⛪ ${c.church}</p>

<span class="badge">${c.department}</span>

<p><a href="tel:${c.phone}">📞 ${c.phone}</a></p>

</div>`;
});
}

searchInput.addEventListener("input",render);

fetch("https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json")
.then(r=>r.json())
.then(data=>{

contacts=Object.values(data||{});

document.getElementById("totalMembers").textContent=contacts.length;

document.getElementById("totalVillages").textContent=new Set(contacts.map(c=>c.village)).size;

document.getElementById("totalChurches").textContent=new Set(contacts.map(c=>c.church)).size;

render();

});
