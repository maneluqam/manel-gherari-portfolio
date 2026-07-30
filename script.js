document.getElementById("year").textContent=String(new Date().getFullYear());
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const progressBar=document.querySelector(".scroll-progress span");
const navLinks=[...document.querySelectorAll("header nav a[href^='#']")];
const navSections=navLinks.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
let ticking=false;
function updatePageState(){
  const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
  if(progressBar) progressBar.style.transform="scaleX("+(maxScroll>0?window.scrollY/maxScroll:0)+")";
  let current="";
  navSections.forEach(section=>{if(section.getBoundingClientRect().top<=window.innerHeight*.34) current=section.id});
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
  ticking=false;
}
window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(updatePageState);ticking=true}},{passive:true});
window.addEventListener("resize",updatePageState);
updatePageState();
