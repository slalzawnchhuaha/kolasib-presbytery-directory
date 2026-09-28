const programme = {
  day1: [
    { time: "06:00", end: "08:00", display: "06:00–08:00 AM", title: "Upa Exam" },
    { time: "09:00", end: "10:30", display: "09:00–10:30 AM", title: "Standing Committee" },
    { time: "11:00", end: "13:00", display: "11:00 AM–01:00 PM", title: "Sub-Pastoral Committee" },
    { time: "13:30", end: "16:30", display: "01:30–04:30 PM", title: "Nomination Committee" },
    {
      time: "18:30",
      end: "20:30",
      display: "06:30 PM",
      title: "Pathian Biak Inkhawm (Inlawmna & Report)",
      details: "Tantu: Upa H. Lalthana • Zaipawl: Diakkawn, Vengthar, Ṭumpui Bial"
    }
  ],

  day2: [
    { time: "09:30", end: "16:00", display: "09:30 AM–04:00 PM", title: "Inkhawmpui Rorel" },
    {
      time: "18:30",
      end: "20:30",
      display: "06:30 PM",
      title: "Pathian Biak Inkhawm",
      details: "Sawitu: Pastor Lalhruaitluanga Ralte • Zaipawl: Venglai, Hmarveng, Rengtekawn"
    }
  ],

  day3: [
    {
      time: "10:00",
      end: "12:00",
      display: "10:00 AM",
      title: "Upa Nemngheh Inkhawm",
      details: "Fuihna & Ṭawngṭaisakna: Upa Sangkhuma Pautu"
    },
    {
      time: "13:00",
      end: "15:00",
      display: "01:00 PM",
      title: "Lalpa Zanriah Sacrament",
      details: "Thehtu: Pastor B. Darnghakliana"
    },
    {
      time: "18:30",
      end: "20:30",
      display: "06:30 PM",
      title: "Valedictory Sermon",
      details: "Sawitu: Upa Lalduhawma Ralte (Moderator)"
    }
  ],

  agenda: [
    { title: "I. Inkhawmpui Hawnna" },
    { title: "II. Nomination Thu" },
    { title: "III. Sub-Pastoral Thu" },
    { title: "IV. Standing Committee Thu" },
    { title: "V. General" },
    { title: "VI. Committee Member leh Palai Ruatna" },
    { title: "VII. Statistician Report" },
    { title: "VIII. Lehkha Thawn Ngaite" },
    { title: "IX. Minute Chhiar leh Pawmna" },
    { title: "X. Rorel Kharna" }
  ]
};

const container = document.getElementById("programmeContent");
const buttons = document.querySelectorAll(".day-btn");

function todayTab() {
  const now = new Date();
  const d = now.getDate();

  if (d === 9) return "day1";
  if (d === 10) return "day2";
  if (d === 11) return "day3";

  return "day1";
}

function currentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function toMinutes(str) {
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
}

function render(day) {

  container.innerHTML = "";

  const now = currentMinutes();
  const activeDay = todayTab();

  programme[day].forEach(item => {

    let badge = "";

    if (day === activeDay && item.time) {

      const start = toMinutes(item.time);
      const end = toMinutes(item.end);

      if (now >= start && now <= end) {
        badge = '<span class="now-live">LIVE NOW</span>';
      } else if (now < start) {
        const diff = start - now;
        const hrs = Math.floor(diff / 60);
        const mins = diff % 60;

        badge = `<span class="countdown">Starts in ${hrs ? hrs + "h " : ""}${mins}m</span>`;
      }

    }

    container.innerHTML += `
      <div class="programme-card">
        ${item.display ? `<div class="programme-time">${item.display}</div>` : ""}
        <h3>${item.title}${badge}</h3>
        ${item.details ? `<p>${item.details}</p>` : ""}
      </div>`;
  });
}

buttons.forEach(btn => {

  btn.onclick = () => {

    buttons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    render(btn.dataset.day);

  };

});

const defaultDay = todayTab();

buttons.forEach(b => {
  if (b.dataset.day === defaultDay)
    b.classList.add("active");
  else
    b.classList.remove("active");
});

render(defaultDay);
