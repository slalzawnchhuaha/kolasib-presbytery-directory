import {db} from './firebase-config.js';
import {ref,onValue} from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js';
const q=document.getElementById('q'),list=document.getElementById('list');let rows=[];
function draw(){const t=q.value.toLowerCase();list.innerHTML='';rows.filter(r=>Object.values(r).join(' ').toLowerCase().includes(t)).forEach(r=>list.innerHTML+=`<div class=card><h3>${r.name}</h3><div>${r.village||''} • ${r.church||''}</div><div>${r.address||''}</div><div class=badge>${r.department||''}</div><p><a href='tel:${r.phone}'>📞 ${r.phone}</a></p></div>`)}
q.oninput=draw;onValue(ref(db,'contacts'),s=>{rows=[];s.forEach(c=>rows.push(c.val()));draw();});