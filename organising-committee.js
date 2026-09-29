const gallery = document.getElementById("committeeGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const counter = document.getElementById("photoCounter");
const shareBtn = document.getElementById("shareBtn");
const downloadBtn = document.getElementById("downloadBtn");

let photos=[];
let currentIndex=0;
let startX=0;

async function loadGallery(){

const response=await fetch("organising-committee/photos.json");
photos=await response.json();

gallery.innerHTML="";

photos.forEach((photo,index)=>{

gallery.innerHTML+=`
<div class="gallery-card">
<img
src="organising-committee/${photo}"
data-index="${index}"
loading="lazy">
</div>`;
});
}

loadGallery();

function showPhoto(){

const src=`organising-committee/${photos[currentIndex]}`;

lightboxImg.src=src;
downloadBtn.href=src;
counter.textContent=`${currentIndex+1} / ${photos.length}`;

lightbox.style.display="flex";
}

gallery.addEventListener("click",e=>{

if(e.target.tagName!=="IMG") return;

currentIndex=Number(e.target.dataset.index);

showPhoto();
});

document.querySelector(".close-lightbox").onclick=()=>lightbox.style.display="none";

document.querySelector(".prev-btn").onclick=()=>{
currentIndex=(currentIndex-1+photos.length)%photos.length;
showPhoto();
};

document.querySelector(".next-btn").onclick=()=>{
currentIndex=(currentIndex+1)%photos.length;
showPhoto();
};

lightbox.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
});

lightbox.addEventListener("touchend",e=>{

const diff=e.changedTouches[0].clientX-startX;

if(Math.abs(diff)<50) return;

if(diff<0){
currentIndex=(currentIndex+1)%photos.length;
}else{
currentIndex=(currentIndex-1+photos.length)%photos.length;
}

showPhoto();
});

document.addEventListener("keydown",e=>{

if(lightbox.style.display!=="flex") return;

if(e.key==="Escape") lightbox.style.display="none";
if(e.key==="ArrowRight"){
currentIndex=(currentIndex+1)%photos.length;
showPhoto();
}
if(e.key==="ArrowLeft"){
currentIndex=(currentIndex-1+photos.length)%photos.length;
showPhoto();
}
});

shareBtn.onclick=async()=>{

const src=`organising-committee/${photos[currentIndex]}`;

if(navigator.share){

await navigator.share({
title:"Organising Committee, Tumpui Kohhran",
url:new URL(src,location.href).href
});

}else{

navigator.clipboard.writeText(new URL(src,location.href).href);
alert("Photo link copied.");

}
};
