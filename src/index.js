import "./../public/css/main.scss";
import IntersectionObserverPolyfill from "intersection-observer";
import LogRocket from "logrocket";

LogRocket.init("alim-bolar/ewaan-financial");

const menu = document.querySelector(".menu");
const navWrapper = document.querySelector(".nav__wrapper");

const toggleNav = function () {
  navWrapper.classList.toggle("hidden");
  menu.firstChild.classList.toggle("toggled");
};

navWrapper.addEventListener("click", toggleNav);
menu.addEventListener("click", toggleNav);

// // SLIDER

// const slider = document.querySelector(".slider");
// const slidesContainer = document.querySelector(".slides");

// let slides = slidesContainer.querySelectorAll(".slide");
// let currSlide = 1;
// let slideWidth = slides[currSlide].clientWidth;
// const interval = 2000;
// let slideId;

// console.log(slider);
// console.log(slides[currSlide]);
// console.log("slideWidth", slideWidth);

// const firstSlide = slides[0].cloneNode(true);
// const lastSlide = slides[slides.length - 1].cloneNode(true);

// firstSlide.id = "first-slide";
// lastSlide.id = "last-slide";

// slidesContainer.prepend(lastSlide);
// slidesContainer.append(firstSlide);

// // Set initial position to 1 as currSlide is on index 1
// slidesContainer.style.transform = `translatex(${-slideWidth * currSlide}px)`;

// const getSlides = () => slidesContainer.querySelectorAll(".slide");

// const moveToNext = () => {
//   slides = getSlides();
//   if (currSlide >= slides.length - 1) return;
//   currSlide++;
//   slidesContainer.style.transform = `translatex(-${slideWidth * currSlide}px)`;
//   slidesContainer.style.transition = `0.7s`;
// };

// const moveToPrevious = () => {
//   slides = getSlides();
//   if (currSlide <= 0) return;
//   currSlide--;
//   slidesContainer.style.transform = `translatex(-${slideWidth * currSlide}px)`;
//   slidesContainer.style.transition = `0.7s`;
// };
// const startSlide = () => {
//   console.log("starting slide");
//   slideId = setInterval(() => {
//     moveToNext();
//   }, interval);
// };

// slidesContainer.addEventListener("transitionend", () => {
//   slides = getSlides();

//   if (slides[currSlide].id === firstSlide.id) {
//     slidesContainer.style.transition = "none";
//     currSlide = 1;
//     slidesContainer.style.transform = `translatex(-${
//       slideWidth * currSlide
//     }px)`;
//   }
//   if (slides[currSlide].id === lastSlide.id) {
//     slidesContainer.style.transition = "none";
//     currSlide = slides.length - 2;
//     slidesContainer.style.transform = `translatex(-${
//       slideWidth * currSlide
//     }px)`;
//   }
// });

// // slidesContainer.addEventListener("mouseenter", () => {
// //   console.log("mouse enter");
// //   clearInterval(slideId);
// // });

// // slidesContainer.addEventListener("mouseleave", startSlide);

// const prev = document.querySelector(".prev");
// const next = document.querySelector(".next");

// next.addEventListener("click", moveToNext);
// prev.addEventListener("click", moveToPrevious);

// startSlide();

// ANIMATION

if ("IntersectionObserver" in window) {
  console.log("yes, it exists");
} else {
  console.log("no, it does not exist");
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.9,
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
} else {
}
// SEND EMAIL

const form = document.querySelector("#message");
const messageHeadline = document.querySelector(".messageHeadline");
const contactUsContent = document.querySelector(".contact-us__content");
const formButton = form.querySelector("button");

formButton.addEventListener("transitionend", () => {
  // formButton.style.transition = "none";
  formButton.classList.remove("clicked");
});

