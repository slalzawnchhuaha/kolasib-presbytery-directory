fetch("https://kolasib-presbytery-vawi-12-na-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json")
.then(r=>r.json())
.then(data=>{

const contacts=Object.values(data||{});

document.getElementById("totalMembers").textContent=contacts.length;

document.getElementById("totalVillages").textContent=
new Set(contacts.map(c=>c.village).filter(Boolean)).size;

document.getElementById("totalChurches").textContent=
new Set(contacts.map(c=>c.church).filter(Boolean)).size;

})
.catch(console.error);
