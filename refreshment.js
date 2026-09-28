const counters = [
{
  id:"counter1",
  name:"Breakfast Counter",
  location:"Near Main Church Entrance",
  coords:"24.233085,92.673818"
},
{
  id:"counter2",
  name:"Lunch Counter",
  location:"Behind Conference Hall",
  coords:"24.233222,92.674056"
},
{
  id:"counter3",
  name:"Tea Counter",
  location:"Courtyard",
  coords:"24.232992,92.673505"
}
];

const container=document.getElementById("refreshmentCards");

counters.forEach(c=>{

container.innerHTML+=`
<div class="parking-card">

<h3>🍛 ${c.name}</h3>

<p>${c.location}</p>

<a class="navigate-btn"
href="https://www.google.com/maps?q=${c.coords}"
target="_blank">

Navigate with Google Maps

</a>

</div>`;
});