const submitMessage = (event) => {
  formButton.classList.add("clicked");

  // setTimeout(() => {
  //   formButton.classList.remove("clicked");
  // }, 4000);

  event.preventDefault();

  // SELECTING VALUE FROM INPUT ELEMENTS
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const mobile = form.querySelector('input[name="mobile"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // VALIDATION
  const nameIsValid = /[a-zA-Z]+/g.test(name);
  const messageIsValid = /[a-zA-Z]+/g.test(message);
  const emailIsValid =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const mobileIsValid = /\d{10}/.test(mobile);

  // CREATE MESSAGE STATUS OBJECT
  const messageStatus = {
    name: nameIsValid,
    email: emailIsValid,
    mobile: mobileIsValid,
    message: messageIsValid,
  };

  // CREATE ARRAY TO FILTER OUT KEY NAMES
  const errors = Object.entries(messageStatus)
    .map(([key, value]) => {
      if (!value) {
        return key;
      }
    })
    .filter((x) => x != undefined);

  // IF ARRAY IS POPULATED WITH ERRORS
  if (errors.length) {
    let errorString = "";
    errors.forEach((error, index) => {
      index !== errors.length - 1
        ? (errorString += error + ", ")
        : (errorString += error);
    });
    const alertMessage = `Form Inputs are not valid : ${errorString}`;
    alert(alertMessage);
    return;
  }

  const formData = new FormData(form);

  formData.append("recipient", "shahebazvora@gmail.com");
  formData.append("subject", "Submission from website");

  const messageData = Object.fromEntries(formData);

  console.log(messageData);

  const url = ".netlify/functions/sendMail";
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
      form.style.opacity = 0;
      contactUsContent.style.opacity = 0;
      messageHeadline.textContent = data.data;
      messageHeadline.setAttribute("style", "white-space:pre;");
      // if (data.status === "success") {
      // }
    });
  form.reset();
};

form.addEventListener("submit", submitMessage);

// SLIDER

const slider = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");
const slideWidth = slider.clientWidth;
let slideId;

const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

console.log(firstSlide);
console.log(lastSlide);

sliderContainer.append(firstSlide);
sliderContainer.prepend(lastSlide);

let currSlide = 1;
console.log(currSlide);
console.log(slider.clientWidth);

sliderContainer.style.transform = `translatex(${-slideWidth * currSlide}px)`;
firstSlide.id = "first-slide";
lastSlide.id = "last-slide";

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const getSlides = () => {
  return sliderContainer.querySelectorAll(".slide");
};

const moveToPreviousSlide = (event) => {
  if (currSlide <= 0) return;
  currSlide--;
  sliderContainer.style.transform = `translatex(${-slideWidth * currSlide}px)`;
  sliderContainer.style.transition = `transform 0.7s`;
};

const moveToNextSlide = (event) => {
  console.log("slideId", slideId);
  slides = getSlides();
  if (currSlide >= slides.length - 1) return;
  currSlide++;
  sliderContainer.style.transition = `transform 0.7s`;
  sliderContainer.style.transform = `translatex(${-slideWidth * currSlide}px)`;
};

sliderContainer.addEventListener("transitionend", (event) => {
  slides = getSlides();
  if (slides[currSlide].id == firstSlide.id) {
    sliderContainer.style.transition = "none";
    currSlide = 1;
    sliderContainer.style.transform = `translatex(${
      -slideWidth * currSlide
    }px)`;
  }
  if (slides[currSlide].id == lastSlide.id) {
    sliderContainer.style.transition = "none";
    currSlide = slides.length - 2;
    sliderContainer.style.transform = `translatex(${
      -slideWidth * currSlide
    }px)`;
  }
});

const startSlide = () => {
  slideId = setInterval(moveToNextSlide, 2000);
};

startSlide();
prevBtn.addEventListener("click", moveToPreviousSlide);
nextBtn.addEventListener("click", moveToNextSlide);

[prevBtn, nextBtn, sliderContainer].forEach((element) => {
  element.addEventListener("mouseenter", () => {
    console.log("mouseenter");
    clearInterval(slideId);
  });
});

[prevBtn, nextBtn, sliderContainer].forEach((element) => {
  element.addEventListener("mouseleave", () => {
    console.log("mouseleave");
    startSlide();
  });
});

// FORM VALIDATION ON BLUR

const mobileInput = document.querySelector('input[type="tel"]');
const emailInput = document.querySelector('input[type="email"]');

console.log(mobileInput);

const validateMobile = (event) => {
  event.preventDefault();
  const input = event.target.value;
  const isValid = /\d{10}/.test(input);
  if (isValid) {
    event.target.classList.remove("error");
  } else {
    event.target.classList.add("error");
  }
};

const validateEmail = (event) => {
  event.preventDefault();

  const input = event.target.value;

  const isValid =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      input
    );

  isValid
    ? event.target.classList.remove("error")
    : event.target.classList.add("error");
};

mobileInput.addEventListener("blur", validateMobile);
emailInput.addEventListener("blur", validateEmail);
