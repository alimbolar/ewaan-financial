import "./css/main.scss";

const menu = document.querySelector(".menu");
const navWrapper = document.querySelector(".nav__wrapper");

const toggleNav = function () {
  navWrapper.classList.toggle("hidden");
  menu.firstChild.classList.toggle("toggled");
};

navWrapper.addEventListener("click", toggleNav);
menu.addEventListener("click", toggleNav);

// SLIDER

const slider = document.querySelector(".slider");
const slidesContainer = document.querySelector(".slides");

let slides = slidesContainer.querySelectorAll(".slide");
let index = 1;
let slideWidth = slides[index].clientWidth;
const interval = 2000;

console.log("slideWidth", slides[index].clientWidth);

const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

firstSlide.id = "first-slide";
lastSlide.id = "last-slide";

slidesContainer.prepend(lastSlide);
slidesContainer.append(firstSlide);

slidesContainer.style.transform = `translatex(${-slideWidth * index}px)`;

const startSlide = () => {
  setInterval(() => {
    index++;
    slidesContainer.style.transform = `translatex(-${slideWidth * index}px)`;
    slidesContainer.style.transition = `0.7s`;
  }, interval);
};

startSlide();

slidesContainer.addEventListener("transitionend", () => {
  slides = slidesContainer.querySelectorAll(".slide");

  console.log(slides[index].id);

  if (slides[index].id === firstSlide.id) {
    slidesContainer.style.transition = "none";
    index = 1;
    slidesContainer.style.transform = `translatex(-${slideWidth * index}px)`;
  }
});
