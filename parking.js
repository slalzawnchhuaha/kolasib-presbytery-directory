const parkingData=[
{
id:"parking1",
name:"Parking Area 1",
vehicle:"2 & 4 Wheeler",
coords:"24.233085,92.673818",
img:"parking-map.jpg"
},
{
id:"parking2",
name:"Parking Area 2",
vehicle:"2 Wheeler",
coords:"24.233690,92.673706",
img:"parking-map.jpg"
},
{
id:"parking3",
name:"Parking Area 3",
vehicle:"4 Wheeler",
coords:"24.233222,92.674056",
img:"parking-map.jpg"
},
{
id:"parking4",
name:"Parking Area 4",
vehicle:"2 Wheeler",
coords:"24.232905,92.673848",
img:"parking-map.jpg"
},
{
id:"parking5",
name:"Parking Area 5",
vehicle:"2 Wheeler",
coords:"24.232992,92.673505",
img:"parking-map.jpg"
},
{
id:"parking6",
name:"Parking Area 6",
vehicle:"2 Wheeler",
coords:"24.233094,92.673300",
img:"parking-map.jpg"
},
{
id:"parking7",
name:"Parking Area 7",
vehicle:"2 & 4 Wheeler",
coords:"24.233650,92.674269",
img:"parking-map.jpg"
},
{
id:"parking8",
name:"Parking Area 8",
vehicle:"2 & 4 Wheeler",
coords:"24.233642,92.674706",
img:"parking-map.jpg"
},
{
id:"reserve",
name:"Reserve Parking",
vehicle:"2 & 4 Wheeler",
coords:"24.233180,92.674694",
img:"parking-map.jpg"
},
{
id:"parking9",
name:"Parking Area 9",
vehicle:"2 & 4 Wheeler",
coords:"24.232648,92.673365",
img:"parking-map.jpg"
},
{
id:"parking10",
name:"Parking Area 10",
vehicle:"2 & 4 Wheeler",
coords:"24.232642,92.672882",
img:"parking-map.jpg"
}
];

const container=document.getElementById("parkingCards");

parkingData.forEach(p=>{

container.innerHTML+=`
<div class="parking-card" id="${p.id}">

<h3>${p.name}</h3>

<span class="vehicle-badge">${p.vehicle}</span>

<p>📍 ${p.coords}</p>

<a class="navigate-btn"
href="https://www.google.com/maps?q=${p.coords}"
target="_blank">

Navigate with Google Maps

</a>

</div>`;
});

function jumpTo(id){

document.querySelectorAll(".parking-card").forEach(c=>c.classList.remove("active"));

const card=document.getElementById(id);

card.classList.add("active");

card.scrollIntoView({behavior:"smooth"});
}
