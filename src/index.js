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
let currSlide = 1;
let slideWidth = slides[currSlide].clientWidth;
const interval = 2000;
let slideId;

console.log("slideWidth", slideWidth);

const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

firstSlide.id = "first-slide";
lastSlide.id = "last-slide";

slidesContainer.prepend(lastSlide);
slidesContainer.append(firstSlide);

// Set initial position to 1 as currSlide is on index 1
slidesContainer.style.transform = `translatex(${-slideWidth * currSlide}px)`;

const moveToNext = () => {
  slides = getSlides();
  if (currSlide >= slides.length - 1) return;
  currSlide++;
  slidesContainer.style.transform = `translatex(-${slideWidth * currSlide}px)`;
  slidesContainer.style.transition = `0.7s`;
};

const moveToPrevious = () => {
  // slides = getSlides();
  if (currSlide <= 0) return;
  currSlide--;
  slidesContainer.style.transform = `translatex(-${slideWidth * currSlide}px)`;
  slidesContainer.style.transition = `0.7s`;
};
const startSlide = () => {
  slideId = setInterval(() => {
    moveToNext();
  }, interval);
};

startSlide();

slidesContainer.addEventListener("transitionend", () => {
  slides = getSlides();

  if (slides[currSlide].id === firstSlide.id) {
    slidesContainer.style.transition = "none";
    currSlide = 1;
    slidesContainer.style.transform = `translatex(-${
      slideWidth * currSlide
    }px)`;
  }
  if (slides[currSlide].id === lastSlide.id) {
    slidesContainer.style.transition = "none";
    currSlide = slides.length - 2;
    slidesContainer.style.transform = `translatex(-${
      slideWidth * currSlide
    }px)`;
  }
});

slidesContainer.addEventListener("mouseenter", () => {
  console.log("mouse enter");
  clearInterval(slideId);
});

slidesContainer.addEventListener("mouseleave", () => {
  console.log("mouse leave");
  startSlide();
});

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

next.addEventListener("click", moveToNext);
prev.addEventListener("click", moveToPrevious);

const getSlides = () => slidesContainer.querySelectorAll(".slide");

// ANIMATION

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
    rootMargin: "-10% 0%",
  }
);

const services = document.querySelectorAll(".service");
const features = document.querySelectorAll(".feature");
const benefits = document.querySelector(".benefits");
services.forEach((service) => {
  observer.observe(service);
});

features.forEach((feature) => {
  observer.observe(feature);
});

observer.observe(benefits);

// SEND EMAIL

const form = document.querySelector("#message");

const submitMessage = (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  formData.append("recipient", "alimbolar@gmail.com");
  formData.append("subject", "Submission from website");

  const messageData = Object.fromEntries(formData);

  console.log(messageData);

  const url = "/api/sendMail";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("message sent successfully");
    });
};

form.addEventListener("submit", submitMessage);
