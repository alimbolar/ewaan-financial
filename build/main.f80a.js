(()=>{"use strict";const e=document.querySelector(".menu"),t=document.querySelector(".nav__wrapper"),n=function(){t.classList.toggle("hidden"),e.firstChild.classList.toggle("toggled")};t.addEventListener("click",n),e.addEventListener("click",n),document.querySelector(".slider");const s=document.querySelector(".slides");let r,l=s.querySelectorAll(".slide"),o=1,i=l[o].clientWidth;console.log("slideWidth",i);const c=l[0].cloneNode(!0),d=l[l.length-1].cloneNode(!0);c.id="first-slide",d.id="last-slide",s.prepend(d),s.append(c),s.style.transform=`translatex(${-i*o}px)`;const a=()=>{l=g(),o>=l.length-1||(o++,s.style.transform=`translatex(-${i*o}px)`,s.style.transition="0.7s")},u=()=>{r=setInterval((()=>{a()}),2e3)};u(),s.addEventListener("transitionend",(()=>{l=g(),l[o].id===c.id&&(s.style.transition="none",o=1,s.style.transform=`translatex(-${i*o}px)`),l[o].id===d.id&&(s.style.transition="none",o=l.length-2,s.style.transform=`translatex(-${i*o}px)`)})),s.addEventListener("mouseenter",(()=>{console.log("mouse enter"),clearInterval(r)})),s.addEventListener("mouseleave",(()=>{console.log("mouse leave"),u()}));const y=document.querySelector(".prev");document.querySelector(".next").addEventListener("click",a),y.addEventListener("click",(()=>{o<=0||(o--,s.style.transform=`translatex(-${i*o}px)`,s.style.transition="0.7s")}));const g=()=>s.querySelectorAll(".slide"),m=new IntersectionObserver((e=>{e.forEach((e=>{e.target.classList.toggle("show",e.isIntersecting),e.isIntersecting&&m.unobserve(e.target)}))}),{threshold:1,rootMargin:"-10% 0%"}),v=document.querySelectorAll(".service"),f=document.querySelectorAll(".feature"),h=document.querySelector(".benefits");v.forEach((e=>{m.observe(e)})),f.forEach((e=>{m.observe(e)})),m.observe(h)})();