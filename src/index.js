import "./css/main.scss";

const menu = document.querySelector(".menu");
const navWrapper = document.querySelector(".nav__wrapper");

const toggleNav = function () {
  navWrapper.classList.toggle("hidden");
};

navWrapper.addEventListener("click", toggleNav);
menu.addEventListener("click", toggleNav);
