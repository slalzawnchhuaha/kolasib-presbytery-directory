const programme = {

day1:[
{
time:"06:00–08:00 AM",
title:"Upa Exam"
},
{
time:"09:00–10:30 AM",
title:"Standing Committee"
},
{
time:"11:00 AM–01:00 PM",
title:"Sub-Pastoral Committee"
},
{
time:"01:30–04:30 PM",
title:"Nomination Committee"
},
{
time:"06:30 PM",
title:"Pathian Biak Inkhawm (Inlawmna & Report)",
details:"Tantu: Upa H. Lalthana | Zaipawl: Diakkawn, Vengthar, Ṭumpui Bial"
}
],

day2:[
{
time:"09:30 AM–04:00 PM",
title:"Inkhawmpui Rorel"
},
{
time:"06:30 PM",
title:"Pathian Biak Inkhawm",
details:"Sawitu: Pastor Lalhruaitluanga Ralte | Zaipawl: Venglai, Hmarveng, Rengtekawn"
}
],

day3:[
{
time:"10:00 AM",
title:"Upa Nemngheh Inkhawm",
details:"Fuihna & Ṭawngṭaisakna: Upa Sangkhuma Pautu"
},
{
time:"01:00 PM",
title:"Lalpa Zanriah Sacrament",
details:"Thehtu: Pastor B. Darnghakliana"
},
{
time:"06:30 PM",
title:"Valedictory Sermon",
details:"Sawitu: Moderator Upa Lalduhawma Ralte"
}
],

agenda:[
{title:"I. Inkhawmpui Hawnna"},
{title:"II. Nomination Thu"},
{title:"III. Sub-Pastoral Thu"},
{title:"IV. Standing Committee Thu"},
{title:"V. General"},
{title:"VI. Committee Member leh Palai Ruatna"},
{title:"VII. Statistician Report"},
{title:"VIII. Lehkha Thawn Ngaite"},
{title:"IX. Minute Chhiar leh Pawmna"},
{title:"X. Rorel Kharna"}
]

};

const container=document.getElementById("programmeContent");

const buttons=document.querySelectorAll(".day-btn");

function render(day){

container.innerHTML="";

programme[day].forEach(item=>{

container.innerHTML+=`
<div class="programme-card">

${item.time?`<div class="programme-time">${item.time}</div>`:""}

<h3>${item.title}</h3>

${item.details?`<p>${item.details}</p>`:""}

</div>`;
});

}

buttons.forEach(btn=>{

btn.onclick=()=>{

buttons.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

render(btn.dataset.day);

};

});

render("day1");
