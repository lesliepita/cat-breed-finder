import { getData } from "../javascript/api.js";
import { renderList } from "../javascript/info.js";
import { setupLoadMore } from "../javascript/loadmore.js";
import { setupSearch } from "../javascript/navsearch.js";
import { setupZoom } from "../javascript/zoom.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initCatCarousel } from './carousel.js';
import { setupNavResponsive } from './navresponsive.js';

let breedsData = [];

window.addEventListener("load", async () => {
  try {
    breedsData = await getData();
    renderList(breedsData);
    setupLoadMore(breedsData, renderList);
    setupSearch(breedsData, renderList);
    setupZoom();
    initCatCarousel();
    setupNavResponsive();
  } catch (error) {
    document.getElementById("app").textContent = "Error loading data: " + error.message;
  }
});

const startYear = 2025;
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById("year-span");

yearSpan.textContent = `${startYear}${currentYear !== startYear ? "–" + currentYear : ""}`;

document.addEventListener("DOMContentLoaded", () => {
  const mobileSearchIcon = document.getElementById("mobile-search-icon");
  const searchBar = document.querySelector(".search-bar");

  if (mobileSearchIcon && searchBar) {
    mobileSearchIcon.addEventListener("click", () => {
      searchBar.classList.toggle("active");
      if (searchBar.classList.contains("active")) {
        document.getElementById("search-input").focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !searchBar.contains(event.target) &&
        !mobileSearchIcon.contains(event.target)
      ) {
        searchBar.classList.remove("active");
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const mobileSearchIcon = document.getElementById('mobile-search-icon');
  const searchBar = document.querySelector('.desktop .search-bar');

  mobileSearchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('active');
  });
});
